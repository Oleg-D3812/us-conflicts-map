#!/usr/bin/env python3
"""
US Conflicts Map Updater

This script queries Perplexity API to find new US military actions/interventions
for configured countries, verifies they are not duplicates using OpenAI,
and updates the conflicts.json file.
"""

import json
import os
import sys
import argparse
import shutil
from datetime import datetime
from pathlib import Path
import time
import requests
from perplexity import Perplexity
from pydantic import BaseModel

# Paths
SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"
STATE_PATH = SCRIPT_DIR / "state.json"
DATA_DIR = SCRIPT_DIR.parent / "data"
CONFLICTS_PATH = DATA_DIR / "conflicts.json"

# Country names mapping (from data_aux.js)
COUNTRY_NAMES = {
    "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AT": "Austria",
    "BA": "Bosnia and Herzegovina", "BE": "Belgium", "CL": "Chile", "CU": "Cuba",
    "DE": "Germany", "DO": "Dominican Republic", "EG": "Egypt", "FR": "France",
    "GB": "United Kingdom", "GD": "Grenada", "GR": "Greece", "GT": "Guatemala",
    "HR": "Croatia", "HN": "Honduras", "HT": "Haiti", "ID": "Indonesia",
    "IL": "Israel", "IQ": "Iraq", "IR": "Iran", "IT": "Italy", "JP": "Japan",
    "KH": "Cambodia", "KP": "North Korea", "KR": "South Korea", "KW": "Kuwait",
    "LA": "Laos", "LB": "Lebanon", "LY": "Libya", "MA": "Morocco", "MX": "Mexico",
    "NI": "Nicaragua", "NL": "Netherlands", "PA": "Panama", "PH": "Philippines",
    "PK": "Pakistan", "PL": "Poland", "PS": "Palestine", "RS": "Serbia",
    "RU": "Russia", "SD": "Sudan", "SO": "Somalia", "SV": "El Salvador",
    "SY": "Syria", "TL": "East Timor", "TN": "Tunisia", "UA": "Ukraine",
    "VE": "Venezuela", "VN": "Vietnam", "XK": "Kosovo", "YE": "Yemen"
}

# Conflict types
CONFLICT_TYPES = {
    "type1": "Direct War & Occupation",
    "type2": "Direct Military Intervention",
    "type3": "Proxy War & Armed Support",
    "type4": "Political Destabilization"
}


class PerplexityAction(BaseModel):
    name: str
    startDate: str
    endDate: str | None
    description: str
    type: str
    casualties_us: int
    casualties_total: int
    outcome: str
    source_url: str


class PerplexityActions(BaseModel):
    actions: list[PerplexityAction]


def load_json(path: Path) -> dict | list:
    """Load JSON file."""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data: dict | list) -> None:
    """Save JSON file with pretty formatting."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def create_backup(source_path: Path) -> Path:
    """Create a timestamped backup of the file."""
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup_name = f"{source_path.stem}_{timestamp}{source_path.suffix}"
    backup_path = source_path.parent / backup_name
    shutil.copy2(source_path, backup_path)
    return backup_path


def query_perplexity(api_key: str, country_name: str, country_code: str,
                     last_update: str | None) -> list[dict]:
    """
    Query Perplexity API to find new US military actions against a country.
    Uses structured JSON output via Pydantic schema.
    Returns a list of parsed action dicts, or empty list on failure.
    """
    if last_update:
        date_constraint = f"since {last_update}"
    else:
        date_constraint = "in the last 90 days"

    prompt = f"""Find any recent US military actions, interventions, sanctions, covert operations,
    or acts of aggression against {country_name} {date_constraint}.

    Include:
    - Military strikes, raids, or drone attacks
    - New sanctions or economic measures
    - Covert operations or CIA activities
    - Military support to opposition groups
    - Political destabilization efforts
    - Weapons deployments or military buildups targeting this country

    For each action found, provide:
    - name: Short descriptive name
    - startDate: YYYY-MM-DD format
    - endDate: YYYY-MM-DD format or null if ongoing
    - description: Detailed description of the action
    - type: one of type1 (Direct War & Occupation), type2 (Direct Military Intervention), type3 (Proxy War & Armed Support), type4 (Political Destabilization)
    - casualties_us: US casualties count (0 if unknown)
    - casualties_total: Total casualties count (0 if unknown)
    - outcome: Current outcome or status
    - source_url: URL to a reliable source

    !!! important!!!! Include source URLs for each action.

    If no actions are found, return an empty list."""

    try:
        client = Perplexity(api_key=api_key)

        completion = client.chat.completions.create(
            model="sonar-pro",
            messages=[{"role": "user", "content": prompt}],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "schema": PerplexityActions.model_json_schema()
                }
            }
        )

        content = completion.choices[0].message.content
        data = json.loads(content)
        actions = data.get("actions", [])

        # Add country code to each action
        for action in actions:
            action["country_code"] = country_code
            action["country_name"] = country_name

        return actions

    except Exception as e:
        print(f"  Error querying Perplexity for {country_name}: {e}")
        return []


def verify_not_duplicate(api_key: str, new_action: dict,
                         existing_conflicts: list[dict]) -> dict | None:
    """
    Use OpenAI to verify that a new action is not a duplicate of existing conflicts.
    Returns the validated action with assigned type, or None if duplicate.
    """
    country_code = new_action["country_code"]

    # Filter existing conflicts for this country
    country_conflicts = [
        c for c in existing_conflicts
        if country_code in c.get("countries", [])
    ]

    existing_summary = json.dumps([
        {
            "id": c["id"],
            "name": c["name"],
            "startDate": c["startDate"],
            "endDate": c["endDate"],
            "description": c["description"][:200] + "..." if len(c["description"]) > 200 else c["description"]
        }
        for c in country_conflicts
    ], indent=2)

    new_action_json = json.dumps(new_action, indent=2)

    prompt = f"""Analyze if this new action is a duplicate or update of any existing conflict.

NEW ACTION:
{new_action_json}

EXISTING CONFLICTS FOR {new_action['country_name']}:
{existing_summary}

Determine:
1. Is this new action already covered by an existing conflict? (Same event, just different wording)
2. Is this an update/continuation of an existing conflict that should update the existing entry instead?
3. Is this genuinely new information that should be added as a separate entry?

Also verify the conflict type is appropriate:
- type1: Direct War & Occupation (large-scale combat, invasions, occupations)
- type2: Direct Military Intervention (airstrikes, missile strikes, raids, naval actions)
- type3: Proxy War & Armed Support (funding/arming local forces, CIA covert ops)
- type4: Political Destabilization (coups, sanctions, election interference, economic warfare)

Respond with ONLY valid JSON:
{{
    "is_duplicate": true/false,
    "reason": "explanation",
    "recommended_type": "type1|type2|type3|type4",
    "suggested_id": "kebab-case-id-for-new-entry",
    "validated_name": "Corrected or improved name if needed",
    "is_credible": true/false,
    "credibility_note": "Note about source credibility if concerns exist"
}}"""

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "system",
                "content": "You are an expert analyst verifying and deduplicating conflict data. Always respond with valid JSON only."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.1,
        "max_tokens": 500
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()

        result = response.json()
        content = result["choices"][0]["message"]["content"]

        # Handle markdown code blocks
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]

        validation = json.loads(content.strip())

        if validation.get("is_duplicate", True):
            print(f"    Duplicate: {validation.get('reason', 'No reason given')}")
            return None

        if not validation.get("is_credible", True):
            print(f"    Not credible: {validation.get('credibility_note', 'No note')}")
            return None

        # Build the validated conflict entry
        validated = {
            "id": validation.get("suggested_id", new_action.get("name", "unknown").lower().replace(" ", "-")),
            "name": validation.get("validated_name", new_action.get("name", "Unknown Action")),
            "type": validation.get("recommended_type", new_action.get("type", "type2")),
            "countries": [new_action["country_code"]],
            "startDate": new_action.get("startDate", datetime.now().strftime("%Y-%m-%d")),
            "endDate": new_action.get("endDate") or datetime.now().strftime("%Y-%m-%d"),
            "description": new_action.get("description", ""),
            "casualties": {
                "us": new_action.get("casualties_us", 0),
                "total": new_action.get("casualties_total", 0)
            },
            "outcome": new_action.get("outcome", "Ongoing"),
            "wikiLink": new_action.get("source_url", "")
        }

        return validated

    except requests.exceptions.RequestException as e:
        print(f"    Error calling OpenAI: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"    Error parsing OpenAI response: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(description="Update US conflicts data from online sources")
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview changes without writing to files")
    parser.add_argument("--country", type=str,
                        help="Process only a specific country (ISO code)")
    args = parser.parse_args()

    print("=" * 60)
    print("US Conflicts Map Updater")
    print("=" * 60)

    # Load configuration
    if not CONFIG_PATH.exists():
        print(f"Error: Config file not found: {CONFIG_PATH}")
        sys.exit(1)

    config = load_json(CONFIG_PATH)

    perplexity_key = config.get("perplexity_api_key", "")
    openai_key = config.get("openai_api_key", "")
    countries = config.get("countries", [])
    rate_limit_delay = config.get("rate_limit_delay", 1.0)

    if not perplexity_key or perplexity_key == "YOUR_PERPLEXITY_API_KEY":
        print("Error: Please set your Perplexity API key in config.json")
        sys.exit(1)

    if not openai_key or openai_key == "YOUR_OPENAI_API_KEY":
        print("Error: Please set your OpenAI API key in config.json")
        sys.exit(1)

    # Filter to specific country if requested
    if args.country:
        if args.country not in COUNTRY_NAMES:
            print(f"Error: Unknown country code: {args.country}")
            sys.exit(1)
        countries = [args.country]

    if not countries:
        print("Error: No countries configured in config.json")
        sys.exit(1)

    print(f"\nProcessing {len(countries)} countries...")
    if args.dry_run:
        print("DRY RUN MODE - No changes will be saved\n")

    # Load state
    state = load_json(STATE_PATH) if STATE_PATH.exists() else {}

    # Load existing conflicts
    if not CONFLICTS_PATH.exists():
        print(f"Error: Conflicts file not found: {CONFLICTS_PATH}")
        sys.exit(1)

    conflicts = load_json(CONFLICTS_PATH)
    print(f"Loaded {len(conflicts)} existing conflicts\n")

    # Track new conflicts
    new_conflicts = []

    # Process each country
    for i, country_code in enumerate(countries):
        country_name = COUNTRY_NAMES.get(country_code, country_code)
        last_update = state.get(country_code)

        print(f"[{i+1}/{len(countries)}] {country_name} ({country_code})")
        if last_update:
            print(f"  Last checked: {last_update}")
        else:
            print(f"  First check (looking at last 90 days)")

        # Query Perplexity for structured actions
        print(f"  Querying Perplexity...")
        actions = query_perplexity(perplexity_key, country_name, country_code, last_update)

        if not actions:
            print(f"  No new actions found")
        else:
            print(f"  Found {len(actions)} potential actions")

            # Verify each action with OpenAI
            for action in actions:
                print(f"    Verifying: {action.get('name', 'Unknown')}")
                validated = verify_not_duplicate(openai_key, action, conflicts)

                if validated:
                    print(f"    NEW: {validated['name']} ({validated['type']})")
                    new_conflicts.append(validated)
                    # Add to conflicts for future duplicate checking
                    conflicts.append(validated)

        # Update state
        state[country_code] = datetime.now().strftime("%Y-%m-%d")

        # Rate limiting
        if i < len(countries) - 1:
            time.sleep(rate_limit_delay)

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Countries processed: {len(countries)}")
    print(f"New conflicts found: {len(new_conflicts)}")

    if new_conflicts:
        print("\nNew entries:")
        for c in new_conflicts:
            print(f"  - {c['name']} ({c['countries'][0]})")

    # Save changes
    if new_conflicts and not args.dry_run:
        print("\nSaving changes...")

        # Create backup
        backup_path = create_backup(CONFLICTS_PATH)
        print(f"  Backup created: {backup_path.name}")

        # Save updated conflicts
        save_json(CONFLICTS_PATH, conflicts)
        print(f"  Updated: {CONFLICTS_PATH.name}")

        # Save state
        save_json(STATE_PATH, state)
        print(f"  State saved: {STATE_PATH.name}")

        print("\nDone!")
    elif new_conflicts and args.dry_run:
        print("\nDRY RUN - No changes saved")
        print("Run without --dry-run to apply changes")
    else:
        # Still save state even if no new conflicts
        if not args.dry_run:
            save_json(STATE_PATH, state)
            print("\nState updated (no new conflicts)")
        print("\nNo new conflicts to add")


if __name__ == "__main__":
    main()

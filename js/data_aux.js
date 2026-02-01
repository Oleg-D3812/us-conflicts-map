/**
 * US Military Conflicts Data (1900-2025)
 * Contains conflict information and president data
 */

// Conflict type definitions with colors
const conflictTypes = {
    "type1": {
        id: "type1",
        name: "Direct War & Occupation",
        description: "Large-scale combat operations, invasions, declared/undeclared wars, long-term occupations",
        color: "#e53e3e" // Red
    },
    "type2": {
        id: "type2",
        name: "Direct Military Intervention",
        description: "Short-term or limited military force: airstrikes, missile strikes, raids",
        color: "#ed8936" // Orange
    },
    "type3": {
        id: "type3",
        name: "Proxy War & Armed Support",
        description: "Funding, arming, training local/regional forces, CIA covert operations",
        color: "#9f7aea" // Purple
    },
    "type4": {
        id: "type4",
        name: "Political Destabilization",
        description: "Coups, election interference, economic warfare, regime change support",
        color: "#4299e1" // Blue
    }
};

// Library of Congress presidential portrait base URL
const LOC_PORTRAIT_BASE = "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/";

const presidents = [
    {
        name: "William McKinley",
        start: "1897-03-04",
        end: "1901-09-14",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "25-mckinley.jpg"
    },
    {
        name: "Theodore Roosevelt",
        start: "1901-09-14",
        end: "1909-03-04",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "26-roosevelt.jpg"
    },
    {
        name: "William Howard Taft",
        start: "1909-03-04",
        end: "1913-03-04",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "27-taft.jpg"
    },
    {
        name: "Woodrow Wilson",
        start: "1913-03-04",
        end: "1921-03-04",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "28-wilson.jpg"
    },
    {
        name: "Warren G. Harding",
        start: "1921-03-04",
        end: "1923-08-02",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "29-harding.jpg"
    },
    {
        name: "Calvin Coolidge",
        start: "1923-08-02",
        end: "1929-03-04",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "30-coolidge.jpg"
    },
    {
        name: "Herbert Hoover",
        start: "1929-03-04",
        end: "1933-03-04",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "31-hoover.jpg"
    },
    {
        name: "Franklin D. Roosevelt",
        start: "1933-03-04",
        end: "1945-04-12",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "32-roosevelt.jpg"
    },
    {
        name: "Harry S. Truman",
        start: "1945-04-12",
        end: "1953-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "33-truman.jpg"
    },
    {
        name: "Dwight D. Eisenhower",
        start: "1953-01-20",
        end: "1961-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "34-eisenhower.jpg"
    },
    {
        name: "John F. Kennedy",
        start: "1961-01-20",
        end: "1963-11-22",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "35-kennedy.jpg"
    },
    {
        name: "Lyndon B. Johnson",
        start: "1963-11-22",
        end: "1969-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "36-johnson.jpg"
    },
    {
        name: "Richard Nixon",
        start: "1969-01-20",
        end: "1974-08-09",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "37-nixon.jpg"
    },
    {
        name: "Gerald Ford",
        start: "1974-08-09",
        end: "1977-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "38-ford.jpg"
    },
    {
        name: "Jimmy Carter",
        start: "1977-01-20",
        end: "1981-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "39-carter.jpg"
    },
    {
        name: "Ronald Reagan",
        start: "1981-01-20",
        end: "1989-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "40-reagan.jpg"
    },
    {
        name: "George H. W. Bush",
        start: "1989-01-20",
        end: "1993-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "41-bush.jpg"
    },
    {
        name: "Bill Clinton",
        start: "1993-01-20",
        end: "2001-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "42-clinton.jpg"
    },
    {
        name: "George W. Bush",
        start: "2001-01-20",
        end: "2009-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "43-bush.jpg"
    },
    {
        name: "Barack Obama",
        start: "2009-01-20",
        end: "2017-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "44-obama.jpg"
    },
    {
        name: "Donald Trump",
        start: "2017-01-20",
        end: "2021-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "45-donald-trump.png"
    },
    {
        name: "Joe Biden",
        start: "2021-01-20",
        end: "2025-01-20",
        party: "Democratic",
        portrait: LOC_PORTRAIT_BASE + "46-joe-biden.png"
    },
    {
        name: "Donald Trump",
        start: "2025-01-20",
        end: "2029-01-20",
        party: "Republican",
        portrait: LOC_PORTRAIT_BASE + "47-donald-trump.jpg"
    }
];

// Country name mapping (ISO code to full name)
const countryNames = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AT": "Austria",
    "BA": "Bosnia and Herzegovina",
    "BE": "Belgium",
    "CL": "Chile",
    "CU": "Cuba",
    "DE": "Germany",
    "DO": "Dominican Republic",
    "EG": "Egypt",
    "FR": "France",
    "GB": "United Kingdom",
    "GD": "Grenada",
    "GR": "Greece",
    "GT": "Guatemala",
    "HR": "Croatia",
    "HN": "Honduras",
    "HT": "Haiti",
    "ID": "Indonesia",
    "IL": "Israel",
    "IQ": "Iraq",
    "IR": "Iran",
    "IT": "Italy",
    "JP": "Japan",
    "KH": "Cambodia",
    "KP": "North Korea",
    "KR": "South Korea",
    "KW": "Kuwait",
    "LA": "Laos",
    "LB": "Lebanon",
    "LY": "Libya",
    "MA": "Morocco",
    "NI": "Nicaragua",
    "NL": "Netherlands",
    "PA": "Panama",
    "PH": "Philippines",
    "PK": "Pakistan",
    "PL": "Poland",
    "PS": "Palestine",
    "RS": "Serbia",
    "RU": "Russia",
    "SD": "Sudan",
    "SO": "Somalia",
    "SV": "El Salvador",
    "SY": "Syria",
    "TL": "East Timor",
    "TN": "Tunisia",
    "UA": "Ukraine",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "XK": "Kosovo",
    "YE": "Yemen"
};

// Helper function to get country name from ISO code
function getCountryName(isoCode) {
    return countryNames[isoCode] || isoCode;
}

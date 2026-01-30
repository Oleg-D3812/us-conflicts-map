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

const conflicts = [
    // Pre-Cold War Era
    {
        id: "philippine-american",
        name: "Philippine-American War",
        type: "type1",
        countries: ["PH"],
        startDate: "1899-02-04",
        endDate: "1902-07-04",
        description: "A war between the United States and Filipino revolutionaries, which arose from the struggle of the First Philippine Republic to gain independence following annexation by the United States.",
        casualties: { us: 4196, total: 250000 },
        outcome: "American victory; U.S. colonial rule established",
        wikiLink: "https://en.wikipedia.org/wiki/Philippine%E2%80%93American_War"
    },
    {
        id: "banana-wars",
        name: "Banana Wars",
        type: "type1",
        countries: ["HN", "NI", "HT", "DO", "CU"],
        startDate: "1898-01-01",
        endDate: "1934-08-01",
        description: "A series of occupations, police actions, and interventions involving the United States in Central America and the Caribbean. These military operations were designed to protect American commercial interests, particularly those of the United Fruit Company.",
        casualties: { us: 336, total: 15000 },
        outcome: "Various outcomes; U.S. influence established in region",
        wikiLink: "https://en.wikipedia.org/wiki/Banana_Wars"
    },
    {
        id: "ww1",
        name: "World War I",
        type: "type1",
        countries: ["FR", "BE", "DE", "IT"],
        startDate: "1917-04-06",
        endDate: "1918-11-11",
        description: "American involvement in World War I began when the United States declared war on Germany. The U.S. entered following Germany's unrestricted submarine warfare campaign and the Zimmermann Telegram.",
        casualties: { us: 116516, total: 40000000 },
        outcome: "Allied victory; Treaty of Versailles",
        wikiLink: "https://en.wikipedia.org/wiki/American_Expeditionary_Forces"
    },
    {
        id: "russian-civil-war",
        name: "Allied Intervention in Russia",
        type: "type2",
        countries: ["RU"],
        startDate: "1918-08-01",
        endDate: "1920-04-01",
        description: "American troops were deployed to Russia as part of the Allied intervention in the Russian Civil War. The Polar Bear Expedition operated in northern Russia while the American Expeditionary Force Siberia operated in the Russian Far East.",
        casualties: { us: 424, total: 10000 },
        outcome: "Allied withdrawal; Bolshevik victory",
        wikiLink: "https://en.wikipedia.org/wiki/American_Expeditionary_Force,_Siberia"
    },
    {
        id: "ww2",
        name: "World War II",
        type: "type1",
        countries: ["JP", "DE", "IT", "FR", "PH", "AT", "BE", "NL", "PL", "GB", "MA", "TN", "DZ", "LY", "EG"],
        startDate: "1941-12-07",
        endDate: "1945-09-02",
        description: "The United States entered World War II following the Japanese attack on Pearl Harbor. American forces fought in both the European and Pacific theaters, contributing significantly to the defeat of Nazi Germany and Imperial Japan.",
        casualties: { us: 405399, total: 75000000 },
        outcome: "Allied victory; UN established; Cold War begins",
        wikiLink: "https://en.wikipedia.org/wiki/Military_history_of_the_United_States_during_World_War_II"
    },

    // Early Cold War Era (1947-1960)
    {
        id: "greek-civil-war",
        name: "Greek Civil War Intervention",
        type: "type3",
        countries: ["GR"],
        startDate: "1947-01-01",
        endDate: "1949-10-16",
        description: "U.S. intervention in the Greek Civil War under the Truman Doctrine, providing military and economic aid to the Greek government against communist insurgents. This marked the beginning of Cold War containment policy.",
        casualties: { us: 0, total: 158000 },
        outcome: "Greek government victory; Communist insurgency defeated",
        wikiLink: "https://en.wikipedia.org/wiki/Greek_Civil_War"
    },
    {
        id: "korean-war",
        name: "Korean War",
        type: "type1",
        countries: ["KR", "KP"],
        startDate: "1950-06-25",
        endDate: "1953-07-27",
        description: "The Korean War began when North Korea invaded South Korea. The United States, leading a United Nations force, intervened to defend South Korea. The conflict resulted in a stalemate and an armistice that technically remains in effect today.",
        casualties: { us: 36574, total: 2500000 },
        outcome: "Stalemate; Korean Armistice Agreement",
        wikiLink: "https://en.wikipedia.org/wiki/Korean_War"
    },
    {
        id: "iran-coup",
        name: "Iranian Coup (Operation Ajax)",
        type: "type4",
        countries: ["IR"],
        startDate: "1953-08-15",
        endDate: "1953-08-19",
        description: "CIA-orchestrated coup that overthrew democratically elected Prime Minister Mohammad Mosaddegh and restored Shah Mohammad Reza Pahlavi to power. The coup was motivated by oil interests and Cold War concerns.",
        casualties: { us: 0, total: 300 },
        outcome: "Shah restored to power; Long-term anti-American sentiment",
        wikiLink: "https://en.wikipedia.org/wiki/1953_Iranian_coup_d%27%C3%A9tat"
    },
    {
        id: "guatemala-coup",
        name: "Guatemalan Coup (Operation PBSUCCESS)",
        type: "type4",
        countries: ["GT"],
        startDate: "1954-06-18",
        endDate: "1954-06-27",
        description: "CIA-backed coup that overthrew democratically elected President Jacobo Árbenz. The operation was driven by United Fruit Company interests and Cold War anti-communist policy, leading to decades of civil war.",
        casualties: { us: 0, total: 200000 },
        outcome: "Árbenz overthrown; Military dictatorship installed",
        wikiLink: "https://en.wikipedia.org/wiki/1954_Guatemalan_coup_d%27%C3%A9tat"
    },
    {
        id: "lebanon-1958",
        name: "Lebanon Crisis (1958)",
        type: "type2",
        countries: ["LB"],
        startDate: "1958-07-15",
        endDate: "1958-10-25",
        description: "Operation Blue Bat was a U.S. military intervention in Lebanon during the Lebanon Crisis of 1958. President Eisenhower deployed troops at the request of Lebanese President Camille Chamoun amid fears of communist influence.",
        casualties: { us: 1, total: 100 },
        outcome: "U.S. objectives achieved; Lebanese government stabilized",
        wikiLink: "https://en.wikipedia.org/wiki/1958_Lebanon_crisis"
    },

    // 1960s Interventions
    {
        id: "bay-of-pigs",
        name: "Bay of Pigs Invasion",
        type: "type1",
        countries: ["CU"],
        startDate: "1961-04-17",
        endDate: "1961-04-20",
        description: "Failed CIA-sponsored invasion of Cuba by Cuban exiles attempting to overthrow Fidel Castro's government. The operation was a major embarrassment for the Kennedy administration and strengthened Castro's position.",
        casualties: { us: 4, total: 200 },
        outcome: "Cuban victory; U.S. humiliation; Castro strengthened",
        wikiLink: "https://en.wikipedia.org/wiki/Bay_of_Pigs_Invasion"
    },
    {
        id: "vietnam",
        name: "Vietnam War",
        type: "type1",
        countries: ["VN"],
        startDate: "1955-11-01",
        endDate: "1975-04-30",
        description: "The Vietnam War was a prolonged conflict between North Vietnam and South Vietnam (supported by the United States). It was part of the broader Cold War struggle. The war ended with the fall of Saigon and reunification under communist rule.",
        casualties: { us: 58220, total: 2000000 },
        outcome: "North Vietnamese victory; Reunification of Vietnam",
        wikiLink: "https://en.wikipedia.org/wiki/Vietnam_War"
    },
    {
        id: "laos-secret-war",
        name: "Secret War in Laos",
        type: "type2",
        countries: ["LA"],
        startDate: "1964-01-01",
        endDate: "1973-02-22",
        description: "A covert military operation during the Vietnam War where the U.S. conducted massive bombing campaigns and supported Hmong guerrillas against communist Pathet Lao forces. Laos became the most heavily bombed country per capita in history.",
        casualties: { us: 0, total: 100000 },
        outcome: "Communist victory; Pathet Lao takeover",
        wikiLink: "https://en.wikipedia.org/wiki/Laotian_Civil_War"
    },
    {
        id: "dominican-republic",
        name: "Dominican Republic Intervention",
        type: "type1",
        countries: ["DO"],
        startDate: "1965-04-28",
        endDate: "1966-09-21",
        description: "Operation Power Pack was a U.S. military invasion of the Dominican Republic during its civil war. President Johnson ordered 22,000 troops to prevent what he perceived as a communist takeover similar to Cuba.",
        casualties: { us: 47, total: 3000 },
        outcome: "Joaquín Balaguer installed as president",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_occupation_of_the_Dominican_Republic_(1965%E2%80%9366)"
    },
    {
        id: "indonesia-mass-killings",
        name: "Indonesian Mass Killings Support",
        type: "type4",
        countries: ["ID"],
        startDate: "1965-10-01",
        endDate: "1966-06-30",
        description: "U.S. support for the Indonesian military's anti-communist purge following an attempted coup. The CIA provided lists of suspected communists to the Indonesian army, facilitating one of the worst mass killings of the 20th century.",
        casualties: { us: 0, total: 1000000 },
        outcome: "Suharto dictatorship established; PKI destroyed",
        wikiLink: "https://en.wikipedia.org/wiki/Indonesian_mass_killings_of_1965%E2%80%9366"
    },
    {
        id: "cambodia-bombing",
        name: "Cambodia Bombing Campaign",
        type: "type2",
        countries: ["KH"],
        startDate: "1969-03-18",
        endDate: "1973-08-15",
        description: "Operation Menu and subsequent bombing campaigns dropped more tonnage on Cambodia than all Allied bombs in WWII. The secret bombing destabilized Cambodia and contributed to the rise of the Khmer Rouge.",
        casualties: { us: 0, total: 150000 },
        outcome: "Destabilization; Khmer Rouge rise to power",
        wikiLink: "https://en.wikipedia.org/wiki/Operation_Menu"
    },

    // 1970s Interventions
    {
        id: "chile-coup",
        name: "Chilean Coup Support",
        type: "type4",
        countries: ["CL"],
        startDate: "1970-09-04",
        endDate: "1973-09-11",
        description: "CIA-backed destabilization campaign against democratically elected President Salvador Allende, culminating in General Pinochet's military coup. The U.S. supported economic warfare and encouraged military intervention.",
        casualties: { us: 0, total: 3200 },
        outcome: "Allende killed; Pinochet dictatorship (1973-1990)",
        wikiLink: "https://en.wikipedia.org/wiki/1973_Chilean_coup_d%27%C3%A9tat"
    },
    {
        id: "east-timor",
        name: "East Timor Invasion Support",
        type: "type3",
        countries: ["TL"],
        startDate: "1975-12-07",
        endDate: "1999-10-25",
        description: "U.S. support for Indonesia's invasion and occupation of East Timor. President Ford and Kissinger gave tacit approval hours before the invasion. The U.S. continued military aid throughout the brutal occupation.",
        casualties: { us: 0, total: 180000 },
        outcome: "Indonesian occupation until 1999; Independence achieved",
        wikiLink: "https://en.wikipedia.org/wiki/Indonesian_invasion_of_East_Timor"
    },
    {
        id: "afghanistan-mujahideen",
        name: "Afghan Mujahideen Support",
        type: "type3",
        countries: ["AF"],
        startDate: "1979-07-03",
        endDate: "1989-02-15",
        description: "Operation Cyclone was the CIA program to arm and finance the Afghan mujahideen against the Soviet occupation. It became one of the longest and most expensive covert operations in CIA history.",
        casualties: { us: 0, total: 1500000 },
        outcome: "Soviet withdrawal; Taliban eventual rise",
        wikiLink: "https://en.wikipedia.org/wiki/Operation_Cyclone"
    },

    // 1980s Interventions
    {
        id: "el-salvador",
        name: "El Salvador Civil War Support",
        type: "type3",
        countries: ["SV"],
        startDate: "1981-01-01",
        endDate: "1992-01-16",
        description: "U.S. military aid and training for the Salvadoran government and military during the civil war against FMLN guerrillas. U.S.-trained units were responsible for numerous human rights abuses including the El Mozote massacre.",
        casualties: { us: 0, total: 75000 },
        outcome: "Peace accords signed; FMLN became political party",
        wikiLink: "https://en.wikipedia.org/wiki/Salvadoran_Civil_War"
    },
    {
        id: "nicaragua-contras",
        name: "Nicaragua Contra War",
        type: "type3",
        countries: ["NI"],
        startDate: "1981-01-01",
        endDate: "1990-02-25",
        description: "CIA support for the Contras rebel group fighting the Sandinista government. The Iran-Contra scandal revealed illegal arms sales to fund the operation after Congress cut off funding.",
        casualties: { us: 0, total: 50000 },
        outcome: "Sandinistas voted out 1990; Contra demobilization",
        wikiLink: "https://en.wikipedia.org/wiki/Contras"
    },
    {
        id: "beirut-deployment",
        name: "Lebanon Intervention (1982-84)",
        type: "type2",
        countries: ["LB"],
        startDate: "1982-08-25",
        endDate: "1984-02-26",
        description: "U.S. Marines were deployed to Beirut as part of a multinational peacekeeping force during the Lebanese Civil War. The mission was marked by the 1983 Beirut barracks bombing that killed 241 American servicemen.",
        casualties: { us: 266, total: 350 },
        outcome: "U.S. withdrawal following barracks bombing",
        wikiLink: "https://en.wikipedia.org/wiki/1983_Beirut_barracks_bombings"
    },
    {
        id: "grenada",
        name: "Invasion of Grenada",
        type: "type1",
        countries: ["GD"],
        startDate: "1983-10-25",
        endDate: "1983-12-15",
        description: "Operation Urgent Fury was a U.S.-led invasion of Grenada, triggered by a military coup and the execution of Prime Minister Maurice Bishop. The stated goal was to protect American citizens and restore democratic government.",
        casualties: { us: 19, total: 277 },
        outcome: "U.S. victory; Government restored",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_invasion_of_Grenada"
    },
    {
        id: "libya-1986",
        name: "Libya Bombing (1986)",
        type: "type2",
        countries: ["LY"],
        startDate: "1986-04-15",
        endDate: "1986-04-15",
        description: "Operation El Dorado Canyon was a series of airstrikes against Libya in response to the Berlin discotheque bombing. Targets included Gaddafi's residence; the attack killed his adopted daughter.",
        casualties: { us: 2, total: 100 },
        outcome: "Limited military impact; Increased tensions",
        wikiLink: "https://en.wikipedia.org/wiki/1986_United_States_bombing_of_Libya"
    },
    {
        id: "panama",
        name: "Invasion of Panama",
        type: "type1",
        countries: ["PA"],
        startDate: "1989-12-20",
        endDate: "1990-01-31",
        description: "Operation Just Cause was the U.S. invasion of Panama to depose dictator Manuel Noriega. The operation aimed to protect American lives, defend democracy, combat drug trafficking, and protect the Panama Canal treaties.",
        casualties: { us: 23, total: 516 },
        outcome: "U.S. victory; Noriega captured and extradited",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_invasion_of_Panama"
    },

    // Post-Cold War (1990s)
    {
        id: "gulf-war",
        name: "Gulf War (Desert Storm)",
        type: "type1",
        countries: ["IQ", "KW"],
        startDate: "1990-08-02",
        endDate: "1991-02-28",
        description: "The Gulf War was waged by a UN-authorized coalition force from 35 nations led by the United States against Iraq in response to Iraq's invasion and annexation of Kuwait.",
        casualties: { us: 294, total: 35000 },
        outcome: "Coalition victory; Kuwait liberated",
        wikiLink: "https://en.wikipedia.org/wiki/Gulf_War"
    },
    {
        id: "somalia",
        name: "Somalia Intervention",
        type: "type2",
        countries: ["SO"],
        startDate: "1992-12-09",
        endDate: "1995-03-03",
        description: "Operation Restore Hope was a U.S.-led humanitarian intervention in Somalia. The mission included the Battle of Mogadishu depicted in 'Black Hawk Down', which led to U.S. withdrawal.",
        casualties: { us: 43, total: 1500 },
        outcome: "U.S. withdrawal; Humanitarian goals partially achieved",
        wikiLink: "https://en.wikipedia.org/wiki/Battle_of_Mogadishu_(1993)"
    },
    {
        id: "haiti-1994",
        name: "Haiti Intervention",
        type: "type4",
        countries: ["HT"],
        startDate: "1994-09-19",
        endDate: "1995-03-31",
        description: "Operation Uphold Democracy was a military intervention to remove the military regime and restore elected President Jean-Bertrand Aristide. A last-minute diplomatic deal avoided combat.",
        casualties: { us: 4, total: 0 },
        outcome: "Aristide restored; Military junta exiled",
        wikiLink: "https://en.wikipedia.org/wiki/Operation_Uphold_Democracy"
    },
    {
        id: "bosnia",
        name: "Bosnian War Intervention",
        type: "type2",
        countries: ["BA", "HR", "RS"],
        startDate: "1994-02-28",
        endDate: "1995-12-20",
        description: "U.S. involvement in the Bosnian War included NATO airstrikes (Operation Deliberate Force) and peacekeeping operations. The intervention helped end the war and led to the Dayton Agreement.",
        casualties: { us: 12, total: 100000 },
        outcome: "Dayton Agreement; End of Bosnian War",
        wikiLink: "https://en.wikipedia.org/wiki/Operation_Deliberate_Force"
    },
    {
        id: "sudan-1998",
        name: "Sudan Missile Strike",
        type: "type2",
        countries: ["SD"],
        startDate: "1998-08-20",
        endDate: "1998-08-20",
        description: "Operation Infinite Reach cruise missile strike destroyed the Al-Shifa pharmaceutical factory in Khartoum, which the U.S. claimed was producing chemical weapons. The claim was later disputed.",
        casualties: { us: 0, total: 10 },
        outcome: "Factory destroyed; International criticism",
        wikiLink: "https://en.wikipedia.org/wiki/Al-Shifa_pharmaceutical_factory"
    },
    {
        id: "kosovo",
        name: "Kosovo War",
        type: "type2",
        countries: ["XK", "RS"],
        startDate: "1998-02-28",
        endDate: "1999-06-11",
        description: "NATO's intervention in Kosovo included a 78-day bombing campaign against Yugoslavia to stop ethnic cleansing of Albanians by Serbian forces. The operation was conducted without UN Security Council authorization.",
        casualties: { us: 2, total: 13500 },
        outcome: "NATO victory; Kosovo placed under UN administration",
        wikiLink: "https://en.wikipedia.org/wiki/NATO_bombing_of_Yugoslavia"
    },

    // War on Terror Era (2001-present)
    {
        id: "afghanistan",
        name: "War in Afghanistan",
        type: "type1",
        countries: ["AF"],
        startDate: "2001-10-07",
        endDate: "2021-08-30",
        description: "The War in Afghanistan was the longest war in U.S. history, lasting nearly 20 years. It began as a response to the September 11 attacks, targeting al-Qaeda and the Taliban regime that harbored them.",
        casualties: { us: 2461, total: 176000 },
        outcome: "Taliban victory; U.S. withdrawal",
        wikiLink: "https://en.wikipedia.org/wiki/War_in_Afghanistan_(2001%E2%80%932021)"
    },
    {
        id: "yemen",
        name: "Yemen Intervention",
        type: "type3",
        countries: ["YE"],
        startDate: "2002-11-03",
        endDate: "2026-01-01",
        description: "U.S. drone strikes and support for Saudi-led coalition intervention in Yemen's civil war. The campaign has included targeted assassinations and support for a blockade causing humanitarian crisis.",
        casualties: { us: 0, total: 150000 },
        outcome: "Ongoing conflict; Humanitarian catastrophe",
        wikiLink: "https://en.wikipedia.org/wiki/Yemeni_Civil_War_(2014%E2%80%93present)"
    },
    {
        id: "iraq-war",
        name: "Iraq War",
        type: "type1",
        countries: ["IQ"],
        startDate: "2003-03-20",
        endDate: "2011-12-15",
        description: "The Iraq War began with the U.S.-led invasion to overthrow Saddam Hussein's government, based on disputed claims of weapons of mass destruction. The conflict led to years of insurgency and sectarian violence.",
        casualties: { us: 4497, total: 600000 },
        outcome: "Hussein overthrown; Prolonged insurgency",
        wikiLink: "https://en.wikipedia.org/wiki/Iraq_War"
    },
    {
        id: "pakistan-drones",
        name: "Pakistan Drone War",
        type: "type2",
        countries: ["PK"],
        startDate: "2004-06-18",
        endDate: "2026-01-01",
        description: "CIA drone strike campaign in Pakistan's tribal areas targeting Taliban and al-Qaeda militants. The program operated without Pakistani government consent and caused significant civilian casualties.",
        casualties: { us: 0, total: 4000 },
        outcome: "Ongoing; Militant leadership decimated",
        wikiLink: "https://en.wikipedia.org/wiki/Drone_strikes_in_Pakistan"
    },
    {
        id: "libya-2011",
        name: "Libya Intervention (2011)",
        type: "type2",
        countries: ["LY"],
        startDate: "2011-03-19",
        endDate: "2011-10-31",
        description: "Operation Odyssey Dawn was the U.S. contribution to the NATO-led military intervention in Libya during the First Libyan Civil War. The operation led to the overthrow of Muammar Gaddafi.",
        casualties: { us: 0, total: 30000 },
        outcome: "Gaddafi killed; State collapse; Ongoing civil war",
        wikiLink: "https://en.wikipedia.org/wiki/2011_military_intervention_in_Libya"
    },
    {
        id: "syria",
        name: "Syrian Civil War Intervention",
        type: "type3",
        countries: ["SY"],
        startDate: "2011-01-01",
        endDate: "2026-01-01",
        description: "U.S. intervention in Syria includes CIA support for rebel groups, Pentagon training programs, and direct military action against ISIS. Operations included airstrikes, special forces, and arming Kurdish forces.",
        casualties: { us: 20, total: 500000 },
        outcome: "Ongoing; ISIS defeated territorially",
        wikiLink: "https://en.wikipedia.org/wiki/American-led_intervention_in_the_Syrian_civil_war"
    },
    {
        id: "ukraine",
        name: "Ukraine Military Support",
        type: "type3",
        countries: ["UA"],
        startDate: "2014-01-01",
        endDate: "2026-01-01",
        description: "U.S. military and economic support for Ukraine following Russia's annexation of Crimea, dramatically increased after the 2022 Russian invasion. Includes weapons, training, and intelligence sharing.",
        casualties: { us: 0, total: 100000 },
        outcome: "Ongoing conflict with Russia",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_support_during_the_Russian_invasion_of_Ukraine"
    },
    {
        id: "isis-intervention",
        name: "Anti-ISIS Coalition",
        type: "type2",
        countries: ["IQ", "SY"],
        startDate: "2014-09-22",
        endDate: "2026-01-01",
        description: "The American-led intervention against ISIS in Iraq and Syria. Operations included airstrikes, special forces operations, and support for local ground forces to combat ISIS territorial control.",
        casualties: { us: 93, total: 30000 },
        outcome: "ISIS territorial defeat; Ongoing operations",
        wikiLink: "https://en.wikipedia.org/wiki/American-led_intervention_in_Syria"
    },
    {
        id: "iran-2020",
        name: "Iran Escalation (Soleimani)",
        type: "type2",
        countries: ["IR", "IQ"],
        startDate: "2020-01-03",
        endDate: "2020-01-08",
        description: "U.S. drone strike assassinated Iranian General Qasem Soleimani at Baghdad airport, bringing the U.S. and Iran to the brink of war. Iran retaliated with missile strikes on U.S. bases.",
        casualties: { us: 0, total: 10 },
        outcome: "Near-war avoided; Increased regional tensions",
        wikiLink: "https://en.wikipedia.org/wiki/Assassination_of_Qasem_Soleimani"
    },
    {
        id: "israel-gaza-support",
        name: "Israel-Gaza War Support",
        type: "type3",
        countries: ["IL", "PS"],
        startDate: "2023-10-07",
        endDate: "2026-01-01",
        description: "U.S. military aid and diplomatic support for Israel during the Gaza War following Hamas attacks. Includes emergency weapons transfers, naval deployments, and UN veto protection.",
        casualties: { us: 0, total: 40000 },
        outcome: "Ongoing conflict; Humanitarian crisis",
        wikiLink: "https://en.wikipedia.org/wiki/Israel%E2%80%93Hamas_war"
    },
    {
        id: "venezuela-maduro",
        name: "Venezuela Operation (Maduro)",
        type: "type4",
        countries: ["VE"],
        startDate: "2025-01-01",
        endDate: "2026-01-01",
        description: "U.S. operation targeting Venezuelan President Nicolás Maduro, including sanctions escalation, bounty offers, and efforts to capture or remove him from power amid disputed 2024 elections and ongoing political crisis.",
        casualties: { us: 0, total: 0 },
        outcome: "Ongoing",
        wikiLink: "https://en.wikipedia.org/wiki/Nicol%C3%A1s_Maduro"
    }
];

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

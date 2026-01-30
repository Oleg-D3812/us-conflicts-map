/**
 * US Military Conflicts Data (1900-2025)
 * Contains conflict information and president data
 */

const conflicts = [
    {
        id: "philippine-american",
        name: "Philippine-American War",
        countries: ["PH"],
        startDate: "1899-02-04",
        endDate: "1902-07-04",
        description: "A war between the United States and Filipino revolutionaries, which arose from the struggle of the First Philippine Republic to gain independence following annexation by the United States. The war was a continuation of the Philippine struggle for independence that began in 1896 with the Philippine Revolution against Spain.",
        casualties: { us: 4196, total: 250000 },
        outcome: "American victory; U.S. colonial rule established",
        wikiLink: "https://en.wikipedia.org/wiki/Philippine%E2%80%93American_War"
    },
    {
        id: "banana-wars",
        name: "Banana Wars",
        countries: ["HN", "NI", "HT", "DO", "CU"],
        startDate: "1898-01-01",
        endDate: "1934-08-01",
        description: "A series of occupations, police actions, and interventions involving the United States in Central America and the Caribbean between 1898 and 1934. These military operations were designed to protect American commercial interests, particularly those of the United Fruit Company.",
        casualties: { us: 336, total: 15000 },
        outcome: "Various outcomes; U.S. influence established in region",
        wikiLink: "https://en.wikipedia.org/wiki/Banana_Wars"
    },
    {
        id: "ww1",
        name: "World War I",
        countries: ["FR", "BE", "DE", "IT"],
        startDate: "1917-04-06",
        endDate: "1918-11-11",
        description: "American involvement in World War I began when the United States declared war on Germany on April 6, 1917. The U.S. entered the conflict following Germany's unrestricted submarine warfare campaign and the Zimmermann Telegram. American forces played a crucial role in the final Allied offensive.",
        casualties: { us: 116516, total: 40000000 },
        outcome: "Allied victory; Treaty of Versailles",
        wikiLink: "https://en.wikipedia.org/wiki/American_Expeditionary_Forces"
    },
    {
        id: "russian-civil-war",
        name: "Allied Intervention in Russia",
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
        countries: ["JP", "DE", "IT", "FR", "PH", "AT", "BE", "NL", "PL", "GB", "MA", "TN", "DZ", "LY", "EG"],
        startDate: "1941-12-07",
        endDate: "1945-09-02",
        description: "The United States entered World War II following the Japanese attack on Pearl Harbor on December 7, 1941. American forces fought in both the European and Pacific theaters, contributing significantly to the defeat of Nazi Germany and Imperial Japan.",
        casualties: { us: 405399, total: 75000000 },
        outcome: "Allied victory; UN established; Cold War begins",
        wikiLink: "https://en.wikipedia.org/wiki/Military_history_of_the_United_States_during_World_War_II"
    },
    {
        id: "korean-war",
        name: "Korean War",
        countries: ["KR", "KP"],
        startDate: "1950-06-25",
        endDate: "1953-07-27",
        description: "The Korean War began when North Korea invaded South Korea. The United States, leading a United Nations force, intervened to defend South Korea. The conflict resulted in a stalemate and an armistice that technically remains in effect today.",
        casualties: { us: 36574, total: 2500000 },
        outcome: "Stalemate; Korean Armistice Agreement",
        wikiLink: "https://en.wikipedia.org/wiki/Korean_War"
    },
    {
        id: "lebanon-1958",
        name: "Lebanon Crisis",
        countries: ["LB"],
        startDate: "1958-07-15",
        endDate: "1958-10-25",
        description: "Operation Blue Bat was a U.S. military intervention in Lebanon during the Lebanon Crisis of 1958. President Eisenhower deployed troops at the request of Lebanese President Camille Chamoun amid fears of communist influence and regional instability.",
        casualties: { us: 1, total: 100 },
        outcome: "U.S. objectives achieved; Lebanese government stabilized",
        wikiLink: "https://en.wikipedia.org/wiki/1958_Lebanon_crisis"
    },
    {
        id: "vietnam",
        name: "Vietnam War",
        countries: ["VN", "LA", "KH"],
        startDate: "1955-11-01",
        endDate: "1975-04-30",
        description: "The Vietnam War was a prolonged conflict between North Vietnam (supported by China and the Soviet Union) and South Vietnam (supported by the United States). It was part of the broader Cold War struggle. The war ended with the fall of Saigon and reunification of Vietnam under communist rule.",
        casualties: { us: 58220, total: 2000000 },
        outcome: "North Vietnamese victory; Reunification of Vietnam",
        wikiLink: "https://en.wikipedia.org/wiki/Vietnam_War"
    },
    {
        id: "dominican-republic",
        name: "Dominican Civil War Intervention",
        countries: ["DO"],
        startDate: "1965-04-28",
        endDate: "1966-09-21",
        description: "Operation Power Pack was a U.S. military intervention in the Dominican Republic during its civil war. President Johnson ordered troops to prevent what he perceived as a communist takeover similar to Cuba.",
        casualties: { us: 47, total: 3000 },
        outcome: "Joaquín Balaguer installed as president",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_occupation_of_the_Dominican_Republic_(1965%E2%80%9366)"
    },
    {
        id: "grenada",
        name: "Invasion of Grenada",
        countries: ["GD"],
        startDate: "1983-10-25",
        endDate: "1983-12-15",
        description: "Operation Urgent Fury was a U.S.-led invasion of Grenada, triggered by a military coup and the execution of Prime Minister Maurice Bishop. The stated goal was to protect American citizens and restore democratic government.",
        casualties: { us: 19, total: 277 },
        outcome: "U.S. victory; Government restored",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_invasion_of_Grenada"
    },
    {
        id: "beirut-deployment",
        name: "Multinational Force in Lebanon",
        countries: ["LB"],
        startDate: "1982-08-25",
        endDate: "1984-02-26",
        description: "U.S. Marines were deployed to Beirut as part of a multinational peacekeeping force during the Lebanese Civil War. The mission was marked by the 1983 Beirut barracks bombing that killed 241 American servicemen.",
        casualties: { us: 266, total: 350 },
        outcome: "U.S. withdrawal following barracks bombing",
        wikiLink: "https://en.wikipedia.org/wiki/1983_Beirut_barracks_bombings"
    },
    {
        id: "panama",
        name: "Invasion of Panama",
        countries: ["PA"],
        startDate: "1989-12-20",
        endDate: "1990-01-31",
        description: "Operation Just Cause was the U.S. invasion of Panama to depose dictator Manuel Noriega. The operation aimed to protect American lives, defend democracy, combat drug trafficking, and protect the integrity of the Panama Canal treaties.",
        casualties: { us: 23, total: 516 },
        outcome: "U.S. victory; Noriega captured and extradited",
        wikiLink: "https://en.wikipedia.org/wiki/United_States_invasion_of_Panama"
    },
    {
        id: "gulf-war",
        name: "Gulf War (Desert Storm)",
        countries: ["IQ", "KW"],
        startDate: "1990-08-02",
        endDate: "1991-02-28",
        description: "The Gulf War was waged by a UN-authorized coalition force from 35 nations led by the United States against Iraq in response to Iraq's invasion and annexation of Kuwait. It was a decisive military victory that liberated Kuwait.",
        casualties: { us: 294, total: 35000 },
        outcome: "Coalition victory; Kuwait liberated",
        wikiLink: "https://en.wikipedia.org/wiki/Gulf_War"
    },
    {
        id: "somalia",
        name: "Somali Civil War Intervention",
        countries: ["SO"],
        startDate: "1992-12-09",
        endDate: "1995-03-03",
        description: "Operation Restore Hope was a U.S.-led humanitarian intervention in Somalia. The mission aimed to create a secure environment for humanitarian operations during the Somali Civil War. It included the Battle of Mogadishu depicted in 'Black Hawk Down'.",
        casualties: { us: 43, total: 1500 },
        outcome: "U.S. withdrawal; Humanitarian goals partially achieved",
        wikiLink: "https://en.wikipedia.org/wiki/Battle_of_Mogadishu_(1993)"
    },
    {
        id: "bosnia",
        name: "Bosnian War Intervention",
        countries: ["BA", "HR", "RS"],
        startDate: "1994-02-28",
        endDate: "1995-12-20",
        description: "U.S. involvement in the Bosnian War included NATO airstrikes (Operation Deliberate Force) and peacekeeping operations. The intervention helped end the war and led to the Dayton Agreement that established peace in Bosnia and Herzegovina.",
        casualties: { us: 12, total: 100000 },
        outcome: "Dayton Agreement; End of Bosnian War",
        wikiLink: "https://en.wikipedia.org/wiki/Operation_Deliberate_Force"
    },
    {
        id: "kosovo",
        name: "Kosovo War",
        countries: ["XK", "RS"],
        startDate: "1998-02-28",
        endDate: "1999-06-11",
        description: "NATO's intervention in Kosovo included a 78-day bombing campaign against Yugoslavia. The operation was conducted without UN Security Council authorization to stop ethnic cleansing of Albanians by Serbian forces.",
        casualties: { us: 2, total: 13500 },
        outcome: "NATO victory; Kosovo placed under UN administration",
        wikiLink: "https://en.wikipedia.org/wiki/NATO_bombing_of_Yugoslavia"
    },
    {
        id: "afghanistan",
        name: "War in Afghanistan",
        countries: ["AF", "PK"],
        startDate: "2001-10-07",
        endDate: "2021-08-30",
        description: "The War in Afghanistan was the longest war in U.S. history, lasting nearly 20 years. It began as a response to the September 11 attacks, targeting al-Qaeda and the Taliban regime that harbored them. The war ended with the Taliban returning to power.",
        casualties: { us: 2461, total: 176000 },
        outcome: "Taliban victory; U.S. withdrawal",
        wikiLink: "https://en.wikipedia.org/wiki/War_in_Afghanistan_(2001%E2%80%932021)"
    },
    {
        id: "iraq-war",
        name: "Iraq War",
        countries: ["IQ"],
        startDate: "2003-03-20",
        endDate: "2011-12-15",
        description: "The Iraq War began with the U.S.-led invasion to overthrow Saddam Hussein's government, based on disputed claims of weapons of mass destruction. The conflict led to years of insurgency, sectarian violence, and ultimately the rise of ISIS.",
        casualties: { us: 4497, total: 600000 },
        outcome: "Hussein overthrown; Prolonged insurgency",
        wikiLink: "https://en.wikipedia.org/wiki/Iraq_War"
    },
    {
        id: "libya",
        name: "Libyan Civil War Intervention",
        countries: ["LY"],
        startDate: "2011-03-19",
        endDate: "2011-10-31",
        description: "Operation Odyssey Dawn was the U.S. contribution to the NATO-led military intervention in Libya during the First Libyan Civil War. The operation enforced UN Security Council Resolution 1973 and led to the overthrow of Muammar Gaddafi.",
        casualties: { us: 0, total: 30000 },
        outcome: "Rebel victory; Gaddafi killed",
        wikiLink: "https://en.wikipedia.org/wiki/2011_military_intervention_in_Libya"
    },
    {
        id: "syria-isis",
        name: "Military Intervention Against ISIS",
        countries: ["SY", "IQ"],
        startDate: "2014-09-22",
        endDate: "2025-01-01",
        description: "The American-led intervention in Syria and Iraq began as a military campaign against the Islamic State (ISIS). Operations included airstrikes, special forces operations, and support for local ground forces to combat ISIS territorial control.",
        casualties: { us: 93, total: 30000 },
        outcome: "ISIS territorial defeat; Ongoing operations",
        wikiLink: "https://en.wikipedia.org/wiki/American-led_intervention_in_Syria"
    }
];

const presidents = [
    {
        name: "William McKinley",
        start: "1897-03-04",
        end: "1901-09-14",
        party: "Republican",
    },
    {
        name: "Theodore Roosevelt",
        start: "1901-09-14",
        end: "1909-03-04",
        party: "Republican",
    },
    {
        name: "William Howard Taft",
        start: "1909-03-04",
        end: "1913-03-04",
        party: "Republican",
    },
    {
        name: "Woodrow Wilson",
        start: "1913-03-04",
        end: "1921-03-04",
        party: "Democratic",
    },
    {
        name: "Warren G. Harding",
        start: "1921-03-04",
        end: "1923-08-02",
        party: "Republican",
    },
    {
        name: "Calvin Coolidge",
        start: "1923-08-02",
        end: "1929-03-04",
        party: "Republican",
    },
    {
        name: "Herbert Hoover",
        start: "1929-03-04",
        end: "1933-03-04",
        party: "Republican",
    },
    {
        name: "Franklin D. Roosevelt",
        start: "1933-03-04",
        end: "1945-04-12",
        party: "Democratic",
    },
    {
        name: "Harry S. Truman",
        start: "1945-04-12",
        end: "1953-01-20",
        party: "Democratic",
    },
    {
        name: "Dwight D. Eisenhower",
        start: "1953-01-20",
        end: "1961-01-20",
        party: "Republican",
    },
    {
        name: "John F. Kennedy",
        start: "1961-01-20",
        end: "1963-11-22",
        party: "Democratic",
    },
    {
        name: "Lyndon B. Johnson",
        start: "1963-11-22",
        end: "1969-01-20",
        party: "Democratic",
    },
    {
        name: "Richard Nixon",
        start: "1969-01-20",
        end: "1974-08-09",
        party: "Republican",
    },
    {
        name: "Gerald Ford",
        start: "1974-08-09",
        end: "1977-01-20",
        party: "Republican",
    },
    {
        name: "Jimmy Carter",
        start: "1977-01-20",
        end: "1981-01-20",
        party: "Democratic",
    },
    {
        name: "Ronald Reagan",
        start: "1981-01-20",
        end: "1989-01-20",
        party: "Republican",
    },
    {
        name: "George H. W. Bush",
        start: "1989-01-20",
        end: "1993-01-20",
        party: "Republican",
    },
    {
        name: "Bill Clinton",
        start: "1993-01-20",
        end: "2001-01-20",
        party: "Democratic",
    },
    {
        name: "George W. Bush",
        start: "2001-01-20",
        end: "2009-01-20",
        party: "Republican",
    },
    {
        name: "Barack Obama",
        start: "2009-01-20",
        end: "2017-01-20",
        party: "Democratic",
    },
    {
        name: "Donald Trump",
        start: "2017-01-20",
        end: "2021-01-20",
        party: "Republican",
    },
    {
        name: "Joe Biden",
        start: "2021-01-20",
        end: "2025-01-20",
        party: "Democratic",
    },
    {
        name: "Donald Trump",
        start: "2025-01-20",
        end: "2029-01-20",
        party: "Republican",
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
    "CU": "Cuba",
    "DE": "Germany",
    "DO": "Dominican Republic",
    "EG": "Egypt",
    "FR": "France",
    "GB": "United Kingdom",
    "GD": "Grenada",
    "HR": "Croatia",
    "HN": "Honduras",
    "HT": "Haiti",
    "IQ": "Iraq",
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
    "RS": "Serbia",
    "RU": "Russia",
    "SO": "Somalia",
    "SY": "Syria",
    "TN": "Tunisia",
    "VN": "Vietnam",
    "XK": "Kosovo"
};

// Helper function to get country name from ISO code
function getCountryName(isoCode) {
    return countryNames[isoCode] || isoCode;
}

export const screenerDetailTableData = [
    {
        id: 1,
        companyName: "Enfuse Solution Ltd.",
        marketCapInCr: 2297,
        ttmPe: 15,
        slug: "/bcd",
        dateOfInformation: "Feb 12, 2024"
    },
    {
        id: 2,
        companyName: "Acme Corporation",
        marketCapInCr: 500,
        ttmPe: 20,
        slug: "/acm",
        dateOfInformation: "Apr 16, 2024"
    },
    {
        id: 3,
        companyName: "Beta Innovations Inc.",
        marketCapInCr: 750,
        ttmPe: 18,
        slug: "/bii",
        dateOfInformation: "Apr 17, 2024"
    },
    {
        id: 4,
        companyName: "Delta Dynamics",
        marketCapInCr: 1200,
        ttmPe: 25,
        slug: "/ddc",
        dateOfInformation: "Apr 18, 2024"
    },
    {
        id: 5,
        companyName: "Gamma Global",
        marketCapInCr: 1800,
        ttmPe: 30,
        slug: "/ggl",
        dateOfInformation: "Apr 15, 2024"
    },
    {
        id: 6,
        companyName: "Epsilon Enterprises",
        marketCapInCr: 900,
        ttmPe: 22,
        slug: "/eep",
        dateOfInformation: "Apr 14, 2024"
    },
    {
        id: 7,
        companyName: "Zeta Solutions",
        marketCapInCr: 650,
        ttmPe: 17,
        slug: "/zts",
        dateOfInformation: "Apr 13, 2024"
    },
    {
        id: 8,
        companyName: "Theta Technologies",
        marketCapInCr: 1100,
        ttmPe: 28,
        slug: "/tth",
        dateOfInformation: "Apr 12, 2024"
    },
    {
        id: 9,
        companyName: "Iota Industries",
        marketCapInCr: 1500,
        ttmPe: 32,
        slug: "/iin",
        dateOfInformation: "Apr 11, 2024"
    },
    {
        id: 10,
        companyName: "Kappa Corporation",
        marketCapInCr: 850,
        ttmPe: 19,
        slug: "/kpc",
        dateOfInformation: "Apr 10, 2024"
    },
    {
        id: 11,
        companyName: "Lambda Limited",
        marketCapInCr: 2000,
        ttmPe: 35,
        slug: "/lld",
        dateOfInformation: "Apr 9, 2024"
    },
    {
        id: 12,
        companyName: "Mu Manufacturing",
        marketCapInCr: 950,
        ttmPe: 21,
        slug: "/mum",
        dateOfInformation: "Apr 8, 2024"
    },
    {
        id: 13,
        companyName: "Nu Networks",
        marketCapInCr: 1300,
        ttmPe: 27,
        slug: "/nnt",
        dateOfInformation: "Apr 7, 2024"
    },
    {
        id: 14,
        companyName: "Xi Xolutions",
        marketCapInCr: 700,
        ttmPe: 16,
        slug: "/xxt",
        dateOfInformation: "Apr 6, 2024"
    },
    {
        id: 15,
        companyName: "Omicron Organization",
        marketCapInCr: 1700,
        ttmPe: 31,
        slug: "/omo",
        dateOfInformation: "Apr 5, 2024"
    },
    {
        id: 16,
        companyName: "Pi Products",
        marketCapInCr: 600,
        ttmPe: 14,
        slug: "/pip",
        dateOfInformation: "Apr 4, 2024"
    },
    {
        id: 17,
        companyName: "Rho Resources",
        marketCapInCr: 1400,
        ttmPe: 26,
        slug: "/ror",
        dateOfInformation: "Apr 3, 2024"
    },
    {
        id: 18,
        companyName: "Sigma Solutions",
        marketCapInCr: 800,
        ttmPe: 18,
        slug: "/sis",
        dateOfInformation: "Apr 2, 2024"
    },
    {
        id: 19,
        companyName: "Tau Technologies",
        marketCapInCr: 1600,
        ttmPe: 33,
        slug: "/tat",
        dateOfInformation: "Apr 1, 2024"
    },
    {
        id: 20,
        companyName: "Upsilon United",
        marketCapInCr: 1000,
        ttmPe: 23,
        slug: "/uun",
        dateOfInformation: "Mar 31, 2024"
    },
    {
        id: 21,
        companyName: "Phi Pharmaceuticals",
        marketCapInCr: 1900,
        ttmPe: 34,
        slug: "/php",
        dateOfInformation: "Mar 30, 2024"
    }
]

export const screenerDetailTableHeading = [
    {
        id: 1,
        heading: "screenerIdPage.companyName"
    },
    {
        id: 2,
        heading: "screenerIdPage.marketCapInCrore"
    },
    ,
    {
        id: 3,
        heading: "screenerIdPage.ttmPe"
    },
    {
        id: 4,
        heading: "screenerIdPage.dateOfInformation"
    },


]


export const filterData = [
    {
        id: 1,
        heading: "screenerIdPage.typeOfSme",
        typeValue: "typeOfSme",
        typesArr: [
            {
                id: 1,
                label: "screenerIdPage.sme",
                type: "sme",
                status: true,
            },
            {
                id: 2,
                label: "screenerIdPage.nonSme",
                type: "Non SME",
                status: false,

            }
        ]

    },
    {
        id: 2,
        heading: "screenerIdPage.pe",
        typeValue: "pe",
        typesArr: [
            {
                id: 1,
                label: "screenerIdPage.lessThan40",
                type: "lessThan40",
                status: false,

            },
            {
                id: 2,
                label: "screenerIdPage.greaterThan40",
                type: "greaterThan40",
                status: false,

            }
        ]

    },
    {
        id: 3,
        heading: "screenerIdPage.marketCap",
        typeValue: "marketCap",
        typesArr: [
            {
                id: 1,
                label: "screenerIdPage.lessThan500Cr",
                type: "lessThan500cr",
                status: false,

            },
            {
                id: 2,
                label: "screenerIdPage.greaterThan500Cr",
                type: "greaterThan500Cr",
                status: false,

            }
        ]

    }
]
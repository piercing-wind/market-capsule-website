import Bulb from "@/components/svg/Bulb";
import NewsPaperOpen from "@/components/svg/NewsPaperOpen";
import moment from 'moment';

export const trandingNewsDataObj = {
    headingLogo: <NewsPaperOpen />,
    headingLabel: "homepage.rightSection.trandingNewsHeading",
    trandingNewsArr: [
        {
            id: 1,
            img: "/assests/homepage/tranding-person-img.png",
            para: "Company to demerge its business into CV and PV ",
            source: "Business Standard"
        },
        {
            id: 2,
            img: "/assests/homepage/tranding-person-img.png",
            para: "Bank of Baroda shares hit record high as market stages a stellar rally ",
            source: "Business Standard"

        },
        {
            id: 3,
            img: "/assests/homepage/tranding-person-img.png",
            para: "Bharti Airtel shares rebound 58% from 52-week low; more upside ahead? ",
            source: "Business Standard"

        }, {
            id: 4,
            img: "/assests/homepage/tranding-person-img.png",
            para: "Bharti Airtel shares rebound 58% from 52-week low; more upside ahead? ",
            source: "Business Standard"

        }, {
            id: 5,
            img: "/assests/homepage/tranding-person-img.png",
            para: "Hindalco Industries shares: Motilal Oswal reiterates buy call, stock trading lower ",
            source: "Business Standard"

        },

    ]
}

export const caseStudyDataObj = {
    headingLogo: <Bulb />,
    headingLabel: "homepage.rightSection.whatNewInCapsulePlus",
    trandingNewsArr: [
        {
            id: 1,
            img: "/assests/homepage/recent-case-img.png",
            para: "Case study on India's last minute app"
        },
        {
            id: 2,
            img: "/assests/homepage/recent-case-img.png",
            para: "redBus Business Model - How Does redBus Make Money?"
        },
        {
            id: 3,
            img: "/assests/homepage/recent-case-img.png",
            para: "Why ShopClues Failed?Downfall of the Once Unicorn Startup in India"
        }, {
            id: 4,
            img: "/assests/homepage/recent-case-img.png",
            para: "McDonald's Corporation: The World's Leading FFC"
        }, {
            id: 5,
            img: "/assests/homepage/recent-case-img.png",
            para: "FMCG Giant Hindustan Unilever Limited (HUL) Case Study"
        },

    ]
}



export const midleSectionArr = [
    {
        id: 1,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 2,
        img: "/assests/homepage/midle-chart-img.png",
        type: "capsulePlus",
        para: "Case study on India's last minute app: Success Story from Grofers to Blinkit",
        capsulePlus: true
    },
    {
        id: 3,
        img: "/assests/homepage/midle-chart-img.png",
        type: "ipo",
        para: "Uber CEO Dara Khosrowshahi highlights challenges in India",
        capsulePlus: false
    },
    {
        id: 4,
        img: "/assests/homepage/midle-chart-img.png",
        type: "ipo",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 5,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Uber CEO Dara Khosrowshahi highlights challenges in India",
        capsulePlus: false
    },
    {
        id: 6,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 7,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 8,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 9,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 10,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 11,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 12,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 13,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 14,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },
    {
        id: 15,
        img: "/assests/homepage/midle-chart-img.png",
        type: "screener",
        para: "Investment Ideas you can use in 2024",
        capsulePlus: false
    },

]


export const topGainerArr = [
    {
        id: 1,
        companyName: "ALL CARGO",
        topGainerNumber: 6.61
    },
    {
        id: 2,
        companyName: "SONACOMS",
        topGainerNumber: 5.61
    },
    {
        id: 3,
        companyName: "MANKIND",
        topGainerNumber: 4.61
    },
    {
        id: 4,
        companyName: "INTELLECT",
        topGainerNumber: 3.61
    },
    {
        id: 5,
        companyName: "RAYMOND",
        topGainerNumber: 3.34
    },
    {
        id: 6,
        companyName: "MAXHEALTH",
        topGainerNumber: 2.61
    },
    {
        id: 7,
        companyName: "NETWORK18",
        topGainerNumber: 2.00
    }


]

export const sensexChartData = [{
    id: 1,
    date: moment().subtract(9, "days").format(),
    value: 10
},
{
    id: 2,
    date: moment().subtract(8, "days").format(),
    value: 5
},
{
    id: 3,
    date: moment().subtract(7, "days").format(),
    value: 8
},
{
    id: 4,
    date: moment().subtract(6, "days").format(),
    value: 3
},
{
    id: 5,
    date: moment().subtract(5, "days").format(),
    value: 13
},
{
    id: 6,
    date: moment().subtract(4, "days").format(),
    value: 9
},
{
    id: 7,
    date: moment().subtract(3, "days").format(),
    value: 12
},
{
    id: 8,
    date: moment().subtract(2, "days").format(),
    value: 15
},
{
    id: 9,
    date: moment().subtract(1, "days").format(),
    value: 8
},
{
    id: 10,
    date: moment().subtract(0, "days").format(),
    value: 14
}

]

export const sensexChartBarData = [{
    id: 1,
    date: 21,
    value: 5
},
{
    id: 2,
    date: 22,
    value: -5
},
{
    id: 3,
    date: 23,
    value: -2
},
{
    id: 4,
    date: 24,
    value: -3
},
{
    id: 5,
    date: 25,
    value: 8
},
{
    id: 6,
    date: 26,
    value: -1
},
{
    id: 7,
    date: 27,
    value: 6
},
{
    id: 8,
    date: 28,
    value: 5
},
{
    id: 9,
    date: 29,
    value: -3
},
{
    id: 10,
    date: 1,
    value: 4
}

]

export const homePageFilterModalArr = [
    {
        "id": 1,
        "attributes": {
            "name": "All",
            "slug": "all1771",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFF8B7"
                    }
                }
            }
        }
    },
    {
        "id": 2,
        "attributes": {
            "name": "Finance",
            "slug": "retail1",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 3,
        "attributes": {
            "name": "Retail",
            "slug": "retail2",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }
        }
    },
    {
        "id": 4,
        "attributes": {
            "name": "Agriculture",
            "slug": "retail3",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#B7FDFF"
                    }
                }
            }
        }
    },
    {
        "id": 5,
        "attributes": {
            "name": "Technology",
            "slug": "retail4",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 6,
        "attributes": {
            "name": "Insurance",
            "slug": "retail5",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }
        }
    },
    {
        "id": 7,
        "attributes": {
            "name": "Real Estate",
            "slug": "retail6",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFF8B7"
                    }
                }
            }
        }
    },
    {
        "id": 8,
        "attributes": {
            "name": "Hospitality and Tourism",
            "slug": "retail7",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#B7FDFF"
                    }
                }
            }
        }
    },
    {
        "id": 9,
        "attributes": {
            "name": "Consulting",
            "slug": "retail8",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 10,
        "attributes": {
            "name": "Legal",
            "slug": "retail9",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }
        }
    },
    {
        "id": 11,
        "attributes": {
            "name": "Marketing and Advertising",
            "slug": "retail10",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFF8B7"
                    }
                }
            }
        }
    },
    {
        "id": 12,
        "attributes": {
            "name": "Telecommunications",
            "slug": "retail11",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#B7FDFF"
                    }
                }
            }
        }
    },
    {
        "id": 13,
        "attributes": {
            "name": "Manufacturing and Production",
            "slug": "retail12",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 14,
        "attributes": {
            "name": "Logistics",
            "slug": "retail13",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }
        }
    },
    {
        "id": 15,
        "attributes": {
            "name": "Healthcare",
            "slug": "retail14",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFF8B7"
                    }
                }
            }
        }
    },
    {
        "id": 16,
        "attributes": {
            "name": "Education",
            "slug": "retail15",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#B7FDFF"
                    }
                }
            }
        }
    },
    {
        "id": 17,
        "attributes": {
            "name": "Human Resources",
            "slug": "retail16",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 18,
        "attributes": {
            "name": "E-commerce",
            "slug": "retail17",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }
        }
    },
    {
        "id": 19,
        "attributes": {
            "name": "Energy and Utilities",
            "slug": "retail18",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFF8B7"
                    }
                }
            }
        }
    },
    {
        "id": 20,
        "attributes": {
            "name": "Entertainment and Media",
            "slug": "retail19",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#B7FDFF"
                    }
                }
            }
        }
    },
    {
        "id": 21,
        "attributes": {
            "name": "Food and Beverage",
            "slug": "retail20",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#C8FFB7"
                    }
                }
            }
        }
    },
    {
        "id": 22,
        "attributes": {
            "name": "Startups",
            "slug": "retail21",
            "tag": {
                "data": {
                    "id": 2,
                    "attributes": {
                        "name": "#FFE0B7"
                    }
                }
            }


        }
    }
]


export const searchBarCompanyList = [
    {
        id: 1,
        companyName: "ADC India Communications Ltd.",
        industry: "Equipment & Accessories",
        sector: "Telecommunication",
    },
    {
        "id": 2,
        "companyName": "XYZ Telecommunications",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 3,
        "companyName": "GlobalCom Technologies",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 4,
        "companyName": "WaveLink Solutions",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 5,
        "companyName": "TeleConnect Innovations",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 6,
        "companyName": "TechCom Telecom",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 7,
        "companyName": "Wireless Wave",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 8,
        "companyName": "TeleNova Systems",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 9,
        "companyName": "Linkage Communications",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 10,
        "companyName": "ConnectEdge Technologies",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    },
    {
        "id": 11,
        "companyName": "NexGen Telecom",
        "industry": "Equipment & Accessories",
        "sector": "Telecommunication"
    }
]

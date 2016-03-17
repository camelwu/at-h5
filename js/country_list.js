/*国籍选择*/
var arrCountry= [{"CountryEN":"Angola",
    "CountryName":"安哥拉",
    "CountryCode":"AO",
    "TelCode":244
},
    {"CountryEN":"Afghanistan",
        "CountryName":"阿富汗",
        "CountryCode":"AF",
        "TelCode":93
    },
    {"CountryEN":"Albania",
        "CountryName":"阿尔巴尼亚",
        "CountryCode":"AL",
        "TelCode":355
    },
    {"CountryEN":"Algeria",
        "CountryName":"阿尔及利亚",
        "CountryCode":"DZ",
        "TelCode":213},
    {"CountryEN":"Andorra",
        "CountryName":"安道尔共和国",
        "CountryCode":"AD",
        "TelCode":376},
    {"CountryEN":"Anguilla",
        "CountryName":"安圭拉岛",
        "CountryCode":"AI",
        "TelCode":1264},
    {"CountryEN":"Antigua and Barbuda",
        "CountryName":"安提瓜和巴布达",
        "CountryCode":"AG",
        "TelCode":1268},
    {"CountryEN":"Argentina",
        "CountryName":"阿根廷",
        "CountryCode":"AR",
        "TelCode":54},
    {"CountryEN":"Armenia",
        "CountryName":"亚美尼亚",
        "CountryCode":"AM",
        "TelCode":374},
    {"CountryEN":"Ascension",
        "CountryName":"阿森松",
        "CountryCode":"&nbsp;",
        "TelCode":247},
    {"CountryEN":"Australia",
        "CountryName":"澳大利亚",
        "CountryCode":"AU",
        "TelCode":61},
    {"CountryEN":"Austria",
        "CountryName":"奥地利",
        "CountryCode":"AT",
        "TelCode":43},
    {"CountryEN":"Azerbaijan",
        "CountryName":"阿塞拜疆",
        "CountryCode":"AZ",
        "TelCode":994},
    {"CountryEN":"Bahamas",
        "CountryName":"巴哈马",
        "CountryCode":"BS",
        "TelCode":1242},
    {"CountryEN":"Bahrain",
        "CountryName":"巴林",
        "CountryCode":"BH",
        "TelCode":973},
    {"CountryEN":"Bangladesh",
        "CountryName":"孟加拉国",
        "CountryCode":"BD",
        "TelCode":88
    },
    {"CountryEN":"Barbados",
        "CountryName":"巴巴多斯",
        "CountryCode":"BB",
        "TelCode":1246},
    {"CountryEN":"Belarus",
        "CountryName":"白俄罗斯",
        "CountryCode":"BY",
        "TelCode":375},
    {"CountryEN":"Belgium",
        "CountryName":"比利时",
        "CountryCode":"BE",
        "TelCode":32},
    {"CountryEN":"Belize",
        "CountryName":"伯利兹",
        "CountryCode":"BZ",
        "TelCode":501},
    {"CountryEN":"Benin",
        "CountryName":"贝宁",
        "CountryCode":"BJ",
        "TelCode":229},
    {"CountryEN":"Bermuda Is.",
        "CountryName":"百慕大群岛",
        "CountryCode":"BM",
        "TelCode":1441},
    {"CountryEN":"Bolivia",
        "CountryName":"玻利维亚",
        "CountryCode":"BO",
        "TelCode":591},
    {"CountryEN":"Botswana",
        "CountryName":"博茨瓦纳",
        "CountryCode":"BW",
        "TelCode":267},
    {"CountryEN":"Brazil",
        "CountryName":"巴西",
        "CountryCode":"BR",
        "TelCode":55},
    {"CountryEN":"Brunei",
        "CountryName":"文莱",
        "CountryCode":"BN",
        "TelCode":673},
    {"CountryEN":"Bulgaria",
        "CountryName":"保加利亚",
        "CountryCode":"BG",
        "TelCode":359},
    {"CountryEN":"Burkina-faso",
        "CountryName":"布基纳法索",
        "CountryCode":"BF",
        "TelCode":226},
    {"CountryEN":"Burma",
        "CountryName":"缅甸",
        "CountryCode":"MM",
        "TelCode":95},
    {"CountryEN":"Burundi",
        "CountryName":"布隆迪",
        "CountryCode":"BI",
        "TelCode":257},
    {"CountryEN":"Cameroon",
        "CountryName":"喀麦隆",
        "CountryCode":"CM",
        "TelCode":237},
    {"CountryEN":"Canada",
        "CountryName":"加拿大",
        "CountryCode":"CA",
        "TelCode":1},
    {"CountryEN":"Cayman Is.",
        "CountryName":"开曼群岛",
        "CountryCode":"&nbsp;",
        "TelCode":1345},
    {"CountryEN":"Central African Republic",
        "CountryName":"中非共和国",
        "CountryCode":"CF",
        "TelCode":236},
    {"CountryEN":"Chad",
        "CountryName":"乍得",
        "CountryCode":"TD",
        "TelCode":235},
    {"CountryEN":"Chile",
        "CountryName":"智利",
        "CountryCode":"CL",
        "TelCode":56},
    {"CountryEN":"China",
        "CountryName":"中国",
        "CountryCode":"CN",
        "TelCode":86},
    {"CountryEN":"Colombia",
        "CountryName":"哥伦比亚",
        "CountryCode":"CO",
        "TelCode":57},
    {"CountryEN":"Congo",
        "CountryName":"刚果",
        "CountryCode":"CG",
        "TelCode":242},
    {"CountryEN":"Cook Is.",
        "CountryName":"库克群岛",
        "CountryCode":"CK",
        "TelCode":682},

    {"CountryEN":"Costa Rica",
        "CountryName":"哥斯达黎加",
        "CountryCode":"CR",
        "TelCode":506},
    {"CountryEN":"Cuba",
        "CountryName":"古巴",
        "CountryCode":"CU",
        "TelCode":53},
    {"CountryEN":"Cyprus",
        "CountryName":"塞浦路斯",
        "CountryCode":"CY",
        "TelCode":357},
    {"CountryEN":"Czech Republic ",
        "CountryName":"捷克",
        "CountryCode":"CZ",
        "TelCode":42
    },
    {"CountryEN":"Denmark",
        "CountryName":"丹麦",
        "CountryCode":"DK",
        "TelCode":45},
    {"CountryEN":"Djibouti",
        "CountryName":"吉布提",
        "CountryCode":"DJ",
        "TelCode":253},
    {"CountryEN":"Dominica Rep.",
        "CountryName":"多米尼加共和国",
        "CountryCode":"DO",
        "TelCode":189
    },
    {"CountryEN":"Ecuador",
        "CountryName":"厄瓜多尔",
        "CountryCode":"EC",
        "TelCode":593},
    {"CountryEN":"Egypt",
        "CountryName":"埃及",
        "CountryCode":"EG",
        "TelCode":2
    },
    {"CountryEN":"EI Salvador",
        "CountryName":"萨尔瓦多",
        "CountryCode":"SV",
        "TelCode":503},
    {"CountryEN":"Estonia",
        "CountryName":"爱沙尼亚",
        "CountryCode":"EE",
        "TelCode":372},
    {"CountryEN":"Ethiopia",
        "CountryName":"埃塞俄比亚",
        "CountryCode":"ET",
        "TelCode":251},
    {"CountryEN":"Fiji",
        "CountryName":"斐济",
        "CountryCode":"FJ",
        "TelCode":679},
    {"CountryEN":"Finland",
        "CountryName":"芬兰",
        "CountryCode":"FI",
        "TelCode":358},

    {"CountryEN":"France",
        "CountryName":"法国",
        "CountryCode":"FR",
        "TelCode":33},
    {"CountryEN":"French Guiana",
        "CountryName":"法属圭亚那",
        "CountryCode":"GF",
        "TelCode":594},
    {"CountryEN":"Gabon",
        "CountryName":"加蓬",
        "CountryCode":"GA",
        "TelCode":241},
    {"CountryEN":"Gambia",
        "CountryName":"冈比亚",
        "CountryCode":"GM",
        "TelCode":22
    },
    {"CountryEN":"Georgia ",
        "CountryName":"格鲁吉亚",
        "CountryCode":"GE",
        "TelCode":995},
    {"CountryEN":"Germany ",
        "CountryName":"德国",
        "CountryCode":"DE",
        "TelCode":49},
    {"CountryEN":"Ghana",
        "CountryName":"加纳",
        "CountryCode":"GH",
        "TelCode":233},
    {"CountryEN":"Gibraltar",
        "CountryName":"直布罗陀",
        "CountryCode":"GI",
        "TelCode":35
    },
    {"CountryEN":"Greece",
        "CountryName":"希腊",
        "CountryCode":"GR",
        "TelCode":3
    },
    {"CountryEN":"Grenada",
        "CountryName":"格林纳达",
        "CountryCode":"GD",
        "TelCode":1809},
    {"CountryEN":"Guam",
        "CountryName":"关岛",
        "CountryCode":"GU",
        "TelCode":1671},
    {"CountryEN":"Guatemala",
        "CountryName":"危地马拉",
        "CountryCode":"GT",
        "TelCode":502},
    {"CountryEN":"Guinea",
        "CountryName":"几内亚",
        "CountryCode":"GN",
        "TelCode":224},
    {"CountryEN":"Guyana",
        "CountryName":"圭亚那",
        "CountryCode":"GY",
        "TelCode":592},
    {"CountryEN":"Haiti",
        "CountryName":"海地",
        "CountryCode":"HT",
        "TelCode":509},
    {"CountryEN":"Honduras",
        "CountryName":"洪都拉斯",
        "CountryCode":"HN",
        "TelCode":504},
    {"CountryEN":"Hongkong",
        "CountryName":"香港",
        "CountryCode":"HK",
        "TelCode":852},
    {"CountryEN":"Hungary",
        "CountryName":"匈牙利",
        "CountryCode":"HU",
        "TelCode":36},
    {"CountryEN":"Iceland",
        "CountryName":"冰岛",
        "CountryCode":"IS",
        "TelCode":354},

    {"CountryEN":"India",
        "CountryName":"印度",
        "CountryCode":"IN",
        "TelCode":91},

    {"CountryEN":"Indonesia",
        "CountryName":"印度尼西亚",
        "CountryCode":"ID",
        "TelCode":62},

    {"CountryEN":"Iran",
        "CountryName":"伊朗",
        "CountryCode":"IR",
        "TelCode":98},

    {"CountryEN":"Iraq",
        "CountryName":"伊拉克",
        "CountryCode":"IQ",
        "TelCode":964},
    {"CountryEN":"Ireland",
        "CountryName":"爱尔兰",
        "CountryCode":"IE",
        "TelCode":353},

    {"CountryEN":"Israel",
        "CountryName":"以色列",
        "CountryCode":"IL",
        "TelCode":972},
    {"CountryEN":"Italy",
        "CountryName":"意大利",
        "CountryCode":"IT",
        "TelCode":39},
    {"CountryEN":"Ivory Coast",
        "CountryName":"科特迪瓦",
        "CountryCode":"&nbsp;",
        "TelCode":225},
    {"CountryEN":"Jamaica",
        "CountryName":"牙买加",
        "CountryCode":"JM",
        "TelCode":1876},
    {"CountryEN":"Japan",
        "CountryName":"日本",
        "CountryCode":"JP",
        "TelCode":81},
    {"CountryEN":"Jordan",
        "CountryName":"约旦",
        "CountryCode":"JO",
        "TelCode":962},
    {"CountryEN":"Kampuchea (Cambodia )",
        "CountryName":"柬埔寨",
        "CountryCode":"KH",
        "TelCode":855},
    {"CountryEN":"Kazakstan",
        "CountryName":"哈萨克斯坦",
        "CountryCode":"KZ",
        "TelCode":327},
    {"CountryEN":"Kenya",
        "CountryName":"肯尼亚",
        "CountryCode":"KE",
        "TelCode":254},
    {"CountryEN":"Korea",
        "CountryName":"韩国",
        "CountryCode":"KR",
        "TelCode":82},
    {"CountryEN":"Kuwait",
        "CountryName":"科威特",
        "CountryCode":"KW",
        "TelCode":965},
    {"CountryEN":"Kyrgyzstan ",
        "CountryName":"吉尔吉斯坦",
        "CountryCode":"KG",
        "TelCode":331},
    {"CountryEN":"Laos",
        "CountryName":"老挝",
        "CountryCode":"LA",
        "TelCode":856},
    {"CountryEN":"Latvia ",
        "CountryName":"拉脱维亚",
        "CountryCode":"LV",
        "TelCode":371},
    {"CountryEN":"Lebanon",
        "CountryName":"黎巴嫩",
        "CountryCode":"LB",
        "TelCode":961},
    {"CountryEN":"Lesotho",
        "CountryName":"莱索托",
        "CountryCode":"LS",
        "TelCode":266},
    {"CountryEN":"Liberia",
        "CountryName":"利比里亚",
        "CountryCode":"LR",
        "TelCode":231},
    {"CountryEN":"Libya",
        "CountryName":"利比亚",
        "CountryCode":"LY",
        "TelCode":218},
    {"CountryEN":"Liechtenstein",
        "CountryName":"列支敦士登",
        "CountryCode":"LI",
        "TelCode":423},
    {"CountryEN":"Lithuania",
        "CountryName":"立陶宛",
        "CountryCode":"LT",
        "TelCode":37
    },
    {"CountryEN":"Luxembourg",
        "CountryName":"卢森堡",
        "CountryCode":"LU",
        "TelCode":352},
    {"CountryEN":"Macao",
        "CountryName":"澳门",
        "CountryCode":"MO",
        "TelCode":853},
    {"CountryEN":"Madagascar",
        "CountryName":"马达加斯加",
        "CountryCode":"MG",
        "TelCode":261},
    {"CountryEN":"Malawi",
        "CountryName":"马拉维",
        "CountryCode":"MW",
        "TelCode":265},
    {"CountryEN":"Malaysia",
        "CountryName":"马来西亚",
        "CountryCode":"MY",
        "TelCode":6
    },

    {"CountryEN":"Maldives",
        "CountryName":"马尔代夫",
        "CountryCode":"MV",
        "TelCode":96
    },
    {"CountryEN":"Mali",
        "CountryName":"马里",
        "CountryCode":"ML",
        "TelCode":223},
    {"CountryEN":"Malta",
        "CountryName":"马耳他",
        "CountryCode":"MT",
        "TelCode":356},
    {"CountryEN":"Mariana Is",
        "CountryName":"马里亚那群岛",
        "CountryCode":"&nbsp;",
        "TelCode":167
    },
    {"CountryEN":"Martinique",
        "CountryName":"马提尼克",
        "CountryCode":"&nbsp;",
        "TelCode":596},
    {"CountryEN":"Mauritius",
        "CountryName":"毛里求斯",
        "CountryCode":"MU",
        "TelCode":23
    },
    {"CountryEN":"Mexico",
        "CountryName":"墨西哥",
        "CountryCode":"MX",
        "TelCode":52},

    {"CountryEN":"Moldova Republic of ",
        "CountryName":"摩尔多瓦",
        "CountryCode":"MD",
        "TelCode":373},
    {"CountryEN":"Monaco",
        "CountryName":"摩纳哥",
        "CountryCode":"MC",
        "TelCode":377},
    {"CountryEN":"Mongolia ",
        "CountryName":"蒙古",
        "CountryCode":"MN",
        "TelCode":976},
    {"CountryEN":"Montserrat Is",
        "CountryName":"蒙特塞拉特岛",
        "CountryCode":"MS",
        "TelCode":1664},
    {"CountryEN":"Morocco",
        "CountryName":"摩洛哥",
        "CountryCode":"MA",
        "TelCode":212},
    {"CountryEN":"Mozambique",
        "CountryName":"莫桑比克",
        "CountryCode":"MZ",
        "TelCode":258},
    {"CountryEN":"Namibia ",
        "CountryName":"纳米比亚",
        "CountryCode":"NA",
        "TelCode":264},
    {"CountryEN":"Nauru",
        "CountryName":"瑙鲁",
        "CountryCode":"NR",
        "TelCode":674},
    {"CountryEN":"Nepal",
        "CountryName":"尼泊尔",
        "CountryCode":"NP",
        "TelCode":977},

    {"CountryEN":"Netheriands Antilles",
        "CountryName":"荷属安的列斯",
        "CountryCode":"&nbsp;",
        "TelCode":599},
    {"CountryEN":"Netherlands",
        "CountryName":"荷兰",
        "CountryCode":"NL",
        "TelCode":31},
    {"CountryEN":"New Zealand",
        "CountryName":"新西兰",
        "CountryCode":"NZ",
        "TelCode":64},
    {"CountryEN":"Nicaragua",
        "CountryName":"尼加拉瓜",
        "CountryCode":"NI",
        "TelCode":505},
    {"CountryEN":"Niger",
        "CountryName":"尼日尔",
        "CountryCode":"NE",
        "TelCode":227},
    {"CountryEN":"Nigeria",
        "CountryName":"尼日利亚",
        "CountryCode":"NG",
        "TelCode":234},
    {"CountryEN":"North Korea",
        "CountryName":"朝鲜",
        "CountryCode":"KP",
        "TelCode":85
    },
    {"CountryEN":"Norway",
        "CountryName":"挪威",
        "CountryCode":"NO",
        "TelCode":47},
    {"CountryEN":"Oman",
        "CountryName":"阿曼",
        "CountryCode":"OM",
        "TelCode":968},
    {"CountryEN":"Pakistan",
        "CountryName":"巴基斯坦",
        "CountryCode":"PK",
        "TelCode":92},

    {"CountryEN":"Panama",
        "CountryName":"巴拿马",
        "CountryCode":"PA",
        "TelCode":507},
    {"CountryEN":"Papua New Cuinea",
        "CountryName":"巴布亚新几内亚",
        "CountryCode":"PG",
        "TelCode":675},
    {"CountryEN":"Paraguay",
        "CountryName":"巴拉圭",
        "CountryCode":"PY",
        "TelCode":595},
    {"CountryEN":"Peru",
        "CountryName":"秘鲁",
        "CountryCode":"PE",
        "TelCode":51},
    {"CountryEN":"Philippines",
        "CountryName":"菲律宾",
        "CountryCode":"PH",
        "TelCode":63},
    {"CountryEN":"Poland",
        "CountryName":"波兰",
        "CountryCode":"PL",
        "TelCode":48},
    {"CountryEN":"French Polynesia",
        "CountryName":"法属玻利尼西亚",
        "CountryCode":"PF",
        "TelCode":689},
    {"CountryEN":"Portugal",
        "CountryName":"葡萄牙",
        "CountryCode":"PT",
        "TelCode":351},
    {"CountryEN":"Puerto Rico",
        "CountryName":"波多黎各",
        "CountryCode":"PR",
        "TelCode":1787},
    {"CountryEN":"Qatar",
        "CountryName":"卡塔尔",
        "CountryCode":"QA",
        "TelCode":974},
    {"CountryEN":"Reunion",
        "CountryName":"留尼旺",
        "CountryCode":"&nbsp;",
        "TelCode":262},
    {"CountryEN":"Romania",
        "CountryName":"罗马尼亚",
        "CountryCode":"RO",
        "TelCode":4
    },
    {"CountryEN":"Russia",
        "CountryName":"俄罗斯",
        "CountryCode":"RU",
        "TelCode":7},
    {"CountryEN":"Saint Lueia",
        "CountryName":"圣卢西亚",
        "CountryCode":"LC",
        "TelCode":1758},
    {"CountryEN":"Saint Vincent",
        "CountryName":"圣文森特岛",
        "CountryCode":"VC",
        "TelCode":1784},
    {"CountryEN":"Samoa Eastern",
        "CountryName":"东萨摩亚(美)",
        "CountryCode":"&nbsp;",
        "TelCode":684},

    {"CountryEN":"Samoa Western",
        "CountryName":"西萨摩亚",
        "CountryCode":"&nbsp;",
        "TelCode":685},

    {"CountryEN":"San Marino",
        "CountryName":"圣马力诺",
        "CountryCode":"SM",
        "TelCode":378},
    {"CountryEN":"Sao Tome and Principe",
        "CountryName":"圣多美和普林西比",
        "CountryCode":"ST",
        "TelCode":239},
    {"CountryEN":"Saudi Arabia",
        "CountryName":"沙特阿拉伯",
        "CountryCode":"SA",
        "TelCode":966},
    {"CountryEN":"Senegal",
        "CountryName":"塞内加尔",
        "CountryCode":"SN",
        "TelCode":221},
    {"CountryEN":"Seychelles",
        "CountryName":"塞舌尔",
        "CountryCode":"SC",
        "TelCode":248},
    {"CountryEN":"Sierra Leone",
        "CountryName":"塞拉利昂",
        "CountryCode":"SL",
        "TelCode":232},
    {"CountryEN":"Singapore",
        "CountryName":"新加坡",
        "CountryCode":"SG",
        "TelCode":65},

    {"CountryEN":"Slovakia",
        "CountryName":"斯洛伐克",
        "CountryCode":"SK",
        "TelCode":421},
    {"CountryEN":"Slovenia",
        "CountryName":"斯洛文尼亚",
        "CountryCode":"SI",
        "TelCode":386},
    {"CountryEN":"Solomon Is",
        "CountryName":"所罗门群岛",
        "CountryCode":"SB",
        "TelCode":677},
    {"CountryEN":"Somali",
        "CountryName":"索马里",
        "CountryCode":"SO",
        "TelCode":252},
    {"CountryEN":"South Africa",
        "CountryName":"南非",
        "CountryCode":"ZA",
        "TelCode":27},
    {"CountryEN":"Spain",
        "CountryName":"西班牙",
        "CountryCode":"ES",
        "TelCode":34},
    {"CountryEN":"Sri Lanka",
        "CountryName":"斯里兰卡",
        "CountryCode":"LK",
        "TelCode":94},
    {"CountryEN":"St.Lucia",
        "CountryName":"圣卢西亚",
        "CountryCode":"LC",
        "TelCode":1758},
    {"CountryEN":"St.Vincent",
        "CountryName":"圣文森特",
        "CountryCode":"VC",
        "TelCode":1784},
    {"CountryEN":"Sudan",
        "CountryName":"苏丹",
        "CountryCode":"SD",
        "TelCode":249},
    {"CountryEN":"Suriname",
        "CountryName":"苏里南",
        "CountryCode":"SR",
        "TelCode":597},

    {"CountryEN":"Swaziland",
        "CountryName":"斯威士兰",
        "CountryCode":"SZ",
        "TelCode":268},
    {"CountryEN":"Sweden",
        "CountryName":"瑞典",
        "CountryCode":"SE",
        "TelCode":46},
    {"CountryEN":"Switzerland",
        "CountryName":"瑞士",
        "CountryCode":"CH",
        "TelCode":41},
    {"CountryEN":"Syria",
        "CountryName":"叙利亚",
        "CountryCode":"SY",
        "TelCode":963},
    {"CountryEN":"Taiwan",
        "CountryName":"台湾省",
        "CountryCode":"TW",
        "TelCode":886},
    {"CountryEN":"Tajikstan",
        "CountryName":"塔吉克斯坦",
        "CountryCode":"TJ",
        "TelCode":992},
    {"CountryEN":"Tanzania",
        "CountryName":"坦桑尼亚",
        "CountryCode":"TZ",
        "TelCode":255},
    {"CountryEN":"Thailand",
        "CountryName":"泰国",
        "CountryCode":"TH",
        "TelCode":66},
    {"CountryEN":"Togo",
        "CountryName":"多哥",
        "CountryCode":"TG",
        "TelCode":228},
    {"CountryEN":"Tonga",
        "CountryName":"汤加",
        "CountryCode":"TO",
        "TelCode":676},
    {"CountryEN":"Trinidad and Tobago",
        "CountryName":"特立尼达和多巴哥",
        "CountryCode":"TT",
        "TelCode":1809},
    {"CountryEN":"Tunisia",
        "CountryName":"突尼斯",
        "CountryCode":"TN",
        "TelCode":216},
    {"CountryEN":"Turkey",
        "CountryName":"土耳其",
        "CountryCode":"TR",
        "TelCode":9
    },
    {"CountryEN":"Turkmenistan ",
        "CountryName":"土库曼斯坦",
        "CountryCode":"TM",
        "TelCode":993},
    {"CountryEN":"Uganda",
        "CountryName":"乌干达",
        "CountryCode":"UG",
        "TelCode":256},
    {"CountryEN":"Ukraine",
        "CountryName":"乌克兰",
        "CountryCode":"UA",
        "TelCode":38
    },
    {"CountryEN":"United Arab Emirates",
        "CountryName":"阿拉伯联合酋长国",
        "CountryCode":"AE",
        "TelCode":971
    },
    {"CountryEN":"United Kiongdom",
        "CountryName":"英国",
        "CountryCode":"GB",
        "TelCode":44
    },
    {"CountryEN":"United States of America",
        "CountryName":"美国",
        "CountryCode":"US",
        "TelCode":1
    },
    {"CountryEN":"Uruguay",
        "CountryName":"乌拉圭",
        "CountryCode":"UY",
        "TelCode":598
    },
    {"CountryEN":"Uzbekistan",
        "CountryName":"乌兹别克斯坦",
        "CountryCode":"UZ",
        "TelCode":233
    },
    {"CountryEN":"Venezuela",
        "CountryName":"委内瑞拉",
        "CountryCode":"VE",
        "TelCode":58
    },
    {"CountryEN":"Vietnam",
        "CountryName":"越南",
        "CountryCode":"VN",
        "TelCode":84
    },
    {"CountryEN":"Yemen",
        "CountryName":"也门",
        "CountryCode":"YE",
        "TelCode":967
    },
    {"CountryEN":"Yugoslavia",
        "CountryName":"南斯拉夫",
        "CountryCode":"YU",
        "TelCode":381
    },
    {"CountryEN":"Zimbabwe",
        "CountryName":"津巴布韦",
        "CountryCode":"ZW",
        "TelCode":263
    },
    {"CountryEN":"Zaire",
        "CountryName":"扎伊尔",
        "CountryCode":"ZR",
        "TelCode":243
    },
    {"CountryEN":"Zambia",
        "CountryName":"赞比亚",
        "CountryCode":"ZM",
        "TelCode":26
    }];


(function () {
    var str1 = '';
    var oUl=document.createElement('ul');

    for (var i=0; i<arrCountry.length; i++) {
        str1+='<li data-tel-code="'+arrCountry[i].TelCode+'" data-code="'+arrCountry[i].CountryCode+'">'+arrCountry[i].CountryName+'</li>';
    }
    oUl.innerHTML=str1;
    oUl.className='country-list';

    if(document.querySelector('#country-wrap'))document.querySelector('#country-wrap').appendChild(oUl);

    //var aBtn=document.querySelectorAll('.country-btn');
    var aBtn=document.querySelectorAll('.countries-wrap');
    var oDiv=document.querySelector('.country-cho-wrap');
    var oInput=document.querySelector('#country-input-zone');
    var oTc=document.querySelector('.country-list-searched');
    var countryListSearched = document.querySelector('.country-list-searched');
    var countryInputZone = document.querySelector('#country-input-zone');
    $('.country-hidden').click(function(){
        $('.country-cho-wrap').hide();
        document.querySelector("#addtra_page .user-content").style.position = "relative";
        document.querySelector("#uptra_page .user-content").style.position = "relative";
    });
    for(var i=0;i<aBtn.length; i++)
    {
        (function(index){
            aBtn[i].onclick=function(){
                var _this=this.querySelector('.country-btn');
                //模糊搜索赋值
                countryListSearched.onclick=function(e){
                    _this.innerHTML=countryInputZone.value=e.target.innerHTML;
                    $(oCont).attr("data-code", $(e.target).attr("data-code"));
                    $(oCont).attr("data-tel-code", $(e.target).attr("data-tel-code"));
                    this.style.display='none';
                    setTimeout(function(){
                        oDiv.style.display='none';
                        oTc.style.display='none';
                        document.querySelector("#addtra_page .user-content").style.position = "relative";
                        document.querySelector("#uptra_page .user-content").style.position = "relative";
                        oInput.value='';
                    },500)
                    if($('#addtra_page').length>0)
                    {
                        if($('#addtra_page')[0].style.display == 'none')
                        {
                            if(index == 1 || index == 3)
                            {
                                $('#uptra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                            }
                        }
                        else{
                            if(index == 1 || index == 3)
                            {
                                $('#addtra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                            }
                        }
                    }

                };

                oDiv.style.display='block';
                //android 相对位置 防止键盘覆盖问题
                if(document.querySelector("#addtra_page .user-content") !=null) {
                    document.querySelector("#addtra_page .user-content").style.position = "absolute";
                    document.querySelector("#uptra_page .user-content").style.position = "absolute";
                }

                var oCont=document.querySelectorAll('.country-btn');
                var oTab=document.querySelector('.country-list');
                var oInp=document.querySelector('.cl_search input');
                oTab.onclick=function(e){
                    oCont[index].innerHTML=oInp.value=e.target.innerHTML;
                    $(oCont).attr("data-code", $(e.target).attr("data-code"));
                    $(oCont).attr("data-tel-code", $(e.target).attr("data-tel-code"));
                    console.log(e.target);
                    setTimeout(function(){
                        oDiv.style.display='none';
                        oTc.style.display='none';
                        if(document.querySelector("#addtra_page .user-content")!=null) {
                            document.querySelector("#addtra_page .user-content").style.position = "relative";
                            document.querySelector("#uptra_page .user-content").style.position = "relative";
                        }
                        oInput.value='';
                    },500)
                    if($('#addtra_page').length>0) {
                        if ($('#addtra_page')[0].style.display == 'none') {
                            if (index == 1 || index == 3) {
                                $('#uptra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                            }
                        }
                        else {
                            if (index == 1 || index == 3) {
                                $('#addtra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                            }
                        }
                    }
                };

            };

            /*国籍模糊搜索*/
            var countryShow = {
                countrySearch: function () {
                    var countryInputZone = document.querySelector('#country-input-zone');
                    var valueStr = countryInputZone.value;
                    var resultStr = '';
                    var searchResult = [];

                    if (valueStr) {
                        for (var i = 0; i < arrCountry.length; i++) {
                            if (arrCountry[i]['CountryName'].indexOf(valueStr)>-1||arrCountry[i]['CountryEN'].indexOf(valueStr)>-1) {
                                searchResult.push(arrCountry[i])
                            }
                        }

                        if (!searchResult.length) {
                            resultStr += '<li class="country-list-searched-item">无搜索结果</li>';
                        } else {
                            for (var j = 0; j < searchResult.length; j++) {
                                resultStr += '<li class="country-list-searched-item" data-tel-code="'+searchResult[j].TelCode+'" data-code="'+searchResult[j].CountryCode+'" >' + searchResult[j].CountryName + '</li>';
                            }
                        }
                        countryListSearched.innerHTML = resultStr;
                        //console.log(resultStr);
                        countryListSearched.style.display = 'block';

                    }
                    else {
                        countryListSearched.style.display = 'none';
                    }
                },

                addHander: function(){
                    var that=countryShow;
                    var countryInputZone = document.querySelector('#country-input-zone');
                    if (countryInputZone.addEventListener) {
                        countryInputZone.addEventListener('input', function(){
                            that.countrySearch();
                        }, false)
                    } else {
                        countryInputZone.attachEvent('onpropertychange', that.countrySearch)
                    }
                },

                init: function(){
                    this.addHander();
                    this.countrySearch();

                }

            };
            countryShow.init();
        })(i);
    }



})();

//根据CountryCode获得CountryName
function getCountryName(code){
    for(var i=0;i<arrCountry.length; i++)
    {
        if(arrCountry[i].CountryCode == code)
        {
            return arrCountry[i];
        }
    }
}

//根据CountryCode获得手机区号data-tel-code
function getTelCode(code){
    for(var i=0;i<arrCountry.length; i++)
    {
        if(arrCountry[i].CountryCode == code)
        {
            return arrCountry[i];
        }
    }
}


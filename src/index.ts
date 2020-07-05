type BaseBalidatorType = {
    [key: string]: (v: any) => boolean;
};

type RangeBalidatorType = {
    [key: string]: (v: any, v2: any, v3: any) => boolean;
};

const BaseBalidator: BaseBalidatorType = {
    isDefined: (arg: any) => arg !== undefined && arg !== null,
    isFunc: (arg: any) => typeof arg === "function",
    isBoolean: (arg: any) => typeof arg === "boolean",
    isObject: (arg: any) => arg === Object(arg),
    isNumber: (arg: any) => typeof arg === "number",
    isInteger: (arg: any) => BaseBalidator.isNumber(arg) && arg % 1 === 0,
    isString: (arg: any) => typeof arg === "string",
    isArray: (arg: any) => Array.isArray(arg),
    isNull: (arg: any) => arg === null,
    isPromise: (arg: any) => BaseBalidator.isDefined(arg.then) && BaseBalidator.isFunc(arg.then),

}

const CreditCardBalidator: BaseBalidatorType = {
    isAmericanExpress: (arg: any) => {
        const re = /^(?:3[47][0-9]{13})$/;
        return re.test(arg);
    },
    isMasterCard: (arg: any) => {
        const re = /^(?:5[1-5][0-9]{14})$/
        return re.test(arg);
    },
    isVisa: (arg: any) => {
        const re = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
        return re.test(arg);
    },
    isDiscover: (arg: any) => {
        const re = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
        return re.test(arg);
    },
    isIranMellat: (arg: any) => {
        const re = /^6104[0-9]{12,12}$/
        return re.test(arg);
    },
    isIranParsian: (arg: any) => {
        const re = /^6221\d{12,12}$/
        return re.test(arg);
    },
}

const CurrencyBalidator: BaseBalidatorType = {
    isBTCAddress: (arg: string) => {
        const re = /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/;
        return re.test(arg);
    }
}
const NumberBalidator: BaseBalidatorType = {
    isEven: (arg: number) => {
        return arg % 2 === 0;
    },
    isOdd: (arg: number) => {
        return !NumberBalidator.isEven(arg);
    },
    isPositive: (arg: number) => {
        return arg >= 0;
    }, 
    isNegative: (arg: number) => {
        return arg < 0;
    },

}

const LocationBalidator: BaseBalidatorType = {
    isLat: (arg: string) => {
        const re = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
        return re.test(arg);
    },
    isLng: (arg: string) => {
        const re = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
        return re.test(arg);
    }
}


const RangeBalidator: RangeBalidatorType = {
    inRangeNumber: (value: number, min?: number, max?: number) => (min && max && min < value && value <= max) || (max && value <= max) || (min && min < value) || false,
}

const TypeValidator: BaseBalidatorType = {
    isEmail: (arg: string) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(arg.toLowerCase());
    },
    isImei: (arg: any) => {
        const re = /^\d{15}(,\d{15})*$/;
        return re.test(arg);
    },
    isIPv4: (arg: string) => {
        const re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return re.test(arg);
    },
    isIPv6: (arg: string) => {
        const re = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
        return re.test(arg);
    },
    isMACAdress: (arg: string) => {
        const re = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
        return re.test(arg);
    },
    isHexRGB: (arg: string) => {
        const re = /^#[0-9A-F]{6}$/i;
        return re.test(arg);
    },
    isURL: (arg: string) => {
        try {
            new URL(arg);
        } catch (_) {
            return false;
        }
        return true

    },
    isISBN: (arg: string) => {
        const re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
        return re.test(arg);
    },
    isJSON: (arg: string) => {
        try {
            JSON.parse(arg)
        } catch (_) {
            return false;
        }
        return true

    },
    isTLD: (arg: string) => {
        const tldList: Array<string> = [
            'AAA', 'AARP', 'ABARTH', 'ABB', 'ABBOTT', 'ABBVIE', 'ABC', 'ABLE',
            'ABOGADO', 'ABUDHABI', 'AC', 'ACADEMY', 'ACCENTURE', 'ACCOUNTANT',
            'ACCOUNTANTS', 'ACO', 'ACTOR', 'AD', 'ADAC', 'ADS', 'ADULT', 'AE',
            'AEG', 'AERO', 'AETNA', 'AF', 'AFAMILYCOMPANY', 'AFL', 'AFRICA', 'AG',
            'AGAKHAN', 'AGENCY', 'AI', 'AIG', 'AIGO', 'AIRBUS', 'AIRFORCE',
            'AIRTEL', 'AKDN', 'AL', 'ALFAROMEO', 'ALIBABA', 'ALIPAY', 'ALLFINANZ',
            'ALLSTATE', 'ALLY', 'ALSACE', 'ALSTOM', 'AM', 'AMAZON',
            'AMERICANEXPRESS', 'AMERICANFAMILY', 'AMEX', 'AMFAM', 'AMICA',
            'AMSTERDAM', 'ANALYTICS', 'ANDROID', 'ANQUAN', 'ANZ', 'AO', 'AOL',
            'APARTMENTS', 'APP', 'APPLE', 'AQ', 'AQUARELLE', 'AR', 'ARAB',
            'ARAMCO', 'ARCHI', 'ARMY', 'ARPA', 'ART', 'ARTE', 'AS', 'ASDA', 'ASIA',
            'ASSOCIATES', 'AT', 'ATHLETA', 'ATTORNEY', 'AU', 'AUCTION', 'AUDI',
            'AUDIBLE', 'AUDIO', 'AUSPOST', 'AUTHOR', 'AUTO', 'AUTOS', 'AVIANCA',
            'AW', 'AWS', 'AX', 'AXA', 'AZ', 'AZURE', 'BA', 'BABY', 'BAIDU',
            'BANAMEX', 'BANANAREPUBLIC', 'BAND', 'BANK', 'BAR', 'BARCELONA',
            'BARCLAYCARD', 'BARCLAYS', 'BAREFOOT', 'BARGAINS', 'BASEBALL',
            'BASKETBALL', 'BAUHAUS', 'BAYERN', 'BB', 'BBC', 'BBT', 'BBVA', 'BCG',
            'BCN', 'BD', 'BE', 'BEATS', 'BEAUTY', 'BEER', 'BENTLEY', 'BERLIN',
            'BEST', 'BESTBUY', 'BET', 'BF', 'BG', 'BH', 'BHARTI', 'BI', 'BIBLE',
            'BID', 'BIKE', 'BING', 'BINGO', 'BIO', 'BIZ', 'BJ', 'BLACK',
            'BLACKFRIDAY', 'BLOCKBUSTER', 'BLOG', 'BLOOMBERG', 'BLUE', 'BM', 'BMS',
            'BMW', 'BN', 'BNPPARIBAS', 'BO', 'BOATS', 'BOEHRINGER', 'BOFA', 'BOM',
            'BOND', 'BOO', 'BOOK', 'BOOKING', 'BOSCH', 'BOSTIK', 'BOSTON', 'BOT',
            'BOUTIQUE', 'BOX', 'BR', 'BRADESCO', 'BRIDGESTONE', 'BROADWAY',
            'BROKER', 'BROTHER', 'BRUSSELS', 'BS', 'BT', 'BUDAPEST', 'BUGATTI',
            'BUILD', 'BUILDERS', 'BUSINESS', 'BUY', 'BUZZ', 'BV', 'BW', 'BY', 'BZ',
            'BZH', 'CA', 'CAB', 'CAFE', 'CAL', 'CALL', 'CALVINKLEIN', 'CAM',
            'CAMERA', 'CAMP', 'CANCERRESEARCH', 'CANON', 'CAPETOWN', 'CAPITAL',
            'CAPITALONE', 'CAR', 'CARAVAN', 'CARDS', 'CARE', 'CAREER', 'CAREERS',
            'CARS', 'CASA', 'CASE', 'CASEIH', 'CASH', 'CASINO', 'CAT', 'CATERING',
            'CATHOLIC', 'CBA', 'CBN', 'CBRE', 'CBS', 'CC', 'CD', 'CEB', 'CENTER',
            'CEO', 'CERN', 'CF', 'CFA', 'CFD', 'CG', 'CH', 'CHANEL', 'CHANNEL',
            'CHARITY', 'CHASE', 'CHAT', 'CHEAP', 'CHINTAI', 'CHRISTMAS', 'CHROME',
            'CHURCH', 'CI', 'CIPRIANI', 'CIRCLE', 'CISCO', 'CITADEL', 'CITI',
            'CITIC', 'CITY', 'CITYEATS', 'CK', 'CL', 'CLAIMS', 'CLEANING', 'CLICK',
            'CLINIC', 'CLINIQUE', 'CLOTHING', 'CLOUD', 'CLUB', 'CLUBMED', 'CM',
            'CN', 'CO', 'COACH', 'CODES', 'COFFEE', 'COLLEGE', 'COLOGNE', 'COM',
            'COMCAST', 'COMMBANK', 'COMMUNITY', 'COMPANY', 'COMPARE', 'COMPUTER',
            'COMSEC', 'CONDOS', 'CONSTRUCTION', 'CONSULTING', 'CONTACT',
            'CONTRACTORS', 'COOKING', 'COOKINGCHANNEL', 'COOL', 'COOP', 'CORSICA',
            'COUNTRY', 'COUPON', 'COUPONS', 'COURSES', 'CPA', 'CR', 'CREDIT',
            'CREDITCARD', 'CREDITUNION', 'CRICKET', 'CROWN', 'CRS', 'CRUISE',
            'CRUISES', 'CSC', 'CU', 'CUISINELLA', 'CV', 'CW', 'CX', 'CY', 'CYMRU',
            'CYOU', 'CZ', 'DABUR', 'DAD', 'DANCE', 'DATA', 'DATE', 'DATING',
            'DATSUN', 'DAY', 'DCLK', 'DDS', 'DE', 'DEAL', 'DEALER', 'DEALS',
            'DEGREE', 'DELIVERY', 'DELL', 'DELOITTE', 'DELTA', 'DEMOCRAT',
            'DENTAL', 'DENTIST', 'DESI', 'DESIGN', 'DEV', 'DHL', 'DIAMONDS',
            'DIET', 'DIGITAL', 'DIRECT', 'DIRECTORY', 'DISCOUNT', 'DISCOVER',
            'DISH', 'DIY', 'DJ', 'DK', 'DM', 'DNP', 'DO', 'DOCS', 'DOCTOR', 'DOG',
            'DOMAINS', 'DOT', 'DOWNLOAD', 'DRIVE', 'DTV', 'DUBAI', 'DUCK',
            'DUNLOP', 'DUPONT', 'DURBAN', 'DVAG', 'DVR', 'DZ', 'EARTH', 'EAT',
            'EC', 'ECO', 'EDEKA', 'EDU', 'EDUCATION', 'EE', 'EG', 'EMAIL',
            'EMERCK', 'ENERGY', 'ENGINEER', 'ENGINEERING', 'ENTERPRISES', 'EPSON',
            'EQUIPMENT', 'ER', 'ERICSSON', 'ERNI', 'ES', 'ESQ', 'ESTATE', 'ET',
            'ETISALAT', 'EU', 'EUROVISION', 'EUS', 'EVENTS', 'EXCHANGE', 'EXPERT',
            'EXPOSED', 'EXPRESS', 'EXTRASPACE', 'FAGE', 'FAIL', 'FAIRWINDS',
            'FAITH', 'FAMILY', 'FAN', 'FANS', 'FARM', 'FARMERS', 'FASHION', 'FAST',
            'FEDEX', 'FEEDBACK', 'FERRARI', 'FERRERO', 'FI', 'FIAT', 'FIDELITY',
            'FIDO', 'FILM', 'FINAL', 'FINANCE', 'FINANCIAL', 'FIRE', 'FIRESTONE',
            'FIRMDALE', 'FISH', 'FISHING', 'FIT', 'FITNESS', 'FJ', 'FK', 'FLICKR',
            'FLIGHTS', 'FLIR', 'FLORIST', 'FLOWERS', 'FLY', 'FM', 'FO', 'FOO',
            'FOOD', 'FOODNETWORK', 'FOOTBALL', 'FORD', 'FOREX', 'FORSALE', 'FORUM',
            'FOUNDATION', 'FOX', 'FR', 'FREE', 'FRESENIUS', 'FRL', 'FROGANS',
            'FRONTDOOR', 'FRONTIER', 'FTR', 'FUJITSU', 'FUJIXEROX', 'FUN', 'FUND',
            'FURNITURE', 'FUTBOL', 'FYI', 'GA', 'GAL', 'GALLERY', 'GALLO',
            'GALLUP', 'GAME', 'GAMES', 'GAP', 'GARDEN', 'GAY', 'GB', 'GBIZ', 'GD',
            'GDN', 'GE', 'GEA', 'GENT', 'GENTING', 'GEORGE', 'GF', 'GG', 'GGEE',
            'GH', 'GI', 'GIFT', 'GIFTS', 'GIVES', 'GIVING', 'GL', 'GLADE', 'GLASS',
            'GLE', 'GLOBAL', 'GLOBO', 'GM', 'GMAIL', 'GMBH', 'GMO', 'GMX', 'GN',
            'GODADDY', 'GOLD', 'GOLDPOINT', 'GOLF', 'GOO', 'GOODYEAR', 'GOOG',
            'GOOGLE', 'GOP', 'GOT', 'GOV', 'GP', 'GQ', 'GR', 'GRAINGER',
            'GRAPHICS', 'GRATIS', 'GREEN', 'GRIPE', 'GROCERY', 'GROUP', 'GS', 'GT',
            'GU', 'GUARDIAN', 'GUCCI', 'GUGE', 'GUIDE', 'GUITARS', 'GURU', 'GW',
            'GY', 'HAIR', 'HAMBURG', 'HANGOUT', 'HAUS', 'HBO', 'HDFC', 'HDFCBANK',
            'HEALTH', 'HEALTHCARE', 'HELP', 'HELSINKI', 'HERE', 'HERMES', 'HGTV',
            'HIPHOP', 'HISAMITSU', 'HITACHI', 'HIV', 'HK', 'HKT', 'HM', 'HN',
            'HOCKEY', 'HOLDINGS', 'HOLIDAY', 'HOMEDEPOT', 'HOMEGOODS', 'HOMES',
            'HOMESENSE', 'HONDA', 'HORSE', 'HOSPITAL', 'HOST', 'HOSTING', 'HOT',
            'HOTELES', 'HOTELS', 'HOTMAIL', 'HOUSE', 'HOW', 'HR', 'HSBC', 'HT',
            'HU', 'HUGHES', 'HYATT', 'HYUNDAI', 'IBM', 'ICBC', 'ICE', 'ICU', 'ID',
            'IE', 'IEEE', 'IFM', 'IKANO', 'IL', 'IM', 'IMAMAT', 'IMDB', 'IMMO',
            'IMMOBILIEN', 'IN', 'INC', 'INDUSTRIES', 'INFINITI', 'INFO', 'ING',
            'INK', 'INSTITUTE', 'INSURANCE', 'INSURE', 'INT', 'INTEL',
            'INTERNATIONAL', 'INTUIT', 'INVESTMENTS', 'IO', 'IPIRANGA', 'IQ', 'IR',
            'IRISH', 'IS', 'ISMAILI', 'IST', 'ISTANBUL', 'IT', 'ITAU', 'ITV',
            'IVECO', 'JAGUAR', 'JAVA', 'JCB', 'JCP', 'JE', 'JEEP', 'JETZT',
            'JEWELRY', 'JIO', 'JLL', 'JM', 'JMP', 'JNJ', 'JO', 'JOBS', 'JOBURG',
            'JOT', 'JOY', 'JP', 'JPMORGAN', 'JPRS', 'JUEGOS', 'JUNIPER', 'KAUFEN',
            'KDDI', 'KE', 'KERRYHOTELS', 'KERRYLOGISTICS', 'KERRYPROPERTIES',
            'KFH', 'KG', 'KH', 'KI', 'KIA', 'KIM', 'KINDER', 'KINDLE', 'KITCHEN',
            'KIWI', 'KM', 'KN', 'KOELN', 'KOMATSU', 'KOSHER', 'KP', 'KPMG', 'KPN',
            'KR', 'KRD', 'KRED', 'KUOKGROUP', 'KW', 'KY', 'KYOTO', 'KZ', 'LA',
            'LACAIXA', 'LAMBORGHINI', 'LAMER', 'LANCASTER', 'LANCIA', 'LAND',
            'LANDROVER', 'LANXESS', 'LASALLE', 'LAT', 'LATINO', 'LATROBE', 'LAW',
            'LAWYER', 'LB', 'LC', 'LDS', 'LEASE', 'LECLERC', 'LEFRAK', 'LEGAL',
            'LEGO', 'LEXUS', 'LGBT', 'LI', 'LIDL', 'LIFE', 'LIFEINSURANCE',
            'LIFESTYLE', 'LIGHTING', 'LIKE', 'LILLY', 'LIMITED', 'LIMO', 'LINCOLN',
            'LINDE', 'LINK', 'LIPSY', 'LIVE', 'LIVING', 'LIXIL', 'LK', 'LLC',
            'LLP', 'LOAN', 'LOANS', 'LOCKER', 'LOCUS', 'LOFT', 'LOL', 'LONDON',
            'LOTTE', 'LOTTO', 'LOVE', 'LPL', 'LPLFINANCIAL', 'LR', 'LS', 'LT',
            'LTD', 'LTDA', 'LU', 'LUNDBECK', 'LUPIN', 'LUXE', 'LUXURY', 'LV', 'LY',
            'MA', 'MACYS', 'MADRID', 'MAIF', 'MAISON', 'MAKEUP', 'MAN',
            'MANAGEMENT', 'MANGO', 'MAP', 'MARKET', 'MARKETING', 'MARKETS',
            'MARRIOTT', 'MARSHALLS', 'MASERATI', 'MATTEL', 'MBA', 'MC', 'MCKINSEY',
            'MD', 'ME', 'MED', 'MEDIA', 'MEET', 'MELBOURNE', 'MEME', 'MEMORIAL',
            'MEN', 'MENU', 'MERCKMSD', 'METLIFE', 'MG', 'MH', 'MIAMI', 'MICROSOFT',
            'MIL', 'MINI', 'MINT', 'MIT', 'MITSUBISHI', 'MK', 'ML', 'MLB', 'MLS',
            'MM', 'MMA', 'MN', 'MO', 'MOBI', 'MOBILE', 'MODA', 'MOE', 'MOI', 'MOM',
            'MONASH', 'MONEY', 'MONSTER', 'MORMON', 'MORTGAGE', 'MOSCOW', 'MOTO',
            'MOTORCYCLES', 'MOV', 'MOVIE', 'MP', 'MQ', 'MR', 'MS', 'MSD', 'MT',
            'MTN', 'MTR', 'MU', 'MUSEUM', 'MUTUAL', 'MV', 'MW', 'MX', 'MY', 'MZ',
            'NA', 'NAB', 'NAGOYA', 'NAME', 'NATIONWIDE', 'NATURA', 'NAVY', 'NBA',
            'NC', 'NE', 'NEC', 'NET', 'NETBANK', 'NETFLIX', 'NETWORK', 'NEUSTAR',
            'NEW', 'NEWHOLLAND', 'NEWS', 'NEXT', 'NEXTDIRECT', 'NEXUS', 'NF',
            'NFL', 'NG', 'NGO', 'NHK', 'NI', 'NICO', 'NIKE', 'NIKON', 'NINJA',
            'NISSAN', 'NISSAY', 'NL', 'NO', 'NOKIA', 'NORTHWESTERNMUTUAL',
            'NORTON', 'NOW', 'NOWRUZ', 'NOWTV', 'NP', 'NR', 'NRA', 'NRW', 'NTT',
            'NU', 'NYC', 'NZ', 'OBI', 'OBSERVER', 'OFF', 'OFFICE', 'OKINAWA',
            'OLAYAN', 'OLAYANGROUP', 'OLDNAVY', 'OLLO', 'OM', 'OMEGA', 'ONE',
            'ONG', 'ONL', 'ONLINE', 'ONYOURSIDE', 'OOO', 'OPEN', 'ORACLE',
            'ORANGE', 'ORG', 'ORGANIC', 'ORIGINS', 'OSAKA', 'OTSUKA', 'OTT', 'OVH',
            'PA', 'PAGE', 'PANASONIC', 'PARIS', 'PARS', 'PARTNERS', 'PARTS',
            'PARTY', 'PASSAGENS', 'PAY', 'PCCW', 'PE', 'PET', 'PF', 'PFIZER', 'PG',
            'PH', 'PHARMACY', 'PHD', 'PHILIPS', 'PHONE', 'PHOTO', 'PHOTOGRAPHY',
            'PHOTOS', 'PHYSIO', 'PICS', 'PICTET', 'PICTURES', 'PID', 'PIN', 'PING',
            'PINK', 'PIONEER', 'PIZZA', 'PK', 'PL', 'PLACE', 'PLAY', 'PLAYSTATION',
            'PLUMBING', 'PLUS', 'PM', 'PN', 'PNC', 'POHL', 'POKER', 'POLITIE',
            'PORN', 'POST', 'PR', 'PRAMERICA', 'PRAXI', 'PRESS', 'PRIME', 'PRO',
            'PROD', 'PRODUCTIONS', 'PROF', 'PROGRESSIVE', 'PROMO', 'PROPERTIES',
            'PROPERTY', 'PROTECTION', 'PRU', 'PRUDENTIAL', 'PS', 'PT', 'PUB', 'PW',
            'PWC', 'PY', 'QA', 'QPON', 'QUEBEC', 'QUEST', 'QVC', 'RACING', 'RADIO',
            'RAID', 'RE', 'READ', 'REALESTATE', 'REALTOR', 'REALTY', 'RECIPES',
            'RED', 'REDSTONE', 'REDUMBRELLA', 'REHAB', 'REISE', 'REISEN', 'REIT',
            'RELIANCE', 'REN', 'RENT', 'RENTALS', 'REPAIR', 'REPORT', 'REPUBLICAN',
            'REST', 'RESTAURANT', 'REVIEW', 'REVIEWS', 'REXROTH', 'RICH',
            'RICHARDLI', 'RICOH', 'RIGHTATHOME', 'RIL', 'RIO', 'RIP', 'RMIT', 'RO',
            'ROCHER', 'ROCKS', 'RODEO', 'ROGERS', 'ROOM', 'RS', 'RSVP', 'RU',
            'RUGBY', 'RUHR', 'RUN', 'RW', 'RWE', 'RYUKYU', 'SA', 'SAARLAND',
            'SAFE', 'SAFETY', 'SAKURA', 'SALE', 'SALON', 'SAMSCLUB', 'SAMSUNG',
            'SANDVIK', 'SANDVIKCOROMANT', 'SANOFI', 'SAP', 'SARL', 'SAS', 'SAVE',
            'SAXO', 'SB', 'SBI', 'SBS', 'SC', 'SCA', 'SCB', 'SCHAEFFLER',
            'SCHMIDT', 'SCHOLARSHIPS', 'SCHOOL', 'SCHULE', 'SCHWARZ', 'SCIENCE',
            'SCJOHNSON', 'SCOT', 'SD', 'SE', 'SEARCH', 'SEAT', 'SECURE',
            'SECURITY', 'SEEK', 'SELECT', 'SENER', 'SERVICES', 'SES', 'SEVEN',
            'SEW', 'SEX', 'SEXY', 'SFR', 'SG', 'SH', 'SHANGRILA', 'SHARP', 'SHAW',
            'SHELL', 'SHIA', 'SHIKSHA', 'SHOES', 'SHOP', 'SHOPPING', 'SHOUJI',
            'SHOW', 'SHOWTIME', 'SHRIRAM', 'SI', 'SILK', 'SINA', 'SINGLES', 'SITE',
            'SJ', 'SK', 'SKI', 'SKIN', 'SKY', 'SKYPE', 'SL', 'SLING', 'SM',
            'SMART', 'SMILE', 'SN', 'SNCF', 'SO', 'SOCCER', 'SOCIAL', 'SOFTBANK',
            'SOFTWARE', 'SOHU', 'SOLAR', 'SOLUTIONS', 'SONG', 'SONY', 'SOY',
            'SPACE', 'SPORT', 'SPOT', 'SPREADBETTING', 'SR', 'SRL', 'SS', 'ST',
            'STADA', 'STAPLES', 'STAR', 'STATEBANK', 'STATEFARM', 'STC',
            'STCGROUP', 'STOCKHOLM', 'STORAGE', 'STORE', 'STREAM', 'STUDIO',
            'STUDY', 'STYLE', 'SU', 'SUCKS', 'SUPPLIES', 'SUPPLY', 'SUPPORT',
            'SURF', 'SURGERY', 'SUZUKI', 'SV', 'SWATCH', 'SWIFTCOVER', 'SWISS',
            'SX', 'SY', 'SYDNEY', 'SYMANTEC', 'SYSTEMS', 'SZ', 'TAB', 'TAIPEI',
            'TALK', 'TAOBAO', 'TARGET', 'TATAMOTORS', 'TATAR', 'TATTOO', 'TAX',
            'TAXI', 'TC', 'TCI', 'TD', 'TDK', 'TEAM', 'TECH', 'TECHNOLOGY', 'TEL',
            'TEMASEK', 'TENNIS', 'TEVA', 'TF', 'TG', 'TH', 'THD', 'THEATER',
            'THEATRE', 'TIAA', 'TICKETS', 'TIENDA', 'TIFFANY', 'TIPS', 'TIRES',
            'TIROL', 'TJ', 'TJMAXX', 'TJX', 'TK', 'TKMAXX', 'TL', 'TM', 'TMALL',
            'TN', 'TO', 'TODAY', 'TOKYO', 'TOOLS', 'TOP', 'TORAY', 'TOSHIBA',
            'TOTAL', 'TOURS', 'TOWN', 'TOYOTA', 'TOYS', 'TR', 'TRADE', 'TRADING',
            'TRAINING', 'TRAVEL', 'TRAVELCHANNEL', 'TRAVELERS',
            'TRAVELERSINSURANCE', 'TRUST', 'TRV', 'TT', 'TUBE', 'TUI', 'TUNES',
            'TUSHU', 'TV', 'TVS', 'TW', 'TZ', 'UA', 'UBANK', 'UBS', 'UG', 'UK',
            'UNICOM', 'UNIVERSITY', 'UNO', 'UOL', 'UPS', 'US', 'UY', 'UZ', 'VA',
            'VACATIONS', 'VANA', 'VANGUARD', 'VC', 'VE', 'VEGAS', 'VENTURES',
            'VERISIGN', 'VERSICHERUNG', 'VET', 'VG', 'VI', 'VIAJES', 'VIDEO',
            'VIG', 'VIKING', 'VILLAS', 'VIN', 'VIP', 'VIRGIN', 'VISA', 'VISION',
            'VIVA', 'VIVO', 'VLAANDEREN', 'VN', 'VODKA', 'VOLKSWAGEN', 'VOLVO',
            'VOTE', 'VOTING', 'VOTO', 'VOYAGE', 'VU', 'VUELOS', 'WALES', 'WALMART',
            'WALTER', 'WANG', 'WANGGOU', 'WATCH', 'WATCHES', 'WEATHER',
            'WEATHERCHANNEL', 'WEBCAM', 'WEBER', 'WEBSITE', 'WED', 'WEDDING',
            'WEIBO', 'WEIR', 'WF', 'WHOSWHO', 'WIEN', 'WIKI', 'WILLIAMHILL', 'WIN',
            'WINDOWS', 'WINE', 'WINNERS', 'WME', 'WOLTERSKLUWER', 'WOODSIDE',
            'WORK', 'WORKS', 'WORLD', 'WOW', 'WS', 'WTC', 'WTF', 'XBOX', 'XEROX',
            'XFINITY', 'XIHUAN', 'XIN', 'XN--11B4C3D', 'XN--1CK2E1B',
            'XN--1QQW23A', 'XN--2SCRJ9C', 'XN--30RR7Y', 'XN--3BST00M',
            'XN--3DS443G', 'XN--3E0B707E', 'XN--3HCRJ9C', 'XN--3OQ18VL8PN36A',
            'XN--3PXU8K', 'XN--42C2D9A', 'XN--45BR5CYL', 'XN--45BRJ9C',
            'XN--45Q11C', 'XN--4GBRIM', 'XN--54B7FTA0CC', 'XN--55QW42G',
            'XN--55QX5D', 'XN--5SU34J936BGSG', 'XN--5TZM5G', 'XN--6FRZ82G',
            'XN--6QQ986B3XL', 'XN--80ADXHKS', 'XN--80AO21A', 'XN--80AQECDR1A',
            'XN--80ASEHDB', 'XN--80ASWG', 'XN--8Y0A063A', 'XN--90A3AC', 'XN--90AE',
            'XN--90AIS', 'XN--9DBQ2A', 'XN--9ET52U', 'XN--9KRT00A',
            'XN--B4W605FERD', 'XN--BCK1B9A5DRE4C', 'XN--C1AVG', 'XN--C2BR7G',
            'XN--CCK2B3B', 'XN--CCKWCXETD', 'XN--CG4BKI', 'XN--CLCHC0EA0B2G2A9GCD',
            'XN--CZR694B', 'XN--CZRS0T', 'XN--CZRU2D', 'XN--D1ACJ3B', 'XN--D1ALF',
            'XN--E1A4C', 'XN--ECKVDTC9D', 'XN--EFVY88H', 'XN--FCT429K',
            'XN--FHBEI', 'XN--FIQ228C5HS', 'XN--FIQ64B', 'XN--FIQS8S',
            'XN--FIQZ9S', 'XN--FJQ720A', 'XN--FLW351E', 'XN--FPCRJ9C3D',
            'XN--FZC2C9E2C', 'XN--FZYS8D69UVGM', 'XN--G2XX48C', 'XN--GCKR3F0F',
            'XN--GECRJ9C', 'XN--GK3AT1E', 'XN--H2BREG3EVE', 'XN--H2BRJ9C',
            'XN--H2BRJ9C8C', 'XN--HXT814E', 'XN--I1B6B1A6A2E', 'XN--IMR513N',
            'XN--IO0A7I', 'XN--J1AEF', 'XN--J1AMH', 'XN--J6W193G',
            'XN--JLQ480N2RG', 'XN--JLQ61U9W7B', 'XN--JVR189M', 'XN--KCRX77D1X4A',
            'XN--KPRW13D', 'XN--KPRY57D', 'XN--KPU716F', 'XN--KPUT3I', 'XN--L1ACC',
            'XN--LGBBAT1AD8J', 'XN--MGB9AWBF', 'XN--MGBA3A3EJT', 'XN--MGBA3A4F16A',
            'XN--MGBA7C0BBN0A', 'XN--MGBAAKC7DVF', 'XN--MGBAAM7A8H',
            'XN--MGBAB2BD', 'XN--MGBAH1A3HJKRD', 'XN--MGBAI9AZGQP6J',
            'XN--MGBAYH7GPA', 'XN--MGBBH1A', 'XN--MGBBH1A71E', 'XN--MGBC0A9AZCG',
            'XN--MGBCA7DZDO', 'XN--MGBCPQ6GPA1A', 'XN--MGBERP4A5D4AR',
            'XN--MGBGU82A', 'XN--MGBI4ECEXP', 'XN--MGBPL2FH', 'XN--MGBT3DHD',
            'XN--MGBTX2B', 'XN--MGBX4CD0AB', 'XN--MIX891F', 'XN--MK1BU44C',
            'XN--MXTQ1M', 'XN--NGBC5AZD', 'XN--NGBE9E0A', 'XN--NGBRX', 'XN--NODE',
            'XN--NQV7F', 'XN--NQV7FS00EMA', 'XN--NYQY26A', 'XN--O3CW4H',
            'XN--OGBPF8FL', 'XN--OTU796D', 'XN--P1ACF', 'XN--P1AI', 'XN--PBT977C',
            'XN--PGBS0DH', 'XN--PSSY2U', 'XN--Q7CE6A', 'XN--Q9JYB4C',
            'XN--QCKA1PMC', 'XN--QXA6A', 'XN--QXAM', 'XN--RHQV96G', 'XN--ROVU88B',
            'XN--RVC1E0AM3E', 'XN--S9BRJ9C', 'XN--SES554G', 'XN--T60B56A',
            'XN--TCKWE', 'XN--TIQ49XQYJ', 'XN--UNUP4Y', 'XN--VERMGENSBERATER-CTB',
            'XN--VERMGENSBERATUNG-PWB', 'XN--VHQUV', 'XN--VUQ861B',
            'XN--W4R85EL8FHU5DNRA', 'XN--W4RS40L', 'XN--WGBH1C', 'XN--WGBL6A',
            'XN--XHQ521B', 'XN--XKC2AL3HYE2A', 'XN--XKC2DL3A5EE0H', 'XN--Y9A3AQ',
            'XN--YFRO4I67O', 'XN--YGBI2AMMX', 'XN--ZFR164B', 'XXX', 'XYZ',
            'YACHTS', 'YAHOO', 'YAMAXUN', 'YANDEX', 'YE', 'YODOBASHI', 'YOGA',
            'YOKOHAMA', 'YOU', 'YOUTUBE', 'YT', 'YUN', 'ZA', 'ZAPPOS', 'ZARA',
            'ZERO', 'ZIP', 'ZM', 'ZONE', 'ZUERICH', 'ZW',
        ];
        return tldList.includes(arg.toUpperCase())

    },
    isDate: (arg: string) => {
        const dateObj = Date.parse(arg)
        return !isNaN(dateObj);
    },
}
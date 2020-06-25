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
    isURL: (arg: string) => {
        try {
            new URL(arg);
            return true
        } catch (_) {
            return false;
        }
    },
    isDate: (arg: string) => {
        const dateObj = Date.parse(arg)
        return !isNaN(dateObj);
    },
}
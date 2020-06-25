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
    isDate: (arg: string) => {
        const dateObj = Date.parse(arg)
        return !isNaN(dateObj);
    },
}
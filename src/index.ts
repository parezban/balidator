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
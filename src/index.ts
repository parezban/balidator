type BalidatorType = {
    [key: string]: (v: any) => boolean;
};

const Balidator: BalidatorType = {
    isDefined: (arg: any) => arg !== undefined && arg !== null,
    isFunc: (arg: any) => typeof arg === "function",
    isBoolean: (arg: any) => typeof arg === "boolean",
    isObject: (arg: any) => arg === Object(arg),
    isNumber: (arg: any) => typeof arg === "number",
    isInteger: (arg: any) => Balidator.isNumber(arg) && arg % 1 === 0,
    isString: (arg: any) => typeof arg === "string",
    isArray: (arg: any) => Array.isArray(arg),
    isNull: (arg: any) => arg === null,
    isPromise: (arg: any) => Balidator.isDefined(arg.then) && Balidator.isFunc(arg.then),

}
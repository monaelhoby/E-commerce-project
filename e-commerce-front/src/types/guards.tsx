const IsAstring = (value : string | unknown): value is string => {
    return typeof value === "string"
}


export {IsAstring}
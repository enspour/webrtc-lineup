export default (data: any) => {
    return JSON.stringify(
        data, 
        (_, value) => typeof value === "bigint" 
            ? value.toString() 
            : value
    )
}
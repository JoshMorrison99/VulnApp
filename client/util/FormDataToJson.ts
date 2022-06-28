export const FormDataToJSON = (data: FormData) => {
    var object: Object = {}
    data.forEach((value:any, key:any) => {
        object[key as keyof Object] = value;
    })
    return object
}
 export interface APIS {
    provider: string,
    Site_Alias: string,
    data: DATA,
    date_registered, string,
    keyID: string,
    id: number

}
export interface  DATA {
    Key: string,
    Rate_Limited: Boolean,
    Rate_Per_Hour: string,
    User_Email: string
}

export interface Response {
    result:APIS
}
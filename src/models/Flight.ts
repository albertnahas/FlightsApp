/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
export interface Flight {
    id: string,
    dTime: number,
    aTime: number,
    dTimeUTC: number,
    aTimeUTC: number,
    airline?: string,
    airlines?: string[],
    cityFrom: string,
    cityCodeFrom: string,
    cityTo: string,
    cityCodeTo: string,
    fly_duration?: string,
    price?: number,
    route?: Flight[]
}

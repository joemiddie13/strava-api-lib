export interface Athlete {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    profile: string;
}
export interface StravaApiOptions {
    accessToken: string;
}
export declare class StravaAPI {
    private accessToken;
    constructor(options: StravaApiOptions);
    /**
     * Fetch athlete information.
     */
    getAthlete(): Promise<Athlete>;
}

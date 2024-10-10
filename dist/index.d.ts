interface StravaConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}
declare class StravaAPI {
    private axiosInstance;
    private config;
    private accessToken;
    constructor(config: StravaConfig);
    authenticate(code: string): Promise<void>;
    getAthlete(): Promise<any>;
    getActivities(page?: number, perPage?: number): Promise<any[]>;
    getAuthorizationUrl(): string;
}
export default StravaAPI;

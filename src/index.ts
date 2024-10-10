import axios from 'axios';

interface StravaConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

class StravaAPI {
  private axiosInstance: any;
  private config: StravaConfig;
  private accessToken: string | null = null;

  constructor(config: StravaConfig) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: 'https://www.strava.com/api/v3',
    });
  }

  async authenticate(code: string): Promise<void> {
    try {
      const response = await this.axiosInstance.post('/oauth/token', {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
      });
      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  async getAthlete(): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await this.axiosInstance.get('/athlete', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get athlete:', error);
      throw error;
    }
  }

  async getActivities(page: number = 1, perPage: number = 30): Promise<any[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await this.axiosInstance.get('/athlete/activities', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get activities:', error);
      throw error;
    }
  }

  getAuthorizationUrl(): string {
    return `https://www.strava.com/oauth/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.redirectUri}&scope=read,activity:read`;
  }
}

export default StravaAPI;

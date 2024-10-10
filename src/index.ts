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

export class StravaAPI {
  private accessToken: string;

  constructor(options: StravaApiOptions) {
    this.accessToken = options.accessToken;
  }

  /**
   * Fetch athlete information.
   */
  public async getAthlete(): Promise<Athlete> {
    const response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching athlete data: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the data to the Athlete interface
    const athlete: Athlete = {
      id: data.id,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      profile: data.profile,
    };

    return athlete;
  }
}

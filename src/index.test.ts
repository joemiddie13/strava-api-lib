import { StravaAPI, Athlete } from './index';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('StravaAPI', () => {
  it('should fetch athlete information successfully', async () => {
    const mockAthleteData = {
      id: 123456,
      username: 'jane_doe',
      firstname: 'Jane',
      lastname: 'Doe',
      profile: 'https://via.placeholder.com/150',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockAthleteData), { status: 200 });

    const strava = new StravaAPI({ accessToken: 'fake-token' });
    const athlete: Athlete = await strava.getAthlete();

    expect(fetchMock).toHaveBeenCalledWith('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: 'Bearer fake-token',
      },
    });

    expect(athlete).toEqual(mockAthleteData);
  });

  it('should throw an error if the response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 401, statusText: 'Unauthorized' });

    const strava = new StravaAPI({ accessToken: 'invalid-token' });

    await expect(strava.getAthlete()).rejects.toThrow('Error fetching athlete data: Unauthorized');
  });
});

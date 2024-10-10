import axios from 'axios';
import StravaAPI from '../index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StravaAPI', () => {
  let stravaApi: StravaAPI;
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      post: jest.fn(),
      get: jest.fn(),
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    stravaApi = new StravaAPI({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      redirectUri: 'http://localhost:3000/callback',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('authenticate should set access token on successful response', async () => {
    const mockResponse = { data: { access_token: 'test-access-token' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    await stravaApi.authenticate('test-code');

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/oauth/token', expect.any(Object));
    expect(stravaApi['accessToken']).toBe('test-access-token');
  });

  test('getAthlete should throw error if not authenticated', async () => {
    await expect(stravaApi.getAthlete()).rejects.toThrow('Not authenticated');
  });

  test('getAthlete should return athlete data when authenticated', async () => {
    const mockAthleteData = { id: 1, firstname: 'John', lastname: 'Doe' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAthleteData });

    stravaApi['accessToken'] = 'test-access-token';
    const result = await stravaApi.getAthlete();

    expect(result).toEqual(mockAthleteData);
  });

  test('getActivities should return activities data when authenticated', async () => {
    const mockActivitiesData = [{ id: 1, name: 'Morning Run' }];
    mockAxiosInstance.get.mockResolvedValue({ data: mockActivitiesData });

    stravaApi['accessToken'] = 'test-access-token';
    const result = await stravaApi.getActivities();

    expect(result).toEqual(mockActivitiesData);
  });

  test('getAuthorizationUrl should return correct URL', () => {
    const url = stravaApi.getAuthorizationUrl();
    expect(url).toBe('https://www.strava.com/oauth/authorize?client_id=test-client-id&response_type=code&redirect_uri=http://localhost:3000/callback&scope=read,activity:read');
  });
});

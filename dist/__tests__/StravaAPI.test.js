"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../index"));
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('StravaAPI', () => {
    let stravaApi;
    let mockAxiosInstance;
    beforeEach(() => {
        mockAxiosInstance = {
            post: jest.fn(),
            get: jest.fn(),
        };
        mockedAxios.create.mockReturnValue(mockAxiosInstance);
        stravaApi = new index_1.default({
            clientId: 'test-client-id',
            clientSecret: 'test-client-secret',
            redirectUri: 'http://localhost:3000/callback',
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('authenticate should set access token on successful response', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = { data: { access_token: 'test-access-token' } };
        mockAxiosInstance.post.mockResolvedValue(mockResponse);
        yield stravaApi.authenticate('test-code');
        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/oauth/token', expect.any(Object));
        expect(stravaApi['accessToken']).toBe('test-access-token');
    }));
    test('getAthlete should throw error if not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(stravaApi.getAthlete()).rejects.toThrow('Not authenticated');
    }));
    test('getAthlete should return athlete data when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAthleteData = { id: 1, firstname: 'John', lastname: 'Doe' };
        mockAxiosInstance.get.mockResolvedValue({ data: mockAthleteData });
        stravaApi['accessToken'] = 'test-access-token';
        const result = yield stravaApi.getAthlete();
        expect(result).toEqual(mockAthleteData);
    }));
    test('getActivities should return activities data when authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockActivitiesData = [{ id: 1, name: 'Morning Run' }];
        mockAxiosInstance.get.mockResolvedValue({ data: mockActivitiesData });
        stravaApi['accessToken'] = 'test-access-token';
        const result = yield stravaApi.getActivities();
        expect(result).toEqual(mockActivitiesData);
    }));
    test('getAuthorizationUrl should return correct URL', () => {
        const url = stravaApi.getAuthorizationUrl();
        expect(url).toBe('https://www.strava.com/oauth/authorize?client_id=test-client-id&response_type=code&redirect_uri=http://localhost:3000/callback&scope=read,activity:read');
    });
});

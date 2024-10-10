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
class StravaAPI {
    constructor(config) {
        this.accessToken = null;
        this.config = config;
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://www.strava.com/api/v3',
        });
    }
    authenticate(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post('/oauth/token', {
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                    code,
                    grant_type: 'authorization_code',
                });
                this.accessToken = response.data.access_token;
            }
            catch (error) {
                console.error('Authentication failed:', error);
                throw error;
            }
        });
    }
    getAthlete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                throw new Error('Not authenticated');
            }
            try {
                const response = yield this.axiosInstance.get('/athlete', {
                    headers: { Authorization: `Bearer ${this.accessToken}` },
                });
                return response.data;
            }
            catch (error) {
                console.error('Failed to get athlete:', error);
                throw error;
            }
        });
    }
    getActivities(page = 1, perPage = 30) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                throw new Error('Not authenticated');
            }
            try {
                const response = yield this.axiosInstance.get('/athlete/activities', {
                    headers: { Authorization: `Bearer ${this.accessToken}` },
                    params: { page, per_page: perPage },
                });
                return response.data;
            }
            catch (error) {
                console.error('Failed to get activities:', error);
                throw error;
            }
        });
    }
    getAuthorizationUrl() {
        return `https://www.strava.com/oauth/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.redirectUri}&scope=read,activity:read`;
    }
}
exports.default = StravaAPI;

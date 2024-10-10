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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StravaAPI = void 0;
class StravaAPI {
    constructor(options) {
        this.accessToken = options.accessToken;
    }
    /**
     * Fetch athlete information.
     */
    getAthlete() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://www.strava.com/api/v3/athlete', {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching athlete data: ${response.statusText}`);
            }
            const data = yield response.json();
            // Map the data to the Athlete interface
            const athlete = {
                id: data.id,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                profile: data.profile,
            };
            return athlete;
        });
    }
}
exports.StravaAPI = StravaAPI;

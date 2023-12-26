import { constants } from "../constants";



import axios from "axios";
export class BaseService {

    httpClient: any = axios.create({ baseURL: constants.baseUrl });

    constructor() {

        // This interceptor is used for sending token in headers for Authorization.

        this.httpClient.interceptors.request.use((request: any) => {
            if (!request.headers?.authorization) {
                const token = localStorage.getItem("token") ? String("Bearer " + localStorage.getItem("token")) : '';
                request.headers = { Authorization: token, "ngrok-skip-browser-warning": "69420",...request.headers };
            }
            return request;
        });

        this.httpClient.interceptors.response.use((response: any) => {
            return response;
        }, (error: any) => {
            const err = Promise.reject(error);
            if (error.response.status === 401) {
                localStorage.clear()
                this.autoLogout();
            }

            return err;
        });
    }

    async autoLogout(): Promise<void> {
        localStorage.clear();
        setTimeout(() => {
            window.open(window.location.origin, "_self");
        }, 3000)
    }
}
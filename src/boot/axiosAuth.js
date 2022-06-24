import axios from "axios";
// Import the quasar framework notifier
import { Notify } from 'quasar';
// Import the storage
import * as storage from "../boot/storage";

const api = axios.create({});

// Add XMLHttpRequest to axios
api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Add the bearer token to the header
api.interceptors.request.use(
    function (config) {
        // Get the token from local storage
        const token = storage.getAuthToken();
        // Add the token to the header
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

// Add a response interceptor
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const status = error.response.status;
        if (status === 401) {
            // Display a notification unauthorized
            Notify.create({
                message: 'Unauthorized',
                color: 'red'
            });
        } else if (
            status === 402) {
            console.log("402");
        } else if (
            status === 403
        ) {
            console.log("403");
        } else if (status === 400) {
            // Validation error
            for (const [key, value] of Object.entries(error.response.data)) {
                // Display a notification
                Notify.create({
                    message: value[0],
                    color: 'red'
                });
            }
        }
        return Promise.reject(error);
    }
);

export { api, axios };

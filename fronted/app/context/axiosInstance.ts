import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const createAxiosInstance = () => {
    const { accessToken, refreshToken, setTokens, clearTokens } = useAuth();
    // console.log("Access token",accessToken);
    
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000"
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (accessToken) {
              config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
          },
          (error) => Promise.reject(error)
    );
    // console.log(accessToken,refreshToken);
    
    axiosInstance.interceptors.request.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (refreshToken) {
                    try {
                        const response = axios.post("http://localhost:5000/token/refreshToken", {}, {
                            headers: {
                                'x-refresh-token': refreshToken,
                            },
                        })

                        const newAccessToken = (await response).data.accessToken;
                        setTokens(newAccessToken,refreshToken);
                        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest)
                    } catch (error) {
                        console.error("Refresh token error",error);
                        // clearTokens()
                    }
                }
            }
            return Promise.reject(error)
        }
    );
    return axiosInstance;
}

export default createAxiosInstance

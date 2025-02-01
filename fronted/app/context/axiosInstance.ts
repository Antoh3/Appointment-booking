import axios from "axios";
import { useAuth } from "./AuthContext";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// const router = useRouter();

const createAxiosInstance = () => {
    const { auth, setAuth } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5001",
    });

    // Attach access token to every request
    axiosInstance.interceptors.request.use(
        (config) => {
            if (auth.accessToken) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Handle 401 responses and refresh tokens
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If token expired and it's the first retry
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    console.error("No refresh token available");
                    // router.push("/auth/login");
                    return Promise.reject(error);
                }

                try {
                    // Use refresh token to get new access token
                    const refreshToken = auth.refreshToken;

                    if (!refreshToken) {
                        throw new Error("No refresh token available");
                    }

                    const response = await axios.post("http://localhost:5001/token/refreshToken", {}, {
                        headers: {
                            'x-refresh-token': refreshToken,
                        },
                    });

                    const newAccessToken = response.data.accessToken;

                    // Update auth context
                    setAuth({
                        accessToken: newAccessToken,
                        refreshToken: auth.refreshToken!,
                    });

                    // Retry the original request with the new token
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh token", refreshError);
                    // router.push("/auth/login");
                    // You can handle logout or token clearing here if needed
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default createAxiosInstance;

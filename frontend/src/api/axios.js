import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3000/api"
})

axios.interceptors.response.use(
    response => response,
  
    async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        alert("session expired, please login again")
        originalRequest._retry = true; 
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
  
          const response = await axios.post('/auth/refresh', { token: refreshToken });
  
          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
  
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          // Optionally handle logout or redirect to login page here if the refresh fails
        }
      }
  
      return Promise.reject(error);
    }
  );
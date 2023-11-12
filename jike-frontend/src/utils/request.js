import axios from "axios";
import router from "@/router";
import {getToken, removeToken} from "@/utils/token";

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
});


instance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  result => {
    return result.data

  },
  error => {
    if (error.response.status === 401) {
      removeToken()
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default instance
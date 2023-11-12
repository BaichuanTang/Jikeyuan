import request from "@/utils/request";

export const loginApi = (loginForm) => {
  return request.post('/authorizations', loginForm);
}

export const getUserProfileApi = () => {
  return request.get('/user/profile');
}

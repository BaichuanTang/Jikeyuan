import request from "@/utils/request";

export const getChannelApi = () => {
  return request.get('/channels');
}

export const createArticleApi = (data) => {
  return request.post('/mp/articles?draft=false', data);
}

export const getArticleListApi = () => {
  return request.get('/mp/articles');
}

export const delArticleApi = (id) => {
  return request.delete(`/mp/articles/${id}`);
}

export const getArticleByIdApi = (id) => {
  return request.get(`/mp/articles/${id}`);
}

export const updateArticleApi = (data,id) => {
  return request.put(`/mp/articles/${id}?draft=false`, data);
}

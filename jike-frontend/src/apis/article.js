import request from "@/utils/request";

export const getChannelApi = () => {
  return request.get('/channels');
}

export const createArticleApi = (data) => {
  return request.post('/mp/articles?draft=false',data);
}

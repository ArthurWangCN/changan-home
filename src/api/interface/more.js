// 门户页点击 "更多" 页面接口
import axios from '../instance';
import qs from 'qs';

//获取用户信息
export const getUserInfo = params => axios.post('/index/user/getUserInfo', params);

//获取通知公告列表
export const getNotice = params => axios.get('/index/notice/list', { params });

//获取通知公告详情
export const getNoticeInfo = params => axios.get('/notice/info', { params });

// 搜同事
export const findColleague = params => axios({
  url: '/index/user/findColleague',
  method: 'POST',
  data: params,
  headers: {
    'Content-type': 'application/json;charset=UTF-8'
  },
});

// 意见反馈记录接口
export const getOpinionTypeList = params => axios.get('/opinion/type/all', { params });

// 意见提交接口
export const submitOpinion = params => axios.post('/opinion/submit', params);

// 提交外部行业资讯需求
export const submitDemand = params => axios.post('/demand/add', params);

// 意见反馈记录接口
export const getOpinionList = params => axios.get('/opinion/list', { params });

// 需求反馈记录接口
export const getDemandList = params => axios.get('/demand/list', { params });

// 热点知识列表
// export const getRecommendKnoList = params => axios.get('/index/kno/recommend/list', { params });

// 推荐知识列表
export const getRecommendKnoList = params => axios.get('/index/kno/recommend/list', { params });

export default {
  getNotice,
  getNoticeInfo,
  findColleague,
  getOpinionTypeList,
  submitOpinion,
  submitDemand,
  getOpinionList,
  getDemandList,
  getRecommendKnoList
}

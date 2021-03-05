import axios from '../instance';

//获取用户信息
export const getUserInfo = params => axios.post('/index/user/getUserInfo', params);

//获取专业频道列表
export const getChannel = params => axios.get('/index/channel/zylist', { params });

//获取通用频道知识列表
export const getCommonKnowledge = params => axios.get('/index/kno/common/list', { params });

//获取热门圈子列表
export const getHotForum = params => axios.get('/index/circle/list', { params });

//获取热门专栏
export const getHotColumn = params => axios.get('/index/spe/list', { params });

//获取行业资讯列表
export const getInformation = params => axios.get('/index/information/type/list', { params });

//获取资讯详情列表
export const getInformationItem = params => axios.get('/index/information/list/', { params });

//获取热门话题
export const getHotTopic = params => axios.get('/index/circle/topic', { params });

//获取推荐知识
export const getRecommendKno = params => axios.get('/index/kno/recommend/list', { params });

//获取最新知识
export const getNewKno = params => axios.get('/index/kno/knoNewestList', { params });

//话题权限
export const getTopicItem = params => axios.get('/index/circle/verifyQuestion', { params });

//专栏权限
export const getSpecialDetail = params => axios.get('/index/spe/selectUserColPower', { params });

//订阅专栏
export const getSubscribe = params => axios.get('/index/spe/subscribe', { params });

//取消订阅专栏
export const DeleteSubscribe = params => axios.get('/index/spe/unsubscribe', { params });

//加入圈子
export const joinCircle = params => axios.get('/index/circle/joinCircle', { params });

// 轮播图列表
export const getBanner = params => axios.get('/index/banner/list', { params });

// 热搜词
export const getHotWordList = params => axios.get('/index/hotWord/list', { params });

// 热门标签
export const getHotTags = params => axios.get('/index/kno/hotLabelList', { params });

// 热点知识
export const getHotKnoList = params => axios.get('/index/kno/hotKnoList', { params });

export default {
  getUserInfo,
  getChannel,
  getCommonKnowledge,
  getHotForum,
  getHotColumn,
  getInformation,
  getInformationItem,
  getHotTopic,
  getRecommendKno,
  getNewKno,
  getTopicItem,
  getSpecialDetail,
  getSubscribe,
  DeleteSubscribe,
  joinCircle,
  getBanner,
  getHotWordList,
  getHotTags,
  getHotKnoList,
}
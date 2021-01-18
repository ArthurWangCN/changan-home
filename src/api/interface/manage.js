// 后台管理页面接口
import axios from '../instance';

// 获取意见建议列表
export const getOpinionList = params => axios.get('/opinion/page', { params });

// 意见反馈回复
export const replyOpinion = params => axios.put('/opinion/reply', params);

// 意见反馈导出Excel
export const getOpinionExcel = params => axios({
  url: '/opinion/excel',
  method: 'GET',
  data: params,
  responseType: 'blob'
});

// 获取意见反馈类型列表
export const getOpinionTypeList = params => axios.get('/opinion/type/getAllOpinionType', { params });

// 添加意见反馈类型
export const addOpinionType = params => axios.post('/opinion/type/add', params);

// 编辑意见反馈类型
export const editOpinionType = params => axios.put('/opinion/type/update', params);

// 删除意见反馈类型
export const delOpinionType = params => axios.delete('/opinion/type/' + params);

// 意见反馈类型导出Excel
export const getOpinionTypeExcel = params => axios({
  url: '/opinion/type/excel',
  method: 'GET',
  data: params,
  responseType: 'blob'
});

// 获取用户需求列表
export const getDemandList = params => axios.get('/demand/page', { params });

// 用户需求回复
export const replyDemand = params => axios.put('/demand/reply', params);

// 意见反馈类型导出Excel
export const getDemandExcel = params => axios({
  url: '/demand/excel',
  method: 'GET',
  data: params,
  responseType: 'blob'
});

// 获取通知公告列表
export const getNoticeList = params => axios.get('/notice/list', { params });

// 获取通知公告详情
export const getNoticeInfo = params => axios.get('/notice/info', { params });

// 发布公告
export const addNotice = params => axios.post('/notice/add', params);

// 编辑公告
export const editNotice = params => axios.post('/notice/update', params);

// 删除通知公告
export const delNotice = params => axios.delete('/notice/delete', { params });

// 获取热门圈子列表
export const getHotCircleList = params => axios.get('/hotCircleManage/list', { params });

// 热门圈子首页置顶
export const topHotCircle = params => axios.put('/hotCircleManage/portalCircleTop', params);

// 获取热门专栏列表
export const getHotColumnList = params => axios.get('/hotColumnManage/list', { params });

// 热门专栏首页置顶
export const topHotColumn = params => axios.put('/hotColumnManage/isHomeTop', params);

// 获取热门话题列表
export const getHotTopicList = params => axios.get('/hotQuestionManage/list', { params });

// 热门话题首页置顶
export const topHotTopic = params => axios.put('/hotQuestionManage/portalCircleTop', params);

// 轮播图列表
export const getBannerList = params => axios.get('/banner/list', { params });

// 添加轮播图
// export const addBanner = params => axios.put(`/banner/add?imgUrl=${params.imgUrl}&title=${params.title}&isShow=1&isTop=${params.isTop}`);
export const addBanner = params => axios.put('/banner/add', params);
// 获取热门话题列表
export const getBannerInfo = params => axios.get('/banner/info', { params });

// 编辑轮播图
export const editBanner = params => axios.post('/banner/update', params);

// 删除通知公告
export const delBanner = params => axios.delete('/banner/delete', { params });

export default {
  getOpinionList,
  replyOpinion,
  getOpinionExcel,
  getOpinionTypeList,
  addOpinionType,
  editOpinionType,
  delOpinionType,
  getOpinionTypeExcel,
  getDemandList,
  replyDemand,
  getDemandExcel,
  getNoticeList,
  getNoticeInfo,
  addNotice,
  editNotice,
  delNotice,
  getHotCircleList,
  topHotCircle,
  getHotColumnList,
  topHotColumn,
  getHotTopicList,
  topHotTopic,
  getBannerList,
  addBanner,
  getBannerInfo,
  editBanner,
  delBanner,
}
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
export const getNoticeList = params => axios.get('/index/notice/list', { params });

// 发布公告
export const addNotice = params => axios.post('/notice/add', params);

// 删除通知公告
export const delNotice = params => axios.delete('/notice/delete', { params });


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
  delNotice,
}
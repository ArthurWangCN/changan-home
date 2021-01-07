// 后台管理页面接口
import axios from '../instance';

// 获取意见建议列表
export const getOpinionList = params => axios.get('/opinion/page', { params });

// 意见反馈回复
export const replyOpinion = params => axios.put('/opinion/reply', params);

//意见反馈导出Excel
export const getOpinionExcel = params => axios.get('/opinion/excel', { params });

// 获取意见反馈类型列表
export const getOpinionTypeList = params => axios.get('/opinion/type/all', { params });

// 添加意见反馈类型
export const addOpinionType = params => axios.post('/opinion/type/add', params);

// 获取用户反馈列表
export const getDemandList = params => axios.get('/demand/page', { params });

export default {
  getOpinionList,
  replyOpinion,
  getOpinionExcel,
  getOpinionTypeList,
  addOpinionType,
  getDemandList
}
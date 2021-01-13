// 门户页点击 "更多" 页面接口
import axios from '../instance';

//获取用户信息
export const getUserInfo = params => axios.post('/index/user/getUserInfo', params);

//获取通知公告列表
export const getNotice = params => axios.get('/index/notice/list', { params });

//获取通知公告详情
export const getNoticeInfo = params => axios.get('/notice/info', { params });

export default {
  getNotice,
  getNoticeInfo
}

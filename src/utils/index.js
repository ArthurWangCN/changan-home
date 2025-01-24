// 时间截取
const showDate = (date) => {
  return date && date.slice(0, 10).replace(/-/g, "/");
}

//线上公共域名地址
const publiceUrl = window.location.origin

const mapdata = [{
  title: "项目管理流程地图",
  styleObject: {}
},
{
  title: "项目研发思维导图",
  styleObject: {}
}, {
  title: "空调研发知识地图",
  styleObject: {}
}, {
  title: "车底盘研发知识地图",
  styleObject: {}
}, {
  title: "智能驾驶研发知识地图",
  styleObject: {}
}, {
  title: "发动机技术知识地图",
  styleObject: {}
}, {
  title: "动力电池技术知识地图",
  styleObject: {}
}, {
  title: "动能回收技术知识地图",
  styleObject: {}
}]

const colordata = ["#6f94fd", "#edc62e", "#1bc696", "#61baff", "#8662cf", "#eca22e", "#4693f2"]

// 下载Excel
const downloadExcel = (res, fileName) => {
  let blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"}); // 为blob设置文件类型，这里以.xlsx为例
  if ('download' in document.createElement('a')) { // 非IE下载
    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    // 释放这个临时的对象url
    window.URL.revokeObjectURL(url);
  } else {  // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}

// html转纯文本
const html2text = (htmlStr) => {
  if (!htmlStr) return '';
  let reg=/<\/?.+?\/?>/g;
  return htmlStr.replace(reg,'');
}

const formatList = {
  'word': ['doc', 'docx'],
  'xls': ['xls', 'xlsx'],
  'ppt': ['ppt', 'pptx'],
  'pdf': ['pdf'],
  'caj': ['caj'],
  'kdh': ['kdh'],
  'xml': ['xml'],
  'txt': ['txt'],
  'zip': ['rar', 'zip'],
  'img': ['jpg', 'png', 'tif', 'jpeg', 'webp'],
  'gif': ['gif'],
  'mind': ['xmind', 'md'],
  'audio': ['wav', 'mp3', 'wma', 'aac', 'flac'],
  'video': ['avi', 'mov', 'swf', 'flv', 'mp4', 'mpg', 'mpeg', 'rm', 'rmvb'],
};

// 获取文件图标
const getFileIcon = (format) => {
  if (!format) return;
  let iconType;
  for (let key in formatList) {
    if (formatList[key].indexOf(format) > -1) {
      iconType = key;
    }
  }
  return iconType || 'other';
}

// 格式化日期  YYYY-MM-DD HH:mm:ss => YYYY/MM/DD
const formatDate = (d) => {
  // let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(d);
  if (!d) return '';
  let date = d.substr(0, 10);
  date = date.replace(/-/g, '/');
  return date;
}

// 首页组件
const compObj = {
  "知识目录体系": "Knowledge",
  "轮播图": "BannerComp", // 专业频道/轮播图/个人中心
  "推荐知识": "Recommendknowledge",
  "专栏广场": "Column",
  "项目知识地图": "Map",
  "热门话题/最新话题": "HotTopic",
  "通知公告": "Notice",
  "热门圈子": "HotForum",
  "热点知识": "HotKnowledge",
  "技术资讯": "Information",
  "热门标签": "HotTag",
}

export {
  showDate,
  publiceUrl,
  mapdata,
  colordata,
  downloadExcel,
  html2text,
  getFileIcon,
  formatDate,
  compObj,
}
















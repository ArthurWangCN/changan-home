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

export {
  showDate,
  publiceUrl,
  mapdata,
  colordata
}
















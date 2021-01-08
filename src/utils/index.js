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

export {
  showDate,
  publiceUrl,
  mapdata,
  colordata,
  downloadExcel
}
















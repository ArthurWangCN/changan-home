<template>
  <div style="position: relative; height: 170px">
    <div
      class="knowlege"
      :class="{ fold: fold, unfold: !fold }"
      @mouseenter="fold = false"
      @mouseleave="fold = true"
    >
      <div class="common-knowlege knowlege-channel">
        <div class="knowlege-channel-title">
          <div class="icon-wrapper iconbasics">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#iconbasics" />
            </svg>
          </div>
          {{ common.systemName }}
        </div>
        <div class="knowlege-items">
          <div class="knowlege-row knowlege-channel-row">
            <span
              v-for="(commonLevelTwo, index) in common.children"
              :key="commonLevelTwo.id"
            >
              <el-dropdown placement="bottom-start">
                <span
                  class="el-dropdown-link"
                  @click="goSearch(commonLevelTwo.systemCode)"
                >
                  {{ commonLevelTwo.systemName }}
                </span>
                <el-divider
                  v-if="index + 1 !== common.children.length"
                  direction="vertical"
                />
                <el-dropdown-menu
                  slot="dropdown"
                  v-if="commonLevelTwo.children"
                >
                  <el-scrollbar>
                    <div style="height: 410px">
                      <el-dropdown-item
                        :style="dropdownItemStyle"
                        v-for="commonLevelThree in commonLevelTwo.children"
                        :key="commonLevelThree.id"
                      >
                        <div
                          class="dropdown-title"
                          @click="goSearch(commonLevelThree.systemCode)"
                        >
                          <span>{{ commonLevelThree.systemName }}</span>
                        </div>
                        <div
                          style="width: 100%"
                          v-if="commonLevelThree.children"
                          class="dropdown-knowledge"
                        >
                          <span
                            v-for="(
                              commonLevelFour, i
                            ) in commonLevelThree.children"
                            :key="commonLevelFour.id"
                            @click="goSearch(commonLevelFour.systemCode)"
                          >
                            {{ commonLevelFour.systemName }}
                            <el-divider
                              v-if="i + 1 !== commonLevelThree.children.length"
                              direction="vertical"
                            />
                          </span>
                        </div>
                        <div class="knowledge-nodata" v-else>
                          <svg class="iconfont" aria-hidden="true">
                            <use xlink:href="#iconnothing" />
                          </svg><span>暂无内容</span>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-scrollbar>
                </el-dropdown-menu>
                <el-dropdown-menu
                  slot="dropdown"
                  v-else
                  style="border: none"
                ></el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </div>
      </div>
      <el-divider direction="vertical" class="knowlege-column-divider" />
      <div class="project-knowlege knowlege-channel">
        <div class="knowlege-channel-title">
          <div class="icon-wrapper iconproject">
            <svg class="iconfont iconproject" aria-hidden="true">
              <use xlink:href="#iconproject" />
            </svg>
          </div>
          {{ project.systemName }}
        </div>
        <div class="knowlege-items">
          <div class="knowlege-row knowlege-channel-row">
            <span
              v-for="(projectLevelTwo, index) in project.children"
              :key="projectLevelTwo.id"
            >
              <el-dropdown placement="bottom-start">
                <span
                  class="el-dropdown-link"
                  @click="goSearch(projectLevelTwo.systemCode)"
                >
                  {{ projectLevelTwo.systemName }}
                </span>
                <el-divider
                  v-if="index + 1 !== project.children.length"
                  direction="vertical"
                />
                <el-dropdown-menu
                  slot="dropdown"
                  v-if="projectLevelTwo.children"
                >
                  <el-scrollbar>
                    <div style="height: 410px">
                      <el-dropdown-item
                        :style="dropdownItemStyle"
                        v-for="projectLevelThree in projectLevelTwo.children"
                        :key="projectLevelThree.id"
                      >
                        <div
                          class="dropdown-title"
                          @click="goSearch(projectLevelThree.systemCode)"
                        >
                          <span>{{ projectLevelThree.systemName }}</span>
                        </div>
                        <div
                          style="width: 100%"
                          v-if="projectLevelThree.children"
                          class="dropdown-knowledge"
                        >
                          <span
                            v-for="(
                              projectLevelFour, i
                            ) in projectLevelThree.children"
                            :key="projectLevelFour.id"
                            @click="goSearch(projectLevelFour.systemCode)"
                          >
                            {{ projectLevelFour.systemName }}
                            <el-divider
                              v-if="i + 1 !== projectLevelThree.children.length"
                              direction="vertical"
                            />
                          </span>
                        </div>
                        <div class="knowledge-nodata" v-else>
                          <svg class="iconfont" aria-hidden="true">
                            <use xlink:href="#iconnothing" />
                          </svg><span>暂无内容</span>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-scrollbar>
                </el-dropdown-menu>
                <el-dropdown-menu
                  slot="dropdown"
                  v-else
                  style="border: none"
                ></el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommonKnowledge } from "../api/interface/home";
import { publiceUrl } from "@/utils/index.js";

// 扁平数据转换成树结构
const flatToTree = (data) => {
  let res = [],
    tmpMap = [];
  for (let i = 0; i < data.length; i++) {
    tmpMap[data[i]["id"]] = data[i];
    if (tmpMap[data[i]["parentId"]]) {
      if (!tmpMap[data[i]["parentId"]]["children"]) {
        tmpMap[data[i]["parentId"]]["children"] = [];
      }
      tmpMap[data[i]["parentId"]]["children"].push(data[i]);
    } else {
      data[i].allName = data[i].realName;
      res.push(data[i]);
    }
  }
  return res;
};

export default {
  data() {
    return {
      common: {}, //通用基础知识
      project: {}, //项目知识
      dropdownItemStyle: {
        width: "598px",
        background: "transparent!important",
        color: "#333",
        fontSize: "12px",
      }, //dropdown 下拉样式
      fold: true, //是否收起
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getCommonKnowledge({})
        .then((res) => {
          let list = flatToTree(res.data);
          this.common = list[0];
          this.project = list[1];
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },

    //跳转详情
    goSearch(systemCode) {
      window.open(
        publiceUrl + "/krd/home/index#/generalSearch?systemCode=" + systemCode
      );
    },
  },
};
</script>
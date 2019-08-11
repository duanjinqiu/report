<template>
    <div class="chart-panel" ref="barChart"></div>
</template>

<script>
import common from "./common/commonOption";
import mixin from "./common/mixin";
import _ from "lodash";
export default {
    name: "barChart",
    mixins: [mixin],
    mounted() {
        let chartInstance = echarts.init(this.$refs.barChart);
        this.chartInstance = chartInstance;
        let option = {
            legend: {
                data: [
                    "邮件营销",
                    "联盟广告",
                    "视频广告",
                    "直接访问",
                    "搜索引擎"
                ]
            },
            xAxis: [
                {
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日"
                    ]
                }
            ],
            series: [
                {
                    name: "邮件营销",
                    type: "bar",
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "联盟广告",
                    type: "bar",
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: "视频广告",
                    type: "bar",
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: "直接访问",
                    type: "bar",
                    areaStyle: { normal: {} },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: "搜索引擎",
                    type: "bar",
                    label: {
                        normal: {
                            show: true,
                            position: "top"
                        }
                    },
                    areaStyle: { normal: {} },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        option = _.merge({}, common, option, this.optionProp);
        chartInstance.setOption(option);
        window.addEventListener("resize", chartInstance.resize);
        this.$on("hook:destroyed", () => {
            window.removeEventListener("resize", chartInstance.resize);
        });
    }
};
</script>

<style scoped>
@import "./common/style/style.css";
</style>
<template>
    <div class="chart-panel" ref="pieChart"></div>
</template>

<script>
import common from "./common/commonOption";
import mixin from "./common/mixin";
import _ from "lodash";
export default {
    name: "pieChart",
    mixins: [mixin],
    mounted() {
        let chartInstance = echarts.init(this.$refs.pieChart);
        this.chartInstance = chartInstance;

        let data = genData();

        let option = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: "scroll",
                orient: "vertical",
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData,
                selected: data.selected
            },
            xAxis: [{
                show: false
            }],
            yAxis: [{
                show: false
            }],
            series: [
                {
                    name: "姓名",
                    type: "pie",
                    radius: "60%",
                    center: ["40%", "50%"],
                    data: data.seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        };

        function genData(count) {
            let nameList = [
                "赵",
                "钱",
                "孙",
                "李",
                "周",
                "吴",
                "郑",
                "王",
                "冯",
                "陈",
                "褚",
                "卫",
                "蒋",
                "沈",
                "韩",
                "杨",
                "朱",
                "秦",
                "尤",
                "许",
                "何",
                "吕",
                "施",
                "张",
                "孔",
                "曹",
                "严",
                "华",
                "金",
                "魏",
                "陶",
                "姜",
                "戚",
                "谢",
                "邹",
                "喻",
                "柏",
                "水",
                "窦",
                "章",
                "云",
                "苏",
                "潘",
                "葛",
                "奚",
                "范",
                "彭",
                "郎",
                "鲁",
                "韦",
                "昌",
                "马",
                "苗",
                "凤",
                "花",
                "方",
                "俞",
                "任",
                "袁",
                "柳",
                "酆",
                "鲍",
                "史",
                "唐",
                "费",
                "廉",
                "岑",
                "薛",
                "雷",
                "贺",
                "倪",
                "汤",
                "滕",
                "殷",
                "罗",
                "毕",
                "郝",
                "邬",
                "安",
                "常",
                "乐",
                "于",
                "时",
                "傅",
                "皮",
                "卞",
                "齐",
                "康",
                "伍",
                "余",
                "元",
                "卜",
                "顾",
                "孟",
                "平",
                "黄",
                "和",
                "穆",
                "萧",
                "尹",
                "姚",
                "邵",
                "湛",
                "汪",
                "祁",
                "毛",
                "禹",
                "狄",
                "米",
                "贝",
                "明",
                "臧",
                "计",
                "伏",
                "成",
                "戴",
                "谈",
                "宋",
                "茅",
                "庞",
                "熊",
                "纪",
                "舒",
                "屈",
                "项",
                "祝",
                "董",
                "梁",
                "杜",
                "阮",
                "蓝",
                "闵",
                "席",
                "季",
                "麻",
                "强",
                "贾",
                "路",
                "娄",
                "危"
            ];
            let legendData = [];
            let seriesData = [];
            let selected = {};
            for (let i = 0; i < 10; i++) {
                name =
                    Math.random() > 0.65
                        ? makeWord(4, 1) + "·" + makeWord(3, 0)
                        : makeWord(2, 1);
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 100000)
                });
                selected[name] = i < 6;
            }

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };

            function makeWord(max, min) {
                let nameLen = Math.ceil(Math.random() * max + min);
                let name = [];
                for (let i = 0; i < nameLen; i++) {
                    name.push(
                        nameList[
                            Math.round(Math.random() * nameList.length - 1)
                        ]
                    );
                }
                return name.join("");
            }
        }

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
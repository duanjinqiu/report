<template>
    <div class="container-fluid">
        <div class="row panel">
            <div class="panel-heading report-title">
                <div style="display: inline-block;background-color: #f8f8f824;padding: 10px 60px;">
                    xxxx信息平台数据看板
                    <show-time ref="gg" class="time"></show-time>
                </div>
            </div>
            <div class="panel-body">
                <div class="no-gutters">
                    <div v-for="(item, index) in table" class="col-xs-12" :class="classVal" :key="index">
                        <div class="box-border">
                            <div class="panel">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        xxxx数据报表{{index + 1}}
                                        <button style="float: right;" type="button" class="btn btn-info btn-xs" v-show="item.chartType !== 'radar-chart' && item.chartType !== 'scatter-chart'" @click="confirm(item, index)">随机数</button>
                                        <select style="float: right;margin-right: 5px; width: 67px;height: 26px;padding: 0;" class="form-control" :value="item.chartType" @change="changeCahrtType($event, item)">
                                            <option value="line-chart">折线图</option>
                                            <option value="bar-chart">柱状图</option>
                                            <option value="pie-chart">饼图</option>
                                            <option value="radar-chart">雷达图</option>
                                            <option value="scatter-chart">散点图</option>
                                        </select>
                                        <!-- <input style="float: right;margin-right: 10px; width: 36px;" class="form-control" type="text" v-model="colNum"> -->
                                        <select style="float: right;margin-right: 5px; width: 40px;height: 26px;padding: 0;" class="form-control" v-model="colNum">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>6</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="chart-container" :style="bgColor()">
                                        <!-- <line-chart :optionProp="item" :shouldResize="shouldResize"></line-chart> -->
                                        <component :is="item.chartType" :optionProp="item.option" :shouldResize="shouldResize"></component>
                                        <!-- <radar-chart  :shouldResize="shouldResize"></radar-chart> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lineChart from "@/components/lineChart.vue";
import barChart from "@/components/barChart.vue";
import pieChart from "@/components/pieChart.vue";
import scatterChart from "@/components/scatterChart.vue";
import radarChart from "@/components/radarChart.vue";
import showTime from "@/components/showTime";

export default {
    data() {
        return {
            showBgColor: false,
            table: [],
            title: "",
            colNum: 3,
            shouldResize: 0
        };
    },
    components: {
        "line-chart": lineChart,
        "bar-chart": barChart,
        "pie-chart": pieChart,
        "scatter-chart": scatterChart,
        "radar-chart": radarChart,
        "show-time": showTime
    },
    computed: {
        classVal() {
            this.shouldResize = ++this.shouldResize;
            let num = 12 / this.colNum;
            return `col-sm-${num} col-md-${num} col-lg-${num}`;
        }
    },
    mounted() {
        function resizeBaseFontSize() {
            var rootHtml = document.documentElement,
                deviceWidth = rootHtml.clientWidth;
            if (deviceWidth > 640) {
                // deviceWidth = 640;
                rootHtml.style.fontSize = 70 + "px";
                return;
            }
            rootHtml.style.fontSize = deviceWidth / 7.5 + "px";
        }
        resizeBaseFontSize();
        window.addEventListener("resize", resizeBaseFontSize, false);
        window.addEventListener("orientationchange", resizeBaseFontSize, false);

        this.table = this.createChart(5);
    },
    methods: {
        confirm(item, index) {
            let methodName = "";
            switch (item.chartType) {
                case "line-chart":
                    methodName = "lineChartRandomData";
                    break;
                case "bar-chart":
                    methodName = "lineChartRandomData";
                    break;
                case "pie-chart":
                    methodName = "pieChartRandomData";
                    let data = this[methodName]();
                    this.$set(item, "option", {
                        legend: {
                            data: data.legendData,
                            selected: data.selected
                        },
                        series: [
                            {
                                data: data.seriesData
                            }
                        ]
                    });
                    return;
                case "radar-chart":
                    return;
                case "scatter-chart":
                    return;
            }
            this.$set(item, "option", {
                series: this[methodName]()
            });
        },
        changeCahrtType(e, item) {
            item.chartType = e.currentTarget.value;
            item.option = {};
        },
        bgColor() {
            let colorArr = [];
            for (let i = 0; i < 3; i++) {
                colorArr.push(Math.random() * 255);
            }
            colorArr.push(0.3);
            // return 'background-color: #f3f3f3;'
            return this.showBgColor
                ? `background-color: rgb(${colorArr.join()})`
                : "";
        },

        lineChartRandomData() {
            let result = [];
            for (let i = 0; i < 5; i++) {
                result.push({
                    data: (() => {
                        let result = [];
                        for (let i = 0; i < 7; i++) {
                            result.push(Math.floor(Math.random() * 1000 + 120));
                        }
                        return result;
                    })()
                });
            }
            return result;
        },
        pieChartRandomData() {
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
        },
        createChart(num) {
            let chartType = [
                "line-chart",
                "bar-chart",
                "pie-chart",
                "scatter-chart",
                "radar-chart"
            ];
            let result = [];
            for (let i = 0; i < num; i++) {
                result.push({
                    chartType: chartType[Math.floor(Math.random() * 5)],
                    option: {}
                });
            }
            return result;
        },
        addChart() {
            this.createChart();
        }
    }
};
</script>

<style scoped>
.panel-heading.report-title {
    text-align: center;
    padding: 10px 15px;
    font-size: 0.4rem;
}
.chart-container {
    height: 300px;
}
.no-gutters > [class*="col-"] {
    padding-left: 0;
    padding-right: 0;
}
.box-border {
    border-style: solid;
    border-color: rgb(82, 86, 122);
    border-width: 5px 0 0 0;
    /* box-shadow: inset 0 0 4px 0px black; */
    margin: 0.12rem;
    background-color: rgba(248, 248, 248, 0.08);
}
.no-padding {
    padding: 0;
}
.panel {
    margin-bottom: 0;
    background-color: transparent;
    border: none;
    color: #fff;
}
.panel-default > .panel-heading {
    background-color: transparent;
    color: #fff;
}
.panel-heading,
.panel-body {
    /* padding-top: 0;
    padding-bottom: 0; */
    padding: 0.17rem 0.25rem;
}
.panel-body {
    padding: 0;
}
.panel-title {
    border-left: 4px solid #1eb6fe;
    padding-left: 8px;
    font-size: 0.3rem;
}
.time {
    font-size: 0.25rem;
}
</style>
<template>
    <div class="chart-panel" ref="radarChart"></div>
</template>

<script>
import common from "./common/commonOption";
import mixin from "./common/mixin";
import _ from "lodash";
export default {
    name: "radar",
    mixins: [mixin],
    mounted() {
        let chartInstance = echarts.init(this.$refs.radarChart);
        this.chartInstance = chartInstance;

        let option = {
            tooltip: {
                trigger: "item",
                backgroundColor: "rgba(0,0,250,0.2)"
            },
            legend: {
                type: "scroll",
                data: (function() {
                    var list = [];
                    for (var i = 1; i <= 28; i++) {
                        list.push(i + 2000 + "");
                    }
                    return list;
                })()
            },
            visualMap: {
                top: "middle",
                right: 10,
                color: ["red", "yellow"],
                calculable: true
            },
            xAxis: [
                {
                    show: false
                }
            ],
            yAxis: [
                {
                    show: false
                }
            ],
            radar: {
                indicator: [
                    { text: "IE8-", max: 400 },
                    { text: "IE9+", max: 400 },
                    { text: "Safari", max: 400 },
                    { text: "Firefox", max: 400 },
                    { text: "Chrome", max: 400 }
                ],
                radius: "60%"
            },
            series: (function() {
                var series = [];
                for (var i = 1; i <= 28; i++) {
                    series.push({
                        name: "浏览器（数据纯属虚构）",
                        type: "radar",
                        symbol: "none",
                        lineStyle: {
                            width: 1
                        },
                        emphasis: {
                            areaStyle: {
                                color: "rgba(0,250,0,0.3)"
                            }
                        },
                        data: [
                            {
                                value: [
                                    (40 - i) * 10,
                                    (38 - i) * 4 + 60,
                                    i * 5 + 10,
                                    i * 9,
                                    (i * i) / 2
                                ],
                                name: i + 2000 + ""
                            }
                        ]
                    });
                }
                return series;
            })()
        };
        option = _.merge({}, common, option);
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
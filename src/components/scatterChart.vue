<template>
    <div class="chart-panel" ref="scatterChart"></div>
</template>

<script>
import common from "./common/commonOption";
import mixin from "./common/mixin";
import _ from "lodash";
export default {
    name: "scatter",
    mixins: [mixin],
    mounted() {
        let chartInstance = echarts.init(this.$refs.scatterChart);
        this.chartInstance = chartInstance;

        var dataAll = [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
        ];
        var markLineOpt = {
            animation: false,
            label: {
                normal: {
                    formatter: "y = 0.5 * x + 3",
                    textStyle: {
                        align: "right",
                        color: "#fff"
                    }
                }
            },
            lineStyle: {
                normal: {
                    type: "solid"
                }
            },
            tooltip: {
                formatter: "y = 0.5 * x + 3"
            },
            data: [
                [
                    {
                        coord: [0, 3],
                        symbol: "none",
                        lineStyle: {
                            color: {
                                type: "linear",
                                // x: 0,
                                // y: 0,
                                // x2: 0,
                                // y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#fff" // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "red" // 100% 处的颜色
                                    }
                                ]
                                // global: false // 缺省为 false
                            }
                        }
                    },
                    {
                        coord: [20, 13],
                        symbol: "none",
                        lineStyle: {
                            lineStyle: {
                                color: {
                                    type: "linear",
                                    // x: 0,
                                    // y: 0,
                                    // x2: 0,
                                    // y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#fff" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "red" // 100% 处的颜色
                                        }
                                    ]
                                    // global: false // 缺省为 false
                                }
                            }
                        }
                    }
                ]
            ]
        };

        let option = {
            tooltip: {
                formatter: "Group {a}: ({c})"
            },
            xAxis: [{ gridIndex: 0, min: 0, max: 20 }],
            yAxis: [{ gridIndex: 0, min: 0, max: 15 }],
            series: [
                {
                    name: "I",
                    type: "scatter",
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: dataAll,
                    markLine: markLineOpt
                }
            ]
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
<template>
    <div>
        {{time}}
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "showtime",
    data() {
        return {
            time: "2019年8月10日 19:55:00"
        };
    },
    mounted() {
        let _this = this;
        getTime();
        function getTime() {
            _this.getNowTime();
            setTimeout(getTime, 1000);
        }
    },
    methods: {
        getNowTime() {
            moment.updateLocale("zh-cn", {
                weekdays: [
                    "星期天",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六"
                ]
            });
            let nowTime = moment().format("YYYY年MM月DD日 HH:mm:ss dddd");
            this.time = nowTime;
        }
    }
};
</script>

<style scoped>
</style>
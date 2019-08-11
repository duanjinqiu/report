export default {
    props: {
        optionProp: {
            default() {
                return {};
            }
        },
        shouldResize: {
            default() {
                return 0;
            }
        }
    },
    watch: {
        optionProp(newVal) {
            this.chartInstance.setOption(newVal);
        },
        shouldResize() {
            this.chartInstance.resize();
        }
    }
}
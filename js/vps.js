
window.onload = () => {
    document.body.style.height = innerHeight + 'px';
}

const app = Vue.createApp({
    el: '.container',
    data() {
        return {
            percentageData: 0,

            info: null,

            isLoading: false,
        }
    },
    mounted(){
        this.getVpsInfo()
    },
    methods: {
        getVpsInfo(){
            this.isLoading = true
            const url = '../../portal/vps/justmysocks'
            // const url = 'https://kylebing.cn/portal/vps/justmysocks'

            this.info = {
                "monthAmount": 500,
                "monthUsage": 0.6,
                "monthResetDay": 2
            }

            this.percentageData = Number(((1 - (this.info.monthUsage / this.info.monthAmount)) * 100).toFixed(2))


/*            axios
                .get(url)
                .then(res => {
                    // stop loading animation
                    this.isLoading = false

                    this.info = res.data.data

                    this.info = {
                        "monthAmount": 500,
                        "monthUsage": 0.6,
                        "monthResetDay": 2
                    }

                    this.percentageData = Number(((1 - (info.monthUsage / info.monthAmount)) * 100).toFixed(2))

                })
                .catch(err => {
                    // stop loading animation
                    this.isLoading = false
                })*/
        },


    }
}).mount('.container')


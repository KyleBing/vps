
window.onload = () => {
    document.body.style.height = innerHeight + 'px';
}

const app = Vue.createApp({
    el: '.container',
    data() {
        return {
            percentageDisk: 0,
            percentageMemory: 0,
            percentageData: 0,

            info: null,

            dataUsage: 0,
            dataFull: 0,
            dataRemain: 0,
            diskUsage: 0,
            diskFull: 0,
            diskRemain: 0,
            memLeft: 0,
            memFull: 0,
            memUsage: 0,

            isLoading: false,
        }
    },
    mounted(){
        this.getVpsInfo()
    },
    methods: {
        getVpsInfo(){
            this.isLoading = true
            // const url = '../../portal/vps'
            const url = 'https://kylebing.cn/portal/vps'
            axios.get(url)
                .then(res => {
                    // stop loading animation
                    this.isLoading = false

                    this.info = res.data.data
                    this.info.data_next_reset = dateFormatter(new Date(this.info.data_next_reset * 1000), 'yyyy-MM-dd')

                    // 存储单位转换
                    const convertG = 1024 * 1024 * 1024;
                    const convertM = 1024 * 1024;

                    let multi = this.info.monthly_data_multiplier;

                    // 流量
                    this.dataUsage = (this.info.data_counter * multi / convertG).toFixed(1);
                    this.dataFull = (this.info.plan_monthly_data * multi / convertG).toFixed(1);
                    this.dataRemain = this.dataFull - this.dataUsage;
                    this.percentageData = this.dataRemain / this.dataFull * 100;

                    // 硬盘
                    this.diskUsage = (this.info.ve_used_disk_space_b / convertG).toFixed(1);
                    this.diskFull = (this.info.plan_disk / convertG).toFixed(1);
                    this.diskRemain = this.diskFull - this.diskUsage;
                    this.percentageDisk = this.diskRemain / this.diskFull * 100;

                    // 内存
                    this.memLeft = Math.round(this.info.mem_available_kb / 1024);
                    this.memFull = Math.round(this.info.plan_ram / convertM);
                    this.memUsage = this.memFull - this.memLeft;
                    this.percentageMemory = this.memLeft / this.memFull * 100;

                })
                .catch(err => {
                    // stop loading animation
                    this.isLoading = false
                })
        },


    }
}).mount('.container')

function dateFormatter(date, formatString) {
    formatString = formatString || 'yyyy-MM-dd hh:mm:ss'
    let dateRegArray = {
        "M+": date.getMonth() + 1,                      // 月份
        "d+": date.getDate(),                           // 日
        "h+": date.getHours(),                          // 小时
        "m+": date.getMinutes(),                        // 分
        "s+": date.getSeconds(),                        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds()                     // 毫秒
    }
    if (/(y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let section in dateRegArray) {
        if (new RegExp("(" + section + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateRegArray[section]) : (("00" + dateRegArray[section]).substr(("" + dateRegArray[section]).length)))
        }
    }
    return formatString
}


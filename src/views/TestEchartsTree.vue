<template>
    <div class="echarts-tree">
        <div id="tree-container" class="tree-container"></div>
    </div>
</template>

<script>
    export default {
        name: "TestEchartsTree",
        data() {
            return {}
        },
        methods: {
            initChart() {
                let myChart = echarts.init(document.getElementById(`tree-container`));

                let data = {
                    "name": "人员标签",
                    value: "0",
                    "children": [
                        {
                            "name": "党派组织目录",
                            value: "01",
                            children:[]
                        },
                        {
                            "name": "情报标签目录",
                            value: "02",
                            "children": [
                                {"name": "test61", "value": "021"},
                                {"name": "民主党派", "value": "022"},
                                {
                                    name: "+",
                                    value: "020",
                                    children:[]
                                }
                            ]
                        },
                        {
                            name: "+",
                            value: "00",
                            children:[]
                        }
                    ]
                };

                let option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        formatter:function (params) {
                            return params.name
                        }
                    },
                    series: [
                        {
                            type: 'tree',
                            id: 0,
                            name: 'tree1',
                            data: [data],

                            top: '10%',
                            left: '8%',
                            bottom: '22%',
                            right: '20%',

                            symbolSize: [100, 30],
                            symbol: "rect",

                            edgeShape: 'polyline',
                            edgeForkPosition: '50%',
                            initialTreeDepth: 2,

                            lineStyle: {
                                width: 2
                            },

                            label: {
                                backgroundColor: 'transparent',
                                fontSize: 14,
                                position: 'inside',
                                verticalAlign: 'middle',
                                align: 'center',
                                color: "#333"
                            },

                            leaves: {
                                // label: {
                                //     backgroundColor: 'transparent',
                                //     fontSize:14,
                                //     position: 'inside',
                                //     verticalAlign: 'middle',
                                //     align: 'center'
                                // }
                            },

                            itemStyle: {
                                borderColor: "red"
                            },

                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                };

                myChart.setOption(option);

                myChart.on("click", this.reRenderNode);
                myChart.on("dblclick", this.changeNodeText);
            },

            reRenderNode(params) {
                if (params.name === "+") {
                    console.log("click", params);
                }
            },

            changeNodeText(params) {
                console.log("dblclick", params);
            }
        },
        mounted() {
            this.initChart();
        }
    }
</script>

<style scoped lang="stylus">
    .echarts-tree
        width: 100%
        height 100%

        .tree-container
            width: 100%
            height: 500px
</style>

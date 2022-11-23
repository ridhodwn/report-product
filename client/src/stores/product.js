import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        chartBar: [],
        tableData: [],
        baseUrl: "http://localhost:3000/"
    }),
    actions: {
        async fetchProducts(value) {
            try {
                console.log('in Fetch Products');
                console.log('value:', value)
                console.log('area:', value.area)
                let { data } = await axios({
                    method: 'get',
                    url: this.baseUrl,
                    params: value
                });

                // console.log(data);
                let byArea = data.map(el => {
                    let { compliance, Store, Product } = el;
                    let areaName = Store.Store_Area.area_name;
                    let brandName = Product.Product_Brand.brand_name;
                    return { areaName, brandName, compliance };
                })

                const subSet = (o, keys) => keys.reduce((r, k) => (r[k] = o[k], r), {})

                function groupByTotal(arr, groupByCols, aggregateCols) {
                    let grouped = {};

                    arr.forEach(o => {
                        const values = groupByCols.map(k => o[k]).join("|");
                        if (grouped[values]) {
                            grouped[values][aggregateCols] += o[aggregateCols]
                            grouped[values]['count'] += 1
                        } else {
                            grouped[values] = { ...subSet(o, groupByCols), [aggregateCols]: o[aggregateCols], ['count']: 1 }
                        }
                    })

                    return Object.values(grouped);
                }

                console.log(byArea);
                // console.log(chartData);

                // let count = 0;
                console.log(groupByTotal(byArea, ['areaName'], 'compliance'))

                let chartBarA = groupByTotal(byArea, ['areaName'], 'compliance');
                this.chartBar = chartBarA.map(el => {
                    let { areaName, compliance, count } = el;
                    let nilai = Math.round(compliance/count * 100);
                    return { areaName, nilai }
                })

                console.log(groupByTotal(byArea, ['areaName', 'brandName'], 'compliance'))

                let tableDataA = groupByTotal(byArea, ['areaName', 'brandName'], 'compliance');
                this.tableData = tableDataA.map(el => {
                    let { brandName, areaName, compliance, count } = el;
                    let nilai = Math.round(compliance/count * 100);
                    return { brandName, areaName, nilai }
                })

                console.log(this.chartBar)
                console.log(this.tableData)
            } catch (error) {
                console.log(error);
            }
        }
    }
})
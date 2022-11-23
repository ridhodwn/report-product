<script>
import { mapActions, mapWritableState } from "pinia";
import { useProductStore } from "./stores/product";
import BarChart from './components/BarChart.vue'

export default {
  components: { BarChart },
  data() {
    return {
      area: [],
      dateFrom: '',
      dateTo: ''
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts']),
    fetchProductsComponent() {
      this.fetchProducts({
        area: this.area.join(','),
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      })
    }
  },
  computed: {
    ...mapWritableState(useProductStore, ['chartBar', 'tableData']),
    nilaiByProduct() {
      return this.tableData.reduce((r, o) => {
        r[o.brandName] ??= {}
        r[o.brandName][o.areaName] ??= 0
        r[o.brandName][o.areaName] += +o.nilai
        return r
      }, {})
    },
    areas() {
      const areas = [...new Set(this.tableData.map(r => r.areaName))]
      return areas
    },
  }
}
</script>

<template>
  <div class="p-3">
    <form class="d-flex" @submit.prevent="fetchProductsComponent">
      <div class="mb-3 me-3">
        <label class="form-label">Select Area:</label>
        <select v-model="area" class="form-select" multiple aria-label="multiple select example">
          <option value="1">DKI Jakarta</option>
          <option value="2">Jawa Barat</option>
          <option value="3">Kalimantan</option>
          <option value="4">Jawa Tengah</option>
          <option value="5">Bali</option>
        </select>
      </div>
      <div class="mb-3 me-3">
        <label class="form-label">Select dateFrom:</label>
        <input v-model="dateFrom" type="date" class="form-control">
      </div>
      <div class="mb-3 me-3">
        <label class="form-label">Select dateTo:</label>
        <input v-model="dateTo" type="date" class="form-control">
      </div>
      <div class="mb-3 me-3 mt-4">
        <button type="submit" class="btn btn-primary">View</button>
      </div>
    </form>
    <BarChart :chartBar="chartBar" />
    <table class="table">
      <thead>
        <tr>
          <th>Brand</th>
          <th v-for="area in areas" :key="area">{{ area }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nilai, brandName) in nilaiByProduct" :key="brandName">
          <td>{{ brandName }}</td>
          <td v-for="area in areas" :key="area">{{ nilai[area]}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>

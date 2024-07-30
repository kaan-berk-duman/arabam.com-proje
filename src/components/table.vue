<template>
  <table class="listTable">
    <thead class="listTableHead">
      <tr>
        <th></th>
        <th class="hidden">Model</th>
        <th>İlan Başlığı</th>
        <th class="hidden">Yıl</th>
        <th>Fiyat</th>
        <th class="hidden">Tarih</th>
        <th class="hidden">İl/İlçe</th>
      </tr>
    </thead>
    <tbody class="listTableBody" v-if="data">
      <tr class="hidden">
        <td colspan="9">
          <img class="advert" src="https://arbimg1.mncdn.com/assets/arabamFrontEndFiles/images/expertise/expertise-listing-location.png?v=20240712020942" />
        </td>
      </tr>
      <TableRowComponent v-for="item in data" :key="item.id" :item="item" @go-to-car-detail="goToCarDetail" />
      <tr class="advertisement hidden">
        <td colspan="7">
          <a href="#" class="advertisementOpen" target="_self">Siz de ilanınızın yukarıda yer almasını istiyorsanız <span>tıklayın</span>.</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import "./table.scss";
import TableRowComponent from './tableRow.vue';
export default {
  name: 'TableComponent',
  components: {
    TableRowComponent
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToCarDetail(carId) {
      this.$emit('go-to-car-detail', carId);
    }
  }
};
</script>
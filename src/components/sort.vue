<template>
    <div class="sort">
      <select v-model="sortSelect" @change="applySorting">
        <option value="">Gelişmiş Sıralama</option>
        <option value="0 1">Fiyat - Çoktan Aza</option>
        <option value="0 0">Fiyat - Azdan Çoka</option>
      </select>
    </div>
  </template>
  <script>
  import "./sort.scss";
  import { mapState } from 'vuex';

  export default {
    computed: {
    ...mapState(['initialSort'])
    },
    data() {
      return { sortSelect: this.initialSort};
    },
    methods: {
      applySorting() {
        const [sort, sortDirection] = this.sortSelect.split(' ');
        this.$emit('sort-changed', { sort, sortDirection });
      }
    }
  };
</script>
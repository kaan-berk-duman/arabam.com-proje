<template>
    <div class="filter">
      <button @click="togglePanel">FİLTRELER</button>
      <div :class="['panel', { open: panelOpen }]">
        <button @click="closePanel" class="closeButton">x</button>
        <form id="yearFilterForm" @submit.prevent="applyFilters">
          <div class="input-wrapper">
            <input type="text" v-model="minYear" maxlength="4" name="minYear" autocomplete="off" />
            <label>Minimum Yıl</label>
            <div class="underline"></div>
          </div>
          <div class="input-wrapper">
            <input type="text" v-model="maxYear" maxlength="4" name="maxYear" autocomplete="off" />
            <label>Maksimum Yıl</label>
            <div class="underline"></div>
          </div>
          <button type="submit">Filtrele</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import "./filter.scss";
  export default {
    props: {
      initialMinYear: {
        type: String,
        default: ''
      },
      initialMaxYear: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        minYear: this.initialMinYear,
        maxYear: this.initialMaxYear,
        panelOpen: false
      };
    },
    methods: {
      applyFilters() {
        this.$emit('filter-applied', { minYear: this.minYear, maxYear: this.maxYear });
        document.body.style.overflow = 'auto';
      },
      togglePanel() {
        this.panelOpen = !this.panelOpen;
        document.body.style.overflow = this.panelOpen ? 'hidden' : '';
      },
      closePanel() {
        this.panelOpen = false;
        document.body.style.overflow = '';
      }
    }
  };
  </script>
  
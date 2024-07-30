<template>
    <div class="carInfo">
      <div class="property-item" v-for="(value, key) in properties" :key="key" :class="{ price: key === 'Fiyat' }">
        <div class="property-key">{{ key }}</div>
        <div class="property-value">{{ value }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import './carInfo.scss';
  export default {
    name: 'CarInfo',
    props: {
      properties: {
        type: Object,
        required: true
      }
    }
  };
  </script>
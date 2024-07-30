<template>
    <tr class="data" @click="goToCarDetail(item.id)">
      <td><img :src="getFormattedPhotoUrl(item.photo)" class="carPicture" /></td>
      <td class="hidden">{{ item.modelName }}</td>
      <td>{{ item.title }}</td>
      <td class="center hidden">{{ getYear(item) }}</td>
      <td class="price">{{ item.priceFormatted }}</td>
      <td class="center hidden">{{ item.dateFormatted }}</td>
      <td class="center hidden">{{ item.location.cityName }} {{ item.location.townName }}</td>
    </tr>
  </template>
  
  <script>
  export default {
    name: 'TableRowComponent',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      goToCarDetail(carId) {
        this.$emit('go-to-car-detail', carId);
      },
      getYear(item) {
        const yearProperty = item.properties.find(property => property.name === 'year');
        return yearProperty ? yearProperty.value : 'N/A';
      },
      getFormattedPhotoUrl(photoUrl) {
        return photoUrl.replace('{0}', '240x180');
      }
    }
  };
  </script>

  
<template>
    <div class="slider-info">
      <div class="slider-container">
        <swiper
          :slides-per-view="1"
          navigation
          :pagination="{ clickable: true }"
          :zoom="true"
          :modules="modules">
          <swiper-slide v-for="photo in photos" :key="photo">
            <img :src="getFormattedPhotoUrl(photo)" @click="handleFullScreen(photo)" class="photo"/>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/zoom';
  
  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      photos: {
        type: Array,
        required: true
      },
      modules: {
        type: Array,
        required: true
      }
    },
    methods: {
      getFormattedPhotoUrl(photoUrl) {
        return photoUrl.replace('{0}', '580x435');
      },
      handleFullScreen(photoUrl) {
        this.$emit('open-full-screen', this.getFormattedPhotoUrl(photoUrl));
      }
    }
  };
  </script>
  
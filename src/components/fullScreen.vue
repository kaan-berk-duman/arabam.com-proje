<template>
    <div v-if="isFullScreenOpen" class="FullScreen" @click.self="closeFullScreen">
      <swiper
        :slides-per-view="1"
        navigation
        :pagination="{ clickable: true }"
        :modules="modules"
        class="FullScreen-swiper">
        <swiper-slide v-for="photo in photos" :key="photo">
          <img :src="getFullSizePhotoUrl(photo)" class="FullScreen-photo" />
        </swiper-slide>
      </swiper>
      <button class="FullScreen-close" @click="closeFullScreen">x</button>
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
      SwiperSlide,
    },
    props: {
      isFullScreenOpen: Boolean,
      photos: Array,
      modules: Array,
      closeFullScreen: Function,
    },
    methods: {
      getFullSizePhotoUrl(photoUrl) {
        return photoUrl.replace('{0}', '800x600');
      },
    },
  };
  </script>
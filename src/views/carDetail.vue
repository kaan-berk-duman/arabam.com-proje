<template>
  <div id="appMain">
    <LoadingComponent/>
    <div v-if="!loading" class="container general">
      <div v-if="error">Bir hata oluştu: {{ error }}</div>
      <div v-if="data" class="middle">
        <div class="car">
          <div class="infoTitle">{{ data.title }}</div>
          <span class="infoLocation">{{ data.location.townName }}, {{ data.location.cityName }}</span>
          <div class="underline"></div>
          <!-- slider-info and araç bilgi kısmı -->
          <div class="under">
            <SliderInfo :photos="data.photos" :modules="modules" @open-full-screen="openFullScreen" />
            <!-- FullScreen -->
            <FullScreenComponent :isFullScreenOpen="isFullScreenOpen" :photos="data.photos" :modules="modules" :closeFullScreen="closeFullScreen"/>
            <CarInfo :properties="carProperties" />
          </div>
        </div>
        <!-- açıklama kısmı -->
        <CommentComponent :text="data.text" />
      </div>
      <!-- yan kısım -->
      <SideInfoComponent v-if="data && data.userInfo" :userInfo="data.userInfo" />
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { getItemDetails } from '../api/index';
import CarInfo from '../components/carInfo.vue';
import LoadingComponent from '../components/loading.vue';
import CommentComponent from '../components/comment.vue';
import SideInfoComponent from '../components/sideInfo.vue';
import SliderInfo from '../components/sliderInfo.vue';
import FullScreenComponent from '../components/fullScreen.vue';
import './carDetail.scss';

export default {
  components: {
    CarInfo,
    LoadingComponent,
    CommentComponent,
    SideInfoComponent,
    SliderInfo,
    FullScreenComponent
  },
  data() {
    return {
      modules: [Navigation, Pagination, Zoom],
      data: null,
      error: null,
      isFullScreenOpen: false,
      selectedPhotoUrl: ''
    };
  },
  mounted() {
      const id = this.$route.params.id;
      this.setLoading(true);
      getItemDetails(id)
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.setLoading(false)
        });
  },
  computed: {
    ...mapState(['loading']),
    carProperties() {
      if (!this.data) return {};

      return {
        'Fiyat': this.data.priceFormatted,
        'İlan no': this.data.id,
        'İlan Tarihi': this.data.dateFormatted,
        'Model': this.data.modelName,
        'Yıl': this.getYear(this.data),
        'Kilometre': this.getKm(this.data),
        'Vites Tipi': this.getGear(this.data),
        'Yakıt Tipi': this.getFuel(this.data),
        'Renk': this.getColor(this.data)
      };
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    openFullScreen(photoUrl) {
      this.selectedPhotoUrl = photoUrl;
      this.isFullScreenOpen = true;
    },
    closeFullScreen() {
      this.isFullScreenOpen = false;
      this.selectedPhotoUrl = '';
    },
    getKm(item) {
      const kmProperty = item.properties.find(property => property.name === 'km');
      return kmProperty ? kmProperty.value : 'N/A';
    },
    getColor(item) {
      const colorProperty = item.properties.find(property => property.name === 'color');
      return colorProperty ? colorProperty.value : 'N/A';
    },
    getYear(item) {
      const yearProperty = item.properties.find(property => property.name === 'year');
      return yearProperty ? yearProperty.value : 'N/A';
    },
    getGear(item) {
      const gearProperty = item.properties.find(property => property.name === 'gear');
      return gearProperty ? gearProperty.value : 'N/A';
    },
    getFuel(item) {
      const fuelProperty = item.properties.find(property => property.name === 'fuel');
      return fuelProperty ? fuelProperty.value : 'N/A';
    }
  }
};
</script>

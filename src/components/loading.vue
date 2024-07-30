<template>
  <div v-if="loading" class="loading-screen">
    <img src="https://arbimg1.mncdn.com/assets2/dist/img/tek-tur-large.gif"/>
  </div>
</template>

<script>
import "./loading.scss";
import { mapState } from 'vuex';

export default {
  name: 'LoadingComponent',
  computed: {
    ...mapState(['loading'])
  }
};
</script>

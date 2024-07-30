<template>
  <div id="appmain">
    <LoadingComponent/>
    <div class="container edge" v-if="!loading">
      <div v-if="error">Bir hata oluştu: {{ error }}</div>
      <!-- Filtre kısmı -->
      <FilterComponent :initial-min-year="minYear" :initial-max-year="maxYear" @filter-applied="applyFilters"/>
      <!-- Sıralama kısmı -->
      <SortComponent @sort-changed="applySorting"/>
      <!-- Tablo ve pagination kısmı -->
      <div class="table">
        <div class="listing edge">
          <TableComponent :data="listItems" @go-to-car-detail="goToCarDetail" />
          <PaginationComponent 
            :current-page="currentPage" 
            :total-pages="totalPages" 
            :paging-size="pagingSize" 
            @page-changed="changePage" 
            @paging-size-changed="updatePagingSize"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import TableComponent from '../components/table.vue';
import PaginationComponent from '../components/pagination.vue';
import LoadingComponent from '../components/loading.vue';
import SortComponent from '../components/sort.vue';
import FilterComponent from '../components/filter.vue';
import "./listing.scss";

export default {
  components: {
    TableComponent,
    PaginationComponent,
    LoadingComponent,
    SortComponent,
    FilterComponent
  },
  data() {
    return {
      error: null,
      pagingSize: 20,
      minYear: '',
      maxYear: '',
      sort: null,
      sortDirection: null,
      initialSort: '',
      skip: 0,
      currentPage: 1,
      totalPages: 50,
      panelOpen: false
    };
  },
  computed: {
    ...mapState(['loading','listItems','initialSort'])
  },
  methods: {
    ...mapMutations(['setLoading','setInitialSort']),
    ...mapActions(['getListItems']),
    fetchData() {
      this.setLoading(true)
      const data = {
        minYear:this.minYear,
        maxYear:this.maxYear,
        sort:this.sort,
        sortDirection:this.sortDirection,
        skip:this.skip,
        take:this.pagingSize
      }
      this.getListItems(data)
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    goToCarDetail(carId) {
      this.$router.push({ name: 'carDetail', params: { id: carId } });
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.skip = (page - 1) * this.pagingSize;
      this.fetchData();
    },
    updatePagingSize(size) {
      this.pagingSize = size;
      this.currentPage = 1;
      this.skip = 0;
      this.fetchData();
    },
    applySorting({ sort, sortDirection }) {
      this.sort = sort;
      this.sortDirection = sortDirection;
      this.fetchData();
    },
    applyFilters({ minYear, maxYear }) {
      this.minYear = minYear;
      this.maxYear = maxYear;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  }
};
</script>

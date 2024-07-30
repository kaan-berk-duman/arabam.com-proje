<template>
  <div class="paginationArea">
    <ul class="pagination">
        <li :class="{ 'disable-arrow': currentPage === 1 }">
            <a class="pag" href="#" @click.prevent="changePage(currentPage - 1)"><</a>
        </li>
        <li v-for="page in pages" :key="page" :class="{ 'active': currentPage === page }">
            <a class="pag" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li><span>...</span></li>
        <li>
            <a class="pag" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
        </li>
        <li :class="{ 'arrowed': currentPage < totalPages, 'disable-arrow': currentPage === totalPages }">
            <a class="pag" href="#" @click.prevent="changePage(currentPage + 1)">></a>
        </li>
    </ul>
    <div class="change">
        <span>Her sayfada</span>
        <ul class="pagination">
            <li>
                <a :class="{ 'active-link': pagingSize === 20 }" @click="updatePagingSize(20)">20</a>
            </li>
            <li class="pag">
                <a :class="{ 'active-link': pagingSize === 50 }" @click="updatePagingSize(50)">50</a>
            </li>
        </ul>
        <span>sonuç göster.</span>
    </div>
  </div>
</template>

<script>
import "./pagination.scss";
export default {
  name: 'paginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    pagingSize: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() { //pagination kısmındaki 1 2 3 gibi sayı kısmı belirliyor
      let pagesArray = [];
      for (let i = this.currentPage; i < this.currentPage + 3 && i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.$emit('page-changed', page); // emit ile alt sınıftan üst sınıfa veri gönderiyoruz
    },
    updatePagingSize(size) {
      this.$emit('paging-size-changed', size);
    }
  }
};
</script>
import { createStore } from 'vuex'
import { getListItems } from '../api';

const store = createStore({
  state () {
    return {
      loading:false,
      listItems: null,
      initialSort: ''
    }
  },
  actions: {
    getListItems({commit}:any, payload:any){
        return getListItems(payload).then((response: any) => {
            commit('setListItems',response.data);
        });
    }
  },
  mutations: {
    setLoading(state:any, payload:Boolean){
        state.loading=payload;
    },
    setListItems(state:any, payload:any){
        state.listItems = payload;
    },
    setInitialSort(state:any, payload:string){
        state.initialSort = payload;
    }
  }
})

export default store;
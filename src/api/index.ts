import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://sandbox.arabamd.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getListItems = (data:any) => {
  return apiClient.get('/listing',{
    params: data
  });
};

export const getItemDetails = (id:number) => {
  return apiClient.get('/detail',{
    params:{
      id:id
    }
  });
};
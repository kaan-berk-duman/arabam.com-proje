<template>
    <div class="sideInfo">
      <div class="personInfo">
        <h4>KİŞİ BİLGİLERİ</h4>
        <div class="underline"></div>
        <div class="commentSpan">
          <span class="person">{{ userInfo.nameSurname }}</span>
          <span>+{{ userInfo.phoneFormatted }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userInfo: {
        type: Object,
        required: true
      }
    }
  };
  </script>
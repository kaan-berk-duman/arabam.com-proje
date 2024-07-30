<template>
    <div class="comment">
      <h4>AÇIKLAMA</h4>
      <div class="underline"></div>
      <div class="commentSpan"><span>{{ text }}</span></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
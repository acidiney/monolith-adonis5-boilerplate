<script setup></script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100&display=swap');

  h1 {
    font-family: 'Work Sans', sans-serif;
    font-size: 4em;
  }

  div {
    min-height: 60vh;
  }
</style>
<template>
  <div class="row">
    <div class="col-md-12 d-flex justify-content-center align-items-center">
      <h1 class="text-muted">
        {{ $t("admin.common.create_a_new_dashboard") }}
      </h1>
    </div>
  </div>
</template>

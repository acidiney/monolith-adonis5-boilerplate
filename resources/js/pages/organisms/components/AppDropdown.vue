<template>
  <div class="btn-group show">
    <button class="btn btn-white" @click="openModal">Criar Organismo</button>
    <button
      class="btn btn-white dropdown-toggle"
      data-toggle="dropdown"
      aria-expanded="true"
    ></button>
    <div
      class="dropdown-menu dropdown-menu-right"
      role="menu"
      x-placement="top-end"
      style="
        position: absolute;
        transform: translate3d(-31px, -149px, 0px);
        top: 0px;
        left: 0px;
        will-change: transform;
      "
    >
      <a class="dropdown-item"> Exportar organismos </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    openModal: Function
  }
}
</script>

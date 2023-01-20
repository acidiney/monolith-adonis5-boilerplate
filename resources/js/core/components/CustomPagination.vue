<template>
  <div class="VuePagination w-100" :class="props.theme.wrapper">
    <nav :class="[props.theme.nav, 'd-flex align-items-center']">
      <p v-show="props.hasRecords" :class="[props.theme.count, {'w-100 text-right': !props.showPagination}]">{{ props.count }}</p>
      <div v-show="props.showPagination" class="flex"></div>
      <ul v-show="props.showPagination" :class="props.theme.list">
        <li :class="props.theme.prev" @click="props.setPrevPage">
          <a v-bind="{ ...props.aProps, ...props.prevProps }"><span aria-hidden="true">«</span></a>
        </li>

        <li
          v-for="page in props.pages"
          :key="page"
          :class="props.pageClasses(page)"
          v-on="props.pageEvents(page)"
        >
          <a v-bind="props.aProps" :class="props.theme.link">{{ page }}</a>
        </li>

        <li :class="props.theme.next" @click="props.setNextPage">
          <a v-bind="{ ...props.aProps, ...props.nextProps }"><span aria-hidden="true">»</span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CustomPaginaton',
  props: ['props'],
}
</script>

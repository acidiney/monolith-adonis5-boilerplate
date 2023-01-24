<template>
  <div class="aside aside-sm" id="content-aside">
    <div class="d-flex flex-column w-xl modal-dialog bg-body">
      <div class="navbar">
        <div class="input-group flex bg-light rounded">
          <span class="input-group-prepend">
            <button class="btn no-bg no-shadow" type="button">
              <app-icon icon="search" class="text-fade" />
            </button>
          </span>
          <input
            type="text"
            class="form-control no-bg no-border no-shadow search"
            placeholder="Search"
            required=""
          />
          <span v-if="showCreateButton" class="input-group-append">
            <button @click="handleClickOnCreateButton" class="btn bg-primary no-border">
              <app-icon icon="plus" />
            </button>
          </span>
        </div>
      </div>
      <div class="scrollable hover">
        <div class="list list-row">
          <app-aside-content-item />
        </div>
        <div class="no-result hide">
          <div class="p-4 text-center">No Results</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAsideContentItem from './app-aside-content-item.vue'

export default {
  props: {
    showCreateButton: Boolean,
  },
  components: {
    AppAsideContentItem,
  },
  methods: {
    handleClickOnCreateButton () {
      this.$emit('createClick')
    }
  }
}
</script>

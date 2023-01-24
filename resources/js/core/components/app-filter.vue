<template>
  <div class="app-filter d-flex mb-4">
    <select class="form-control col-1 mr-2">
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="50">50</option>
      <option :value="100">100</option>
    </select>

    <div class="input-group col-md-8">
      <div class="input-group">
        <input
          type="text"
          class="form-control form-control-theme  search"
          placeholder="Search"
          required=""
        />
        <span class="input-group-append">
          <button class="btn btn-white no-border btn-sm" type="button">
            <span class="d-flex text-muted">
              <app-icon icon="search" size="18" />
            </span>
          </button>
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

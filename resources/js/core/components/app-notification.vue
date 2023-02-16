<template>
  <li class="nav-item dropdown">
    <a class="nav-link px-2 pt-3 mr-lg-2" data-toggle="dropdown">
      <app-icon icon="bell" :size="18" />
      <span class="badge badge-pill badge-up bg-primary">1</span>
    </a>
    <!-- dropdown -->
    <div class="dropdown-menu dropdown-menu-right mt-3 w-md animate fadeIn p-0">
      <div class="scrollable hover" style="max-height: 250px">
        <div class="list list-row">
          <div class="list-item" data-id="6">
            <div>
              <a href="#">
                <span class="w-32 avatar gd-danger">
                </span>
              </a>
            </div>
            <div class="flex">
              <div class="item-feed h-2x">
                Just saw this on the
                <a href="#">@eBay</a> dashboard, dude is an absolute unit.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex px-3 py-2 b-t">
        <div class="flex">
          <span>6 Notifications</span>
        </div>
        <a
          >See all
          <i class="fa fa-angle-right text-muted"></i>
        </a>
      </div>
    </div>
    <!-- / dropdown -->
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: Object,
  data: Object
})

const info = computed(() => props.data ?? props.user)
</script>

<template>
  <account-layout :title="info.fullName">
    <template v-slot:header>
      <app-page-hero :title="$t('menu.user.profile')" :sub-title="$t('menu.user.profile.subtitle')" />
    </template>
    <template v-slot:body>
      <div class="card">
        <div class="card-header bg-dark bg-img p-0 no-border">
          <div class="bg-dark-overlay r-2x no-r-b">
            <div class="d-md-flex">
              <div class="p-4">
                <div class="d-flex">
                  <a href="#">
                    <el-avatar :src="info.avatar" :size="64" @error="() => true">
                      {{ info.fullName[0] }}
                    </el-avatar>
                  </a>
                  <div class="mx-3">
                    <h5 class="mt-2">{{ info.fullName }}</h5>
                    <div class="text-fade text-sm">
                      <span class="m-r">{{ info.role.internal ? $t(info.role.description) : info.role.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span class="flex"></span>
              <div class="align-items-center d-flex p-4">
                <div class="toolbar">
                  <!-- <a href="#" class="btn btn-sm btn-icon bg-dark-overlay btn-rounded">
                      <app-icon class="text-fade" icon="phone" :size="12" />
                    </a> -->
                  <!-- <a href="#" class="btn btn-sm btn-icon bg-dark-overlay btn-rounded">
                      <app-icon class="text-fade" icon="more-vertical" :size="12" />
                    </a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3">
          <div class="d-flex">
            <ul class="nav nav-pills">
              <li class="nav-item nav-link">
                {{ $t('admin.common.profile_data') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-7 col-lg-8">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab_4">
              <div class="card">
                <div class="px-4 py-4">
                  <div class="row mb-2">
                    <div class="col-6">
                      <small class="text-muted">{{ $t('shared.email') }}</small>
                      <div class="my-2">
                        <a class="text-color" :href="`mailto:${info.email}`">{{ info.email }}</a>
                      </div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">{{ $t('shared.last_login') }}</small>
                      <div class="my-2">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                          <template #default>
                            <div>
                              {{ info.lastLoginAt }}
                            </div>
                          </template>
                          <template #reference>
                            {{ info.lastLoginText }}
                          </template>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted">{{ $t('shared.bio') }}</small>
                    <div class="my-2">
                      {{ info.bio || $t('shared.no_bio') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TIMELINE -->
        <div class="col-sm-5 col-lg-4">
          <div class="card sticky p-4">
            <div class="timeline animates animates-fadeInUp">
              <div class="tl-item active">
                <div class="tl-dot"></div>
                <div class="tl-content">
                  <div class="">Added to <a href="#">@TUT</a> team</div>
                  <div class="tl-date text-muted mt-1">2 days ago</div>
                </div>
              </div>
              <div class="tl-item">
                <div class="tl-dot"></div>
                <div class="tl-content">
                  <div class=""><a href="#">@Netflix</a> hackathon</div>
                  <div class="tl-date text-muted mt-1">25/12 18</div>
                </div>
              </div>
              <div class="tl-item">
                <div class="tl-dot"></div>
                <div class="tl-content">
                  <div class="">
                    Just saw this on the <a href="#">@eBay</a> dashboard,
                    dude is an absolute unit.
                  </div>
                  <div class="tl-date text-muted mt-1">1 Week ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </account-layout>
</template>

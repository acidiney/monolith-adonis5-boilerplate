<script setup id="app-profile">
import { ref, computed, onMounted } from 'vue'
import AppStatus from '@core/components/app-status.vue'
import {apiService} from "./services/api";

const props = defineProps({
  user: Object,
  data: Object
})

const isLoading = ref(true)
const userActivities = ref([])
const info = computed(() => props.data ?? props.user)

onMounted(() => {
    apiService.retrieveActivities(info.value.slug)
        .then(({data}) => {
          userActivities.value = data
        })
        .finally(() => {
          isLoading.value = false
        })
})
</script>

<template>
  <account-layout :title="info.fullName">
    <template v-slot:header>
      <app-page-hero
          :title="!data ? $t('menu.user.profile') : $t('menu.user.other_profile', { fullName: data.fullName })"
          :sub-title="$t('menu.user.profile.subtitle')"
      />
    </template>
    <template v-slot:body>
      <div class="card">
        <div class="card-header bg-dark bg-img p-0 no-border" data-stellar-background-ratio="0.1" data-plugin="stellar">
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
                  <app-status :status="info.status"  />
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
              <template v-for="activity in userActivities">
                <div :class="['tl-item', {
                  'active': activity.last
                }]">
                  <div class="tl-dot"></div>
                  <div class="tl-content">
                    <div class="">{{ $t(activity.operation) }}</div>
                    <el-popover
                        placement="top-start"
                        :width="220"
                        trigger="hover"
                        :content="activity.recordAt"
                    >
                      <template #reference>
                        <div class="tl-date text-muted mt-1">{{ activity.recordAtText }}</div>
                      </template>
                    </el-popover>
                  </div>
                </div>
              </template>

              <p class="text-center" v-if="isLoading">
                {{ $t('shared.loading') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </account-layout>
</template>

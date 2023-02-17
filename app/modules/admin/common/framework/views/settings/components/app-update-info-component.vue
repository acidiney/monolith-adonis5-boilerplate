<script setup>
import { router } from "@inertiajs/vue3";

const useLogout = () => {
  router.post("/auth/logout");
};
</script>
<template>
    <div class="d-flex align-items-center px-4 py-3 pointer" data-toggle="collapse" data-parent="#accordion"
        data-target="#c_1">
        <div>
            <el-avatar
                class="bg-info-lt avatar w-48"
                :src="$page.props.user.avatar"
                :alt="$page.props.user.fullName"
            />
        </div>
        <div class="mx-3 d-none d-md-block">
            <strong>{{ $page.props.user.fullName }}</strong>
            <div class="text-sm text-muted">{{ $page.props.user.email }}</div>
        </div>
        <div class="flex"></div>
        <div class="mx-3">
            <i data-feather="chevron-right"></i>
        </div>
        <div>
            <a @click="useLogout" class="text-primary text-sm">{{ $t('shared.logout') }}</a>
        </div>
    </div>
    <div class="collapse p-4" id="c_1">
        <form role="form">
            <div class="form-group">
                <label>{{ $t('shared.profile.picture') }}</label>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" />
                    <label class="custom-file-label" for="customFile">{{ $t('shared.picture.choose') }}</label>
                </div>
            </div>
            <div class="form-group">
                <label>{{ $t('shared.user.firstname') }}</label>
                <input type="text" class="form-control" :value="$page.props.user.firstName" />
            </div>
            <div class="form-group">
                <label>{{ $t('shared.user.lastname') }}</label>
                <input type="text" class="form-control" :value="$page.props.user.lastName" />
            </div>
            <button type="submit" class="btn btn-primary mt-2">
                {{ $t('shared.update') }}
            </button>
        </form>
    </div>
</template>
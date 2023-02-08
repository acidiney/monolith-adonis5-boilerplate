<script setup>
import { useI18n } from 'vue-i18n'

const statusTheme = {
  approved: "success",
  active: "success",
  canceled: "light",
  pending: "warning",
  wait_human_validation: "warning",
  rejected: "danger",
  submitted: "info",
};

const { t } = useI18n()

const fallbackStatusText = {
  approved: t('shared.status.approved'),
  active: t('shared.status.active'),
  canceled: t('shared.status.canceled'),
  pending: t('shared.status.pending'),
  wait_human_validation: t('shared.status.wait_human_validation'),
  rejected: t('shared.status.rejected'),
  submitted: t('shared.status.submitted'),
};

defineProps({
  status: {
    validator: (value) => {
      return true// [...Object.keys(statusTheme)].indexOf(value) !== -1;
    },
  },
  text: String,
});
</script>

<template>
  <el-tag class="ml-2 text-uppercase" :type="statusTheme[status]">{{ text || fallbackStatusText[status] }}</el-tag>
</template>

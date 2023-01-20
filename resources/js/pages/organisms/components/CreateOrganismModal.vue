<template>
  <a-modal
    :title="$t('organism.createModal.title')"
    :keyboard="false"
    :maskClosable="false"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form layout="vertical">
      <v-form>
        <a-form-item label="Activity name">
        <a-input
          v-model="username"
        />
      </a-form-item>
      </v-form>
    </a-form>
  </a-modal>
</template>
<script>
import { Field, Form, ErrorMessage } from 'vee-validate'
// import * as yup from 'yup'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    handleOk: Function,
    handleCancel: Function,
  },
  components: {
    'v-form': Form
  },
  data() {
    return {
      username: '',
    }
  },
}
</script>

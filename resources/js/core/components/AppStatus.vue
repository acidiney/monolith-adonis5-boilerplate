<template>
  <span :class="['badge', 'text-uppercase', statusTheme[status]]"> {{ text || fallbackStatusText[status] }} </span>
</template>
<script>

const statusTheme = {
  approved: 'badge-success',
  canceled: 'badge-light',
  pending: 'badge-warning',
  wait_human_validation: 'badge-warning',
  rejected: 'badge-danger',
  submitted: 'badge-info',
}

const fallbackStatusText = {
  approved: 'Aprovado',
  canceled: 'Cancelado',
  pending: 'Pendente',
  wait_human_validation: 'Aguardando validação de um regulador!',
  rejected: 'Rejeitado',
  submitted: 'Submetido',
}

export default {
  props: {
    status: {
      validator: (value) => {
        return [...Object.keys(statusTheme)].indexOf(value) !== -1
      },
    },
    text: String,
  },
  setup() {
    return { statusTheme, fallbackStatusText }
  },
}
</script>

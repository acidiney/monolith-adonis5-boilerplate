<script setup>
const statusTheme = {
  approved: "badge-success",
  canceled: "badge-light",
  pending: "badge-warning",
  wait_human_validation: "badge-warning",
  rejected: "badge-danger",
  submitted: "badge-info",
};

const fallbackStatusText = {
  approved: "Aprovado",
  canceled: "Cancelado",
  pending: "Pendente",
  wait_human_validation: "Aguardando validação de um regulador!",
  rejected: "Rejeitado",
  submitted: "Submetido",
};

defineProps({
  status: {
    validator: (value) => {
      return [...Object.keys(statusTheme)].indexOf(value) !== -1;
    },
  },
  text: String,
});
</script>

<template>
  <span :class="['badge', 'text-uppercase', statusTheme[status]]">
    {{ text || fallbackStatusText[status] }}
  </span>
</template>

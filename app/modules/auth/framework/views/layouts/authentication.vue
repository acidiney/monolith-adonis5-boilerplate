<template>
  <div class="auth d-flex align-items-center justify-content-center">
    <div class="card p-4">
      <div class="card-body h-100">
        <h1 class="titulo mb-1">{{ headers.appName }}</h1>
        <h5 class="mt-1 text-center text-muted">
          {{ headers.appDescription }}
        </h5>
        <main class="position-relative overflow-hidden">
          <div class="alert alert-danger fade show" v-if="$page.props.errors && $page.props.errors.invalid_credentials" role="alert">
            {{
              $page.props.errors.invalid_credentials
            }}
          </div>
          <div class="alert alert-success fade show" v-if="$page.props.success" role="alert">
            {{ $page.props.success }}
          </div>
          <slot></slot>
        </main>
      </div>
      <app-footer center-text />
    </div>
  </div>
</template>

<script>
import AppFooter from '@core/components/Footer.vue'
export default {
  components: {
    AppFooter,
  },
  computed: {
    headers() {
      return {
        appName: this.$page.props.header.appName,
        appDescription: this.$page.props.header.appDescription,
      }
    },
  },
}
</script>

<style scoped>
.titulo {
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

h5 {
  font-weight: 300;
  font-size: 13pt;
  color: #9e9e9e;
  margin-bottom: 14px;
  padding: 15px;
}

.auth {
  height: 100vh;
}

.card {
  width: 450px;
  min-height: 400px;
}

main {
  height: 80%;
}
</style>

<style>
.input-login:focus {
  box-shadow: none !important;
  border-color: rgba(135, 150, 165, 0.15) !important;
}
</style>

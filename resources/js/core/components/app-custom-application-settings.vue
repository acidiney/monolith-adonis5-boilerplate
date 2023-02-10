<template>
  <!-- ############ Setting START-->
  <div class="dropdown-menu dropdown-menu-center mt-3 w-md animate fadeIn">
    <div class="setting px-3">
      <div class="mb-2 text-muted">
        <strong>{{ $t('shared.interface') }}</strong>
      </div>
      <div class="mb-3" id="settingLayout">
        <label class="ui-check ui-check-rounded my-1 d-block">
          <input type="checkbox" name="foldedAside" />
          <i></i>
          <small>{{ $t('shared.minimize.menu') }}</small>
        </label>
      </div>
      <div class="mb-2 text-muted">
        <strong>{{ $t('shared.translations')}}</strong>
      </div>
      <div class="mb-2 d-flex" id="languageSettings">
        <label class="ui-check ui-check-rounded d-block">
          <input type="checkbox" :checked="defaultLanguage === 'pt'" />
          <i></i>
          <small>PT</small>
        </label>
        <!-- <label class="ui-check ui-check-rounded d-block">
          <input type="checkbox" :checked="defaultLanguage === 'fr'" />
          <i></i>
          <small>FR</small>
        </label> -->
      </div>
      <div class="mb-2 text-muted">
        <strong>{{ $t('shared.background.color')}}</strong>
      </div>
      <div class="mb-2">
        <label class="radio radio-inline ui-check ui-check-md">
          <input type="radio" name="bg" value="" />
          <i></i>
        </label>
        <label class="radio radio-inline ui-check ui-check-color ui-check-md">
          <input type="radio" name="bg" value="bg-dark" />
          <i class="bg-dark"></i>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppCustomApplicationSettings',
    methods: {
      setLocale (locale) {
        this.$i18n.setLocale(locale)
      }
    },
    computed: {
      defaultLanguage() {
        return this.$i18n.locale
      }
    }
  }
</script>

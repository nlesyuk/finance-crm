<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="description" type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{ 'Name' | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{ 'EnterName' | localizeFilter }}</small>

      </div>

      <div class="switch">
        <label>
          RU
          <input type="checkbox" v-model="isEngLocale" />
          <span class="lever"></span>
          EN
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    isEngLocale: false,
  }),
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: {required},
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isEngLocale ? 'en-US' : 'ru-RU',
        })
      } catch(e) {
        // handle error in store
      }
    }
  },
  mounted() {
    // this.name = this.info.name
    this.name = this.$store.getters.info.name
    this.isEngLocale = this.$store.getters.info.locale === 'en-US'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  }
}
</script>
<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>

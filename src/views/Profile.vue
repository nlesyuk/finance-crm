<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="description" type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите имя</small>

      </div>

      <div class="switch">
        <label>
          Off
          <input type="checkbox" />
          <span class="lever"></span>
          On
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  data: () => ({
    name: '',
    inputName: null
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
      // const formData = {
      //   email: this.email,
      //   password: this.password,
      // }

      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
        })
      } catch(e) {
        // handle error in store
      }
    }
  },
  mounted() {
    // this.name = this.info.name
    this.name = this.$store.getters.info.name

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

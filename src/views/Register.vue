<template>
  <form class="card auth-card" @submit.prevent="submitRegister">
    <div class="card-content">

      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >поле не должено быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >введите пожалуйста email</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >поле не должено быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >должно быть больше {{$v.password.$params.minLength.min}}, сейчас {{password.length}}</small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength) || ($v.name.$dirty && !$v.name.maxLength)}"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >поле не должено быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.maxLength"
        >не должно быть больше {{$v.name.$params.maxLength.max}}, сейчас {{name.length}}</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
        <br>
        <small
          class="helper-text invalid"
          v-if="!agree"
        >Обязательное поле</small>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>

  </form>
</template>

<script>
import {required, minLength, maxLength, email, password} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    agree: true,
  }),
  validations: {
    name:  { required, maxLength: maxLength(64) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    agree: { check: v => v },
  },
  methods: {
    async submitRegister() {
      if (this.$v.$invalid) {
        this.$v.$touch() // launch validation
        return
      }

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {
        // error handles in store
      }
    }
  }
}
</script>

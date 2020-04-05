<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальная величина {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  name: 'categoryCreate',
  data: () => ({
    title: '',
    limit: 100,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const newCategory = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        this.title = ''
        this.limit = ''
        this.$v.$reset()
        this.$message('Категория была создана')
      } catch (e) {}

    }
  },
  mounted() {
    M.updateTextFields() // bug fix when value is exist in a field
  }
}
</script>

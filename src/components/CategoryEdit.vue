<template>
  <div class="col s12 m6">
    <div>

      <div class="page-subtitle">
        <h4>{{'Edit'|localizeFilter}}</h4>
      </div>

      <form @submit.prevent="submitHundler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
          <label>{{'ChooseCategory'|localizeFilter}}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'Title'|localizeFilter}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{'EnterTitle'|localizeFilter}}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{'Limit'|localizeFilter}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{'MinimumValue'|localizeFilter}} {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update'|localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  name: 'category-edit',
  // props: ['categories'],
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
    test: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current(catId) {
      // let cat = null
      // for(let key of this.categories) {
      //   if( key.id === catId ) {
      //     cat = key
      //     break
      //   }
      // }
      // const {id, title, limit} = cat;

      const {title, limit} = this.categories.find(c => c.id === catId);
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHundler() {
      if (this.$v.invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch(e) {}
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  beforeDestroy() {
    if ( this.select && this.select.destroy ) {
      this.select.destroy()
    }
  }
}
</script>

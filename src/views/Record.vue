<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord'|localizeFilter}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'DontHaveCategories'|localizeFilter}}
      <router-link to="categories">{{'AddCategory'|localizeFilter}}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >{{ cat.title }}</option>
        </select>
        <label>{{'ChooseCategory'|localizeFilter}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{'Income'|localizeFilter}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{'Outcome'|localizeFilter}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{'Sum'|localizeFilter}}</label>
        <span
          class="helper-text"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальная величина {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{'Description'|localizeFilter}}</label>
        <span
          class="helper-text"
          v-if="$v.description.$dirty && !$v.description.required"
        >{{'EnterDescription'|localizeFilter}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create'|localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        console.log(this.$v.amount)
        return
      }

      if(this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          })

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          // catch error in vuex
        }
      } else {
        this.$message(`Недостаточно денег ${this.amount - this.info.bill}`)
      }

    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if(this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy() {
    if ( this.select && this.select.destroy ) {
      this.select.destroy()
    }
  }
}
</script>

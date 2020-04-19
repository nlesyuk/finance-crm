<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Sum' | localizeFilter}}</th>
      <th>{{ 'Date' | localizeFilter}}</th>
      <th>{{ 'Category' | localizeFilter}}</th>
      <th>{{ 'Type' | localizeFilter}}</th>
      <th>{{ 'Open' | localizeFilter}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) of records" :key="record.id">
      <td>{{ index+1 }}</td>
      <td>{{ record.amount | currencyFilter() }}</td>
      <td>{{ record.date | dateFilter('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push('/detail/'+ record.id)"
          v-tooltip="more"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history-table',
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  computed:{
    more() {
      return localizeFilter('More')
    }
  }
}
</script>

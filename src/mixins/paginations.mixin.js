import _ from 'lodash'

export default {
  data() {
    // use dec.fn for save this
    return {
      page: +this.$route.query.page || 1, // page by default
      pageSize: 5, // item per page
      pageCount: 0, // we don't know
      allItems: [], // all items
      items: [], // allItems / PageSize
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems  = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.items = this.allItems[page - 1] || this.allItems[0]
      this.$router.push(`${this.$route.path}?page=${page}`) // manage adressline
    }
  }
}

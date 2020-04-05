import firebase from 'firebase/app'

export default {
  state: {},
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title,limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },

    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        // const categ = []
        // Object.keys(categories).forEach(key => {
        //   categ.push({
        //     id: key,
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //   })
        // })
        // return categ

        return Object.keys(categories).map(key => ({...categories[key], id: key}))

      } catch(e) {
        commit('setError', e)
      }
    },

    async updateCategory({dispatch, commit}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch(e) {
        commit('setError', e)
      }
    }
  }
}

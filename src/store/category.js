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
    }
  }
}

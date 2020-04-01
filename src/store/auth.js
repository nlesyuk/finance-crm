import firebase from 'firebase/app'

export default {
  state: {  },
  mutations: {  },
  actions: {
    async login({dispactch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async logout({dispatch, commit}) {
      try {
        await firebase.auth().signOut()
      } catch(e) {}
    }
  },
}

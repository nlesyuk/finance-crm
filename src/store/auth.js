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

    async register({dispatch, commit},{email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    },

    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    async logout({dispatch, commit}) {
      try {
        await firebase.auth().signOut()
      } catch(e) {}
    }
  },
}

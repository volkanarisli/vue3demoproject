import { createStore } from 'vuex'
import { userModule } from './user'
export default createStore({
  state: {

  },

  //mutations are functions that effects the state
  mutations: {


  },

  //Actions are the functions that you call trhought your application that call mutations
  actions: {

  },
  modules: {
    User: userModule
  }
})

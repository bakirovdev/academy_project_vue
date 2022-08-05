import Vue from 'vue'
import Vuex from 'vuex'
import student from './modules/student'
import login from './modules/login'
import course from './modules/course'
import time from './modules/time'
import region from './modules/region'
import group from './modules/group'
import group_students from './modules/group_student'
import users from './modules/users'

Vue.use(Vuex)
const state = () => ({
    overlay: false
})
const getters = {
  getOverlay: state => state.overlay
}
const mutations = {
  SET_OVERLAY: (state, value) => state.overlay = value 
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    users,
    student,
    login,
    course,
    time,
    region,
    group,
    group_students,
  }
})

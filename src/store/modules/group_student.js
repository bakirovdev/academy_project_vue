import axios from "@/axios";

const state = () =>({
  students:[],
  unJoinedStudents:[]
})

const getters = {
    getStudents: state => state.students,
    getUnjoinedStudent: state => state.unJoinedStudents
}

const actions = {
    async fetchStudents({commit}, data){
        try {
            const response = await axios.get(`/group_students/${data.id}`, {
                params:{
                    search: data.search || ''
                }
            })
            commit('SET_STUDENTS', response.data)
            Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async addStudent({dispatch}, body){
        try {
            const response = await axios.post('group_students', body);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateActive({dispatch}, id){
      try {
          const response = await axios.patch(`/group_students/update_active/${id}`)
          return Promise.resolve(response)
      } catch (error) {
          return Promise.reject(error)
      }  
    },
    async getUnJoinedStudent({commit}, params){
        try {
            const response = await axios.get('/group_students/un_joined_student', {
                params:{
                    group_id: params.group_id,
                    search: params.search
                }
            })
            commit('SET_UN_JOINED_STUDENT', response.data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const mutations = {
    SET_STUDENTS: (state, response) => {
        state.students = response.data
    },
    SET_UN_JOINED_STUDENT: (state, response) => {
        response.data.map((element) => {
            element.comment = ''
            element.attend = 0
        })
        state.unJoinedStudents = response.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
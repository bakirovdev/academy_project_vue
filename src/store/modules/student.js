import axios from "@/axios"

const state = () => ({
    student_data: {
        data: [],
        meta: {},
    },
    params: {}
})

const getters = {
    getStudents: state=>state.student_data,
    getTotalStudent:  state=>state.student_data.meta&&state.student_data.meta.last_page || 1
}
const actions = {
    async fetchStudents({commit}, params) {
        try {
            const students = await axios.get('/students', {
                params: {
                    ...params
                }
            })
            commit('SET_STUDENT_DATA', {students_data: students.data, params})
            Promise.resolve(students)
        } catch (error) {
            Promise.reject(error)
        }
    },
    async createStudent({ dispatch }, body) {
        try {
            const student = await axios.post('/students', body)
            await dispatch('fetchStudents');
            return Promise.resolve(student);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async updateStudent({ dispatch }, body) {
        try {
            const student = await axios.patch(`/students/${body.id}`, body)
            await dispatch('fetchStudents');
            return Promise.resolve(student);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async checkUser({}, body){
        console.log(body);
        try {
            const response = await axios.put(`/students/update_status/${body.id}`, {
                status:  body.status
            })
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const mutations = {
    SET_STUDENT_DATA: (state, { students_data, params })=>{
        state.student_data = students_data
        state.params = params
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
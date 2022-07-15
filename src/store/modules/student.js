import axios from "@/axios"

const state = () => ({
    student_data: [],
    params: {}
})

const getters = {
    getStudents: state=>state.student_data,
}
const actions = {
    async fetchStudents({commit}, params) {
        try {
            const students = await axios.get('/students', {
                params: {
                    ...params
                }
            })
            commit('SET_STUDENT_DATA', {students})
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
    }
}

const mutations = {
    SET_STUDENT_DATA: (state, { students })=>{
        state.student_data = students.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
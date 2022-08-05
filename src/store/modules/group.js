import axios from "@/axios";

const state = () =>({
    group_data:[],
    group_lesson_time:[],
    group_students:[]
})

const getters = {
    getGroups: state =>state.group_data,
    getGroupLessonTime: state => state.group_lesson_time,
    getGroupStudent: state => state.group_students
}

const actions = {
    async fetchGroups({ commit }, params={}) {
        try {
            const groups = await axios.get('/groups', {
                params: {
                    ...params
                }
            })
            commit('SET_GROUPS_DATA', { groups })
            return Promise.resolve(groups)    
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createGroup({dispatch}, body) {
        try {
            const response = await axios.post('/groups', {
                title: body.title,
                course_id: body.course_id,
                times: body.times
            })
            await dispatch('fetchGroups');
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateGroup({dispatch}, body){
        try {
            const response = await axios.patch(`/groups/${body.id}`, {
                title: body.title,
                course_id: body.course_id,
                times: body.times
            })
            await dispatch('fetchGroups')
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async groupLessonTime({commit}, id){
        try {
            const response = await axios.get(`/groups/lesson_time/${id}`);
            await commit('SET_GROUP_LESSON_TIME', response)
            Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error)
        }
    },
}

const mutations = {
    SET_GROUPS_DATA: (state, data) => {
        state.group_data = data.groups.data
    },
    SET_GROUP_LESSON_TIME:(state, response) => {
        state.group_lesson_time = response.data.data
    },
    SET_GROUP_STUDENTS: (state, response) => {
        state.group_students = response.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import axios from "@/axios";
const state = () => ({
    group_lesson_data: {
        data:[],
        meta:[]
    },
    params: {}
})

const getters = {
    getGroupLesson: state => state.group_lesson_data,
    getTotalGroupLesson:  state=>state.group_lesson_data.meta&&state.group_lesson_data.meta.last_page || 1
}

const actions = {
    async fetchGroupLessons({ commit }, params){
        try {
            const response = await axios.get(`/lessons/group/${params.group_id}`, {
                params:{
                    ...params
                }
            })
            commit('SET_GROUP_LESSONS', {response, params})
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const mutations = {
    SET_GROUP_LESSONS : (state, {response, params}) => {
        state.group_lesson_data = response.data
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
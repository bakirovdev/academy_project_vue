import axios from "@/axios";

const state = () =>({
    group_data:[],
    find_group:[],
    user_group:[],
    group_lesson_time:[],
    group_students:[],
    group_price:[]
})

const getters = {
    getGroups: state =>state.group_data,
    getUserGroups: state =>state.user_group,
    getFindGroup: state =>state.find_group,
    getGroupLessonTime: state => state.group_lesson_time,
    getGroupStudent: state => state.group_students,
    getPrice: state => state.group_price
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
    async userGroup({ commit }, params={}) {
        try {
            const response = await axios.get('/groups/user', {
                params: {
                    ...params
                }
            })
            commit('SET_USER_GROUPS_DATA', response)
            return Promise.resolve(response)    
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
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async findGroup({ commit }, id){
        try {
            const response = await axios.get(`/groups/${id}`)
            await commit('SET_FIND_GROUP', response.data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)            
        }
    },
    async groupPrice({ commit }, id){
        try {
            const response = await axios.get(`/groups/price/${id}`)
            await commit('SET_GROUP_PRICE', response.data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)            
        }
    }
}

const mutations = {
    SET_GROUPS_DATA: (state, data) => {
        state.group_data = data.groups.data
    },
    SET_USER_GROUPS_DATA: (state, response) => {
        state.user_group = response.data
    },
    SET_GROUP_LESSON_TIME:(state, response) => {
        state.group_lesson_time = response.data.data
    },
    SET_GROUP_STUDENTS: (state, response) => {
        state.group_students = response.data
    },
    SET_FIND_GROUP: (state, response) => {
        state.find_group = response
    },
    SET_GROUP_PRICE: (state, response) => {
        state.group_price = response
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

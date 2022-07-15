import axios from "@/axios";

const state = () => ({
    times_data: [],
    params: {}
})

const getters = {
    getTimes: state => state.times_data
}
const actions = {
    async fetchTimes({ commit }, params = null) {
        try {
            const times = await axios.get('/times');
            commit('SET_COURSE_TIME_DATA', { times })
            return Promise.resolve(times)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createTime({ dispatch }, body) {
        try {
            const times = await axios.post('/times', body);
            await dispatch('fetchTimes')
            return Promise.resolve(times)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateTime({ dispatch }, body) {
        try {
            const times = await axios.patch(`/times/${body.id}`, body);
            await dispatch('fetchTimes')
            return Promise.resolve(times)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const mutations = {
    SET_COURSE_TIME_DATA: (state, { times }) => {
        state.times_data = times.data
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
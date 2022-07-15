import axios from "@/axios";

const state = () => ({
    region_data: [],
    active_region_data: [],
    params:{}
})

const getters = {
    getActiveRegions: state => state.active_region_data
}

const actions = {
    async fetchActiveRegions({ commit }, params = null) {
        try {
            const regions = await axios.get('/regions/active_region');
            commit('SET_ACTIVE_REGION_DATA', {regions})
            return Promise.resolve(regions)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
const mutations = {
    SET_ACTIVE_REGION_DATA: (stat, { regions}) => {
        stat.active_region_data = regions
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
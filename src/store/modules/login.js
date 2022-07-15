import axios from "@/axios";
const state = () => ({
    // 
})

const getters = {

}

const actions = {
    async signIn({ commit }, body) {
        body.client_secret = process.env.VUE_APP_CLIENT_SECRET;
        try {
            const response = await axios.post('/auth', body)
            commit('SET_TOKEN', response.data);
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
    }
}

const mutations = {
    SET_TOKEN : (state, login) => {
        localStorage.access_token = login.access_token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
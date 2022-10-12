import axios from "@/axios";

const state = () =>({
    user_data: {
        data: [],
        meta: {}
    },
    params:{},
    active_users: []
})

const getters = {
    getAllUsers: state => state.user_data,
    getTotalUser: state => state.user_data.meta&&state.user_data.meta.last_page || 1
}

const actions = { 
    async fetchUsers({commit, state}, body = null){
        try {
            const response =  await  axios.get('/users', {
                params: {
                    ...body
                }
            })
            commit('SET_USER_DATA', {user_data: response.data, params: body});
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error);            
        }
    },
    async createUser({dispatch}, body){
        try {
            const response = await axios.post('/users', {
                full_name: body.full_name,
                username: body.username,
                password: body.password,
                phone_number: body.phone_number
            })
            await dispatch('fetchUsers');
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(response)
        }
    },
    async updateUser({dispatch, state}, body){
        try {
            const response = await axios.put(`users/${body.id}`, {
                username: body.username,
                full_name: body.full_name,
                password: body.password,
                phone_number: body.phone_number
            })
            await dispatch('fetchUsers', state.params)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async updateActive(context, id){
        try {
            const response = await axios.put(`/users/update_active/${id}`);
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const mutations = {
    SET_USER_DATA: (state, {user_data, params}) => {
        state.user_data = user_data,
        state.params = params
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
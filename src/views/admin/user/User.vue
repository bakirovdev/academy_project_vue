<template>
    <v-container fluid class="pa-0 ma-0">
        <div class="navbar">
            <span class="nav-span">
                <v-icon color="white" large>mdi-account-key</v-icon> Users
            </span>
            <div class="nav-action">
                <button class="add-btn" @click="createUser()">
                    <v-icon class="mr-3 pa-0" color="#286159">mdi-plus-circle-outline</v-icon>Add User
                </button>
            </div>
        </div>
        <v-container class="main-container mt-15" fluid>
            <v-row class="pb-4 pt-3">
                <v-col md="8" sm="6" xs="1"></v-col>
                <v-col>
                    <v-text-field append-icon="mdi-account-search" v-model="search" @keyup.enter="searchUser()" label="Find user" placeholder="John Due"  dense hide-details/>
                </v-col>
            </v-row>
            <div style="display: block">
                <v-data-table hide-default-footer :disable-pagination="true" :headers="tableHeader" :items="users.data">
                    <template #item.actions="{ item }">
                        <div class="d-flex">
                            <v-switch class="py-0 my-2" hide-details @click="updateActive(item.id)" v-model="item.active"/>
                            <button
                             class="action-btn amber accent-2"
                             icon
                             @click="editUser(item)"
                            >
                                <v-icon color="orange accent-4" small>mdi-pencil</v-icon>
                            </button>
                        </div>
                    </template>

                </v-data-table>
            </div>
        </v-container>
            <div class="pagination1">
                <v-row justify="center" align="center">
                    <v-pagination
                    color="#0e3f62"
                    :length="totalUser"
                    :total-visible="7"
                    v-model="options.page"
                    />
                </v-row>
            </div>
        <CreateUpdateUser ref="create_update_user"/>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateUpdateUser from './create-update-user.vue'
export default {
    name: "User",
    comments: { CreateUpdateUser },
    data() {
        return {
            search: "",
            options: {
                page: 1,
            },
            tableHeader: [
                { text: "ID", value: "id" },
                { text: "Username", value: "username" },
                { text: "Full name", value: "full_name" },
                { text: "Phone number", value: "phone_number" },
                { text: "Actions", value: "actions" }
            ]
        };
    },
    mounted() {
    },
    computed: {
        ...mapGetters({
            users: "users/getAllUsers",
            totalUser: "users/getTotalUser" 
        })
    },
    watch: {
        "options.page": { handler: "init" },
    },
    async created() {
        await this.init();
    },
    methods: {
        async init() {
            try {
                await this.$store.dispatch("users/fetchUsers", { search: this.search, page: this.options.page });
            }
            catch (error) {
                this.$toast.error(error);
            }
        },
        async updateActive(id) {
            try {
                const response = await this.$store.dispatch("users/updateActive", id);
                await this.init();
                this.$toast.success(response.data && response.data.message || "Done!");
            }
            catch (error) {
                this.$toast.error(error.response && error.response.message || "error ");
            }
        },
        async searchUser() {
            await this.init();
        },
        createUser(){
            this.$refs.create_update_user.show();
        },
        editUser(item){
            this.$refs.create_update_user.show(item);
        }
    },
    components: { CreateUpdateUser }
}
</script>
<style src="../../../styles/main.css">
</style>
<style>
</style>
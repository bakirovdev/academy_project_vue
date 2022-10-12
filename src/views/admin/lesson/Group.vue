<template>
    <v-container fluid class="pa-0 ma-0">
        <div class="navbar">
            <span class="nav-span">
                <v-icon color="white" large>mdi-book-check</v-icon>Your Groups
            </span>
        </div>
        <v-container fluid class="mt-15">
            <v-card>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="3">
                            <v-text-field hide-details append-icon="mdi-layers-search-outline" dense
                                @keyup.enter="init()" @click:append="init" outlined v-model="search" label="Search">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <div class="table mt-4">
                <v-data-table hide-default-footer disable-pagination :items="groups.data" v-model="selected"
                    :headers="header">
                    <template #item="{ item }">
                        <tr @dblclick="toLesson(item)">
                            <td>{{ item.id }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.Course.title }}</td>
                            <td>
                                <v-btn icon class="pa-0 mx-2" color="purple darken-4"
                                    @click="showGroupLessonTimes(item.GroupLessonTime)">
                                    <v-icon size="2rem"> mdi-clock-time-two-outline </v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="success">mdi-login</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </div>
        </v-container>
        <v-dialog v-model="time_dialog" max-width="700px">
            <v-card>
                <v-card-title class="bg-info pa-3">
                    <h2>Group Lesson times</h2>
                </v-card-title>
                <v-card-text>
                    <v-data-table hide-default-footer :items="time_data" :headers="timeHeader">
                        <template #item.active="{ item }">
                            <v-icon :color="item.active ? 'green' : 'red'">mdi-alarm-light</v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'UserGroup',
    data() {
        return {
            search: "",
            time_dialog: false,
            selected: null,
            header: [
                { text: 'Id', value: 'id' },
                { text: 'Title', value: 'title' },
                { text: 'Course', value: 'Course.title' },
                { text: 'Actions', value: 'actions' },
            ],
            timeHeader: [
                { text: 'Id', value: 'Time.id' },
                { text: 'Weak', value: 'Time.week' },
                { text: 'Start Time', value: 'Time.start_time' },
                { text: 'End Time', value: 'Time.end_time' },
                { text: 'Active', value: 'active' },
                { text: 'Updated Time', value: 'updated_at' },
            ],
            time_data: [],
        }
    },
    computed: {
        ...mapGetters({
            groups: 'group/getUserGroups'
        })
    },
    async created() {
        await this.init();
    },
    methods: {
        async init() {
            try {
                await this.$store.dispatch('group/userGroup', { search: this.search })
            } catch (error) {
                console.log(error);
                this.$toast.error(error.message || 'xato')
            }
        },
        showGroupLessonTimes(item) {
            try {
                this.time_data = item
                this.time_dialog = true
            } catch (error) {
                this.$toast.error(error.response.message || 'Xatolik yuz berdi');
            }
        },
        toLesson(item) {
            try {
                this.$router.push({
                    name: 'Lesson',
                    params: {
                        group_id: item.id
                    }
                })
            } catch (error) {
                this.$toast.error(error.message || 'xato')
            }
        }
    }
}
</script>
<style src="../../../styles/main.css">
</style>

<template>
    <v-container fluid class="pa-0 ma-0">
        <div class="navbar">
            <span class="nav-span">
                <v-icon color="white" large>mdi-school</v-icon>Attendance
            </span>
        </div>
        <v-container fluid class="mt-15">
            <v-row>
                <v-col cols="7">
                    <span> Students</span>
                    <v-card >
                        <v-card-text>
                            <div class="attendance-card">
                                <v-data-table
                                    dense
                                    hide-default-footer
                                    disable-pagination
                                    :items="groupStudents"
                                    :headers="studentHeaders"
                                >
                                    <template #item.fio="{ item }">
                                        <span>{{item.Student.first_name + " " + item.Student.last_name}}</span>
                                    </template>
                                    <template #item.attend="{ item }">
                                        <v-checkbox class="pa-0 ma-0"
                                            v-model="item.attend"
                                            color="indigo"
                                            hide-details
                                        ></v-checkbox>
                                    </template>
                                    <template #item.comment="{ item }">
                                        <v-text-field dense hide-details placeholder="comment" v-model="item.comment">
                                            
                                        </v-text-field>
                                    </template>
                                </v-data-table>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="saveAttendance" color="success" small>save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                {{data}}
            </v-row>
        </v-container>
    </v-container>
</template>
<script src="">
import { mapGetters } from 'vuex';
import group from '../../../store/modules/group';
export default {
    name: 'Attendance',
    props: {
        lesson_id: {
            type: [String, Number],
            required: true
        },group_id: {
            type: [String, Number],
            required: true
        }
    },
    data(){
        return {
            studentHeaders: [
                {text:"id", value: 'Student.id'},
                {text:"Full name", value: 'fio'},
                {text:"Phone", value: 'Student.phone_number'},
                {text:"Attend", value: 'attend'},
                {text:"Comment", value: 'comment'},
            ],
            data: []
        }
    },
    computed:{
        ...mapGetters({
            groupStudents: 'group_students/getStudents'
        })
    },
    async created(){
        await this.init();
    },
    methods:{
        async init(){
            try {
                this.$overlay(true);
                await this.$store.dispatch('group_students/fetchStudents', {id: this.group_id});
                this.$overlay(false);
            } catch (error) {
                this.$toast.error(error.data&&error.data.message || "Someting gets wrong");
            }
        },
        saveAttendance(){
            try {
                this.data = []
                this.groupStudents.map((element, index) => {
                    this.data.push({student_id: element.Student.id, comment: element.comment, attend: element.attend});
                });
            } catch (error) {
                
            }
        }
    }
}
</script>
<style>
.attendance-card{
    min-height: 700px !important;
}
</style>
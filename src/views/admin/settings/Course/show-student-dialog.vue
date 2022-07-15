<template>
    <v-dialog v-model="dialog" max-width="1000px" persistent>
        <v-card>
            <v-card-title class="primary white--text">
                <span>Students of {{course.title}}</span>
                <v-spacer/>
                <v-btn icon class="" @click="closeDialog()"><v-icon color="" size="2rem">mdi-close-circle-outline</v-icon></v-btn>
            </v-card-title>
            
            <v-card-text>
                <v-container fluid class="pa-0 ma-0">
                    <v-data-table
                        :headers="header"
                        hide-details
                        hide-default-footer
                        :items="courses"
                        :loading="loading"
                        dense
                    >
                        <template #item.full_name="{item}">
                            <span>{{item.first_name +' '+ item.last_name}}</span>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog> 
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'ShowStudentsDialog',
    data(){
        return {
            dialog:false,
            course: {},
            students: [],
            loading: true,
            header: [
                { text: "Id", value: "id" },
                { text: "Full name", value: "full_name" },
                { text: "Phone number", value: "phone_number" },
                { text: "Region", value: "Region.title" },
                { text: "Gender", value: "Gender.title" },
                { text: "Weak", value: "Weak.weak_name" },
            ]
        }
    },
    computed:{
        ...mapGetters({
            courses: 'course/getCourseStudents'
        })
    },
    methods: {
        async show(course){
            try {
                this.loading = true;
                const courses = await this.$store.dispatch('course/courseStudents', course.id);
                this.course = course;
                this.dialog = true;
                this.loading = false
            } catch (error) {
                console.log(error);
                this.$toast.error(error.message);                
            }
        },
        closeDialog(){
            try {
                this.dialog = false
            } catch (error) {
                
            }
        }
    }
}
</script>
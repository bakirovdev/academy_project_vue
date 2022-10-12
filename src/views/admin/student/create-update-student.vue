
<template>
    <v-dialog v-model="dialog" class="create-student-dialog" max-width="700px" persistent>
        <v-card class="" >
            <v-card-title class="bg-blue pa-3">{{title}}</v-card-title>
            <v-card-text class="pa-3">
                <v-text-field
                    v-model="editing_student.first_name"
                    solo
                    label="First Name"
                    placeholder="John"
                >
                </v-text-field>
                <v-text-field
                    v-model="editing_student.last_name"
                    solo
                    label="Last Name"
                    placeholder="Due"
                >
                </v-text-field>
                <v-text-field
                    v-model="editing_student.phone_number"
                    solo
                    label="Phone Number"
                    placeholder="+(99891)138-37-33"
                    v-mask="mask"
                >
                </v-text-field>
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        solo
                        dense
                        v-model="editing_student.birthday"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        @click="dialog2 = true"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-dialog v-model="dialog2" max-width="300px" persistent>
                        <v-date-picker                            
                            v-model="editing_student.birthday"
                            :active-picker.sync="activePicker"
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1950-01-01"
                        >
                            <v-spacer></v-spacer>
                            <v-btn v-if="activePicker == 'DATE'" @click="menu = !menu" text color="primary"> OK </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-menu>
                <v-autocomplete
                    class="mt-3"
                    v-model="editing_student.region_id"
                    :items="regions.data"
                    hide-details
                    single-line
                    clearable
                    label=" Choice region"
                    item-text="title"
                    dense
                    solo
                    item-value="id"
                    color="blue-grey lighten-2"
                >
                    <template #item="data">
                        <v-list-item-title class="mx-3" v-text="data.item.title" />
                    </template>
                </v-autocomplete>
                <v-autocomplete
                    class="mt-3"
                    v-model="editing_student.gender"
                    :items="gender"
                    hide-details
                    single-line
                    clearable
                    label=" Choice gender"
                    item-text="title"
                    dense
                    solo
                    item-value="key"
                    color="blue-grey lighten-2"
                >
                    <template #item="data">
                        <v-list-item-title class="mx-3" v-text="data.item.title" />
                    </template>
                </v-autocomplete>
            </v-card-text>
            <v-card-actions class="pa-3">
                <v-spacer/>
                <v-btn small class="warning px-4 mx-5" @click="closeDialog()">
                    cancel
                </v-btn>
                 
                <v-btn small class="px-4 bg-blue" 
                   :disabled="
                        !editing_student.first_name 
                        || !editing_student.last_name
                        || !editing_student.birthday    
                    "
                    @click="saveStudent()">
                    Save
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>
<script>
const default_student = {
    id:null,
    first_name: '',
    last_name: '',
    birthday: '',
    course_id: ''
}
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            dialog2:false,
            activePicker: null,
            menu:false,
            mask: '+(998)## ###-##-##',
            dialog: false,
            editing_student: { ...default_student },
            gender: [
                {
                    id: 1,
                    title:"Male",
                    key:"male"
                },
                {
                    id: 2,
                    title: "Female",
                    key:"female"
                }
            ]
        }
    },
    async created() {
        await this.init();
    },
    computed:{
        ...mapGetters({
            courses: "course/getCourse",
            course_times: "course_time/getCourseTimes",
            regions: "region/getActiveRegions",
            weeks: "week/getActiveWeeks",
        }),
        title(){
            if(this.editing_student.id) return "Edit Student"
            return "Create Student"
        }
    },
    watch:{
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        show(student = null){
            this.editing_student = {...student}
            this.dialog = true
        },
        async init(){
            await this.$store.dispatch("region/fetchActiveRegions");
        },
        async saveStudent(){
            try {
                if (this.editing_student.id) {
                    await this.$store.dispatch('student/updateStudent', this.editiphpng_student);
                }else{
                    await this.$store.dispatch('student/createStudent', this.editing_student);
                    this.$toast.success('The student has created')
                }
                this.closeDialog()
            } catch (error) {
                this.$toast.error(error.message || 'error')
            }
            
        },
        closeDialog(){
            this.editing_student = {...this.default_student}
            this.dialog = false
        }
    }
}
</script>
<style>
#selection{
    border-radius: 10px;
    height: 35px;
    width: 240px;
    border: 1px solid black;
    font-family: Arial;
}
#selection:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 1px rgba(59, 153, 252, .7);
    
    color: #222; 
    outline: none;
}
#selection:focus .hidden-option{
    display: none;
}
.v-dialog .v-select.v-text-field input {
    text-indent: 10px !important;
}
.v-dialog .v-select__selections{
    text-indent: 10px !important;
}
.v-dialog .v-text-field__slot input{
    text-indent: 10px !important;
}
.v-dialog .v-text-field__slot label, .v-select.v-text-field label{
    text-indent: 10px !important;
}
.v-date-picker-title{
    padding: 10px !important;    
}
.create-student-dialog .filter {
    width: 70%;
}
</style>
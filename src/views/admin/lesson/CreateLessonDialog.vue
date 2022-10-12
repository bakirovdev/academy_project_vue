
<template>
    <v-dialog v-model="dialog" class="create-student-dialog" max-width="700px" persistent>
        <v-card class="" >
            <v-card-title class="bg-blue pa-3">Create Lesson</v-card-title>
            <v-card-text class="pa-3">
                
                <v-menu
                    ref="menu"
                    v-model="start_time_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="createdData.start_time"
                        label=""
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                        format="24hr"
                        v-if="start_time_menu"
                        v-model="createdData.start_time"
                        full-width
                    ></v-time-picker>
                </v-menu>
                <v-menu
                    ref="menu"
                    v-model="end_time_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="createdData.start_time"
                        label=""
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                        format="24hr"
                        v-if="start_time_menu"
                        v-model="createdData.start_time"
                        full-width
                    ></v-time-picker>
                </v-menu>
                <!-- <v-text-field outlined dense label="Lesson's end time" type="time"></v-text-field> -->
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="createdData.date_time"
                        label="Date time"
                        outlined
                        dense
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="createdData.date_time"
                    @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>
                {{createdData}}
            </v-card-text>
            <v-card-actions class="pa-3">
                <v-spacer/>
                <v-btn small class="warning px-4 mx-5" @click="cancelDialog()">
                    cancel
                </v-btn>
                 
                <v-btn small class="px-4 bg-blue">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
const defaultData = {
    start_time:null,
    finish_time:null,
    date_time:undefined,
    group_id:null
}
export default {
    name: "CreateLessonDialog",
    data() {
        return {
            dialog:false,
            createdData: {
                ...defaultData
            },
            menu:false,
            start_time_menu:false,
            finish_time_menu:false,
        }
    },
    async created() {
        await this.init();
    },
    computed:{
        ...mapGetters({
       
        })
    },
    methods: {
        show(data){
            this.createdData.group_id = data.group_id
            this.dialog = true;
        },
        cancelDialog(){
            this.dialog = false;
        },
        async init(){
            await this.$store.dispatch("region/fetchActiveRegions");
        },
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
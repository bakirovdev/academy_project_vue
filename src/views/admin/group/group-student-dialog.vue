<template>
  <v-dialog v-model="dialog" max-width="100%" president transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-card-title class="pa-0 text-right bg-blue">
        <v-row class="pa-0 ma-0">
          <v-col cols="6" class="px-0">
            <h2 class="text-left px-4 pb-2">students</h2>
          </v-col>
          <v-col class="pa-0 ma-0">
            <div class="darken-1">
              <v-btn icon class="text-right ma-4" @click="closeDialog()">
                <v-icon color="warning" size="30px">mdi-close-box</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-1 pt-3">
        <div elevation>
          <v-row class="pa-0 ma-0">
            <v-col cols="3">
              <!-- <v-text-field class="mx-3" dense outlined solo label="Search input" placeholder="Jon Due"
                append-icon="mdi-account-search-outline">
              </v-text-field> -->
            </v-col>
            <v-col>
              <div class="text-right pr-3">
                <v-btn color="success" depressed dark @click="addStudent()" snakk>
                  <v-icon>mdi-plus</v-icon> Add Student
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-data-table class="pa-3" dense :search="search" :disable-pagination="true" hide-default-footer
                  :headers="studentHeader" :items="groupStudents">
                  <template v-slot:top>
                    <div>
                      <v-row class="pb-4">
                        <v-col cols="8"></v-col>
                        <v-col cols="4" xs="12">
                          <v-text-field append-icon="mdi-layers-search-outline" single-line hide-details
                            v-model="search" label="Search" class="mx-4">
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                  <template #item.actions="{ item }">
                    <v-switch v-model="item.active" inset @click="updateActive(item.id)"></v-switch>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-dialog max-width="50rem" v-model="addStudentDialog" persistent>
        <v-card>
          <v-card-title class="white--text bg-header">Add student to this class</v-card-title>
          <v-card-text>
            <v-text-field v-if="!chooseStudents.id" append-icon="mdi-layers-search-outline" v-model="addDialogSearch" single-line hide-details
              label="Search" class="mx-4" @keyup.enter="searchStudent()">
            </v-text-field>
            <v-data-table v-if="!chooseStudents.id" class="pa-2" dense disable-pagination hide-default-footer :headers="addTableHeader"
              :items="unjoinedStudents">
              <template #item.action="{ item }">
                <v-btn icon @click="chooseStudent(item)">
                  <v-icon color="success">mdi-account-arrow-right</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <v-card class="mt-5" v-if="chooseStudents.id">
              <v-card-text >
                <div>
                  <v-row class="p-0 m-0">
                    <v-col cols="2" class="blue-grey--text pa-1 ma-0">Id</v-col>
                    <v-col cols="4" class="blue-grey--text pa-1 ma-0">First name</v-col>
                    <v-col cols="4" class="blue-grey--text pa-1 ma-0">Last name</v-col>
                    <v-col cols="2" class="blue-grey--text pa-1 ma-0">Action</v-col>
                    <v-col cols="2" class="pa-1 ma-0">{{chooseStudents.id}}</v-col>
                    <v-col cols="4" class="pa-1 ma-0">{{chooseStudents.first_name}}</v-col>
                    <v-col cols="4" class="pa-1 ma-0">{{chooseStudents.last_name}}</v-col>
                    <v-col cols="2" class="pa-1 ma-0"><v-btn icon @click="deleteStudent()"><v-icon color="red" size="16px">mdi-trash-can</v-icon></v-btn></v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
            <v-text-field type="number" label="Bonus" v-model="bonus" class="mt-7" @keypress="filter(event)">
            </v-text-field>
          </v-card-text>
          <v-card-actions text-center>
            <v-spacer />
            <v-btn text color="warning" @click="closeAddStudentDialog()">
              cancel
            </v-btn>
            <v-btn text color="success" :disabled="!chooseStudents.id" @click="addStudentToGroup()">
              add
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </v-card>

  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GroupStudentDialog",
  data() {
    return {
      group: null,
      dialog: false,
      bonus:null,
      addStudentDialog: false,
      mask:"######",
      search: '',
      addDialogSearch: '',
      chooseStudents: {},
      studentHeader: [
        { text: 'ID', value: 'id' },
        { text: 'First name', value: 'Student.first_name' },
        { text: 'Last name', value: 'Student.last_name' },
        { text: 'Started date', value: 'start_date' },
        { text: 'Ended date', value: 'end_date' },
        { text: 'Actions', value: 'actions' },
      ],
      addTableHeader: [
        { text: 'ID', value: 'id' },
        { text: 'First name', value: 'first_name' },
        { text: 'Last name', value: 'last_name' },
        { text: 'Action', value: 'action' },
      ]
    };
  },
  computed: {
    ...mapGetters({
      groupStudents: 'group_students/getStudents',
      unjoinedStudents: 'group_students/getUnjoinedStudent',
    }),
  },
  async created() {
    await this.init();
  },
  methods: {
    async show(item) {
      try {
        this.group = item
        await this.getStudents(item.id)
        await this.getStudents(item.id);
        this.dialog = true;
      } catch (error) {
        console.log(error);
      }
    },
    async init() {
      try {
        // some code in there
      } catch (error) {
        console.log(error);
      }
    },
    async saveGroup() {

    },
    async getStudents() {
      try {
        await this.$store.dispatch('group_students/fetchStudents', { id: this.group.id, search: this.search })
      } catch (error) {
        console.log(error);
      }
    },
    async updateActive(id) {
      try {
        const response = await this.$store.dispatch('group_students/updateActive', id);
        this.$toast.success(response.data.message || 'Action have done');
      } catch (error) {
        console.log(error);
        this.$toast.error('Something is wrong pleas wait');
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    addStudent() {
      this.addStudentDialog = true
    },
    async addStudentToGroup(){
      try {
        const data = {bonus: this.bonus, group_id: this.group.id, student_id: this.chooseStudents.id}
        const response = await this.$store.dispatch('group_students/addStudent', data);
        await this.getStudents();
        await this.searchStudent();
        this.closeAddStudentDialog();
        this.$toast.success(response.data&&response.data.message || 'Student have added')
      } catch (error) {
        this.$toast.error(error.response&&error.response.data.message||'Something is wrong')
      }
    },
    closeAddStudentDialog() {
      this.bonus = 0;
      this.addDialogSearch = '';
      this.chooseStudents = {};
      this.addStudentDialog = false;
    },
    async searchStudent() {
      try {
        await this.$store.dispatch('group_students/getUnJoinedStudent', { group_id: this.group.id, search: this.addDialogSearch })
      } catch (error) {

      }
    },
    async chooseStudent(item) {
      this.chooseStudents = { ...item };
    },
    deleteStudent(){
      this.chooseStudents = {}
    },
    filter: function(evt) {
      evt = (evt) ? evt : window.event;
      let expect = evt.target.value.toString() + evt.key.toString();
      
      if (!/^[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
};
</script>
<style src="../../../styles/main.css">
</style>
<style>
.v-dialog .v-select.v-text-field input {
  text-indent: 10px !important;
}

.v-dialog .v-select__selections {
  text-indent: 10px !important;
}

.v-dialog .v-text-field__slot input {
  text-indent: 10px !important;
}

.v-dialog .v-text-field__slot label,
.v-select.v-text-field label {
  text-indent: 10px !important;
}

.v-date-picker-title {
  padding: 10px !important;
}

.create-student-dialog .filter {
  width: 70%;
}

.gray {
  background-color: #CFD8DC;
}
</style>
<template>
  <v-container fluid class="pa-0 ma-0">
    <div class="navbar">
      <span class="nav-span"
        ><v-icon color="white" large>mdi-layers-triple</v-icon> Groups</span
      >
      <div class="nav-action">
        <button class="add-btn" @click="createGroup()">
          <v-icon class="mr-3 pa-0" color="#286159"
            >mdi-plus-circle-outline</v-icon
          >Add Student
        </button>
      </div>
    </div>
    <v-container fluid class="mt-15">
      <v-card>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="3">
              <v-text-field
                hide-details
                v-model="filter.search"
                append-icon="mdi-layers-search-outline"
                dense
                @keyup.enter="filterGroup()"
                @click:append="filterGroup()"
                outlined
                label="Search"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-data-table
        :headers="header"
        :items="groups"
        :disable-pagination="true" 
        hide-default-footer
        
      >
         <template #item.actions="{ item }">
          <div class="d-flex aligin-center justify-start">
            <v-switch
              class="py-0 my-2"
              hide-details
              @click="updateActive(item.id)"
              v-model="item.active"
            ></v-switch>
            <v-btn
              icon
              class="pa-0 mx-2"
              color="purple darken-4"
              @click="showGroupLessonTimes(item)"
            >
              <v-icon size="2rem"> mdi-clock-time-two-outline </v-icon>
            </v-btn>
            <v-btn
              icon
              class="pa-0 mx-2"
              color="orange"
              @click="updateGroup(item)"
            >
              <v-icon size="2rem"> mdi-lead-pencil </v-icon>
            </v-btn>
            <v-btn
              icon
              class="pa-0 mx-2"
              color="teal"
              @click="groupStudents(item)"
            >
              <v-icon size="2rem">mdi-account-multiple-check</v-icon>
            </v-btn>
            <v-btn
              icon
              class="pa-0 mx-2"
              color="green"
              @click="groupStudents(item)"
            >
              <v-icon size="2rem">mdi-account-tie</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title class="bg-info pa-3">
            <h2>Group Lesson times</h2>
          </v-card-title>
          <v-card-text>
            <v-data-table
              hide-default-footer
              :items="times"
              :headers="timeHeader">
              <template #item.active="{item}">
                <v-icon :color="item.active ? 'green' : 'red'">mdi-alarm-light</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
      <CreateUpdateGroup ref="create_update_group"/>
      <GroupStudentDialog ref="group_student"/>
    </v-container>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex';
import CreateUpdateGroup from './create-update-group.vue';
import GroupStudentDialog from './group-student-dialog.vue';
export default {
  name: "Group",
  components: {CreateUpdateGroup, GroupStudentDialog},
  data() {
    return {
      header: [
        {text: 'Id', value: 'id'},
        {text: 'Title', value: 'title'},
        {text: 'Course', value: 'Course.title'},
        {text: 'Actions', value: 'actions'},
      ],
      timeHeader:[
        {text: 'Id', value: 'Time.id'},
        {text: 'Weak', value: 'Time.week'},
        {text: 'Start Time', value: 'Time.start_time'},
        {text: 'End Time', value: 'Time.end_time'},
        {text: 'Active', value: 'active'},
        {text: 'Updated Time', value: 'updated_at'},
      ],
      filter: {
        search: ''
      },
      dialog: false,
    };
  },
  computed:{
    ...mapGetters({
      groups: "group/getGroups",
      times: "group/getGroupLessonTime",
    })
  },
  async created(){
    await this.init();
  },
  methods:{
    async init(){
      try {
        await this.$store.dispatch('group/fetchGroups', this.filter)
      } catch (error) {
        console.log(error);
      }
    },
    async filterGroup(){
      try {
        await this.$store.dispatch('group/fetchGroups', this.filter)
      } catch (error) {
        console.log(error);
      }
    },
    async createGroup(){
      try {
          this.$refs.create_update_group.show();
      } catch (error) {
        
      }
    },
    updateGroup(item){
      this.$refs.create_update_group.show(item)
    },
    showGroupLessonTimes(item){
      try {
        this.$store.dispatch('group/groupLessonTime', item.id);
        this.dialog = true
      } catch (error) {
        this.$toast.error(error.response.message || 'Xatolik yuz berdi');
      }
      // this.times = item&&item.GroupLessonTime&&item.GroupLessonTime.map(element => element.Time) || [];
    },
    groupStudents(item){
      this.$refs.group_student.show(item)
    }
  }
};
</script>
<style src="../../../styles/main.css">
</style>
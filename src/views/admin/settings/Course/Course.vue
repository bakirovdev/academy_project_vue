<template>
  <v-container fluid class="pa-0 ma-0">
    <v-container class="main-container px-0 ">
      <div class="action-div">
        
        <button class="add-btn" @click="createCourse()">
          <v-icon class="mr-3 pa-0" color="#286159"
            >mdi-plus-circle-outline</v-icon
          >Add Student
        </button>
      </div>
      <div class="table-div">
        <div class="date-table">
          <v-data-table
            :headers="header"
            :items="courses"
            hide-default-footer
            class="elevation-2"
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
                  @click="showStudents(item)"
                >
                  <v-icon size="2rem"> mdi-account-group </v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="pa-0 mx-2"
                  color="orange"
                  @click="updateCourse(item)"
                >
                  <v-icon size="2rem"> mdi-lead-pencil </v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
    <CreateUpdateCourse ref="create_update_course" />
    <ShowStudentsDialog ref="show_students" />
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import CreateUpdateCourse from "./create-update-course.vue";
import ShowStudentsDialog from "./show-student-dialog.vue";

export default {
  name: "CoursePage",
  components: { CreateUpdateCourse, ShowStudentsDialog },
  data() {
    return {
      header: [
        { text: "Id", value: "id" },
        { text: "Title", value: "title" },
        { text: "action", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      courses: "course/getAllCourse",
    }),
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      try {
        await this.$store.dispatch("course/fetchAllCourses");
      } catch (error) {
        console.log(error);
      }
    },
    async updateActive(id) {
      try {
        this.$overlay(true);
        const response = await this.$store.dispatch("course/updateActive", id);
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$toast.error("Xatolik yuz berdi");
        console.log(error);
      } finally {
        this.$overlay(false);
      }
    },
    createCourse() {
      this.$refs.create_update_course.show();
    },
    updateCourse(item) {
      this.$refs.create_update_course.show(item);
    },
    showStudents(item) {
      this.$refs.show_students.show(item);
    },
  },
};
</script>
<style src="../../../../styles/main.css">
</style>
<style>
.active-column {
  width: 200px;
}
.action-column {
  width: 200px !important;
}
</style>
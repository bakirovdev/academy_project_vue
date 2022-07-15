<template>
  <v-dialog
    v-model="dialog"
    class="create-student-dialog"
    max-width="700px"
    persistent
  >
    <v-card class="">
      <v-card-title class="bg-blue pa-3">{{ title }}</v-card-title>
      <v-card-text class="pa-3">
        <v-text-field dense outlined v-model="editing_course.title">
        </v-text-field>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn small class="warning" @click="closeDialog()">
          <span>Cancal</span>
        </v-btn>
        <v-btn
          small
          class="primary"
          @click="saveCourse()"
          :disabled="
            !editing_course.title ||
            (editing_course.title && editing_course.title.length < 1)
          "
        >
          <span>Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const default_course = {
  id: null,
  title: "",
};
export default {
  name: "CreateUpdateCourseDialog",
  data() {
    return {
      dialog: false,
      editing_course: { ...default_course },
    };
  },
  computed: {
    title() {
      if (this.editing_course.id) return "Edit Course";
      return "Create Course";
    },
  },
  methods: {
    show(course = null) {
      this.editing_course = { ...course };
      this.dialog = true;
    },
    async saveCourse() {
      try {
        if (this.editing_course.id) {
          await this.$store.dispatch(
            "course/updateCourse",
            this.editing_course
          );
          this.$toast.success("The student has updated");
        } else {
          await this.$store.dispatch(
            "course/createCourse",
            this.editing_course
          );
          this.$toast.success("The student has created");
        }
      } catch (error) {
        this.$toast.error(error.message || "error");
      } finally {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.editing_course = { ...this.default_course };
      this.dialog = false;
    },
  },
};
</script>
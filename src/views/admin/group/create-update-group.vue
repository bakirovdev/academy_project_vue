<template>
  <v-dialog
    v-model="dialog"
    class="create-student-dialog"
    max-width="700px"
    persistent
  >
    <v-card>
      <v-card-title class="bg-blue pa-3">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text class="py-3">
        <v-text-field
          dense
          hide-details
          outlined
          label="Title"
          v-model="editing_group.title"
        >
        </v-text-field>
        <v-autocomplete
          class="mt-3"
          v-model="editing_group.course_id"
          :items="courses"
          hide-details
          single-line
          outlined
          clearable
          label=" Choice course"
          item-text="title"
          dense
          item-value="id"
          color="blue-grey lighten-2"
        >
          <template #item="data">
            <v-list-item-title class="mx-3" v-text="data.item.title" />
          </template>
        </v-autocomplete>

        <v-autocomplete
          class="mt-3"
          v-model="editing_group.times"
          :items="times"
          filled
          chips
          dense
          outlined
          label="Select Time"
          item-text="name"
          item-value="id"
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              class="my-2"
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="remove(data.item)"
            >
              {{ data.item.week }}<br />
              {{ data.item.start_time + "/" + data.item.end_time }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title v-html="data.item.week"></v-list-item-title>
              <v-list-item-subtitle
                v-html="data.item.start_time + ' / ' + data.item.end_time"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn small class="warning px-4 mx-5" @click="closeDialog()">
          cancel
        </v-btn>

        <v-btn
          small
          @click="saveGroup()"
          class="px-4 bg-blue"
          :disabled="!editing_group.title || !editing_group.course_id"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
const default_group = {
  id: null,
  title: "",
};
export default {
  name: "CreateUpdateGroup",
  data() {
    return {
      dialog: false,
      editing_group: { ...default_group },
    };
  },
  computed: {
    ...mapGetters({
      courses: "course/getAllCourse",
      times: "time/getTimes",
    }),
    title() {
      return this.editing_group.id ? "Edit group" : "Create group";
    },
  },
  async created() {
    await this.init();
  },
  methods: {
    show(item = null) {
      try {
        this.editing_group = {...item}
        this.editing_group.times = item&&item.GroupLessonTime&&item.GroupLessonTime.map(element => element.time_id) || [];;
        this.dialog = true;
      } catch (error) {
        console.log(error);
      }
    },
    remove(item) {
      const index = this.editing_group.time.indexOf(item.id);
      if (index >= 0) this.editing_group.time.splice(index, 1);
    },
    async init() {
      try {
        await this.$store.dispatch("course/fetchAllCourses");
        await this.$store.dispatch("time/fetchTimes");
      } catch (error) {
        console.log(error);
      }
    },
    async saveGroup() {
      console.log('sfsdfsd')
      try {
        if (this.editing_group.id) {  
          await this.$store.dispatch("group/updateGroup", this.editing_group)
        }else{
          const response = await this.$store.dispatch('group/createGroup', this.editing_group);
         this.$toast.success(response.data&&response.data.message || "Ma'lumotlar saqlandi00");
        }
        this.closeDialog();
      } catch (error) {
        console.log(error);
      } finally{
        // owerlay in that case
      }
    },
    closeDialog() {
      (this.editing_group = {}), (this.dialog = false);
    },
  },
};
</script>
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
</style>
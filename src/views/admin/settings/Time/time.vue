<template>
  <v-container fluid class="pa-0 ma-0">
    <v-container class="main-container px-5">
      <div class="action-div">
        <button class="add-btn" @click="createTime()">
          <v-icon class="mr-3 pa-0" color="#286159"
            >mdi-plus-circle-outline</v-icon
          >Add Student
        </button>
      </div>
      <div class="main">
        <div class="table-div">
          <div class="date-table">
            <v-data-table
              :headers="header"
              :items="times"
              :loading="loading"
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
                    @click="updateTime(item)"
                  >
                    <v-icon size="2rem"> mdi-lead-pencil </v-icon>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
      <CreateUpdateTime ref="create_update_time"/>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import CreateUpdateTime from "./create-update-time.vue";

export default {
  name: "TimeSetting",
  components:{CreateUpdateTime},
  data() {
    return {
      loading: true,
      header: [
        { text: "Id", value: "id" },
        { text: "Week", value: "week" },
        { text: "Start Time", value: "start_time" },
        { text: "End Time", value: "end_time" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  async created() {
    await this.init();
  },
  computed: {
    ...mapGetters({
      times: "time/getTimes",
    }),
  },
  methods: {
    async init() {
      this.loading = true;
      await this.$store.dispatch("time/fetchTimes");
      this.loading = false;
    },
    async updateActive(item) {
      try {
        this.loading = true;
        const response = await this.$store.dispatch(
          "time/updateActive",
          item.id
        );
        this.$toast.success(response.message);
      } catch (error) {
        this.$toast.error("Something is wrong. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    createTime() {
      this.$refs.create_update_time.show();
    },
    updateTime(item) {
      this.$refs.create_update_time.show(item);
    },
  },
};
</script>
<style src="../../../../styles/main.css">
</style>
<style>
</style>

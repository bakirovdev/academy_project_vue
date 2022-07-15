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
        <v-text-field dense outlined v-model="editing_time.week" label="Week">
        </v-text-field>
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                dense
                outlined
                v-model="editing_time.start_time"
                label="Start time"
                readonly
                @click="dialog2 = true"
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
              <v-dialog v-model="dialog2" max-width="300px" persistent>
                   <v-time-picker
                    v-model="editing_time.start_time"
                    format="24hr"
                >
                    <v-spacer></v-spacer>
                    <v-btn @click="menu = !menu" text color="primary"> OK </v-btn>
                </v-time-picker>
              </v-dialog>
        </v-menu>
        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                dense
                outlined
                v-model="editing_time.end_time"
                label="End time"
                readonly
                @click="dialog3 = true"
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
              <v-dialog v-model="dialog3" max-width="300px" persistent>
                   <v-time-picker
                    v-model="editing_time.end_time"
                    format="24hr"
                >
                    <v-spacer></v-spacer>
                    <v-btn @click="menu2 = !menu2" text color="primary"> OK </v-btn>
                </v-time-picker>
              </v-dialog>
        </v-menu>
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
            !editing_time.week ||
            !editing_time.start_time ||
            !editing_time.end_time
          "
        >
          <span>Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const default_time = {
  id: null,
  week: "",
  start_time: "",
  end_time: "",
};
export default {
  name: "CreateUpdateTime",
  data() {
    return {
      editing_time: { ...default_time },
      dialog: false,
      menu:false,
      menu2:false,
      dialog2: false,
      dialog3: false
    };
  },
  computed: {
    title() {
      if (this.editing_time.id) return "Edit Course";
      return "Create Course";
    },
  },
  methods: {
    show(time = null) {
      this.editing_time = { ...time };
      this.dialog = true;
    },
    async saveCourse() {
      try {
        if (this.editing_time.id) {
            let response = await this.$store.dispatch(
                "time/updateTime",
                this.editing_time
            );
            this.$toast.success(response.data.messsage&&response.data.messsage || "The lesson time has created");

        } else {
            let response =  await this.$store.dispatch("time/createTime", this.editing_time);
            this.$toast.success(response.data.messsage&&response.data.messsage || "The lesson time has created");
        }
      } catch (error) {
        this.$toast.error(error.message || "error");
      } finally {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.editing_time = { ...this.default_course };
      this.dialog = false;
    },
  },
};
</script>
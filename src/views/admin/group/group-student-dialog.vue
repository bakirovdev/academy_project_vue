<template>
  <v-dialog
    v-model="dialog"
    max-width="100%"
    president
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
      <v-card-title class="pa-0 text-right bg-blue">
        <v-row class="pa-0 ma-0">
          <v-col cols="6" class="px-0">
            <h2 class="text-left px-4 pb-2">students</h2>
          </v-col>
          <v-col class="pa-0 ma-0">
            <div class="darken-1">
              <v-btn icon class="text-right"  @click="closeDialog()">
                <v-icon color="red" size="30px">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-action>salom hammaga</v-card-action>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GroupStudentDialog",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  async created() {
    await this.init();
  },
  methods: {
    show(item = null) {
      try {
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
    closeDialog() {
       this.dialog = false;
    },
  },
};
</script>
<style src="../../../styles/main.css"></style>
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
.gray{
  background-color: #CFD8DC;
}
</style>
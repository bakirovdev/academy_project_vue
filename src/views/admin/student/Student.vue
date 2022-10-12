<template>
  <v-container fluid class="pa-0 ma-0">
    <div class="navbar">
      <span class="nav-span"
        ><v-icon color="white" large>mdi-account-group</v-icon> Students</span
      >
      <div class="nav-action">
        <button class="add-btn" @click="createStudent()">
          <v-icon class="mr-3 pa-0" color="#286159"
            >mdi-plus-circle-outline</v-icon
          >Add Student
        </button>
      </div>
    </div>
    <v-container class="main-container mt-15" fluid>
      <div class="filter-div">
        <div class="filter my-3">
          <v-text-field
            @keyup.enter="getStudents()"
            dense
            v-model="search"
            append-icon="mdi-magnify"
            @click:append="getStudents()"
            solo
            hide-details
            label="Search"
            placeholder="search"
          />
          <v-autocomplete
            @change="getStudents()"
            v-model="status"
            :items="statuses"
            hide-details
            single-line
            clearable
            label=" Choice status"
            item-text="title"
            dense
            solo
            item-value="key"
            color="blue-grey lighten-2"
          >
            <template #item="data">
              <template>
                <v-list-item-title class="mx-3" v-text="data.item.title" />
              </template>
            </template>
          </v-autocomplete>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            class="pa-5"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Choice dates"
                dense
                hide-details
                solo
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker color="#0e3f62" v-model="dates" range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn @click="getStudents()" text color="primary"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </div>
      <div class="table-div">
        <div class="date-table">
          <v-data-table
            :headers="headers"
            :items="students.data"
            :loading="loading"
            hide-default-footer
          >
            <template #item.actions="{ item }">
              <div>
                <button
                  class="action-btn amber accent-2"
                  icon
                  @click="editStudent(item)"
                >
                  <v-icon color="orange accent-4" small>mdi-pencil</v-icon>
                </button>
                <button class="action-btn green darken-2" :disabled="item.status == ('confirmed'|| 'canceled')" icon @click="checkStudent(item.id, 'confirmed')">
                  <v-icon color="white accent-4" small
                    >mdi-account-check</v-icon
                  >
                </button>
                <button class="action-btn red accent-1" :disabled="item.status == ('confirmed'|| 'canceled')" icon @click="checkStudent(item.id, 'canceled')">
                  <v-icon color="red accent-4" small
                    >mdi-account-cancel-outline</v-icon
                  >
                </button>
              </div>
            </template>
            <template #item.status="{ item }">
              <div class="status-span">
                <span
                  :class="
                    item.status == 'waiting'
                      ? 'primary'
                      : item.status == 'canceled'
                      ? 'red lighten-3'
                      : 'success'
                  "
                >
                  <v-icon color="white pa-0 ma-0">mdi-record</v-icon
                  >{{ item.status }}
                </span>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
      <CreateUpdateStudent ref="create_update_student" />
    </v-container>
    <div class="pagination1">
      <v-row justify="center" align="center">
          <v-pagination
          class="pagination-all"
          color="#0e3f62"
          :length="totalStudents"
          :total-visible="7"
          v-model="options.page"
          />
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import CreateUpdateStudent from "./create-update-student";
export default {
  components: { CreateUpdateStudent },
  name: "AdminStudents",
  data() {
    return {
      statuses: [
        { title: "Waiting", key: "waiting" },
        { title: "Confirmed", key: "confirmed" },
        { title: "Canceled", key: "canceled" },
      ],
      loading: true,
      menu: false,
      dates: [],
      hello: "",
      status: "",
      search: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "First name", value: "first_name" },
        { text: "Last name", value: "last_name" },
        { text: "Phone number", value: "phone_number" },
        { text: "Birthday", value: "birthday" },
        { text: "Region", value: "Region.title" },
        { text: "Gender", value: "gender" },
        { text: "Status", value: "status", class: "table-item" },
        { text: "Actions", value: "actions" },
      ],
      options:{
        page: 1
      }
    };
  },
  mounted() {
    //
  },
  computed: {
    ...mapGetters({
      students: "student/getStudents",
      totalStudents: 'student/getTotalStudent'
    }),
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  watch:{
    "options.page": {handler: "init"}
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let dates = [];
      if (this.dates[1]) {
        let checkDate = this.dateSort(this.dates[0], this.dates[1]);
        if (checkDate > 0) {
          dates[0] = this.dates[1]
          dates[1] = this.dates[0]
        }else{
          dates = this.dates
        }
      }
      await this.$store.dispatch("student/fetchStudents", {status:this.status, dates, search: this.search, page: this.options.page});
      this.loading = false;
    },
    async getStudents() {
      await this.init();
    },
    createStudent() {
      this.$refs.create_update_student.show();
    },
    editStudent(item) {
      const formatYmd = (date) => date.toISOString().slice(0, 10);
      let student = {
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        birthday: formatYmd(new Date(item.birthday)),
        phone_number: item.phone_number || "",
        region_id: item.Region && item.Region.id,
        course_id: item.Course && item.Course.id,
        week_id: item.Weak && item.Weak.id,
        time_id: item.Time && item.Time.id,
        gender_id: item.Gender && item.Gender.id,
      };
      this.$refs.create_update_student.show(student);
    },
    dateSort (date1, date2){
      return new Date(date1) - new Date(date2);
    },
    async checkStudent(id, status){
      console.log(id);
      let body = {id, status};
      console.log(body);
      try {
        let response = await this.$store.dispatch('student/checkUser', body)
        await this.init();
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    }
  },
};
</script>
<style src="../../../styles/main.css">
</style>
<style>
#selection {
  border-radius: 10px;
  height: 35px;
  width: 240px;
  border: 1px solid black;
  font-family: Arial;
}
#selection:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 1px rgba(59, 153, 252, 0.7);

  color: #222;
  outline: none;
}
#selection:focus .hidden-option {
  display: none;
}
.filter-div .v-select.v-text-field input {
  text-indent: 10px !important;
}
.filter-div .v-select__selections {
  text-indent: 10px !important;
}
.main-container .filter-div .filter {
  display: flex;
  justify-content: space-between;
}
.filter-div .v-text-field__slot input {
  text-indent: 10px !important;
}
.filter-div .v-text-field__slot label,
.v-select.v-text-field label {
  text-indent: 10px !important;
}
.v-date-picker-title {
  padding: 10px !important;
}
.filter-div .filter {
  width: 70%;
}
.main-container .filter-div .v-input__control {
  margin-right: 15px !important;
  border: 1px solid var(--dark-blue-secondary) !important;
}
</style>
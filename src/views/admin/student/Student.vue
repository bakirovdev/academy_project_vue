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
    <v-container class="main-container" fluid>
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
            :items="students"
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
                <button class="action-btn green darken-2" icon>
                  <v-icon color="white accent-4" small
                    >mdi-account-check</v-icon
                  >
                </button>
                <button class="action-btn red accent-1" icon>
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
      pagination: {
        skip: 1,
        take: 20,
      },
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
        { text: "Gender", value: "Gender.title" },
        { text: "Status", value: "status", class: "table-item" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  mounted() {
    //
  },
  computed: {
    ...mapGetters({
      students: "student/getStudents",
    }),
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  async created() {
    await this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await this.$store.dispatch("student/fetchStudents");
      this.loading = false;
    },
    async getStudents(pagination = 0) {
      if (pagination == "next") {
        this.pagination.skip += this.pagination.take;
      } else if (pagination == "previous") {
        this.pagination.skip -= this.pagination.take;
      }
      let params = {
        search: this.search,
        status: this.status,
        dates: this.dates,
        skip: this.pagination.skip,
        take: this.pagination.take,
      };
      await this.$store.dispatch("student/fetchStudents", params);
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
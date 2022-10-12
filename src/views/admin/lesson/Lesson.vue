<template>
  <v-container fluid class="pa-0 ma-0">
    <div class="navbar">
      <span class="nav-span">
        <v-icon color="white" large>mdi-school</v-icon>Lessons
      </span>
      <div class="nav-action">
        <button class="add-btn" @click="startLesson()">
          <v-icon class="mr-3 pa-0" color="#286159">mdi-plus-circle-outline</v-icon>Start Lesson
        </button>
      </div>
    </div>
    <v-container fluid class="mt-15">
      <v-container fluid class="px-0 ">
        <v-card class="pa-3">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <h2>Group: <span class="item_report">{{ group.data.title }}</span></h2>
              </v-col>
              <v-col cols="6">
                <h2>Course: <span class="item_report">{{ group.data.Course.title }}</span></h2>
              </v-col>
              <v-col cols="6">
                <h2>StudentCount: <span class="item_report count_span">{{ studentCount }}</span></h2>

              </v-col>
              <v-col cols="6">
                <h2>Daily price: <span class="item_report">{{ group.data.GroupPrice[0] &&
                    group.data.GroupPrice[0].daily_price
                }}</span></h2>
                <h2>Monthly price: <span class="item_report">{{ group.data.GroupPrice[0] &&
                    group.data.GroupPrice[0].monthly_price
                }}</span></h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <h2>Lesson</h2>
                </v-col>
                <v-col>
                  <div class="filter-group">
                    <v-text-field v-model="search" outlined dense hide-details class="mx-3" label="Search">
                    </v-text-field>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                      offset-y min-width="auto" class="pa-5">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateRangeText" label="Choice dates" dense hide-details outlined
                          v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker color="#0e3f62" v-model="dates" range>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="closeMenu()"> Cancel </v-btn>
                        <v-btn text color="primary" @click="init2()"> OK </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="table_div">
        <v-data-table class="mt-4" disable-pagination hide-default-footer dense :headers="lesson_header"
          :items="lessons.data">
          <template #item.date_time="{ item }">
            <span>{{ item.date_time.slice(0, 10) }}</span>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon>
              <v-icon color="primary" @click="toAttendance(item.id)">mdi-login</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-container>
    <CreateLessonDialog ref="crete_lesson"/>
    <div class="pagination1">
      <v-row justify="center" align="center">
        <v-pagination class="pagination-all" color="#0e3f62" :length="lessons.meta.last_page" :total-visible="7"
          v-model="options.page" />
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import CreateLessonDialog from './CreateLessonDialog.vue'
export default {
  props: {
    group_id: {
      type: [String, Number],
      required: true
    }
  },
  components:{CreateLessonDialog},
  name: 'Lesson',
  data() {
    return {
      options: {
        page: 1
      },
      menu: false,
      dates: [],
      search: '',
      lesson_header: [
        { text: "Id", value: "id" },
        { text: "Date", value: "date_time" },
        { text: "Creator", value: "User.full_name" },
        { text: "Start Time", value: "start_time" },
        { text: "Finish Time", value: "finish_time" },
        { text: "actions", value: "actions" },
      ],
      chart: {
        type: 'bar'
      },
      chart_options: {
        chart_options1: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: []
          }
        },
      }

    }
  },
  watch: {
    "options.page": { handler: "init2" }
  },
  computed: {
    ...mapGetters({
      lessons: 'lessons/getGroupLesson',
      group: 'group/getFindGroup',
      // group_students: 'group_students/getStudents',
      // group_price: 'group/getPrice'
    }),
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    studentCount() {
      return this.group.data.GroupStudent.length;
    },
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      try {
        this.$overlay(true)
        await this.$store.dispatch('group/findGroup', this.group_id);
        // await this.$store.dispatch('group_students/fetchStudents', {id:this.group_id});
        // this.chart_options.chart_options1.xaxis.categories = this.group_price.dates
        await this.$store.dispatch('lessons/fetchGroupLessons', { group_id: this.group_id, page: this.page, search: this.search, dates: this.dates })
        this.chartActions()
        this.$overlay(false)
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message || 'xato')
      }
    },
    async init2() {
      try {
        await this.$store.dispatch('lessons/fetchGroupLessons', { group_id: this.group_id, page: this.page, search: this.search, dates: this.dates })
        this.$toast.success('hello')
      } catch (error) {
        this.$toast.error(error.message || 'xato')
      }
    },
    async startLesson(){
      try {
        
      } catch (error) {
        
      }
    },
    toAttendance(id){
      try {
          this.$router.push({
              name: 'Attendance',
              params: {
                  lesson_id: id,
                  group_id: this.group_id,
              }
          })
      } catch (error) {
          this.$toast.error(error.message || 'xato')
      }
    },
    startLesson(){
      this.$refs.crete_lesson.show({group_id: this.group_id});
    },
    chartActions() {

    },
    closeMenu() {
      this.menu = false
      this.dates = []
    }
  }
}
</script>
<style src="../../../styles/main.css">
</style>
<style>
.item_report {
  color: rgb(185, 108, 216);
}
.count_div{
  background-color: aqua;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.table_div{
  height: auto;
  overflow-y: auto;
}
</style>

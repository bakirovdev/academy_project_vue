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
      {{group}}
      <v-container fluid class="px-0 ">
        <v-card class="pa-3">
          
        </v-card>
      </v-container>
      <v-row>
        <v-col cols="12">
          
        </v-col>
      </v-row>
    </v-container>
    <CreateLessonDialog ref="crete_lesson"/>
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
      group: 'group/getFindGroup',
    }),
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      try {
        this.$overlay(true)
        await this.$store.dispatch('group/findGroup', this.group_id);
        this.chartActions()
        this.$overlay(false)
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message || 'xato')
      }
    },
    toAttendance(id){
      try {
          this.$router.push({
              name: 'Attendance'
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

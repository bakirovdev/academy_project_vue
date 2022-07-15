import axios from "@/axios";
const state = () => ({
    course_data: [],
    course_students: [],
    courses: [],
    params: {}
})
const getters = {
    getCourse: state => state.course_data,
    getAllCourse: state => state.courses,
    getCourseStudents: state => state.course_students
}
const actions = {
    async fetchCourses({ commit }, params = null) {
        try {
            const courses = await axios.get('/courses/for_autocomplate');
            commit('SET_COURSE_DATA', { courses })
            Promise.resolve(courses)
        } catch (error) {
            Promise.reject(error)
        }
    },
    async fetchAllCourses({ commit }, params = null) {
        try {
            const courses = await axios.get('/courses', { params });
            commit('SET_COURSES', { courses });
            return Promise.resolve(courses);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async updateActive({ dispatch }, id) {
        try {
            const courses = await axios.patch(`/courses/update_active/${id}`);
            await dispatch('fetchAllCourses');
            return Promise.resolve(courses);
        } catch (error) {
            return Promise.reject()
        }
    },
    async updateCourse({ dispatch }, body) {
        try {
            const course = await axios.patch(`/courses/${body.id}`, {
                title: body.title
            })
            await dispatch('fetchAllCourses');
            return Promise.resolve(course)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async createCourse({ dispatch }, body) {
        try {
            const course = await axios.post('/courses', {
                title: body.title
            })
            await dispatch('fetchAllCourses');
            return Promise.resolve(course)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async courseStudents({ commit }, id) {
        try {
            const students = await axios.get(`/courses/students/${id}`)
            commit('SET_COURSE_STUDENTS', students);
            return Promise.resolve(students)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
const mutations = {
    SET_COURSE_DATA: (state, { courses }) => {
        state.course_data = courses.data
    },
    SET_COURSES: (state, { courses }) => {
        state.courses = courses.data.data
    },
    SET_COURSE_STUDENTS: (state, students) => {
        state.course_students = students.data
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
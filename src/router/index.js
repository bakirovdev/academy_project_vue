import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const lazyLoad = (path) => {
  return () => import(/* webpackChunkName: "about" */`../views/${path}.vue`);
}

const routes = [
  {
    path: '/login',
    component: lazyLoad('login/Login'),
    name: 'Login'
  },
  {
    path: '/',
    component: lazyLoad('main/Main'),
    children: [
      {
        path: "/",
        name: 'Home',
        component: lazyLoad('home/home'),
      },
      {
        path: "/sign",
        name: "Sign",
        component: lazyLoad('sign/Sign')
      }
    ]
  },
  {
    path: '/admin',
    component: lazyLoad('admin/Admin'),
    children: [
      {
        path: '/admin',
        name: "AdminHome",
        component: lazyLoad('admin/home/Home')
      },
      {
        path: '/admin/users',
        name: "User",
        component: lazyLoad('admin/user/User')
      },
      {
        path: '/admin/students',
        name: "AdminStudents",
        component: lazyLoad('admin/student/Student')
      },
      {
        path: '/admin/groups',
        name: "Group",
        component: lazyLoad('admin/group/Group')
      },
      {
        path: '/admin/lessons/:group_id',
        name: "Lesson",
        props: true,
        component: lazyLoad('admin/lesson/Lesson')
      },
      {
        path: '/admin/attendance/:group_id/:lesson_id',
        name: "Attendance",
        props: true,
        component: lazyLoad('admin/lesson/Attendance')
      },
      {
        path: '/admin/lesson/group',
        name: 'UserGroup',
        component: lazyLoad('admin/lesson/Group')
      },
      {
        path: '/admin/settings',
        component: lazyLoad('admin/settings/settings'),
        children: [
          {
            path: '/admin/settings',
            name: "CoursePage",
            component: lazyLoad('admin/settings/Course/Course')
          },
          {
            path: '/admin/settings/time',
            name: "TimeSetting",
            component: lazyLoad('admin/settings/Time/time')
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("access_token");
  const publicPages = ["Login", "Home", "Sign"];
  const notPublicPages = !publicPages.includes(to.name);
  let logged = false;
  if (session) {
    logged = true;
  }
  if (logged && !notPublicPages) {
    next("/admin");
  } else if (!logged && notPublicPages) {
    next("/login");
  } else {
    next();
  }
});

export default router

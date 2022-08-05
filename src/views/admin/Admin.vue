<template>
  <v-container fluid class="d-inline-flex pa-0 ma-0">
    <div class="sidebar">
      <div class=" logo-div">
        <div class="logo-item">
          <v-icon x-large @click="changeSidebar()"
          style="border-radius:10px"
          color="warning">mdi-decagram-outline</v-icon> 
          <span>Just do it</span> 
        </div>
        <v-icon id="switch-button" @click="changeSidebar()">mdi-arrow-left</v-icon>
      </div>
      <v-divider />
      <ul>
        <li 
        v-for="item in items"
        :key="item.title"
        class="list-item" @click="navigationAction(item.id, item.to)">
          <a>
            <v-icon>{{item.icon}}</v-icon>
            <span>{{item.title}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="main-div">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "Admin",
  data() {
    return {
      group: null,
      app_name:"Home",
      drawer: true,
      items: [
        { id:0, title: "Home", icon: "mdi-home", to: "/admin"},
        { id:1, title: "Users", icon: "mdi-account-key", to: "/admin/users"},
        { id:2, title: "Students", icon: "mdi-account-group", to: "/admin/students"},
        { id:3, title: "Groups", icon: "mdi-layers-triple", to: "/admin/groups"},
        { id:4, title: "Setting", icon: "mdi-cog", to: "/admin/settings/"},
        { id:5, title: "Logout", icon: "mdi-logout",to: "/login"}
      ],
      mini: true,
    };
  },
  watch: {
      group () {
        this.drawer = false
      },
  },
  methods: {
    changeSidebar(){
      let sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('close')
    },
    navigationAction(id, to_page){
      let list_item = document.querySelectorAll('.list-item');
      // alert(list_item[id].classList.contains('active-list'))
      this.app_name = this.items[id].title;
      if (list_item[id].classList.contains('active-list') == false) {
        
        for (let i = 0; i < list_item.length; i++) {
          list_item[i].classList.remove('active-list');
        }
        if (list_item.length != id+1) {
          list_item[id].classList.add('active-list')        
        }
        if (this.$router.history.current.path !== to_page) {
          this.$router.push({ path: to_page})
        }
      }
    }
  }
};
</script>
<style src="../../styles/sidebar.css">

</style>
<style src="../../styles/main.css">
</style>

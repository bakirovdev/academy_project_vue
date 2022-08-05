<template>
  <v-dialog max-width="50rem" v-model="dialog" persistent>
    <v-card>
      <v-card-title class="white--text bg-header">Add student to this class</v-card-title>
      <v-card-text class="pt-5">
        <v-text-field dense append-icon="mdi-card-account-details" v-model="editing_user.full_name" label="Full name" placeholder="John Due">
        </v-text-field>
        <v-text-field dense append-icon="mdi-card-account-details-star" v-model="editing_user.username" label="Username" placeholder="johnDue123">
        </v-text-field>
        <v-text-field dense append-icon="mdi-card-account-phone" v-model="editing_user.phone_number" label="Phone number" placeholder="+(998)91-138-37-33"
          v-mask="mask"></v-text-field>
        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" v-model="editing_user.password"
          label="Password" dense hide-details counter @click:append="show1 = !show1"></v-text-field>
      </v-card-text>
      <v-card-actions text-center>
        <v-spacer />
        <v-btn text color="warning" @click="closeDialog()">
          cancel
        </v-btn>
        <v-btn text color="success" 
          :disabled="!this.editing_user.username || 
            !this.editing_user.full_name || 
            !this.editing_user.password || 
            !this.editing_user.phone_number "
            @click="saveUser()">
          add
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>
<script>
const default_user = {
  id: null,
  full_name: '',
  username: '',
  phone_number: '',
  password: ''
}
import { mapGetters } from "vuex";
export default {
  name: 'CreateUpdateUser',
  data() {
    return {
      show1: false,
      dialog: false,
      editing_user: { ...default_user },
      mask: '+(998)##-###-##-##',
    }
  },
  computed: {

  },
  async created() {

  },
  methods: {
    show(user = null) {
      this.dialog = true;
      this.editing_user = {...user}
    },
    async saveUser(){
      try {
        let response = null;
        if (this.editing_user.id) {
          response = await this.$store.dispatch('users/updateUser', this.editing_user)
        }else{
          response = await this.$store.dispatch('users/createUser', this.editing_user);
        }
        this.$toast.success(response.data&&response.data.message || 'New user has created!');
        this.closeDialog();
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response&&error.response.data.message || 'error');
      }
    },
    closeDialog(){
      this.editing_user = {...default_user}
      this.dialog = false
    }

  }
}
</script>

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

.gray {
  background-color: #CFD8DC;
}
</style>
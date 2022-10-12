<template>
  <v-container fluid class="main-container-login" style="height: 100vh">
    <v-snackbar
      top
      right
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="2000"
      >{{ snackbar.message }}</v-snackbar
    >
    <div class="login-div d-flex justify-center aligin-center flex-column">
      <h3>This is a Login page</h3>
      <v-divider></v-divider>
      <input v-model="signIn.username" placeholder="Username" />
      <input
        v-model="signIn.password"
        placeholder="Password"
        class="input-group--focused login-input"
        @click:append="show = !show"
      />
      <v-spacer></v-spacer>
      <v-btn
        class="login-button success"
        :disabled="signIn.username.length < 1 || signIn.password.length < 1"
        @click="login()"
      >
        login
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      show: false,
      signIn: {
        username: "",
        password: "",
      },
      snackbar: {
        show: false,
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login/signIn", this.signIn);
        this.$router.push("/admin");
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.color = "error";
        this.snackbar.message =
          "login or password is wrong please try again !!!";
        this.username = "";
        this.password = "";
      }
    },
  },
};
</script>
<style>
.main-container-login {
  display: flex;
  align-items: center;
}
.login-div {
  padding: 10px !important;
  min-width: 500px;
  padding: 20px;
  margin: 0 auto !important;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 1px;
}
.login-button {
  margin: 10px auto !important;
  width: 150px !important;
}
.login-div input {
  margin-top: 20px !important;
  text-indent: 10px;
  height: 30px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
}
.login-div input:focus {
  transition: 0.2s;
  border: 2px solid rgb(103, 103, 221);
  box-shadow: 1px 1px 1px 1px rgb(166, 166, 231);
  outline: none;
  font-size: 1rem;
  font-weight: 700;
  color: black;
}

h3 {
  text-align: center;
  font-size: 20px;
  font-weight: 300;
}
</style>
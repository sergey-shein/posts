<template>
  <div class="login">
    <navbar />
    <section class="form">
      <b-field label="Эл. почта" :message="emailError">
        <b-input type="email" v-model="email" @blur="getUser"> </b-input>
      </b-field>

      <b-field label="Пароль" :message="passwordError">
        <b-input type="password" v-model="password"></b-input>
      </b-field>

      <b-field>
        <button class="button is-primary" :disabled="!user" @click="login">
          Войти
        </button>
      </b-field>
    </section>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import navbar from "../components/navbar.vue";

export default {
  name: "login",
  data: () => ({
    email: null,
    emailError: null,
    password: null,
    passwordError: null,
    user: null
  }),
  components: {
    navbar
  },
  methods: {
    ...mapMutations(["LOGIN"]),

    getUser() {
      if (!this.email) {
        this.emailError = "Обязательное поле";
        this.user = "";
        return;
      }

      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)) {
        this.emailError = "Не валидный email";
        this.user = "";
        return;
      }

      this.axios
        .get(`http://localhost:3000/users?email=${this.email}`)
        .then(response => {
          if (response.data.length) {
            this.user = response.data[0];
            this.emailError = "";
          } else {
            this.emailError = "Email не зарегистрирован";
            this.user = "";
          }
        })
        .catch(error => console.log(error));
    },

    login() {
      if (!this.password) {
        this.passwordError = "Обязательное поле";
        return;
      }

      if (this.password != this.user.password) {
        this.passwordError = "Неверный пароль";
        return;
      }

      this.passwordError = "";
      this.LOGIN(this.user.role);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.button {
  color: #ffffff;
}
</style>

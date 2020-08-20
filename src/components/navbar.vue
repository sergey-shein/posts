<template>
  <b-navbar id="navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" exact>
        Все посты
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item v-if="ROLE == 'writer'" tag="router-link" :to="{ path: '/edit' }" >
        Создать
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="ROLE" tag="a" @click="logout"> Выйти ({{ ROLE }}) </b-navbar-item>
      <b-navbar-item v-else tag="router-link" :to="{ path: '/login' }">
        Логин
      </b-navbar-item>
    </template>
    <hr />
  </b-navbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "navbar",
  computed: { ...mapGetters(["ROLE"]) },
  methods: {
    ...mapMutations(["LOGOUT"]),

    logout() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
      this.LOGOUT();
    }
  }
};
</script>

<style scoped>
#navbar {
  border-bottom: 1px solid #dadce0;
}
.router-link-active {
  color: #7957d5;
  cursor: default;
  pointer-events: none;
}
</style>

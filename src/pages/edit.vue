<template>
  <div class="edit">
    <navbar />
    <section class="form">
      <b-field horizontal label="Заголовок">
        <b-input v-model="title"></b-input>
      </b-field>

      <b-field horizontal label="Сообщение">
        <b-input type="textarea" v-model="description"></b-input>
      </b-field>

      <b-field horizontal>
        <button v-if="$route.query.post" class="button is-primary" @click="patchPost">
          Сохранить
        </button>
        <button v-else class="button is-primary" @click="postPost">
          Создать
        </button>
      </b-field>
    </section>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";

export default {
  name: "edit",
  components: {
    navbar
  },

  data: () => ({
    title: "",
    description: ""
  }),

  created() {
    this.getPost();
  },

  methods: {
    async getPost() {
      if (this.$route.query.post) {
        const post = await this.axios.get(`http://localhost:3000/posts/${this.$route.query.post}`);
        this.title = post.data.title;
        this.description = post.data.description;
      }
    },

    async postPost() {
      const post = {
        title: this.title,
        description: this.description,
        createdAt: new Date(),
        updateAt: new Date(),
        claps: 0,
        userId: 1
      };

      await this.axios.post("http://localhost:3000/posts", post);
      this.$router.push("/");
    },

    async patchPost() {
      const post = {
        title: this.title,
        description: this.description,
        updateAt: new Date()
      };

      await this.axios.patch(`http://localhost:3000/posts/${this.$route.query.post}`, post);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.form {
  max-width: 700px;
  padding: 20px;
  margin: 0 auto;
}
.button{
  color: #ffffff
}
</style>

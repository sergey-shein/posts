<template>
  <div class="home">
    <navbar />
    <section id="posts">
      <div class="post" v-for="(post, index) in POSTS_PAGINATED" :key="index">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <div class="additionally">
          <span class="update">{{ post.update }}</span>

          <template v-if="ROLE == 'writer'">
            <router-link :to="{ path: '/edit', query: { post: post.id } }">Редактировать</router-link>
            <span class="button" @click="DELETE_POST(post.id)">Удалить</span>
          </template>

          <span v-if="ROLE == 'reader'" class="button" @click="CLAPS_POST(post)">Браво({{ post.claps }})</span>
        </div>
      </div>

      <b-pagination
        v-if="POSTS_COUNT > 10"
        :total="POSTS_COUNT"
        :current="CURRENT_PAGE"
        :per-page="10"
        order="is-centered"
        @change="CANGE_CURRENT_PAGE"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import navbar from "../components/navbar.vue";

export default {
  name: "home",
  components: {
    navbar
  },
  computed: {
    ...mapGetters(["POSTS_PAGINATED", "POSTS_COUNT", "CURRENT_PAGE", "ROLE"])
  },

  methods: {
    ...mapActions(["FETCH_POSTS", "DELETE_POST", "CLAPS_POST"]),
    ...mapMutations(["CANGE_CURRENT_PAGE"])
  },

  mounted() {
    this.FETCH_POSTS();
  },

  watch: {
    POSTS_PAGINATED() {
      this.POSTS_PAGINATED.forEach(item => {
        item.update = new Date(item.updateAt).toLocaleString();
      });
    }
  }
};
</script>

<style scoped>
#posts {
  background-color: #f1f3f4;
  padding: 20px;
  min-height: calc(100vh - 53px);
}

.post {
  margin: 0 auto 20px;
  padding: 10px 20px;
  max-width: 600px;
  min-height: 40px;
  background-color: #ffffff;
  border: 1px solid #dadce0;
}

h2 {
  font-weight: bold;
}

.additionally {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  user-select: none;
}

.update {
  font-size: 14px;
  color: #a7a7a7;
}
</style>

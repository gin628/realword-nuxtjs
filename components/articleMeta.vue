<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | dayjs }}</span>
    </div>
    <template v-if="user && user.username === article.author.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="
          $router.push({
            name: 'editor',
            query: {
              slug: article.slug,
            },
          })
        "
      >
        <i class="ion-edit" />
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        @click="deleteArticle(article.slug)"
      >
        <i class="ion-trash-a" />
        &nbsp; Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round" />
        &nbsp; Follow {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="changeFavoritedStatus(article)"
      >
        <i class="ion-heart" />
        &nbsp; Favorite Post
        <span class="counter">{{ article.favoritesCount }} </span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { delArticle, addFavorite, deleteFavorite } from "@/api/article";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async deleteArticle(slug) {
      await delArticle(slug);
      this.$router.push("/");
    },
    async changeFavoritedStatus(article) {
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
    }

  },
};
</script>

<style>
</style>
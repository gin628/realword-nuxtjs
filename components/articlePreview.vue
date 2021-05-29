<template>
  <div class="article-preview">
    <article-meta
      :article="article"
    />
    <nuxt-link
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>

<script>
import articleMeta from "@/components/articleMeta.vue";

export default {
  name: "ArticlePreview",
  components: {
    articleMeta
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>
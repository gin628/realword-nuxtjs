<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta
          :article="article"
        />

      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>
      <div class="article-actions">
        <article-meta
          :article="article"
        />
      </div>

      <div class="row">
        <comment
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script>

import isAuth from '../../middleware/isAuth'
import { getArticle } from '@/api/article'
import articleMeta from '../../components/articleMeta.vue'
import comment from './components/comment.vue'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: "Article",
  middleware: isAuth,
  async asyncData ({ params }) {
    const { data: { article } } = await getArticle(params.slug);
    article.body = md.render(article.body);
    return {
      article
    }
  },
  header () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  components: {
    articleMeta,
    comment
  }
};
</script>

<style>
</style>
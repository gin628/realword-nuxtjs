<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  required
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  required
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  required
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                @click="submitAritcle"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="btnDisabled"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import isAuth from '@/middleware/isAuth'
import { createArticle, updateArticle, getArticle } from '@/api/article'

export default {
  name: "Editor",
  middleware: isAuth,
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      btnDisabled: false
    }
  },
  async mounted () {
    const slug = this.$route.query.slug;
    if (slug) {
      const { data: { article: { title, description, body, tagList } } } = await getArticle(slug);
      this.article = { title, description, body, tagList };
    }
  },
  methods: {
    async submitAritcle () {
      const slug = this.$route.query.slug;
      this.btnDisabled = true;
      const submitAritcle = slug ? updateArticle : createArticle;
      try {
        const { data: { article: { slug: getSlug } } } = await submitAritcle(this.article, slug);
        this.btnDisabled = false;
        this.$router.push({
          name: 'article',
          params: {
            slug: getSlug
          }
        })
      } catch (e) {
        this.btnDisabled = false;
      }
    }
  }
};
</script>

<style>
</style>
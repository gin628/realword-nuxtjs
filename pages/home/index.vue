<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'yourFeed'
                  }"
                  exact
                  :to="{
                    query: {
                      tab: 'yourFeed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: !tab || tab === 'globalFeed'
                  }"
                  exact
                  :to="{
                    query: {
                      tab: 'globalFeed'
                    }
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    query: {
                        tab: 'tag',
                        tag,
                      }
                    }"
                  >
                  #{{tag}}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <article-preview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      ...$route.query,
                      page: item,
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }"
                class="tag-pill tag-default"
              >
                {{tag}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getArticles, getTags, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'
import articlePreview from '@/components/articlePreview.vue'

export default {
    name: 'Home',
    async asyncData({ query, store }) {
      let page = query.page ? +query.page : 1;
      let tag = query.tag || '';
      let tab = query.tab || '';
      let limit = 10;
      const loadArticles = store.state.user && tab === 'yourFeed' ? getFeedArticles : getArticles;
      const [ articleRes, tagRes ] = await Promise.all([loadArticles({
        offset: (page - 1) * limit,
        limit,
        tag
      }), getTags()])
      const { articles, articlesCount } = articleRes.data;
      const { tags } = tagRes.data;
      return {
        articles,
        articlesCount,
        tags,
        tag,
        tab,
        limit,
        page
      }
    },
    components: {
      articlePreview
    },
    computed: {
      ...mapState(['user']),
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit);
      }
    },
    watchQuery: ['page', 'tag', 'tab'],
    methods: {
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
    }
};
</script>

<style>
</style>
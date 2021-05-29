<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <button
              v-if="user.username !== profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{
                active: profile.following
              }"
              @click="changeFollowStatus(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{profile.following ? 'Follow' : 'Unfollow'}} {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{
                    active: !favorited
                  }"
                  :to="{
                    query: {
                      author: profile.username
                    },
                    params: {
                      ...$route.params
                    }
                  }"
                  exact
                >
                  Author Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: favorited
                  }"
                  :to="{
                    query: {
                      favorited: author
                    },
                    params: {
                      ...$route.params
                    }
                  }"
                  exact
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <article-preview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import isAuth from '../../middleware/isAuth'
import { getProfile, followUser, unfollowUser } from '@/api/profile'
import { getArticles } from '@/api/article'
import { mapState } from "vuex";
import articlePreview from '@/components/articlePreview.vue'

export default {
  name: "UserProfile",
  middleware: isAuth,
  async asyncData ({ params: { username }, query }) {
    let favorited = query.favorited || void 0;
    let author = query.author ? query.author : favorited ? void 0 : username;
    const [ articleRes, profileRes ] = await Promise.all([getArticles({
        favorited,
        author,
      }), getProfile(username)])
      const { articles = {} } = articleRes.data;
      const { profile = {} } = profileRes.data;
    return {
      favorited,
      author,
      articles,
      profile
    }
  },
  components: {
    articlePreview
  },
  watchQuery: ['author', 'favorited'],
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async changeFollowStatus(profile) {
      if (profile.following) {
        await followUser(profile.username);
        profile.following = false;
      } else {
        await unfollowUser(profile.username);
        profile.following = true;
      }
    }
  }
};
</script>

<style>
</style>
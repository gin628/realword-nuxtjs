<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ pageText }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li
              v-for="(responses, text) in errors"
              :key="text"
            >
              {{text}} {{responses.join(',')}}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-if="!isLogin"
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ pageText }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { login, register } from '../../api/login';
import hasLogined from '../../middleware/hasLogined'
import { mapMutations } from 'vuex'

const Cookie = process.client ? require('js-cookie') : void 0;

export default {
  name: "Login",
  middleware: hasLogined,
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
    pageText() {
      return this.isLogin ? "Sign in" : "Sign up";
    },
  },
  data() {
    return {
      user: {
        username: void 0,
        password: void 0,
        email: void 0
      },
      errors: {}
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      try {
        const { data: { user } } = this.isLogin
          ? await login({
            user: this.user
          })
          : await register({
            user: this.user
          });
        this.setUser(user);
        Cookie.set('user', user);
        this.$router.push('/')
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    }
  }
};
</script>

<style>
</style>
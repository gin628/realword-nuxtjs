<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settingUser.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settingUser.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="settingUser.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settingUser.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settingUser.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isAuth from '../../middleware/isAuth'
import {mapState, mapMutations} from 'vuex'
import { updateUser } from '@/api/article'

export default {
  name: "Settings",
  middleware: isAuth,
  computed: {
    ...mapState(['user']),
  },
  data () {
    return {
      settingUser: {
        email: '',
        username: '',
        password: void 0,
        image: '',
        bio: ''
      }
    }
  },
  mounted () {
    const { email, bio, image = null, username } = this.user;
    this.settingUser = {
      email, bio, image, username
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    async updateUser () {
      const { email, bio, image = null, username, password } = this.settingUser;
      await updateUser({
        user: {
          email,
          bio,
          image,
          username,
          password
        }
      });
      // setUser({
      //   ...this.user,
      //   ...this.settingUser
      // });
      this.$router.push('/');
    },
  }
};
</script>

<style>
</style>
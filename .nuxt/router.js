import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _30aae02a = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _3fb619df = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _91752b2e = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _568976ae = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _53ed6123 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _24dc066d = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _88f4f014 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _30aae02a,
    children: [{
      path: "",
      component: _3fb619df,
      name: "home"
    }, {
      path: "/login",
      component: _91752b2e,
      name: "login"
    }, {
      path: "/register",
      component: _91752b2e,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _568976ae,
      name: "profile"
    }, {
      path: "/settings",
      component: _53ed6123,
      name: "settings"
    }, {
      path: "/editor",
      component: _24dc066d,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _88f4f014,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

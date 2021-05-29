const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
    user: null
})

export const mutations = {
    setUser (state, data) {
        state.user = data;
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        let user;
        if (req.headers.cookie && cookieparser) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {

            }
        }
        commit('setUser', user)
    }
}
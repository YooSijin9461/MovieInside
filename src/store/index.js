import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    moviesgenre: [],
    genremovies: [],
    moviedetail: [],
    moviedetailgenre: [],
    watchdetail: false,
    detailgenre: [],
  },
  mutations: {
    WATCH_DETAIL: function (state, movie) {
      state.watchdetail = true
      state.moviedetail = movie
    },
    WATCH_CARD: function (state) {
      state.watchdetail = false
    },
  },
  actions: {
    watchDetail: function ({ commit }, movie) {
      commit('WATCH_DETAIL', movie)
    },
    watchCard: function ({ commit }) {
      commit('WATCH_CARD')
    },
    // getToken: function () {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    // },
    getMovieGenre: function () {
      console.log(this.state.moviedetail)
      const MOVIE_URL = process.env.VUE_APP_SERVER_URL
      axios.get(`${MOVIE_URL}/movies/detail/${this.state.moviedetail.id}/genres`)
        .then((res) => {
          console.log(res)
          this.state.detailgenre = res.data
          })
        .catch((err) => {
          console.log(err)
        })
      },
  },
  modules: {
  }
})

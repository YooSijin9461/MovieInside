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
    // getToken: function () {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    //   },
    ALL_MOVIE_LIST: function () {
      const MOVIE_URL = 'http://127.0.0.1:8000/movies/all/1'
      axios.get(MOVIE_URL)
        .then((res) => {
          this.state.watchdetail = false
          if (this.state.movies.length === 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.state.movies.push(res.data[i])
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GENRE_MOVIE_LIST: function () {
      const MOVIE_URL = 'http://127.0.0.1:8000/movies/genre/'
      axios.get(MOVIE_URL)
        .then((res) => {
          this.state.watchdetail = false
          if (this.state.moviesgenre.length === 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.state.moviesgenre.push(res.data[i])
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    WATCH_DETAIL: function (state, movie) {
      state.watchdetail = true
      state.moviedetail = movie
    },
    WATCH_CARD: function (state) {
      state.watchdetail = false
    },
  },
  actions: {
    allMovieList: function ({ commit }) {
      commit('ALL_MOVIE_LIST')
    },
    genreMovieList: function ({ commit }, movies) {
      commit('GENRE_MOVIE_LIST', movies)
    },
    watchDetail: function ({ commit }, movie) {
      commit('WATCH_DETAIL', movie)
    },
    watchCard: function ({ commit }) {
      commit('WATCH_CARD')
    },
    getMovieGenre: function () {
      console.log(this.state.moviedetail)
      const MOVIE_URL = `http://127.0.0.1:8000/movies/detail/${this.state.moviedetail.id}/genres`
      axios.get(MOVIE_URL)
        .then((res) => {
          console.log(res)
          this.state.detailgenre = res.data
          })
        .catch((err) => {
          console.log(err)
        })
      },
    // getToken: function () {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    // },
  },
  modules: {
  }
})

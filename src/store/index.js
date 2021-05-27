import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    movies: [],
    moviesgenre: [],
    genremovies: [],
    moviedetail: [],
    moviedetailgenre: [],
    watchdetail: false,
    detailgenre: [],
    comments: [],
    recomments: [],
    config: '',
    movievote: 0,
    watchrecommend: false,
  },
  mutations: {
    ALL_MOVIE_LIST: function (state, res) {
      state.watchdetail = false
        if (state.movies.length !== res.data) {
          state.movies = res.data
        }
    },
    GENRE_MOVIE_LIST: function (state, res) {
      state.watchdetail = false
        if (state.moviesgenre.length !== res.data) {
          state.moviesgenre = res.data
        }
    },
    WATCH_DETAIL: function (state, movie) {
      state.watchdetail = true
      state.moviedetail = movie
    },
    WATCH_CARD: function (state) {
      state.watchdetail = false
    },
    // 액션
    GET_MOVIE_GENRE: function (state, res) {
      state.detailgenre = res.data
    },
    GET_COMMENT: function (state, res) {
      state.comments = res.data
    },
    // GET_HISTORY_COMMENT: function (state, res) {
    //   state.historycomments = res.data
    // },
    MOVIE_VOTE: function (state, res) {
      state.movievote = res.data
    },
  },
  actions: {
    allMovieList: function ({ commit }) {
      const MOVIE_URL = `http://127.0.0.1:8000/movies/all/1`
      axios.get(MOVIE_URL)
        .then((res) => {
          commit('ALL_MOVIE_LIST', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getComment: function ({ commit }, moviedetail, config) {
      const MOVIE_ID = moviedetail.id
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/comments/${MOVIE_ID}/1/`,
        headers: config
      })
        .then((res) => {
          console.log(res)
          commit('GET_COMMENT', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    genreMovieList: function ({ commit }) {
      const MOVIE_URL = 'http://127.0.0.1:8000/movies/genre/'
      axios.get(MOVIE_URL)
        .then((res) => {
          commit('GENRE_MOVIE_LIST', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    watchDetail: function ({ commit }, movie) {
      commit('WATCH_DETAIL', movie)
    },
    watchCard: function ({ commit }) {
      commit('WATCH_CARD')
    },
    movieVote: function ({ commit }, res) {
      commit('MOVIE_VOTE', res)
    },
    getMovieGenre: function ({ commit }, moviedetail) {
      const GENRE_URL = `http://127.0.0.1:8000/movies/detail/${moviedetail.id}/genres`
      axios.get(GENRE_URL)
        .then((res) => {
          // console.log(res)
          commit('GET_MOVIE_GENRE', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // gethistoryComment: function ({ commit }, comment) {
    //   const COMMENT_ID = comment.id
    //   axios({
    //     method: 'get',
    //     url: `http://127.0.0.1:8000/comments/history/${COMMENT_ID}/`,
    //     headers: this.config
    //   })
    //     .then((res) => {
    //       commit('GET_HISTORY_COMMENT', res)
    //       console.log(res)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // setToken: function () {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    //   },
  },
  modules: {
  },
  getters: {
    getToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  }
})

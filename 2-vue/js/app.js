import SearchModel from '../js/models/SearchModel.js'
import KeywordModel from '../js/models/KeywordModel.js'
import HistoryModel from '../js/models/HistoryModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
    history: [],
    searchResult: []
  },

  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeywords()
    this.fetchHistory()
  },

  methods: {
    onSubmit(e) {
      this.search()
    },
    onKeyup() {
      if (!this.query.length) this.resetForm()
    },
    onReset(e) {
      this.resetForm()
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword
      this.search()
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    fetchKeywords() {
      KeywordModel.list()
        .then(data => {
          this.keywords = data
        })
        .catch(err => console.log(err))
    },
    fetchHistory() {
      HistoryModel.list()
        .then(data => {
          this.history = data
        })
        .catch(err => console.log(err))
    },
    search() {
      SearchModel.list(this.query)
        .then(data => {
          this.submitted = true
          this.searchResult = data
        })
        .catch(err => console.log(err))

      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    resetForm() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    },

  }
})
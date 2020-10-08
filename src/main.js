import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('uppercase', function(value) {
  if (!value) return '' 
  return value.toUpperCase()
})

new Vue({
  render: h => h(App),
}).$mount('#app')


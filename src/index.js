import Vue from 'vue'
import App from './App'

console.log('JS app')

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: (h) => h(App)
  }).$mount()
  const appNode = document.getElementById('vue-app')
  if (appNode) appNode.appendChild(app.$el)
})

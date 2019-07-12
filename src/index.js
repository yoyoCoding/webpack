import _ from 'lodash'
import printMe from './print.js'
import './static/css/style.css'

/* function component() {
  var el = document.createElement('div')
  el.innerHTML = _.join(['hello', 'webpack'], ',')

  var button = document.createElement('button')
  button.innerText = '点我！点我！'
  button.onclick = printMe // 绑定的是旧的printMe事件
  el.appendChild(button)

  return el
} */

function getComponent() {
  // webpackChunkname: 'lodash'
  return import('lodash').then(({ default: _ }) => {
    var el = document.createElement('div')
    el.innerHTML = _.join(['hello', 'webpack'], ',')
    return el
  }).catch(err => 'An error occurred while loading the component')
}

getComponent().then(component => {
  document.body.appendChild(component)
})

// document.body.appendChild(component())
// var element = component()
// document.body.appendChild(element)

// 热更新
/* if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
} */

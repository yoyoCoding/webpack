import _ from 'lodash'
import printMe from './print.js'

function component() {
  var el = document.createElement('div')
  el.innerHTML = _.join(['hello', 'webpack'], ',')

  var button = document.createElement('button')
  button.innerText = '点我！点我！'
  button.onclick = printMe
  el.appendChild(button)

  return el
}

document.body.appendChild(component())

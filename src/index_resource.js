import _ from 'lodash'
import './static/css/style.css'
import Img from './static/images/yami.jpg'
import './static/css/iconfont.css'

function component() {
  var el = document.createElement('div')
  el.innerHTML = _.join(['hello', 'webpack'], ',')

  var image = new Image()
  image.src = Img
  el.appendChild(image)

  var icon = document.createElement('span')
  icon.classList.add('iconfont')
  icon.classList.add('icon-bulb')
  el.appendChild(icon)

  return el
}

document.body.appendChild(component())

require('./index.scss');

require('../components/nav/index.js')

const _util = require('tool/util.js');

let index = {
  init(){
    this.load();
    this.bind();
  },
  load(){
    new WOW().init();

    let $img = $('img[data-src]')
    _util.lazyload().init($img, function ($ele) {
      $ele.attr('src', $ele.data('src')).addClass('loaded')
    })
  },
  bind(){
  }
}

$(function () {
  index.init();
  
})
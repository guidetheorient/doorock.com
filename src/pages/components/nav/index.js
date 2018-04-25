/*
 * @Author: guidetheorient 
 * @Date: 2018-04-24 13:23:32 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-25 16:10:20
 */

require('./index.scss');

const _util = require('tool/util.js')

let nav = {
  init(){
    this.load();
    this.bind();
  },
  load(){
    this.$nav = $('.nav-wrapper')
  },
  bind(){
    let _this = this;
    $(window).on('scroll', _util.throttle(function () {

      let offsetTop = $(window).scrollTop();
      if(offsetTop >= 600) {
        _this.$nav.addClass('fixed slideInDown')
      } else {
        _this.$nav.removeClass('slideInDown fixed')
      }
    }, 500, 1000))
  }
}

$(function () {
  nav.init();
})
/*
 * @Author: guidetheorient 
 * @Date: 2018-04-24 17:02:50 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-25 15:54:51
 */

const util = {
  /**
   * 
   * @param {Function} fn 延迟调用的函数
   * @param {number} delay 延迟多长时间 
   * @param {number} interval 间隔多少必须执行一次
   * @return {Function} 延迟执行的方法  
   */
  throttle(fn, delay, interval){
    let timer = null;
    let prev = null;
    return function(){
      let _this = this;
      let args = arguments;
      let now = +new Date();
      
      if(!prev) prev = now;

      if(interval && (now - prev > interval)) {
        fn.apply(_this, args);
        prev = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(_this, args);
          previous = null;
        }, delay)
      }
    }
  },
  lazyload(){
    class Lazyload{
      constructor($ele, callback) {
        this.$ele = $ele;
        this.callback = callback;
        this.loadNode();
        this.bind();
      }
      loadNode(){
        if(!this.isLoaded() && this.isVisible()) {
          this.callback(this.$ele);
        }
      }
      bind(){
        let _this = this;
        $(window).on('scroll', util.throttle(_this.loadNode, 100, 200).bind(_this))
      }
      isVisible(){
        let wScrollTop = $(window).scrollTop();
        let wHeight = $(window).height();
        let eleOffsetTop = this.$ele.offset().top || this.$ele.parents('.w').offset().top;
        if(eleOffsetTop > wScrollTop && eleOffsetTop < (wHeight + wScrollTop + 200)){
          return true;
        }
      }
      isLoaded(){
        if(this.$ele.hasClass('loaded')) return true;
        return false;
      }
    }
    return {
      init($ele, callback){
        $ele.each((index, ele) => {
          new Lazyload($(ele), callback)
        })
      }
    }
  }
}

module.exports = util;
Vue.component('my-label',{
  data:function(){
    return {
      count:0
    }
  },
  template:` <div class="demo-alert-box">
    <button v-on:click="$emit('enlarge-text')"> 
      Click {{count}} times.
    </button>
    <slot></slot></div>
    `
})
// 遍历dom结构，解析指令和插值表达式
class Compile{
  constructor(el, vm){
    this.$vm = vm;
    this.$el = document.querySelector(el)
    // 把模板中的内容移到片段操作
    this.$fragment = this.node2Fragment(this.$el);
    // 执行编译
    this.compile(this.$fragment);
    // 放回$el中
    this.$el.append(this.$fragment);
  }

  node2Fragment(el){
    // 创建片段
    const fragment = document.createDocumentFragment();
    let child;
    while(child = el.firstChild){
      fragment.appendChild(child)
    }
    return fragment
  }

  compile(el){
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType == 1) {
        // 元素
        console.log("编译元素"+ node.nodeName);        
      }
      else if (this.isInter(node)) {
        // 只关心{{xx}}
        console.log("编译插值文本" + node.textContent)
      }
      // 递归子节点
      if(node.children && node.childNodes.length > 0){
        this.compile(node)
      }
    })
  }
  isInter(node){
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}
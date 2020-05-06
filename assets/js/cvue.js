// 定义cvue构造函数
class CVue {
  constructor(options){
    this.$options = options;

    // 传入data
    this.$data = options.data;

  //   // 响应化处理
  //   this.observe(this.$data)

  //   new Watcher(this, 'foo');
  //   this.foo; // 读一次，触发依赖收集
  //   new Watcher(this, 'bar.mua');
  //   this.bar.mua; 
  console.log(options.el)
    new Compile(options.el, this)
  }

  observe(value){
    if(!value || typeof value !== 'object'){
      return
    }
    // 遍历value
    Object.keys(value).forEach(key => {
      // 响应式处理
      this.defineReactive(value, key, value[key])
      // 代理data中的属性到vue根上
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val){
    // 递归的遍历
    this.observe(val);

    // 定义了一个Dep
    const dep = new Dep(); // 每个dep实例和data中的key有一一对应关系

    // 给obj的每一个key定义拦截
    Object.defineProperty(obj, key, {
      get(){
        // 依赖收集
        Dep.target &&dep.addDep(Dep.target)
        return val;
      },
      set(newVal){
        if(newVal !== val){
          val = newVal;
          dep.notify();
          // console.log(key + "值更新了")
        }
      }
    })
  }
  // 在vue根上定义属性代理data中的数据
  proxyData(key){
    // this指的CVue实例
    Object.defineProperty(this, key, {
      get(){
        return this.$data[key]
      },
      set(newVal){
        this.$data[key] = newVal
      }
    })
  }
}

class Dep{
  constructor(){
    // 存储所有依赖
    this.deps = []
  }

  addDep(dep){
    this.deps.push(dep);
  }

  notify(){
    this.deps.forEach(dep => dep.update())
  }
}
// 创建watcher， 保存data中数值和页面中的挂钩关系
class Watcher{
  constructor(vm, key){
    // 创建实例时立刻将该实例指向Dep.target便于依赖收集
    Dep.target = this
    this.vm = vm;
    this.key = key
  }
  update(){
    console.log(this.key + "更新了")
  }
  
}

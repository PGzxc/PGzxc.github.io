---
title: 前端面试题之——Vue
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: d190e0a7
date: 2024-03-23 17:22:52
---
## 一 面试题汇总

1. Vue 的生命周期有哪些
2. Vue 响应式原理
3. Vue3 和 Vue2 的区别
4. Vue 和 React 的区别是什么
5. Vue 父子组件生命周期执行顺序<!--more-->
6. Vue-router原理
7. Vuex原理
8. Vue 中的 key 的作用
9. Virtual Dom 的优势在哪里
10. Vue1 中的 DocumentFragement 有什么作用
11. Vue 子组件 $emit 后 props 会立刻更新吗？为什么
12. Vue 源码里的设计模式有哪些
13. Vue 虚拟 DOM diff 算法
14. Vue2 和 Vue3 diff 算法的区别
15. Vue 和 React diff 算法的区别

## 二 面试题解答(仅供参考)

### 2.1 Vue 的生命周期有哪些

Vue 的生命周期如图，总结如下：

```
1-beforebeforeCreate
只初始化一些事件，data 数据没有初始化，无法访问。
2-created
data 数据已经初始化，可以访问，但此时的 dom 没有挂载，可以在这里进行请求服务器数据等操作。
3-beforeMount
dom 挂载，但是 dom 中存在类似 的占位符，并没有替换。
4-mounted
此时组件渲染完毕，占位符也都被替换。
5-beforeUpdate 和 updated
组件触发更新时，会立刻先调用 beforeUpdate，等到重新渲染完之后调用 updated 钩子
6-beforeDestroy 和 destroyed
组件在销毁前会调用 beforeDestroy 钩子，可以在这里进行一些定时器或者销毁操作。destroyed 钩子函数会在 Vue 实例销毁后调用。
7-activated 和 deactivated
如果组件被 keep-alive 包裹，第一次渲染会在 mounted 钩子后面调用 activated 钩子，离开的时候不会调用 beforeDestroy 和 destroyed 钩子，而是调用 deactivated 钩子，等到再切换回来的时候，activated 钩子会调用（不会再走 mounted 钩子）。
8-errorCaptured
用于捕获子组件中抛出的错误，注意只有 errorCaptured 返回 false 则可以阻止错误继续向上传播（本质上是说“这个错误已经被搞定了且应该被忽略”）。Create
只初始化一些事件，data 数据没有初始化，无法访问。
```
图片说明

![][1]

### 2.2 Vue 响应式原理

![][2]

### 2.3 Vue3 和 Vue2 的区别

Vue3 除了性能提升外，相比 Vue2 有以下特点：

1. 使用 Proxy 替代 Object.defineProperty
   替换之后对象或数组可以在没有提前定义 key 的情况下直接赋值。（Object.defineProperty 需要提前知道 key 才能拦截这个 key 的访问，而 Proxy 是直接拦截整个对象的访问）
2. 增加 Composition API
   在 Vue2 中我们会在一个 Vue 文件中 data，methods，computed，watch 中定义属性和方法，共同处理页面逻辑。一个功能往往需要在不同的 Vue 配置项中定义属性和方法，比较分散。即使通过 Mixins 重用逻辑代码，也容易发生命名冲突且关系不清。
   在 Vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有 api 会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，都能快速的定位到这个功能所用到的所有 API。提高可读性和可维护性，而且基于函数组合的 API 更好的重用逻辑代码（和 React 的 Hooks 类似）。
3. 全面支持 TypeScript
   内部采用 TypeScript 重写，并在工具链上提供对 TypeScript 的支持

### 2.4 Vue 和 React 的区别是什么

Vue.js 和 React 是两个流行的前端框架/库，它们都用于构建用户界面，但在一些方面有所不同。以下是它们之间的一些主要区别：

1. **模板语法 vs JSX**：
   - Vue.js 使用模板语法，允许开发者在 HTML 模板中直接编写 Vue 组件的结构和逻辑，使得代码更加直观易懂。
   - React 使用 JSX（JavaScript XML），将 HTML 结构和 JavaScript 代码混合在一起，使得开发者可以在 JavaScript 中编写 HTML 结构，从而实现更加灵活和强大的组件化开发。
2. **数据绑定**：
   - Vue.js 提供了双向数据绑定的能力，开发者可以使用 `v-model` 指令来实现表单元素和数据模型之间的双向绑定。
   - React 采用了单向数据流的思想，父组件通过 props 将数据传递给子组件，子组件通过回调函数来更新父组件的状态，从而实现数据的流动。
3. **状态管理**：
   - Vue.js 有自己的状态管理库 Vuex，提供了集中式的状态管理能力，可以帮助开发者管理应用程序中的状态，并实现组件之间的数据共享和通信。
   - React 并没有官方的状态管理库，但可以使用第三方库 Redux 来管理应用程序的状态，Redux 提供了强大的状态管理能力，可以与 React 结合使用，实现复杂应用程序的状态管理。
4. **组件生命周期**：
   - Vue.js 的组件生命周期包括 `beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeDestroy`、`destroyed` 等钩子函数，可以在不同阶段执行相应的逻辑。
   - React 的组件生命周期包括 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 等生命周期方法，可以在组件的不同生命周期阶段执行相应的逻辑。
5. **学习曲线**：
   - Vue.js 的学习曲线相对较低，语法简单，易于上手，适合初学者和小型项目。
   - React 的学习曲线稍高，需要掌握 JSX、组件生命周期、状态管理等概念，但一旦掌握，可以实现更复杂的应用程序，适合大型项目和团队合作。

### 2.5 Vue 父子组件生命周期执行顺序

```
// 渲染
parent beforeCreate
parent created
parent beforeMount
sub beforeCreate
sub created
sub beforeMount
sub mounted
parent mounted

// 数据更新
parent beforeUpdate
sub beforeUpdate
sub updated
parent updated

// 销毁组件
parent beforeDestroy
sub beforeDestroy
sub destroyed
parent destroyed
```

### 2.6 Vue-router原理

```
简单的说，Vue-router 的原理就是通过监听 URL 地址的变化，从注册的路由中渲染相应的组件。
根据类型分为 hash 模式和 history 模式。
hash 模式实现原理是基于 window.location.hash 来获取对应的 hash 值，
改变 hash 值并不会刷新页面，通过监听 onhashchange 事件来获取用户改变 hash 的行为。
history 模式依赖于 history 提供的接口，
如 history.pushState 可以修改 url 但并不会刷新页面，
每次触发 history.back() 或者浏览器的后退按钮等，会触发一个 popstate 事件（history.pushState 和 history.replaceState 方法并不会触发 popstate 事件，
解决办法是创建自定义事件，详见参考链接），通过监听该事件可以获取用户改变 url 的行为。
但 history 模式有一个缺点，如果用户手动刷新页面，如果服务器没有配置 url 对应的资源，则会返回 404
```

### 2.7 Vuex原理

```
Vuex 的内部会初始化一个 store 实例（store 内部会实例化一个 Vue 实例 vm 用于响应式处理，
Vuex 和 Vue 强关联），之后会将 store 实例挂载到所有组件中，
这样所有组件引用的都是同一个 store 实例。
访问 store 实例里的数据会被代理到内部的 vm 实例上，这样一旦修改了 store 实例的数据，
vm 便会通知所有视图更新数据
```

### 2.8 Vue 中的 key 的作用

组件中 key 是用来标识组件（React 同理）。在 Vue 进行更新的时候会进行新旧 VNode 节点的对比，如果 key 不相同，会直接销毁旧的 vnode，渲染新的 vnode。如果 key 相同则会更新复用 vnode。
一个比较常见的错误：在会出现增删的列表循环中使用 index 作为 key。比如渲染一个长度为 3 的列表，列表的每一个元素的 key 分别为 `1 2 3`，此时删除了第一个元素。

- 理想状态：删除第一个元素的 dom 即可。
- 实际情况：Vue 在渲染的时候发现列表的 key 由 `1 2 3` 变成了 `1 2`，则会删除最后一个元素的 dom，然后更新第一和第二个元素的数据，从而错误的更新。如果第一个元素和第二个元素有非受控的状态，页面会直接显示错误。

比较好的做法是使用 id 作为 key，如果没有 id，则在获取到列表的时候通过某种规则为它们创建一个 key，并保证这个 key 在组件整个生命周期中都保持稳定

### 2.9 Virtual Dom 的优势在哪里

JS 线程和 UI 线程是互斥的，JS 代码调用 DOM API 必须挂起 JS 线程、转换传入参数数据、激活 UI 线程，DOM 重绘后再转换可能有的返回值，最后激活 JS 线程并继续执行。若有频繁的 DOM API 调用，引擎间切换的代价将迅速积累。若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

VDOM 的本质是一种描述真实 DOM 的数据结构，相比直接修改 DOM 有以下优点：

1. 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗，减少频繁的引擎切换的开销。
2. 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部
3. 由于虚拟 DOM 会帮助我们更新 DOM，所以我们只需要关注数据的变化，极大的减少了心智负担，提高了开发效率。

虚拟 dom 好处这么多，渲染速度上是不是比直接操作真实 dom 快呢？并不是。虚拟 dom 增加了一层内存运算，然后才操作真实 dom，将数据渲染到页面上。渲染上肯定会慢上一些。虽然虚拟 dom 的缺点在初始化时增加了内存运算，增加了首页的渲染时间，但是运算时间是以毫秒级别或微秒级别算出的，对用户体验影响并不是很大

### 2.10 Vue1 中的 DocumentFragement 有什么作用

文档碎片主要的作用是用来提高页面性能，考虑如下问题：在 document.body 中添加 100 个 span

```js
for (var i = 0; i < 100; i++) { 
  var op = document.createElement("span"); 
  var oText = document.createTextNode(i); 
  op.appendChild(oText); 
  document.body.appendChild(op); 
} 
```

这样写性能就会很差，不断的向 body 中插入元素会导致页面不断的触发重排，发生页面卡顿的现象。当然你也可以新建一个 div 将 span 都放到 div 中，最后再将 div 插入到 body 中，但这样 dom 中会多出一个 div 节点。更好的做法是使用 createDocumentFragment 创建一个文档碎片节点，将 span 临时放入碎片节点中，最后一次性插入到 body:

```
//先创建文档碎片
var oFragmeng = document.createDocumentFragment(); 

for (var i = 0; i < 100; i++) { 
  var op = document.createElement("span"); 
  var oText = document.createTextNode(i); 
  op.appendChild(oText); 
  //先附加在文档碎片中
  oFragmeng.appendChild(op);  
} 

//最后一次性添加到document中
document.body.appendChild(oFragmeng); 
```

### 2.11 Vue 子组件 $emit 后 props 会立刻更新吗？为什么

```
不会，我们知道 Vue 的更新是异步的，同一时间修改多次 data 实际只会更新一次视图，
这样做可以大大减少 dom 更新的次数，提高性能。
所以当子组件 $emit 后实际是修改父组件的 data，之后会异步的执行父组件的 render 方法更新，
在 render 方法中会传入新的 data 用来更新子组件。
所以子组件 $emit 后，props 只有等到页面重新渲染后才会更新
```

### 2.12 Vue 源码里的设计模式有哪些

```
1-发布订阅模式
Vue 的响应式用到了发布订阅模式，初始化的时候会对组件的 data 数据拦截，组件访问 data 的属性后会订阅该属性的变化，等到该属性修改后通知之前订阅的组件。

2-工厂模式
Vue3 的 createApp 函数可以创建多个 Vue 实例，工厂函数代替直接 new 对象，降低了模块间的耦合性。

3-策略模式
Vue 抽象出一份响应式代码，不同平台实现相应的接口即可实现多平台的渲染，例如 weex 和 web 两个平台。

4-代理模式
Vue 通过代理数组的原型方法，来实现数组的响应式（例：通过 push 方法插入元素会导致视图更新）。
```

### 2.13 Vue 虚拟 DOM diff 算法

传统的 diff 算法从一颗树转换到另一颗树，时间复杂度为 O(n^3)，Vue 借鉴了 React 的 diff 思想，也实现了复杂度为 O(n) 的算法，主要遵循以下基本原则：

1. **同级比较**：
   Vue 的 diff 算法只比较同级别的节点，而不是跨层级比较。如果一个节点在旧树中存在但在新树中不存在，那么这个节点将被移除；如果新树中有一个节点在旧树中不存在，那么这个节点将被创建。

2. **可重用节点的检测**：
   Vue 通过相同的 `key` 属性检测哪些子节点是可重用的。`key` 是一个特殊的属性，当子节点拥有唯一的 `key` 值时，Vue 会用这个 `key` 来匹配新旧虚拟 DOM 之间的子节点。如果没有 `key`，Vue 将默认使用节点的类型和顺序作为重用的依据。

3. **更新子节点**：
   当比较两个相同类型的节点时，Vue 会执行更新操作，这包括确保节点的类型相同，并更新具有相同 `key` 的节点的属性、事件监听器等。对于子节点，Vue 会递归地进行 diff 操作。

4. **列表对比优化**：
   在处理列表时，Vue 会尝试最大限度地重用现有的子节点，减少不必要的 DOM 操作。Vue 实现了一个高效的算法来处理列表项的插入、移动和删除操作。这个算法基于两个简单的假设：

   - 列表的头部或尾部是变化最频繁的区域。
   - 创建新的节点通常比移动现有节点更昂贵。

   因此，Vue 在更新列表时，会尝试从头部或尾部开始比较，并且在必要时移动节点，而不是替换它们。

Vue 的 diff 算法的核心是一个递归的过程，它尝试尽可能地减少对真实 DOM 的操作，因为这些操作通常是性能瓶颈。通过仅更新实际更改的部分，Vue 可以实现快速的响应式 UI 更新

### 2.14 Vue2 和 Vue3 diff 算法的区别

Vue 2 和 Vue 3 都使用虚拟 DOM 和 diff 算法来更新 DOM，但是在 Vue 3 中，diff 算法经过了优化，以提供更好的性能和更小的内存占用。下面是 Vue 2 和 Vue 3 在 diff 算法方面的一些主要区别：

1. **静态树提升**：
   Vue 3 会自动检测模板中的静态根节点，并在编译时将它们提升，这意味着在 diff 过程中，这些节点及其子节点不需要被比较，因为它们不会改变。这减少了 diff 过程中需要比较的节点数量。Vue 2 中没有这种优化。
2. **静态属性提升**：
   类似地，Vue 3 在编译时会提升那些不会改变的静态属性，这样在重新渲染时就不需要再次对这些属性进行处理。Vue 2 则会在每次渲染时检查所有属性。
3. **片段（Fragments）**：
   Vue 3 支持 Fragments，这意味着组件可以有多个根节点。在 Vue 2 中，每个组件必须有一个单独的根节点。这在 Vue 3 中改变了 diff 算法，因为它需要能够处理多个根节点的情况。
4. **编译时优化**：
   Vue 3 的编译器可以更智能地生成代码，以减少运行时的工作量。例如，它可以确定哪些子树是动态的，哪些是静态的，从而避免在动态子树中进行不必要的检查。Vue 2 的编译器做了一些类似的优化，但没有 Vue 3 那么高级。
5. **更好的块跟踪**：
   Vue 3 引入了块（blocks）的概念，这是一种新的内部数据结构，用于跟踪静态节点和动态节点的边界，这样在更新时可以更快地找到需要 diff 的节点。
6. **优化的事件处理器**：
   Vue 3 在处理事件监听器时也进行了优化，通过使用缓存的事件处理器来减少不必要的重新渲染。

总结来说，Vue 3 的 diff 算法和 Vue 2 相比，进行了许多优化，这些优化旨在减少需要比较和渲染的节点数量，以及减少内存占用和提高性能。这些改进使得 Vue 3 在处理大型和复杂应用时更加高效。

### 2.15 Vue 和 React diff 算法的区别

1. **组件更新的优化** Vue 的组件有一个静态树优化。在编译模板时，它能够检测出静态的根节点，并在 diff 过程中直接跳过它们。这意味着如果组件的某些部分在任何时候都不会改变，Vue 在编译时就会知道，并在后续的更新中省去比对这些静态节点。React 不会在编译时对组件进行静态分析，所有的组件都会在更新时进行 diff。
2. **列表比对处理不同**
   Vue 的列表比对，采用从两端到中间的比对方式。而 React 则采用从左到右依次比对的方式，在某些场景 Vue 的对比方式更高效

## 三 参考

* [前端面试题—Vue](https://namewjp.github.io/Front-end-interview/vue.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/web-font-interview-vue_lifecycle.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/web-font-interview-vue_init_process.png
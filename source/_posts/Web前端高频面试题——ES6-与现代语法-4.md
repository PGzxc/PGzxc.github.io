---
title: Web前端高频面试题——ES6+与现代语法(4)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 3fbed6d5
date: 2025-10-23 09:06:43
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.语法增强：解构赋值、展开运算符、模板字符串
2.新数据结构：Map/Set/WeakMap/WeakSet
3.模块化：ESM vs CommonJS、Browserify/RequireJS/SeaJS
4.Proxy/Reflect 应用
5.异步：async/await 错误处理、Generator
6.Symbol 的作用
7.新特性：可选链（?.）、空值合并（??）
8.工程特性：Tree-shaking 原理、Babel 工作机制
```

### 三 面试题解答(仅供参考)

### 3.1 语法增强

1、什么是解构赋值？有哪些优势和应用场景？

```
1、概念：解构赋值从数组或对象提取值赋给变量，支持默认值和嵌套提取。
2、优势: 代码简洁、可读性强。
3、应用场景: 
-交换变量：[a, b] = [b, a]
-函数参数：function printUser({ name, age }) { ... }
-模块导入：const { useState } = require('react')
-处理多返回值：const [err, data] = await to(fetchData())

4、示例:
const [a, b = 4] = [1, 2]; // a=1, b=2
const { name, age = 30 } = { name: 'Alice' }; // name='Alice', age=30
const [x, y] = [y, x]; // 交换变量
```

2、展开运算符和剩余参数有什么区别？

```
1、概念
-展开运算符 (...) 将可迭代对象/对象展开为单个元素；
-剩余参数 (...) 收集函数多余参数为数组。

2、区别: 
Spread 扩展，Rest 收集。

3、示例:

// Spread
const arr = [...[1, 2], 3]; // [1, 2, 3]
const obj = { ...{ a: 1 }, b: 2 }; // { a: 1, b: 2 }
// Rest
function sum(...nums) { return nums.reduce((a, b) => a + b); } // sum(1, 2, 3) = 6
```

3、模板字符串的作用是什么？如何支持多行和插值？

```
1、概念：使用反引号（`）支持多行字符串和插值（${}），无需拼接或转义。
2、作用: 提高字符串处理易用性，适合动态 HTML、日志、i18n。
3、示例:
const name = 'Bob';
const greeting = `Hello, ${name}!\nWelcome to ES6.`; // 多行
```

### 3.2 新数据结构

1、Map 和 Set 与 Object 和 Array 有何区别？

```
1、概念
Map: 键值对集合，键支持任意类型，可迭代，有 size、has 等方法。
Set: 唯一值集合，自动去重，可迭代。

2、区别: 
Object 键仅限字符串/Symbol，Map 键任意；
Set 适合唯一值，优于 Array。

3、示例:
const map = new Map().set({ key: true }, 'value'); // 对象作为键
const set = new Set([1, 2, 2]); // [1, 2]
```

2、WeakMap 和 WeakSet 的特点和应用场景是什么？

```
1、概念
WeakMap: 键为对象，弱引用，GC 可回收，不可迭代。
WeakSet: 唯一对象集合，弱引用，GC 可回收。

2、应用: DOM 元数据、缓存（自动清理）。

3、示例:
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'data');
obj = null; // 可被 GC
```

3、Map / Set / WeakMap / WeakSet

|  特性  |   Map    |   Set    | WeakMap | WeakSet |
| :----: | :------: | :------: | :-----: | :-----: |
| 键类型 | 任意类型 | 无重复值 | 仅对象  | 仅对象  |
| 可迭代 |    可    |    可    |  不可   |  不可   |
| GC回收 |   不可   |   不可   | 弱引用  | 弱引用  |


### 3.3 模块化

1、ESM 和 CommonJS 的区别是什么？

```
1、概念
ESM: 静态、异步，import/export，支持 tree-shaking，浏览器/Node 通用。
CommonJS: 同步、动态，require/module.exports，Node 默认。

2、示例:

// ESM
export const add = (a, b) => a + b;
import { add } from './math.js';
// CommonJS
module.exports.add = (a, b) => a + b;
const { add } = require('./math.js');
```

2、Browserify、RequireJS、SeaJS 的作用是什么？与 ESM 相比如何？

```
Browserify: 打包 CommonJS 为浏览器代码。
RequireJS/SeaJS: AMD/CMD 模块加载器，异步加载。
与 ESM 对比: ESM 原生支持，静态分析更高效，现代首选。
```

3、ESM vs CommonJS

|  对比项  |         ESM          |        CommonJS        |
| :------: | :------------------: | :--------------------: |
|   语法   |    import/export     | require/module.exports |
| 加载方式 |      静态编译时      |       运行时加载       |
| 输出引用 |   引用绑定（实时）   |     值拷贝（缓存）     |
|   环境   | 浏览器/Node(ESM模式) |        Node默认        |

4、模块化演进

```
1、早期方案：
AMD(RequireJS) → 浏览器异步加载
CMD(SeaJS) → 按需加载
CommonJS → Node 环境同步模块

2、现代方案：
ESM：统一浏览器与 Node 模块规范
```

### 3.4 Proxy/Reflect 应用

1、Proxy 的作用和应用场景是什么？

```
1、概念：
Proxy 拦截对象操作（如 get/set/delete）。

2、应用: 
数据校验、响应式系统（如 Vue3）、日志追踪、接口 mock。

3、示例:

const proxy = new Proxy({ age: 20 }, {
  set: (obj, prop, value) => {
    if (prop === 'age' && value < 0) throw new Error('Invalid age');
    obj[prop] = value;
    return true;
  }
});
```

2、Reflect 的作用是什么？如何与 Proxy 结合？

```
1、概念：
Reflect 提供标准化的对象操作 API，与 Proxy 拦截方法对应，返回布尔值。
2、作用: 规范化操作，搭配 Proxy 实现默认行为转发。
3、示例:

const proxy = new Proxy({}, {
  get: (target, prop) => Reflect.get(target, prop) || 'default'
});
console.log(proxy.unknown); // 'default'
```

3、Proxy 对比 Object.defineProperty 的优势是什么？

```
Proxy: 拦截 13 种操作，支持数组操作和动态属性。
Object.defineProperty: 仅限 get/set，需预定义属性，数组支持有限。
应用: Proxy 更适合现代响应式系统。
```

### 3.5 异步

1、async/await 如何处理错误？

```
1、概念
使用 try-catch 捕获错误，或封装为 [err, res] = await to(fetchData())。

2、示例:

async function fetchData() {
  try {
    const res = await fetch('url');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}
```

2、Generator 函数的作用和特点是什么？

```
1、概念：通过 function* 和 yield 实现可暂停/恢复的函数，返回迭代器。
2、特点: 惰性求值、双向通信。
3、作用: 异步流程控制（如 redux-saga）、自定义迭代器。
4、示例:

function* gen() { yield 1; yield 2; }
const it = gen();
console.log(it.next().value); // 1
```

### 3.6 Symbol 的作用

1、Symbol 的作用是什么？为什么不可被 for...in 遍历？

```
1、概念：Symbol 是唯一、不可变的原始类型，用于对象属性键，避免命名冲突。
2、作用: 模拟私有属性、定义内置行为（如 Symbol.iterator）。
3、不可遍历: Symbol 属性不可枚举，需用 Object.getOwnPropertySymbols() 访问。
4、示例:

const sym = Symbol('id');
const obj = { [sym]: 123 };
console.log(obj[sym]); // 123
```

### 3.7 新特性

1、可选链 (?.) 的作用是什么？

```
1、概念：安全访问嵌套属性，若中间为 null/undefined，返回 undefined。
2、解决痛点: 避免 Cannot read property 'x' of undefined 错误。
3、示例:

const obj = { user: { name: 'Alice' } };
console.log(obj?.user?.age); // undefined
```

2、空值合并 (??) 与 || 的区别是什么？

```
1、概念：
?? 仅在 null/undefined 时取默认值；|| 对所有 falsy 值生效（如 0、空字符串）。

2、示例:

const val = 0;
console.log(val ?? 10); // 0
console.log(val || 10); // 10
```

### 3.8 工程特性

1、Tree-shaking 的原理是什么？

```
1、概念：通过静态分析 ESM 的 import/export，移除未使用代码。
2、原理: 标记未用模块，工具（如 Webpack/Rollup）删除。
3、要求: 模块需无副作用。
```

2、Babel 的工作机制和作用是什么？

```
1、概念：Babel 将 ES6+ 代码转为 ES5，兼容旧环境。
2、机制:
-解析：代码转为 AST。
-转换：插件修改 AST。
-生成：输出目标代码。
3、作用: 兼容旧浏览器、支持 JSX/TypeScript、配合 polyfill 填充 API。
4、常用插件: 
@babel/preset-env(语法转换)、@babel/plugin-transform-runtime(减少冗余)。
```


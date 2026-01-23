---
title: Node开发之——ERR_REQUIRE_ESM
categories:
  - 开发
  - G-后端开发
  - Node
tags:
  - Node
abbrlink: fc915286
date: 2023-07-07 15:54:04
---
## 一  错误现象

执行`npx nrm use taobao`时出现如下错误

```
const open = require('open');
             ^

Error [ERR_REQUIRE_ESM]: require() of ES Module C:\Users\83422\AppData\Local\npm-cache\_npx\c3b18f2de609c2ae\node_modules\open\index.js from C:\Users\83422\AppData\Local\npm-cache\_npx\c3b18f2de609c2ae\node_modules\nrm\cli.js not supported.
Instead change the require of index.js in C:\Users\83422\AppData\Local\npm-cache\_npx\c3b18f2de609c2ae\node_modules\nrm\cli.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (C:\Users\83422\AppData\Local\npm-cache\_npx\c3b18f2de609c2ae\node_modules\nrm\cli.js:9:14) {
  code: 'ERR_REQUIRE_ESM'
}

Node.js v18.16.0
```

<!--more-->

## 二 原因

应该使用 open 的 CommonJs规范的包 ，现在 open v9.0.0 是 ES Module 版本的包

## 三 解决办法

```
npm install -g nrm open@8.4.2 --save
```

## 四 应用

```
C:\Users\83422>npx nrm use taobao
 SUCCESS  The registry has been changed to 'taobao'.
```

## 五 参考

* [2023/3/21 nrm安装后报错](https://juejin.cn/post/7212960463730819127)
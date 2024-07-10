---
title: Hexo站点建设之——博客加密
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: a3837674
date: 2020-11-08 12:38:15
---
## 一 概述

Hexo编写Markdown文章后生成的静态页面默认是公开不加密的，所有人都可以访问，如果希望某些文章需要访问者只有输入正确的密码后才能继续访问，则需要使用插件`hexo-blog-encrypt`

* 加密后的文章特性
* 安装encrypt插件
* 快速入门
* 高级设置

<!--more-->

## 二 加密后的文章特性

*  一旦你输入了正确的密码, 它将会被存储在本地浏览器的localStorage中。再次访问，不需输入密码 
*  支持按标签加密 
*  所有的核心功能都是由原生的API所提供的。 在 Node.js中, 我们使用 Crypto。在浏览器中, 我们使用 Web Crypto API 
*  所有的核心功能都是由原生的API所提供的。 在 Node.js中, 我们使用 Crypto。在浏览器中, 我们使用 Web Crypto API 
*  广泛地使用 Promise 来进行异步操作, 以此确保线程不被堵塞
*  过时的浏览器将不能正常显示 

## 三 安装encrypt插件

在博客目录下执行下面的指令安装encrypt

```
npm install --save hexo-blog-encrypt
```

安装完成后，再package.json文件的dependecies依赖中看到encrypt插件

```
  "dependencies": {
      "hexo-blog-encrypt": "^3.0.13",
  }
```

## 四 快速入门

### 4.1 加密文章设置(password属性)

将"password"字段添加到文章信息头部：

```
---
title: WordPress站点之——博客搭建
categories:
  - 站点
  - WordPress
tags:
  - WordPress
abbrlink: cc7cba44
date: 2020-11-07 23:05:38
password: 1234
---
```

### 4.2 执行hexo g&&hexo s后，便可在本地查看加密后的文章预览
![][1]
### 4.3 输入密码错误后，界面提示

![][2]

## 五 高级设置
### 5.1  **博客根目录** _config.yml

```
# Security
encrypt: # hexo-blog-encrypt
  abstract: 有东西被加密了, 请输入密码查看.
  message: 您好, 这里需要密码.
  tags:
  - {name: tagName, password: 密码A}
  - {name: tagName, password: 密码B}
  template: <div id="hexo-blog-encrypt" data-wpm="{{hbeWrongPassMessage}}" data-whm="{{hbeWrongHashMessage}}"><div class="hbe-input-container"><input type="password" id="hbePass" placeholder="{{hbeMessage}}" /><label>{{hbeMessage}}</label><div class="bottom-line"></div></div><script id="hbeData" type="hbeData" data-hmacdigest="{{hbeHmacDigest}}">{{hbeEncryptedData}}</script></div>
  wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
```

### 5.2 对要加密的文章 ，修改文章信息头如下

```
password: 1234
abstract: 这里有东西被加密了，需要输入密码查看哦。
message: 您好，这里需要密码。
wrong_pass_message: 抱歉，这个密码看着不太对，请再试试。
wrong_hash_message: 抱歉，这个文章不能被纠正，不过您还是能看看解密后的内容。
```
### 5.3 配置优先级
文章信息头 > _config.yml (站点根目录下的) > 默认配置


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-wenzhang-encrypt-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-wenzhang-password-error-view.png
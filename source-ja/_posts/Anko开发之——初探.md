---
title: Anko开发之——初探
categories:
  - 开发
  - B-高级语言
  - Anko
tags:
  - Anko
abbrlink: dbbc033a
date: 2017-11-27 16:25:39
---
这是一篇翻译文章，原文请查看[Kotlin/Anko][1]    
Anko是一个Kotlin类库，它让我们开发Android应用更加快捷和方便，使你的代码更加简洁和易读；  
Anko由以下几个方面组成：    

- Anko组件：包含意图、对话框、日志等的助手的轻量级库
- Anko布局：以一种快捷和安全的方式实现Android动态布局
- Anko数据库：查询DSL(领域专用语言)和解析Android SQLite数据库
- Anko协同程序：基于[kotlinx.coroutines][2]的工具类库
<!--more-->

# Anok组件
Anko为Android开发者提供了一整套的工具集合，它们包含了以下内容，但不仅限了此  

- Intents(意图)
- Dialogs and toasts(对话框和吐司)
- Logging(日志信息)
- Resources and dimensions(资源)  

# Anko布局  
先看一个Anko布局实例(个人感觉像React-Native)    

	verticalLayout {
    val name = editText()
    button("Say Hello") {
        onClick { toast("Hello, ${name.text}!") }
    }
	}
这段代码是在一个线性布局中添加了一个EditText输入框和Button按钮，按钮添加点击事件，点击事件接受一个Lambda表达式    
我们来看一下Activity中完整代码  
![activity][3]   
分析： 
 
- 自定义MyActivityUI集成AnkoComonent，并实现createView方法
- ui.apply中括号中是本文的布局，verticalLayout标明是线性布局，后面的中括号是线性布局中的元素和事件  
- .view转化为view返回
- MyActivityUI().setContentView中this指代MyActivityUI
 
结果：布局文件写在了代码中，不在需要layout中的布局文件了，那预览怎么看呢？？？？

预览：anko提供了第三方类库，我们可以通过导入plug后查看    
## 插件 Anko support    

### 预览功能
 - 安装：打开Plug，在输入框中输入anko，安装后重启
 ![anko support][4]
- 使用 ：依次打开view-tool windows-anko layout preview,右侧显示预览结果
![][5]

### 将layout中布局文件转化为代码文件
- 找出要转化的layout布局，执行Code->Convert to Anko Layout DSL
![][6]  
- 在包下可以看到转化后的文件和代码
![][7] 
- 对转化后的文件重命名，并重写view中显示内容，后侧显示预览结果   
![][8]

[参考demo][9]  
   



[1]: https://github.com/Kotlin/anko#anko-layouts-wiki
[2]: https://github.com/Kotlin/kotlinx.coroutines/releases
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-activity-view.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-support.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-preview.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-layout-convert.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-convert-result.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-convert-rename.png
[9]: https://github.com/PGzxc/AnkoDemo
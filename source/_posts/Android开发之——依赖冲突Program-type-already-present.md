---
title: Android开发之——依赖冲突Program type already present
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 依赖冲突
abbrlink: eef37b39
date: 2018-07-01 23:56:15
---
# 前言
实际开发中，为了提高开发速度和效率，总避免不了引用第三方提供的依赖和类库，如果含有相同依赖的类库被我们引用时，而他们的版本又不相同，就有可能会导致一系列问题和异常，本文结合本人时间总结和他人经验，稍作总结。

<!--more-->

# 问题
## 依赖
下面是一个项目build.gradle中的依赖，我们简单做一下分类   
![][1] 
### 网络相关
1. okhttp
2. retrofit
3. http-legacy
### 常用类库
1. rxpermission(权限监测)
2. leakcanary(内存泄漏)
3. BaseRecycleViewAdapterHelper(star较多的Adapter)
4. rxjava2
5. smartRefreshLayout(刷新)

### 不常用
1. bmob(消息推送)
2. jsoup(html解析器)   


## 异常
当我们运行时，会发生异常  
![][2]  
### 查看异常
#### 自带工具查看
如果你觉得标识的不太清晰，可以点击如图所示图标，展开信息  
![][3]  

#### 通过指令将异常保存 

	gradlew build --stacktrace > logs.txt 2>logErrors.txt

编译前，请确认gradle环境变量已配置，关于build Task请查看Gradle总结。  
![][4]

  
通过上述指令，将信息分别保存到上述文件中(默认项目根目录)：   
 
1. logs.txt:编译过程信息
2. logErrors.txt：异常信息

logs、logErrors信息如下：   
![][5]  

### 分析异常 
 在logErrors中看到Program type already present: okio.AsyncTimeout$1，如何查看是否有多个的Okio文件呢？  

#### 通过搜索栏查看 
双击Shift，在搜索框中输入Okio，可以看到有2条okio的信息    
![][6] 
#### 在Terminal中输入指令  
	gradlew -q app:dependencies

![][7]  
#### 在External Libraries中查看对应依赖
![][8] 

# 解决 
## Group与module的区别
要解决上述问题，首先要明白Group与module的区别，然而搜索了一遍，好像网上没有给出比较清晰的解释，而这些又是解决依赖冲突这些问题首先要明白的问题，本人在摸索中，稍微总结了一下(如有问题，还请包含)   


### Module 
1. 具有独立功能的模块
2. Module中可能还包含有Module
3. implementation分号之后的部分

### Group
1. Module的集合
2. implementation分号之前的部分

### 实例分析
以下图为例，加入我们要了解com.android.support:design:26.1.0中，group和module分别是哪些呢？     
![][9]
#### 在Terminal中输入指令  
	gradlew -q app:dependencies

![][10]
#### 在 Maven Repository中查找com.android.support:design:26.1.0
可以清晰的看到，group为：com.android.support，   

module为下面的内容：  

1. support-v4
2. appcompat-v7
3. recyclerview-v7
4. transition

![][11]

## 解决依赖 
解决依赖本文提供两种方式 
### exclude方式
特点：      

1. 配置较为麻烦，需要在引起冲突的每个依赖上进行exclude操作 
2. 配置繁琐，不美观  


![][12]  
### 通过configurations方式
特点：   

1. 在configurations中，统一指定要配置的方式
2. 配置简单，较为整洁  

![][13]  
### 通过configurations.all同一版本
![][14]  



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-gradle.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-exception.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-exception-open.gif
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-gradle-version.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-logErrors.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-okio.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-tree.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-external-library.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-gradle-design.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-design-26.1.0.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-design-26.1.0-maven.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-exclude.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-configuration.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/depend-configuration-all.png
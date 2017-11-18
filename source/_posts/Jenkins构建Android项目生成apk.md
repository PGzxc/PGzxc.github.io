---
title: Jenkins构建Android项目生成apk
date: 2017-11-18 17:57:47
categories: [Android]
tags: [Jenkins,项目构建]
---
原文参考：[Jenkins持续化构建Android项目（二）-构建Android项目生成apk（by 星空武哥）][1]    
 
这一篇简单介绍下通过Jenkins新建一个项目及打包生成apk文件；  
# 创建项目
## 进入Jenkins主界面，点击新建或者创建一个任务，新建一个项目 
<!--more-->
![Jenkins][2]  
## 输入要创建项目的名字(此处为Fragment)，选择类型(此处选择"构建一个自由风格的软件项目")  
![][3]  
## 点击Ok后，进入项目的配置  
![配置][4]  

# 配置项目  

## 配置“General”
![General][5]  

## 配置源码管理

### 要使用到的项目代码为Github上的项目  
![Github][6]    
### 添加Github用户名和密码
![][7]  
### 配置后如图  
![][8]  

## 构建触发器  
我们选择Poll SCM模式，每十五分钟拉取一次代码，如果代码发生了改变，就自动构建
![][9]  
注：H/15 ****从下面到的Example中填入
![][10]
## 构建   
### 执行：新建构建步骤->“Invoke Gradle script” 
![构建][11]   

### 配置“Invoke Gradle script” 
Task里面填写gradle命令，显示clean，再执行assembleRelease打包命令，  
路径配置：
  
	${workspace}/app
	${workspace}/app/build.gradle
![Invoke Gradle script][12]

配置完后，点击保存，就可以构建了

# 执行   

## 立即构建项目  
在左侧面板点击“立即构建”，下方显示构建进度
![][13]
## 查看构建结果   
### 点击构建进度，到项目构建页面 
![][14]
### 点击Console Output，查看构建日志 
![consult output][15]
### 到输入页面查看构建结果  
![输出apk][16]









[1]: http://blog.csdn.net/lsyz0021/article/details/72681988
[2]: http://ozlvdj7eg.bkt.clouddn.com/jekins-new-task.png
[3]: http://ozlvdj7eg.bkt.clouddn.com/project-name.png
[4]: http://ozlvdj7eg.bkt.clouddn.com/Fragment.png
[5]: http://ozlvdj7eg.bkt.clouddn.com/General.png
[6]: http://ozlvdj7eg.bkt.clouddn.com/Git-Gragment.png
[7]: http://ozlvdj7eg.bkt.clouddn.com/add-credentials.png
[8]: http://ozlvdj7eg.bkt.clouddn.com/git-repositories.png
[9]: http://ozlvdj7eg.bkt.clouddn.com/build-SCM.png
[10]: http://ozlvdj7eg.bkt.clouddn.com/Example-SCM.png
[11]: http://ozlvdj7eg.bkt.clouddn.com/goujian.png
[12]: http://ozlvdj7eg.bkt.clouddn.com/invoke-gradle-script.png
[13]: http://ozlvdj7eg.bkt.clouddn.com/goujian-build.png
[14]: http://ozlvdj7eg.bkt.clouddn.com/build-one.png
[15]: http://ozlvdj7eg.bkt.clouddn.com/console-output.png 
[16]: http://ozlvdj7eg.bkt.clouddn.com/release-result.png
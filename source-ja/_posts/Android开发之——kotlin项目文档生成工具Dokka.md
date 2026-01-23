---
title: Android开发之——kotlin项目文档生成工具Dokka
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Dokka
  - 文档
abbrlink: cceb0d1e
date: 2020-03-15 22:21:51
---
## 一 概述

我们知道使用Java代码书写的Android项目，可以直接用Android studio自带的JavaDoc生成工具自动生成(Tools—>Generate JavaDoc)，那么使用Kotlin语言书写的Android studio项目和使用Kotlin和java混合开发的android项目呢，可不可以使用JavaDoc生成工具自动生成说明文档？？？
<!--more-->

## 二 kotin项目文档生成工具Dokka

### 2.1 Android studio自带工具可以生成文档吗

* Android studio 自带的Generate JavaDoc可以生成纯Java项目和kotkin和Java混合项目中的Java代码部分
* 无法生成kotlin代码输入的项目文档

### 2.2 kotlin项目如何生成文档

* 这里可以使用GitHub上的一个文档生成工具[Dokka][11]
* Dokka不仅可以生成纯kotlin项目
* 还可以生成kotlin和Java混合开发的项目，并生成文档
* [Dokka][11]支持多种格式输出(html,javadoc,markdown..)

## 三 项目中Dokka的配置

* 在project的build.gradle中添加仓库和依赖

  ```
  buildscript {
     repositories {
         ......
          google()
          jcenter()
     }
     dependencies {
    	   ......
         classpath 'org.jetbrains.dokka:dokka-gradle-plugin:0.10.1'
     }
  }
  ```

* 在app的build.gradle中添加插件以及配置dokka参数(方式一和方式二任选其一)

  ```
  apply plugin: 'org.jetbrains.dokka'
  
  android {
    ......
    dokka {
        // 输出格式，目前支持五种，html, javadoc,html-as-java, markdown,kotlin-website* 
        outputFormat = 'javadoc' 
        // 文档输出目录(app/build/dokka)
        outputDirectory = "$buildDir/dokka" 
        //配置方式一
        configuration {
            noJdkLink = true
            noStdlibLink = true
            noAndroidSdkLink = true
            skipDeprecated = true // Do not output deprecated members
            reportUndocumented = true // Emit warnings about not documented members.
            skipEmptyPackages = true // Do not create index pages for empty packages
        }
        //配置方式二
               configuration {
              noJdkLink = true
              noStdlibLink = true
              noAndroidSdkLink = true
              externalDocumentationLink {
                  url = new URL("https://developer.android.google.cn/reference/")
                  packageListUrl = new URL("https://developer.android.google.cn/reference/package-list")
                  //packageListUrl = new URL("file:///${rootDir}/package-list")
              }
          }
    }
  }
  
  dependencies {
    ......
  }
  
  ```

* 按上图配置完成后，同步项目即可完成配置

## 四 如何使用Dokka生成文档

### 4.1 通过右侧Gradle窗口中Document中的dokka

* 打开右侧的`Gradle`窗口，然后通过`项目名 --> app --> Tasks --> documentation --> dokka`找到该任务，双击运行任务

### 4.2 在`terminal`窗口中输入`./gradlew dokka`运行任务

* 打开底部Terminal窗口，在窗口中输入`./gradlew dokka`执行任务

## 五 查看Dokka生成文档

* 依次打开：项目—>app—>build—>dokka(build.gradle中配置生成文件夹)—>右键使用浏览器打开`index.html`

## 六 参考

* [Kotlin -- 文档生成工具Dokka][12]
* [Kotlin -- 一文详解Kotlin文档][13]

[11]:https://github.com/Kotlin/dokka
[12]:https://blog.csdn.net/qq_36518248/article/details/104212783?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
[13]:https://blog.csdn.net/qq_36518248/article/details/103847649

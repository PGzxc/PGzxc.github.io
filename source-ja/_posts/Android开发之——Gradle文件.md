---
title: Android开发之——Gradle文件
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - gradle
abbrlink: 5d93c695
date: 2017-11-17 21:15:14
---
## 一 概述

Android Studio是基于Gradle构建的，项目创建成功后，下面会有三个gradle文件；  

* gradle的位置
* gradle内容

<!--more-->

## 二 gradle的位置  

-   /settings.gradle
-   /build.gradle
-   /app/build.gradle

## 三 gradle内容

### 3.1 settings.gradle默认只有一行代码，即：
```
include ':app'
```

新创建的项目只有app一个子项目。如果在project里添加了子项目(Module)，按理需要在settings.gradle里添加相应子项目名称，如 

```
include ':app', ':newModule'
```

注：当你添加一个Module后，AS会自动在settings.gradle里配置好。

### 3.2 根目录的build默认有三个节点：buildscript，allprojects和task clean

```
buildscript{
  repositories{
		google()
    jcenter()
	}
  dependencies{
     classpath 'com.android.tools.build:gradle:3.0.0'
    //NOTE：Do not place your application dependencies here:they belong
    //in the individual module build.gradle files
	} 
}
allprojects{
    repositories{
	    google()
		  jcenter()
		}
	}
task clean(type:Delete){
      delete rootProject.buildDir
	}
```


- buildscript下的第一个子"节点"是声明仓库源，默认是jcenter，之前版本则是mavenCentral，也可以两个center共存。jcenter可以理解成是一个新的中央远程仓库，兼容maven中央仓库，而且性能更优。第二个子"节点"是声明Android gradle plugin的版本，Android Studio3.0版默认是gradle3.0.0   
- allprojects下是声明了所有project默认的仓库源；
- task clean声明了一个任务，任务名叫clean(也可以改为其他)，任务类型是Delete(也可以是Copy)，就是每当修改settings.gradle文件后点击同步，就会删除rootProject.buildDir下的文件(实际上我看到的效果是清除了External Libraries里的包，然后又添加了一次)。 

### 3.3 app/build.gradle就是默认android子项目的gradle文件了，也是三个小节点：apply，android和dependencies;

```
apply plugin: 'com.android.application'

android{

   compileSdkVersion 26
	 defaultConfig{
	 applicationId "com.example"
	 minSdkVersion 15
	 targetSdkVersion 26
	 versionCode 1
	 versionName "1.0"
	 testInstrumentationRunner "android.support.test.AndroidJUnitRunner"				
	 }

  buildType{
      release{
		minifyEnabled true
		proguardFiles getDefaultProguardFile('proguard-android.txt'),'proguard-rules.pro'
		}
       debug{
		 minifyEnabled true
		}
	}
}
dependencies{
 implementation fileTree(include:['*.jar'],dir:'libs')
 implementation 'com.android.support:appcompat-v7:26.1.0'
 implementation 'com.android.support.constraint:constraint-layout:1.0.2'
 testImplementation 'junit:junit:4.12'
 androidTestImplementation 'com.android.support.test:runner:1.0.1' 
 androidTestImplementation 'com.android.support.test.espresso:espress-core:3.0.1'			
}  
```

- apply节点：apply plugin:'com.android.application'  以上语句中的apply是一个方法，给它传递了一个参数plugin，plugin的值是'com.android.application'。如果有多个参数，则以逗号隔开 
- android节点：前面部分很好理解，从字面意思就能了解。buildTypes默认是release(也可以添加debug)，minifyEnable表示十分需要混淆；proguardFiles表示混淆配置文件的名称；productFlavors表示多渠道包；
- dependencies节点 ：implementation开头的表示向项目中添加引用包
---
title: Windows应用之——软件环境变量及配置
categories:
  - 系统
  - Windows
tags:
  - 软件环境配置
abbrlink: e939ac0e
date: 2018-10-20 13:37:13
---

# 前言

作为软件开发人员，你可能会有这样的烦恼，换新电脑或安装系统后，需要重新安装软件配置环境变量，这个过程是十分枯燥的。为此，本文收集了软件开发中常用软件的环境变量配置，相信会帮你省去不少时间。      


本文所记录的软件是开发中经常使用并加以整理的，可能时间仓促，如有遗漏，欢迎留言，本文将会记录更新；

<!--more-->


# 软件
## 清单 
1. Java
2. Android
3. Tomcat
4. cmder
5. maven
6. mongodb
7. MinGW
8. Kotlin 
9. mysql 
10. Python
11. Perl
12. Go
13. Cmake
14. Node
15. Git
16. vscode
17. Putty




## 配置
### Java
####  变量

	JAVA_HOME  D:\SoftWare\Java\jdk1.8.0_191    
	CLASSPATH  .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

####  Path	

	%JAVA_HOME%\bin;  
	%JAVA_HOME%\jre\bin;

-------
###  Android
#### 变量
	ANDROID_HOME 	D:\SoftWare\SDK  
	ANDROID_SDK_ROOT  D:\SoftWare\SDK 
#### Path	
	%ANDROID_HOME%;  
	%ANDROID_HOME%\platform-tools;	 
	%ANDROID_HOME%\tools;
	%ANDROID_HOME%\tools\bin

------
###  Tomcat  
#### 变量
	CATALINA_BASE	D:\SoftWare\apache-tomcat-8.5.32     
	CATALINA_HOME   D:\SoftWare\apache-tomcat-8.5.32
#### Path
	%CATALINA_HOME%\lib;   
	%CATALINA_HOME%\bin;

------
### cmder
#### 变量
	CMDER_HOME D:\SoftWare\cmder
#### Path
	%CMDER_HOME%;

------
### maven
#### 变量
	MAVEN_HOME  D:\SoftWare\apache-maven-3.5.4
#### Path
	%MAVEN_HOME%\bin;

------
### mongodb
#### 变量
	MONGO_HOME  D:\SoftWare\MongoDB
#### Path
	%MONGO_HOME%\bin;

------
### MinGW
#### 变量
	MinGW D:\SoftWare\Dev-Cpp\MinGW64
#### Path
	%MinGW%\bin;

------
### Kotlin 
#### 变量
	Kotlin_HOME D:\SoftWare\kotlinc
#### Path  
	%Kotlin_HOME%\bin;

------
### mysql 
#### 变量
	MYSQL_HOME C:\Program Files\MySQL

#### Path
	%MYSQL_HOME%\MySQL Utilities 1.6\;  
	%MYSQL_HOME%\MySQL Server 5.7\bin;

------

### Python
#### 变量
	Python_Home  D:\SoftWare\Python\3.6.5
#### Path
	%Python_Home%\Scripts\;    
	%Python_Home%; 

------

### Perl
#### 变量
	Perl_HOME C:\Perl64\bin
#### Path
	%Perl_HOME%\bin;   

------

### Go
#### 变量
	GO_HOME D:\SoftWare\Go;	
#### Path
	%GO_HOME%\bin;

------
### Cmake
#### 变量
	Cmake_HOME  D:\SoftWare\cmake
#### Path
	%Cmake_HOME%\bin;

------
### Node
#### 变量
	NODE_HOME  D:\SoftWare\Node
#### Path
	%NODE_HOME%
	%NODE_HOME%\node_global;

------
### Git
#### 变量
	GIT_HOME C:\Program Files\Git
#### Path
	%GIT_HOM%\cmd;

------
### vscode
#### 变量
	VS_HOME D:\SoftWare\VsCode\Microsoft VS Code
#### Path
	%VS_HOME%\bin;

------
### Putty
#### 变量
	Putty_Home D:\SoftWare\Putty
#### Path
	%Putty_Home%;
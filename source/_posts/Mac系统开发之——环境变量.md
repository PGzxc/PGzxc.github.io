---
title: Mac系统开发之——环境变量
categories:
  - 系统
  - Mac
tags:
  - 环境变量
abbrlink: 3d2b28b0
date: 2024-07-19 15:00:52
---
## 一 概述

* 配置文件
* 环境变量
* 环境变量bash_profile迁移到zsh

<!--more-->

## 二 配置文件

### 2.1 全局配置

|   配置文件    |       描述        |
| :-----------: | :---------------: |
| /etc/profile  |     系统级别      |
|  /etc/paths   |     系统级别      |
|  /etc/bashrc  | 基于bash（shell） |
| /etc/zprofile | 基于zsh（shell）  |
|  /etc/zshrc   |   基于（shell）   |

### 2.2 用户配置

|    配置文件    |       描述        |
| :------------: | :---------------: |
| ~/bash_profile | 基于bash（shell） |
| ~/etc/zprofile | 基于zsh（shell）  |
|  ~/etc/zshrc   |   基于（shell）   |

注解：

* 全局文件比用户配置文件优先级高！！
* 注意查看使用的shell类型 zsh？bash？ 到对应的配置文件去配置

## 二 环境变量

```
# java
#JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home
#JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home
#JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-18.0.1.jdk/Contents/Home
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-22.0.1+8/Contents/Home
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME

# android
export ANDROID_HOME=/Users/zxc/Library/Android/sdk
export ANDROID_SDK_ROOT=/Users/zxc/Library/Android/sdk  
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

#gradle
GRADLE_HOME=/Users/zxc/.gradle/wrapper/dists/gradle-8.7-bin/bhs2wmbdwecv87pi65oeuq5iu/gradle-8.7
export PATH=${PATH}:${GRADLE_HOME}/bin

#firebase
#firebase=/Users/zxc/Library/firebase
#export PATH=${PATH}:$firebase


#mysql
#Mysql_Home=/usr/local/mysql
Mysql_Home=/usr/local/mysql-8.0.28-macos11-x86_64
export PATH=$Mysql_Home/bin:$PATH
export PATH=$Mysql_Home/support-files:$PATH

#mongodb
#MongoDB=/usr/local/mongodb-macos-x86_64-4.2.3
#export PATH=$MongoDB/bin:$PATH

#tomcat
Tomcat=/usr/local/apache-tomcat-8.5.50
export PATH=$Tomcat/bin:$PATH

#Flutter
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

Flutter=/Users/zxc/Library/flutter/flutter-3.22.2
export PATH=$Flutter/bin:$PATH

#Homebrew自动更新-关闭
export HOMEBREW_NO_AUTO_UPDATE=true

export PATH="/usr/local/opt/ruby/bin:$PATH"
export HOMEBREW_PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple #ckbrew
export HOMEBREW_API_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api  #ckbrew
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles #ckbrew
eval $(/usr/local/Homebrew/bin/brew shellenv) #ckbrew
```

## 三 环境变量bash_profile迁移到zsh

### 3.1 提示zsh升级

```
The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
```

### 3.2  查看环境变量使用到是哪个

```
zxc@MacBook-Pro-zxc ~ % echo $SHELL
/bin/zsh
```

说明：终端输出是/bin/zsh，说明使用的是zsh

### 3.3 解决方案

.zshrc文件加中添加source ~/.bash_profile

```
# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"
source ~/.bash_profile
```

## 四 切换回bash

### 4.1 显示存在的bash

```
cat /etc/shells
```

查看可用shell

```
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
```

### 4.2 切换回bash

```
chsh -s /bin/bash
```


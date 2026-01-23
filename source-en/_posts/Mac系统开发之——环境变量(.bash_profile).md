---
title: Mac系统开发之——环境变量(.bash_profile)
categories:
  - 系统
  - Mac
tags:
  - 环境变量
abbrlink: 9b95a143
date: 2019-09-15 22:11:55
---
## 一 前言

进行开发之前，需要先进行环境变量的配置。Windows环境下，通过path添加并配置环境变量，那么Mac系统下的环境变量配置文件是.bash_profile 。  

<!--more-->

## 二 新建或更新.bash_profile配置文件(终端)

* 打开terminal(终端)
* cd ~ (进入当前用户的home目录)
* open  .bash_profile (打开.bash_profile文件)
* 如果打开文件失败，说明文件不存在，创建文件(touch .bash_profile)
	![][1]

## 三 查看或编辑.bash_profile配置文件(Finder)

* 依次打开：硬盘—>用户—>显示隐藏文件(shift+command+.)—>.bash_profile文件 
	![][2]
	
## 四 配置.bash_profile文件(以java为例)

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH
```

![][3]

## 五 刷新配置，使之生效

* 在terminal(终端)中输入source .bash_profile
* 检查配置文件是否生效(如：Java -version)
  ![][4]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-bash-profile-terminal.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-bash-profile-finder.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-bash-profile-java-config.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-bash-profile-source.png
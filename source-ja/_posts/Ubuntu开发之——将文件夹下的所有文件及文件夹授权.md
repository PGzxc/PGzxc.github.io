---
title: Ubuntu开发之——将文件夹下的所有文件及文件夹授权
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: 43067d85
date: 2021-01-19 16:01:21
---
## 一 概述

Ubuntu下的文件有时是私有的，访问时会被受限，此时，需要更改文件相应的权限(授权filename读写权限)

```
sudo chmod 777 filename
```

<!--more-->

## 二 常用的方法

### 2.1 常用授权方法

```
sudo chmod 600 ××× （只有所有者有读和写的权限）
sudo chmod 644 ××× （所有者有读和写的权限，组用户只有读的权限）
sudo chmod 666 ××× （每个人都有读和写的权限）
sudo chmod 700 ××× （只有所有者有读和写以及执行的权限）
sudo chmod 777 ××× （每个人都有读和写以及执行的权限）
```

其中×××指文件名（也可以是文件夹名，不过要在chmod后加-ld）

### 2.2 授权说明

整个命令的形式是

```
sudo chmod -（-cfvR-代表类型）×××（所有者）×××（组用户）×××（其他用户）
```

#### 2.2.1 授权类型

* -c : 若该档案权限确实已经更改，才显示其更改动作 
* -f : 若该档案权限无法被更改也不要显示错误讯息 
* -v : 显示权限变更的详细资料
* -R : 对目前目录下的所有档案与子目录进行相同的权限变更(即以递回的方式逐个变更)
#### 2.2.2 授权权限

三位数的每一位都表示一个用户类型的权限设置。取值是0～7，即二进制的[000]~[111]

这个三位的二进制数的每一位分别表示读、写、执行权限

* 0 [000] 无任何权限
* 4 [100] 只读权限
* 6 [110] 读写权限
* 7 [111] 读写执行权限

## 三 实例

### 3.1 授权前文件

![][1]

### 3.2 授权过程

#### 3.2.1 使用`-R `

操作指令

```
sudo chmod -R 777 name
```

![][2]

#### 3.2.2 使用`*`

操作指令

```
sudo chmod 777 name name/*
```

![][3]
## 四 参考
[ubuntu中如何将一个文件夹里面的所有文件夹和文件添加777权限][11]
[Ubuntu修改文件夹下面所有文件权限的方法][12]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-authorize-folder-operate-before.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-authorize-r-operate.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-anth-xing-opera.gif

[11]:https://zhidao.baidu.com/question/616700383589139052.html
[12]:https://blog.csdn.net/woshilaoli_csdn/article/details/109093102
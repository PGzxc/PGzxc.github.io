---
title: Ubuntu开发之——解压rar文件
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: 9b093d57
date: 2021-01-19 15:57:10
---
## 一 应用场景

* Windows下压缩的文件(rar格式)传递到Ubuntu加压
* 从网站下载的rar文件
* 但是一般会显示unrar命令不存在

<!--more-->

## 二 安装解压软件

### 2.1 更新资源

如果好久没有更新资源建议update一次

```
sudo  apt-get  update  
```

### 2.2 安装解压软件

安装`rar`命令

```
sudo apt-get install  rar
```

安装`unrar`

```
sudo apt-get install unrar
```

安装`p7zip-rar`

```
sudo apt-get install p7zip-rar
```

安装`p7zip`

```
sudo apt-get install  p7zip*
```

## 三 解压文件

在当前文件夹下，打开终端
![][1]

执行如下指令，解压`rar`文件

```
sudo unrar x name.rar
sudo unrar e name.rar
```
![][2]
说明：

* x参数是解压到一个文件夹内
* e参数是把里面的文件都解压到当前路径下




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-rar-open-terminal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-rar-unzip-x-commond.png
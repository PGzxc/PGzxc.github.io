---
title: Mac系统开发之——Mac常用命令行操作
categories:
  - 系统
  - Mac
tags:
  - 命令行
abbrlink: af719a84
date: 2019-08-26 23:38:52
---
## 一 前言

Windows系统的cmd，Mac，Linux系统的Terminal都是命令行操作的工具，使用命令行可以完成鼠标相同的操作，本文将讲述Mac系统下常用的命令行操作指令(Windows，Linux系统操作类似)

<!--more-->

## 二 常用命令行操作

* 说明：在桌面新建文件夹exercise，所有本次新建的文本，文件夹都在此文件夹下

### 2.1 cd 进入某个目录

* 打开Terminal显示的是根目录，输入cd ~时，显示的内容相同
	 ![][1]
* 进入都指定目录(如桌面：cd Desktop/，输入cd Desk 后按Tab键)
	![][2]
* 返回上一级目录(cd ..)
	![][3]
* 返回上上级目录(cd ../../)
	![][4]

### 2.2 ls查看目录下的文件

* ls(list的缩写)查看某个文件夹下有什么文件
	![][5]
* ls -l 以列表的形式把所有内容列出来
	![][6]
* ls -a 可以查看隐藏文件
	![][7]
* ls -la 以列表形式将隐藏文件和正常文件以列表展示出来
	![][8]
	
### 2.3 touch新建文件(以桌面上的exercise文件夹为例)

* 一次新建一个文件(touch a.md)
	![][9]
* 一次新建多个文件(touch b.md c.md d.md)
  ![][10]
### 2.4 mkdir 新建文件夹

* 一次新建一个文件夹
	![][11]
* 一次新建多个文件夹
	![][12]
* 新建 多个层级的目录，加上参数 -p
    ![][13]

  ### 2.5 cp(copy缩写) 复制文件和文件夹
  
  * 将一个文件复制为另一个文件(a.md—>e.md)
  - 同一个文件夹下：copy a.md b.md
  - 不同文件夹下操作：cp ~/Desktop/exercise/a.md ~/Desktop/b.md
  - 保留文件属性(权限)：cp -a a.md b.md 
	
    [][14]

* 文件夹复制
 - 文件夹复制，加上递归参数-r:cp -r a b
 - 文件夹复制并保留权限属性，加上参数 -a: cp -a a b
 - 复制文件夹内容时，显示实时进度，加上参数 -rv: cp -rv a b
	![][15]

### 2.6 mv 移动，剪切，重命名文件

* 将一个文件重命名为另一个文件：mv a.md b.md
	 ![][16]
### 2.7 rm 删除文件或文件夹
* 删除某个文件：rm a.md 
* 删除某个文件夹: rm -rf a 
    ![][17]
### 2.8 less 查看文件内容(less a.md)
![][18]
### 2.9 pwd查看当前所在目录
![][19]
### 2.10 man 查看某个命令的详情(man ls)
![][20]
## 三 其他

* 参考:[linux\mac 日常入门命令行使用——文件以及文件夹操作][21]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cd-root.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cd-desktop.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cd-preview.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cd-pre-pre.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-ls.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-ls-l.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-ls-a.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-ls-la.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-touch-a-file.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-touch-more-file.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-mkdir-a-dir.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-mkdir-more-dir.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-mkdir-more-dir-p.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cp-a-2-b.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-cp-dir.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-mv-2-other.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-rm.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-less.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-pwd.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-shell-man-ls.png
[21]: https://blog.csdn.net/fungleo/article/details/78488656

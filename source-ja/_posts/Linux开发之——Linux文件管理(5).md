---
title: Linux开发之——Linux文件管理(5)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: db2967fc
date: 2024-10-20 09:09:58
---
## 一 概述

* touch命令
* vi/vim编辑器
* 文件查看
* vim
* echo命令
* awk命令
* 软连接(快捷访问)
* find命令

<!--more-->

## 二  内容

### 2.1 touch命令

* touch a.txt 创建a.txt文件
* touch a{1..10}.txt 批量创建空文件
* state a.txt 查看文件属性

### 2.2 vi/vim编辑器

* vim 文件名 打开文件
* i 进入编辑模式
* wq! 强制保存退出

### 2.3 文件查看

* cat small.txt 查看a.txt的内容
* less big.txt 查看b.txt的内容
* tail big.txt 默认显示
* 与tail相反
* grep 关键字 small.txt //包含关键字的行展示

### 2.4 vim

* rm -r -f .small.txt.swp

### 2.5 echo命令

* echo "Hello world"
* echo "aaa" > smal.txt
* echo "bbb" >> small.txt
* cat a.txt &>> small.txt

### 2.6 awk命令awk命令

* cat a.txt | awk '/zhang|li/' 搜索含有zhang和li的学生
* cat a.txt || awk -F ' ' '{print $1,$2,$3,$4}' 用空格切换，并打印四段内容
* cat a.txt | awk -F ' ' '{OFS="==="}{print $1,$2,$3,$4}' 切割符号为===
* cat a.txt | awk -F ' ' '{print toupper($1)}' //转大小写
* cat a.txt | awk -F ' ' 'BEGIN{}{total=total+$4}END{print total} //计算成绩

### 2.7 软连接(快捷访问)

* ls -s aaa/bbb/ccc/ddd/eee/a.txt a.txt

### 2.8 find命令

* find . -name "*.txt" //当前目录下查找所有txt文件
* find . -ctime -1 //一天内操作过的文件
* find / -name "*.txt" //查找根目录下的txt文件


## 三 思维导图

![linux-xmind-5][1]



[1]:images-5/linux-xmind-5.png# Linux开发之——Linux文件管理(5)

## 一 概述

* touch命令
* vi/vim编辑器
* 文件查看
* vim
* echo命令
* awk命令
* 软连接(快捷访问)
* find命令

<!--more-->

## 二  内容

### 2.1 touch命令

* touch a.txt 创建a.txt文件
* touch a{1..10}.txt 批量创建空文件
* state a.txt 查看文件属性

### 2.2 vi/vim编辑器

* vim 文件名 打开文件
* i 进入编辑模式
* wq! 强制保存退出

### 2.3 文件查看

* cat small.txt 查看a.txt的内容
* less big.txt 查看b.txt的内容
* tail big.txt 默认显示
* 与tail相反
* grep 关键字 small.txt //包含关键字的行展示

### 2.4 vim

* rm -r -f .small.txt.swp

### 2.5 echo命令

* echo "Hello world"
* echo "aaa" > smal.txt
* echo "bbb" >> small.txt
* cat a.txt &>> small.txt

### 2.6 awk命令awk命令

* cat a.txt | awk '/zhang|li/' 搜索含有zhang和li的学生
* cat a.txt || awk -F ' ' '{print $1,$2,$3,$4}' 用空格切换，并打印四段内容
* cat a.txt | awk -F ' ' '{OFS="==="}{print $1,$2,$3,$4}' 切割符号为===
* cat a.txt | awk -F ' ' '{print toupper($1)}' //转大小写
* cat a.txt | awk -F ' ' 'BEGIN{}{total=total+$4}END{print total} //计算成绩

### 2.7 软连接(快捷访问)

* ls -s aaa/bbb/ccc/ddd/eee/a.txt a.txt

### 2.8 find命令

* find . -name "*.txt" //当前目录下查找所有txt文件
* find . -ctime -1 //一天内操作过的文件
* find / -name "*.txt" //查找根目录下的txt文件


## 三 思维导图

![linux-xmind-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-5.png
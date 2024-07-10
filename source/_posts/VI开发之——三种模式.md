---
title: VI开发之——三种模式
categories:
  - 工具
  - VI
tags:
  - VI模式
abbrlink: ed14c809
date: 2018-02-25 18:02:31
---
# VI三种模式
VI有三种基本的工作模式：  

- 指令模式
- 文本输入模式
- 行末模式

他们的相互关系如下：  

- 指令模式(Command Mode)输入a,i,o进入文本输入模式(Input Mode)。
- 文本输入模式(Input Mode)下按ESC进入指令模式(Command Mode)  
- 指令模式(Command Mode)下输入":"进入行末模式(Last Line Mode) 
- 行末模式(Last Line Mode)下指令错误返回指令模式(Command Mode)  

<!--more-->  
# 文件操作实例
## 创建文件
![][0]
## 添加内容并保存
![][1]
## 返回并查看文件内容
![][2]
# 三种模式

## 指令模式(Command Mode）

指令模式主要使用方向键移动光标位置进行文字的编辑，下面列出了常用的操作命令及含义。  

- 0  －－－－－光标移动至行首
- h  －－－－－光标左移一格
- l  －－－－－光标右移一格
- j  －－－－－光标下移一行
- k  －－－－－光标上移一行
- $+A－－－－－将光标移动到该行最后
- PageDn －－－－－ 向下移动一页
- PageUp －－－－－ 向上移动一页
- d+方向键 －－－－－删除文字
- dd －－－－－删除整行
- pp －－－－－整行复制
- r  －－－－－修改光标所在的字符
- S  －－－－－删除光标所在的列，并进入输入模式

![][3]
## 文本输入模式（Input Mode）
在指令模式下（Command Mode）按a／A键、i/I键、o／O键进入文本模式，文本输入模式的命令及其含义如下所示。  

- a －－－－－在光标后开始插入
- A －－－－－在行尾开始插入
- i －－－－－从光标所在位置前面开始插入
- I －－－－－从光标所在列的第一个非空白字元前面开始插入
- o －－－－－在光标所在列下新增一列并进入输入模式
- O －－－－－在光标所在列上方新增一列并进入输入模式
- ESC －－－－－返回命令行模式

![][4]
## 末行模式（Last line Mode）
末行模式主要进行一些文字编辑辅助功能，比如字串搜索、替代、保存文件等操作。主要命令如下  

- ：q －－－－－结束Vi程序，如果文件有过修改，先保存文件
- ：q！ －－－－－强制退出Vi程序
- ：wq  －－－－－保存修改并退出程序
- ：set nu －－－－－设置行号

![][6]


[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-touch-file.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-file-save.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-file-read.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-order-mode.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-add-mode.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-see-mode.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vi-hangmo-mode.png
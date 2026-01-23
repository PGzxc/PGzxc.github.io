---
title: Java开发之——程序员计算器
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - 计算器
abbrlink: 6d67c1ca
date: 2019-09-19 22:02:04
---
## 一 前言
在Windows中，Win+R快捷键，打开的输入框中输入"calc"可以快速打开计算机。在菜单栏中->查看->程序员，打开程序员计算器。下面我们讲述程序员计算机的功能及如何使用。  

![][1]

<!--more-->

## 二 计算器上的CE、C的用法

### 2.1 按钮介绍
* CE:归零(清除现有寄存器中的值并显示零)，数据重新输入
* C：清除(清除刚才的输入)

### 2.2 操作演示
![CE AND C][2]

## 三 计算器上的MR、MC、MS和M+/M-的用法

### 3.1 按钮介绍
* MR键叫做memory read，中文名字 读取存储
* MC键叫做memory clear，中文 清除存储
* MS键叫做memory save，中文 存入存储
* M+：在存储内加上
* M-：在存储内减去

### 3.2 操作演示
#### 3.2.1 MS操作
##### 3.2.1.1 MS说明
* 比如键入数字3后再按下MS，就代表将3存入了，这时屏幕的左侧会出现M标志，代表存储内有数据存储。

##### 3.2.1.2 MS操作演示
![][3]

#### 3.2.2 MR操作
##### 3.2.2.1 MR说明
* 上步中，按CE或C清零后，按MR，数字又显示到屏幕上

##### 3.2.2.2 MS操作演示
![][4]

#### 3.2.3 MC操作
##### 3.2.3.1 MC说明
* 上步中，按MC后，屏幕左侧的M标志会消失，按CE或C清零，再按MR，数字不会再出现

##### 3.2.3.2 MC操作演示
![][5]

#### 3.2.4 M+操作
##### 3.2.4.1 M+说明
* 果依次按下2、M+，意味着存储内加上2

#### 3.2.5 M-操作
##### 3.2.5.1 M-说明
* 果依次按下2、M-，意味着存储内减去2


## 四 计算器上的字节、字、双字、四字
### 4.1 字节
* 八位二进制数

### 4.2 字
* 十六位二进制数

### 4.3 双字
* 32位二进制数

### 4.4 四字
* 64位二进制数


## 五 计算器上的进制(二进制、八进制、十进制、十六进制)
![][6]
### 5.1 二进制
* 只有0和1
* 前缀0b

### 5.2 八进制
* 八进制数从0到7
* 前缀为0(java中表示)

### 5.3 十进制
* 数字从0-9
* 没有任何前缀

#### 5.4 十六进制
* 数字从0-F
* 前缀0x或0X(x大小写不区分)

## 六 操作符
![][7]
### 操作符说明
* And：逻辑与；同真为真
* Or：逻辑或；有真为真
* Not：逻辑非；取反
* Xor：逻辑异或；同假异真
* Lsh：全称是Left Shift；左移操作
* Rsh：全称是Right Shift；右移操作
* RoL：全称是Rotate Left
* RoR：全称是Rotate Right

## 参考
* [计算器上的MR、MC、MS和M+/M-的用法][20]
* [在java中如何表示二进制,八进制,十六进制的数字][21]
* [程序员计算器][22]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-program.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-ce-c.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-ms.gif
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-mr.gif
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-mc.gif
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-binary.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-calc-operator.png


[20]: https://jingyan.baidu.com/article/b87fe19e72f7b35219356851.html
[21]: https://jingyan.baidu.com/article/17bd8e527d045185ab2bb831.html
[22]: https://blog.csdn.net/komtao520/article/details/86546609


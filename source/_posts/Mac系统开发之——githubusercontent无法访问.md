---
title: Mac系统开发之——githubusercontent无法访问
categories:
  - 系统
  - Mac
tags:
  - githubu
abbrlink: aed0a57d
date: 2023-07-13 22:45:11
---
## 一 错误现象

```
ConnectionError: Couldn’t reach https://raw.githubusercontent.com
```

<!--more-->

## 二 查看raw.githubusercontent.com对应ip

### 2.1 打开ipaddress网站

https://www.ipaddress.com

### 2.2 查看raw.githubusercontent对应ip

在输入框中输入`raw.githubusercontent.com`后，查看DNS解析

```
raw  IN  A  185.199.108.133
raw  IN  A  185.199.109.133
raw  IN  A  185.199.110.133
raw  IN  A  185.199.111.133
```

##  三 修改hosts文件解析

### 3.1 终端打开hosts文件

```
sudo vi /etc/hosts
```

### 3.2 修改hosts中raw.githubusercontent.com对应解析

```
185.199.108.133 raw.githubusercontent.com www.github.com
```

修改过程：

* 按下`i`键，进入编辑模式，开始编辑上述文本
* 编辑完成后，按下`Esc`键，退出编辑模式
* 退出编辑模式后，输入`:wq`，保存文件并退出
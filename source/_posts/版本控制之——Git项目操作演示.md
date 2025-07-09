---
title: 版本控制之——Git项目操作演示
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - Git
abbrlink: b89f8ae7
date: 2023-11-21 09:14:30
---
## 一 概述

* 确认用户名、密码、邮箱等用户信息
* 配置SSH密钥
* 配置token令牌
* 远程仓库操作

<!--more-->

## 二 确认用户名、密码、邮箱等用户信息

### 2.1 进入设置页面，获取用户名、密码和邮箱信息

![][1]

### 2.2 用户名、密码和邮箱信息用途

#### 认证方式1-用户名和邮箱(有的不支持用户名和密码认证，而是用token)

```
设置
git config --global user.name "pgzxc"
git config --global user.email "8342289xx@qq.com"
获取
git config --global --list
```

#### 认证方式2-用户名和密码

如果执行了如下操作，提交代码时可能出现输入用户名和密码的操作

```
git config --global credential.helper store
```

![][2]

#### 认证方式3-SSH Keys

1-SSH生成位置(公钥文件以 .pub 扩展名结尾)

```
C:\Users\用户名\.ssh
```

2-多个平台的pub文件可共存(如下图：Github和atom共存)

![][3]

## 三 配置SSH密钥

### 3.1 生成SSH KEY

```
1-atom中生成
ssh-keygen -t ed25519 -C "your_email@example.com"
2-github中生成
ssh-keygen -t rsa
```

|  执行  | 执行后 |
| :----: | :----: |
| ![][4] | ![][3] |

### 3.2 配置SSH KEY

| 添加SSH key | SSH key添加完成后 |
| :---------: | :---------------: |
|   ![][5]    |      ![][6]       |

### 3.3 验证SSH Key

```
1-atom中
ssh -t git@atomgit.com
2-github中
ssh -T git@github.com
```

## 四 配置token令牌

### 4.1 为何使用token

* 有的远程仓库(如：atom和github)不再支持用户名和密码形式验证
* 远程仓库明确指出需要token个人令牌验证方式
* 远程访问时，将密码替换成token

### 4.2 生成token

token位置

|  atom  | github |
| :----: | :----: |
| ![][7] | ![][8] |

说明：

* 生成token令牌只出现一次，需要复制并保存好令牌
* 如果忘记token令牌，需要重新生成token并保存

## 五 远程仓库操作

### 5.1 clone远程仓库

```
git clone xxxx
```

### 5.2 进入clone仓库

```
cd demo
```

### 5.3 git初始化

```
git init
```

说明：要执行此指令，否则执行下面的指令会出错

### 5.4 添加项目源文件

可能存在的问题：将别的仓库代码copy进来提交

```
“You've added another git repository inside your current repository."
```

执行如下指令：

```
git rm -r --cached .
```

执行完成后，添加文件

```
git add .
git commit -m "添加了文件"
```

### 5.5 将文件推送到远程仓库

```
git push origin master(本地分支)
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-user-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-login-confirm-alert.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-ssh-pub.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-ssh-key-make.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-ssh-key-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-ssh-key-add-finish.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-token-atom.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/git-cmd-token-github.png
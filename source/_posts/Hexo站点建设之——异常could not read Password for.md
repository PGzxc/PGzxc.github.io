---
title: Hexo站点建设之——异常could not read Password for
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo
  - 异常
abbrlink: f4ea6ed7
date: 2024-03-26 18:44:06
---
## 一 异常现象

![][1]

```
fatal: could not read Password for 'https://***@github.com': No such device or address
```

<!--more-->

## 二 原因分析—身份认证失败

```
1-Page(项目)/Secrets and variables下的Repository secrets—>Access_TOKEN

2-Settings/Developerer settings—>Github Apps—>Personal access tokens—>Tokens(class)—>github-access

3-1与2中内容不同所致
```

## 三 解决办法

### 3.1 设置Settings/Developerer token

3.1.1-添加token步骤

1. 登录Github，转到 Github Settings设置页面
2. 在左侧窗格中单击“开发人员设置”
3. 单击“个人访问令牌”（也可从https://github.com/settings/tokens获取）
4. 生成新令牌，选择“Repo”。复制令牌

3.1.2-保存生成的token(后面备用)

![][2]

###  3.2 Page(项目)/Secrets  token

3.2.1-添加Actions token

1. Page(项目)点击Settings
2. Settings页面下，点击左侧的Security/Secrets and variables/Actions
3. Repository secrets下，添加`New repository secret`

图示

![][3]

3.2.2-将步骤1中的access token填入

![][2]

### 3.3 验证效果
![][4]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/github-error-password-read.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/github-error-access-token-make.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/github-error-secrets-token-add.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/github-error-actions-success.png
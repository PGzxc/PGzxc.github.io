---
title: Hexo站点建设之——电脑重装系统后如何恢复Hexo博客
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo恢复
abbrlink: 3131a92e
date: 2018-12-22 20:51:01
---
## 一：安装Node.js，git，并查看当前软件环境
![][1]

<!--more-->
## 二：配置SSH key
### 查看C:\Users\用户名\.ssh下有无ssh文件夹，没有则创建 
	cd ~/. ssh
	ssh-keygen -t rsa -C "邮件地址"
![2][2]

### 打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

![][3]
### 测试是否成功

	ssh -T git@github.com

![][4]
### 用户名 邮箱配置

	git config --global user.name "pgzxc"// 你的github用户名，非昵称
	git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
![][5]

## 三：进入到博客(pgzxc)文件夹删除node_modules public .git  .deploy_git，
![][6]

## 四：关联Github项目
    git init
	git remote add origin git@github.com:PGzxc/PGzxc.github.io.git
![][7]

## 五：运行如下指令"npm install hexo --save"安装hexo
	npm install hexo --save

![][8]

## 六：运行如下指令安装项目依赖
	npm install  
![][9]
## 七：hexo -g 生成并本地预览
![][10]
## 八：hexo -s 本地预览，在浏览器中输入[http://localhost:4000/][11]
![][12]
## 九：hexo d 生成并上传
	hexo d
## 十：添加备份

	git add .
	git commit -m 'modify'
	git push origin hexo




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-retore-software-info.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-create-ssh.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-resote-add-ssh-key.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-ssh-test.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-git-username-email.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-bolg-folder-remove.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-git-init-remote.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-install-hexo.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-npm-install.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-npm-install.png
[11]: http://localhost:4000/
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-restore-hexo-s.png

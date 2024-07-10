---
title: Hexo站点建设之——Readme文件被覆盖
categories:
  - 站点
  - Hexo博客
tags:
  - 覆盖
abbrlink: 8b92bac4
date: 2017-11-13 15:43:35
---
### 问题
 使用hexo+github搭建个人博客后，使用hexo d 指令发布本地代码到github上的时候，遇到了一下问题，现总结如下：

-  github提示创建一个REAMME.md文件,在Github上按照规范创建好README.md文件，再次提交本地文件后发现README.md文件不见了，又出现了创建README.md文件的提示。说明每次提交过后，Github上的README.md文件都被覆盖了；
- 在本地source下新建README.md文件，并编写说明信息，提交到Github后，出现了乱码，本地的README.md文件被发布后变成了README.html格式	
<!--more-->
![][1]  

### 解决

经查找问题得到了解决:  
在项目根目录下的\_config.yml里添加skip_rende属性值"**skip_render: README.md**"

修改前![readme_修改前][2]
修改后![readme_修改后][3]
再次提交后![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/github_readme-messy.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/github_readme-modify-before.png 
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/github_readme-modify-after.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gtihub_blog_readme.png
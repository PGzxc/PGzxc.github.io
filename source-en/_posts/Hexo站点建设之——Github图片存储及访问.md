---
title: Hexo站点建设之——Github图片存储及访问
categories:
  - 站点
  - Hexo博客
tags:
  - Github图片
abbrlink: 1f1efbef
date: 2019-06-10 23:37:46
---

## 一 前言
上一篇博客介绍了七牛云图片批量下载   

本文介绍将七牛云下载的图片上传到Github图床以及如何在Markdown编辑器中设置图片的显示及预览效果。  

使用Picgo工具及CMD窗口完成图片的上传。  

<!--more-->


## 二 上传图片

### 2.1  使用Github桌面版
1.  下载并安装[Github桌面版][1]
	![github-desktop][2]

2. 新建本地仓库，并向仓库中添加需要上传的图片等资源  
	![github-local-file-add][3]
3. 点击commit和push后，可以在github上看到上传的图片资源了
	![][4]




###  2.2 CMD窗口上传 
1. 创建Github仓库
2. 在电脑上本地进行初始化
 - echo "# img" >> README.md
 - git init
3. 在本地添加需要上传的文件
 - git add
 - git commit -m "first commit"

4. 关联Gihub仓库
 - git remote add origin git@github.com:远程仓库
4. 提交本地文件
 - git push -u origin master
5. Github查看文件是否上传成功  

###  2.3 Picgo上传

1. [PicGo下载][5]地址并安装 
	![][6]


2. 新建Github OAuth access tokens  
	![][7]

3. 将生成的access token妥善保存 
	![][8]

4. 配置github上传配置文件
	![][9]
	
	- 设置仓库名：需要上传到的项目(示例：用户名/项目名)
	- 设定分支名:默认master分支
	- 设置Token：上几部生成的person access token 
	- 指定存储路径:需要上传的文件夹名字
	- 设置自定义域名:访问图片的域名前缀

	设置完成后，点击确定按钮，保存设置。  


5. 切换到上传位置，选择Github上传，选择需要上传的图片(上传图片有限制)
	![][10]

6. 上传完成后，切换到Github，查看上传的图片


## 三 查看上传图片的地址 

1. 在新窗口打开要查看的图片，在图片上右键，选择新标签中打开图片   
	![][11]
2. 新标签中浏览器中显示的地址，就是图片的真实地址  
	![][12]


## 四 如何在markdown编辑器中显示
按照Markdown的编写规则后，预览如下图  

![][13]




[1]: https://desktop.github.com/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-destop-file.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-local-files.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-desktop-push.png
[5]: https://github.com/Molunerfinn/PicGo/releases
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-picgo-download.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-new-person-access-token.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-access-token-save.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-picgo-setting.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-picgo-push.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-image-address-look.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-image-real-address.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-image-preview.png

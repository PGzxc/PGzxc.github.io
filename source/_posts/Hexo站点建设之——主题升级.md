---
title: Hexo站点建设之——主题升级
categories:
  - 站点
  - Hexo博客
tags:
  - 主题升级
abbrlink: 8b91c05f
date: 2019-06-13 23:28:10
---
##  一 为何要升级
1. 主仓库已从 iissnan 名下 迁移至 theme-next 组织
2. theme-next版本已经从5.1.4 升级到了7.1.1(可能包含一些新的功能)
3. 插件之间的依赖变弱 
4. 旧版本编译文件过多时编译时间变长

<!--more-->

## 二 主题升级

### 2.1 升级说明文档
![][1]


### 2.2 安装新主题库

	git clone https://github.com/theme-next/hexo-theme-next themes/next-v7.1.1

![][2]   

主题clone到本地后   
![theme-v7.1.1-clone][3]


### 2.3 将_config.yml下的theme替换为刚下载的主题  
![][4]
![][11]
### 2.4 配置_config.yml下的导航菜单
![][5]
### 2.5 配置_config.yml导航菜单数字统计
![][6]
### 2.6 配置_config.yml主题样式
![][7]
### 2.7 配置_config.yml社交账号
![][8]
### 2.8 配置_config.yml友情链接
![][9]
### 2.9 配置_config.yml头像
![][10]

注：   

* url：头像的存储位置
* rounded：true——圆形头像,false——默认形状
* opacity:头像的透明度(0-完全透明，1-完全不透明)
* rotated:鼠标放在头像上时是否旋转
### 2.10 配置_config.yml字数、阅读时长统计
### 2.10.1 使用hexo-wordcount字数统计

	post_wordcount:                                                
		item_text: true 
		wordcount: true
		min2read: true
		totalcount: true

#### 2.10.2 使用hexo-symbols-count-time统计
1. 安装依赖库文件

		npm install hexo-symbols-count-time --save  

	![][12]

2. 在主目录下的配置_config.yml  


		symbols_count_time:
			symbols: true
			time: true
			total_symbols: true
			total_time: true
			exclude_codeblock: false
3. 在主题目录下配置_config.yml  
		
		symbols_count_time:
			separated_meta: true
			item_text_post: true
			item_text_total: false
			awl: 4
			wpm: 275
			suffix: mins.
### 2.11 配置_config.yml打赏设置
![][13]

### 2.12 配置_config.yml高亮代码设置

	highlight_theme: normal

### 2.13 配置_config.yml评论

	livere_uid: xxxxxxxxx

#### 问题异常补充
	themes\next-v7.1.1\layout\_third-party\comments\livere.swig   

* 注意事项

	window.livereOptions = {
    	refer: 'pgzxc.github.io'+'{{ page.path }}'
	};

### 2.14 配置_config.yml leancloud.cn

	leancloud_visitors:
		#enable: false
		#app_id: #<app_id>
		#app_key: #<app_key>
		enable: true
		app_id: xoStNXjq2xNoDRjTltoOztdq-gzGzoHsz
		app_key: 6g89MPFNvTH2YHnKMAK1n1V8
### 2.14 配置_config.yml 搜索
	local_search:
		enable: true

### 2.15 配置_config.yml网站脚注
	local_search:
		enable: true
### 2.16 配置_config.yml版权声明
	creative_commons:
		license: by-nc-sa
		sidebar: true
		post: true
		language:
### 2.17 配置_config.yml代码块
	codeblock:                                                                                          
		border_radius: 2                                                                               
		copy_button:
			enable: true 
			show_result: true   
### 2.18 配置_config.yml访问次数
	busuanzi_count:
		enable: true
		total_visitors: true
		total_visitors_icon: user
		total_views: true
		total_views_icon: eye
		post_views: true
		post_views_icon: eye
### 2.19 配置_config.yml设置备案号 
![][14]

### 2.20 配置_config.yml note样式

	note:
		style: simple
		icons: false
		border_radius: 3
### 2.21 配置_config.yml umeng统计
	在\themes\next\layout\_third-party\analytics\cnzz-analytics.swig



	{% if theme.cnzz_siteid %}
	<div>
	<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1277625345'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1277625345%26online%3D1%26show%3Dline' type='text/javascript'%3E%3C/script%3E"));</script>
	</div>
	{% endif %}

### 2.22 配置网站图片背景

#### 2.22.1 位置
	修改themes\next-v7.1.1\source\css\_custom\custom.styl

#### 2.22.2 代码

	.site-meta { 
		background: url(/images/title-image.gif); //天空的颜色，和我的眼镜是绝配
		background-repeat: no-repeat;
		background-position:50% 50%;
		background-size: cover;
		-webkit-background-size: cover;
		-o-background-size: cover;
		-moz-background-size: cover;
		-ms-background-size: cover;	
	}

### 2.23 配置Title高度
#### 2.23.1 位置
 	themes\next-v7.1.1\source\css\_schemes\Pisces\_brand.styl
#### 2.23.2 代码
	.site-meta 
	{
		padding: 80px 0;
	}



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-theme-update-doc.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-theme-git-clone-v7.1.1.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-theme-v7.11-clone-done.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-config-theme-modify.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-menu-setting.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-menu-badges-setting.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-schemes-setting.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-social-setting.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-links-setting.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-avatar-setting.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-comment-zh-cn.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-npm-install-symbols-count-time.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-reward-setting.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-beian-open-setting.png

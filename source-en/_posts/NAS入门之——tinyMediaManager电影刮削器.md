---
title: NAS入门之——tinyMediaManager电影刮削器
categories:
  - 开发
  - J-NAS
  - 刮削器
tags:
  - 刮削器
abbrlink: 9d2cc17a
date: 2023-04-03 13:05:50
---
## 一 概述

* tinyMediaManager刮削器介绍
* 软件的下载
* tinyMediaManager的设置及使用
* tinyMediaManager重命名电影文件

<!--more-->

## 二 tinyMediaManager刮削器介绍

### 2.1 tinyMediaManager介绍

tinyMediaManager是用Java / Swing编写的媒体管理工具，能够为Kodi、jellyfin、emby、Plex媒体服务器提供元数据。tinyMediaManager的原理是根据文件的标题到电影资料网站上匹配电影信息，下载电影的资料及图片到本地上，供Kodi、jellyfin、emby、plex等多媒体软件使用。
![][1]

### 2.2 PT下载电影为例

我们PT下载到的电影通常信息比较齐全，除了电影文件还经常有海报图片、nfo电影信息文件，如下图：
![][2]
Kodi在刮削扫描过程中会搜索并首先使用NFO文件。如果找不到NFO文件，则使用在线资源下载信息。

tinyMediaManager可以扫描你的影视文件匹配电影信息，生成nfo文件

## 三 软件的下载

### 3.1 软件下载地址

* [tinMediaManager官网下载地址](https://www.tinymediamanager.org/download/)
* [tinMediaManager—历史版本](https://archive.tinymediamanager.org/)

### 3.2 软件版本选择

建议下载version 3.x系列，version 4.x免费版只能管理50部

### 3.3 软件安装

Windows系统下载最新版本的tmm_*.*_win.zip，解压后运行tinyMediaManager.exe，按照提示一直下一步即可(需要Java环境，会自动弹出安装）

## 四 tinyMediaManager的设置及使用

### 4.1 设置电影数据源

1-添加电影数据源

![][3]

推荐选择刮削源为“themoviedb.org”（有片名、介绍的中文翻译）

```
近期themoviedb服务器经常无法连接，修改域名解析可解决。

找到电脑C:\Windows\System32\drivers\etc\hosts文件，添加：

52.222.158.31 image.tmdb.org
52.222.174.75 api.tmdb.org
```

2-首选语言“中文”

![][4]

剧集也是类似操作。

3-命名规范

tinyMediaManager根据你下载的影视文件名匹配影视数据库网站上的电影条目，如果命名更规范更容易匹配成功。

电影命名

```
复仇者联盟.The.Avengers.2012.mp4。

一部电影有多个文件的话：
The.Avengers.2012-cd1.avi
The.Avengers.2012-cd2.avi
刮削的时候就只生成一个nfo文件。
```

剧集命名

```
Game of Thrones
-Season 1
--S01E01.mp4
--S01E02.mp4
```

### 4.2 tinyMediaManager管理面板

打开tinyMediaManager管理面板，上方是管理菜单，左侧是视频文件库，右侧是匹配到的电影资料信息。
![][5]

#### 电影
![][6]

1-媒体库目录：可添加删除媒体库目录，排除文件夹，过滤文件名中的文字提高搜索效率
![][7]

2-刮削器选项：勾选电影的信息选项、自动刮削图片

默认下载海报和同人画，可根据自己需要选择。对于Kodi而言，海报墙展示界面仅需要海报(post)、同人画（fanart）,剧集的话还要横幅图（banner）、季的海报(post)、集的缩略图(thumb)，再加个nfo文件就足够了。光碟封面、LOGO、缩图等供jellyfin、emby、Plex使用。

![][8]

如果需要下载海报等图片的话，最好每个电影建一个文件夹，避免文件混乱

3-NFO设置：NFO文件名选<电影文件名>.nfo， movie.nfo在Kodi下是不识别的
![][9]

4-图片、剧照档案名——命名方式选<电影文件名>-类型，如下图：
![][10]

也可以把多种命名都勾选上，方便多个播放器媒体软件调用

#### 搜寻刮削

1-搜寻刮削

上方菜单点“搜寻刮削”-“搜索并刮削所有未刮削过的电影-自动匹配”，开始刮削电影信息，速度较慢，右下方状态栏有进度显示，耐心等待一会。

也可单选、多选，右键进行更多操作

![][11]

2-匹配不到，重命名搜索

有匹配不到的会弹窗提醒，输入电影名称（英文中文都可以，推荐英文名）或者IMDb ID（豆瓣可查，例如：tt0061809)，点搜索。

从左侧选中正确的电影条目，然后点右下角“确定”按钮。
![][12]

如果刮削匹配到错误的电影，可右键点击“搜寻并刮削已选电影”，重新搜索，手动选择正确的电影条目。
如果刮削到的电影没有中文翻译，可右键点击“编辑电影资料”，片名填入中文名字，保存。

3-刮削电影信息

全部刮削完成后，会生成电影文件同名的nfo文件及海报等照片。

也可以选择不下载图片，nfo里的图片是链接到tmdb服务器上的。Kodi首先扫描本地nfo和海报图片，没有的话才调用nfo里的链接。不过会造成加载海报缓慢。

打开nfo文件，看到刮削到了非常详细的信息：电影名称、上映日期、简介、海报图片、电影类型、演职员等。
![][13]

### 4.3 回到Kodi添加视频源

教程：http://www.kodiplayer.cn/course/2866.html

信息提供者那里选择“Local information only”,因为不用刮削更新资料库会很快
![][14]

进入电影列表，影片信息获取成功
![][15]

## 五 tinyMediaManager重命名电影文件

如果你从各种网站下载电影，电影名字经常是五花八门的，还有各种网址及广告。tinyMediaManager可以帮你一键重命名电影文件名，让电影资料库更整洁。（正在PT做上传的不要使用这个功能）

### 5.1 设置-电影-重命名规则

首先将电影扫描刮削完成，设置-电影-重命名规则里设置文件夹、文件名的命名模式。可将年份、中文名、原名、导演等信息加入，参考范例自己定制。
![][16]

### 5.2 重命名或整理所选电影

全选左侧电影列表，上方菜单“改名并清除”-“重命名或整理所选电影”
![][17]

### 5.3 整理完成

每部电影剧集会单独创建个文件夹，不用担心会误删文件，tinyMediaManager会创建“.deletedByTMM”的文件夹，里面有未重命名前的nfo文件，可以手动删掉。
![][18]

## 六 参考
* [Kodi中文官网—抛弃Kodi难用的刮削器 tinyMediaManager(TMM)刮削电影信息更方便](http://www.kodiplayer.cn/course/2945.html)
* [Kodi中文官网—Kodi刮削器不能识别电影 怎样处理才能匹配到电影信息](http://www.kodiplayer.cn/course/2905.html)
* [Kodi中文官网—The Movie Database 电影剧集刮削器](http://www.kodiplayer.cn/plugins/2929.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-download-info.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-set-movie-source.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-set-movie-language.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-board.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-movie-view.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-movie-directory.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-movie-scraper.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-movie-info.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-movie-img-named.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-scraper-scan.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-scraper-rename.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-scraper-info.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-add-movie-local.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-add-movie-success.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-rename-rules.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-rename-task.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-scraper-tinym-rename-result.png
---
title: Ubuntu开发之——基于SRS+OBS搭建直播系统
categories:
  - 系统
  - Ubuntu
tags:
  - 直播
abbrlink: b85f9952
date: 2017-11-23 17:26:03
---
这段时间与视频，直播相关的技术不可谓不热，今天我们就近距离接触下，尽早搭上这班车！  
我们先看一张效果图  
![直播][1]
左边是OBS 推流端，右边是VLC播放器，稍微有延迟！
注：本文是基于VMware(12.5.7)+Ubuntu(16.04)搭建
<!--more-->
# 准备

- VMware(12.5.7)
- Ubuntu(16.0.4)
- Git
- RTMP媒体服务器(SRS)
- 推流端(OBS)
- 拉流端(VLC)

# 安装

## 安装VMware

- 下载VWware
VWware官网：[https://www.vmware.com/cn.html][2]
- 安装破解     
比较简单，请自行百度，此处提供参考：[虚拟机安装教程][3]

## 安装Ununtu

- 下载    
Ubuntu官网：[https://www.ubuntu.com/download][4]
- 安装    
比较简单，请自行百度，此处提供参考：[VMware安装Ubuntu][5]
-  其他
Ubuntu如何设置全屏显示，搜狗输入法安装，联网等不在次节课范畴，请自行百度解决！

## 安装Git

- ALT+Control+T 调出终端
 ![终端][6]
- 输入git查看系统是否已经安装
![存在][7]
- 如果未安装，执行“sudo apt-get install git”指令，安装git，出现如图提示输入"Y"继续
![安装][8]
- 输入"git --version"查看当前版本
![版本][9]

## 安装SRS
srs Github地址为：https://github.com/ossrs/srs，里面有使用指导，按照安装步骤操作即可  

- 新建本地SRS存放文件夹，文件名live
![新建文件夹][10]
- 打开终端，进入live文件夹
- ![进入文件夹][11]
- 执行"git clone https://github.com/ossrs/srs &&cd srs/trunk"指令，时间较长8分钟左右  
![clone][12]
- 执行"./configure && make"编译SRS
![build][13]
- 执行"./etc/init.d/srs start"或“ ./objs/srs -c conf/srs.conf”启动服务   
其他指令如：  
停止 ./etc/init.d/srs stop   
重启 ./etc/init.d/srs restart  
![start][14]
## 安装OBS 
### 安装OBS首先安装FFMPEG  
- 添加源：sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next
![next][15]
- 更新源：sudo apt-get update  
![update][16]
- 安装FFPMEG：sudo apt-get install ffmpeg
![install][17]
### 安装OBS
- 添加源：sudo add-apt-repository ppa:obsproject/obs-studio
![add][18]
- 更新源：sudo apt-get update  
![update][19]
- 安装：sudo apt-get install obs-studio
![install][20]
- 安装成功之后重启才能看到，稍后上传图片
![preview][21]

## 安装VLC

- VLC官网地址: [http://www.videolan.org/][22]
![address][23]
- 下载对应版本的VLC，此处选择Linux 
![download][24]
- 点击下载
![download2][25]
- 开始安装
![install][26]
- 重启查看VLC
![preview][27]

# 设置
OBS 推流端配置

- 打开终端输入"ifconfig -a"查看本机IP地址
![ip][28]
- 打开OBS在来源中选择一种，本次选择幻灯片
![source][29]
- 点击设置，打开设置选项卡，流选项中类型选择自定义流媒体服务器，url为：rtmp://你的ip/你喜欢的url
![][30]
- 在设置选项卡中，设置推送流的帧率等
![][31]
- 检查无误后，点击开始推流(请确保srs已开启)
![][32]

# 测试
VLC测试推流结果

- 打开VLC，选择打开媒体->网络，在网络协议中输入推流地址
![][33]
- 查看显示结果(左侧为推流，右侧为VLC显示，有延迟)
![result][34]

参考：  
[轻松入门Android直播相关技术 从0搭建直播系统][35]   
[Ubuntu安装OBS][36]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-result.png
[2]: https://www.vmware.com/cn.html
[3]: https://jingyan.baidu.com/article/86fae346ce751b3c48121a6d.html
[4]: https://www.ubuntu.com/download
[5]: https://jingyan.baidu.com/article/86fae346ce751b3c48121a6d.html
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-termanel.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-git-has.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-install-git.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-git-version.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-folder.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-into-live.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-srs-clone.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-srs_build.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-srs-start.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-ffmpeg-next.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-ffmpeg-update.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-ffmpeg-install.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-add.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-update.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-install.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-preview.png
[22]: http://www.videolan.org/
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-address.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-download.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-download2.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-install.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-preview.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-ip.png
[29]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-osb-source.png
[30]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-stream.png
[31]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-obs-video.png
[32]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-osb-push.png
[33]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-set.png
[34]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-live-vlc-result.png
[35]: http://blog.csdn.net/lmj623565791/article/details/77937483
[36]: http://blog.csdn.net/kingroc/article/details/50829213
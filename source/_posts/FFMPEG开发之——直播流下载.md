---
title: FFMPEG开发之——直播流下载
categories:
  - 开发
  - H-音、视频开发
  - FFMPEG
tags:
  - 直播流下载
abbrlink: adbe4f32
date: 2019-03-31 22:24:18
---

## 前言

FFmpeg是一款多媒体视频处理工具，有非常强大的功能包括视频采集功能、视频格式转换、视频抓图、给视频加水印等。本文主要介绍使用FFMPEG实现多媒体的直播流下载。  

<!--more-->

## 直播流 
### 直播流协议
#### RTMP、RTSP、HTTP协议
##### RTMP协议
1. 是流媒体协议
2. RTMP协议是 Adobe 的私有协议，未完全公开
3. RTMP协议一般传输的是 flv，f4v 格式流
4. RTMP一般在 TCP 1个通道上传输命令和数据

##### RTSP协议
1. 是流媒体协议
2. RTSP协议是共有协议，并有专门机构做维护
3. RTSP协议一般传输的是 ts、mp4 格式的流
4. RTSP传输一般需要 2-3 个通道，命令和数据通道分离

##### HTTP协议
1. 不是是流媒体协议
2. HTTP协议是共有协议，并有专门机构做维护
3. HTTP协议没有特定的传输流
4. HTTP传输一般需要 2-3 个通道，命令和数据通道分离

### 可用的直播流地址
#### RTMP协议直播源
1. 香港卫视：rtmp://live.hkstv.hk.lxdns.com/live/hks

#### RTSP协议直播源
1. 珠海过澳门大厅摄像头监控：rtsp://218.204.223.237:554/live/1/66251FC11353191F/e7ooqwcfbqjoo80j.sdp
2. 大熊兔（点播）：rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov

#### HTTP协议直播源
1. 香港卫视：http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8
2. CCTV1高清：http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8
3. CCTV3高清：http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8
4. CCTV5高清：http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8
5. CCTV5+高清：http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8
6. CCTV6高清：http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8
7. 苹果提供的测试源（点播）：http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8



## 播放软件推荐：VLC
### 依次选择：媒体->打开网络串流
![][1]  
### 在打开的弹出框选择流媒体，并输入URL地址
![][2]   
### 点击播放后如图所示 
![][3]

## 流媒体下载 
###  打开[FFMPEG官网][4]，下载相应的FFMPEG文件(本文以Windows为例)        
 ![][5]
### 下载后，进行解压  
![][6]
### 将path添加到环境变量  
![][7]  
### 使用ffmpeg指令生成指定格式文件  

	ffmpeg -i "要下载的链接" -c copy "输出文件名.输出容器格式"  

	
示例   

	ffmpeg -i http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8 -c copy cctv1.mp4

![][8]  

### 按ctr+C暂停后，播放  
![][9]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vlc-stream-select.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vlc-stream-network.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vlc-stream-play.png
[4]: http://www.ffmpeg.org/download.html
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-guanwang.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-unzip.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-add-path.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-make-up.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-mp4-play.png



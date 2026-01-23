---
title: IPTV之——加密m3u8播放视频(19)
categories:
  - 开发
  - J-NAS
  - 自建服务   
  - IPTV
tags:
  - IPTV
abbrlink: ac6f4424
date: 2025-07-29 09:35:45
---
## 一 概述

* 制作加密的 M3U8 视频
* 播放加密的 M3U8视频

<!--more-->

## 二 制作加密的 M3U8 播放视频

### 2.1 工具准备

```
1、FFmpeg：
一个强大的开源多媒体处理工具，用于视频分片、加密和生成 M3U8 文件。

2、OpenSSL（可选）：
用于生成加密密钥（如果需要手动生成）。

3、视频文件：
需要转换为 M3U8 格式的源视频文件（例如 MP4、AVI 等）
4、Web服务器(如 nginx/lighttpd):
托管 .m3u8、.ts、.key 文件
```

### 2.2 生成加密密钥(`.key` 文件)

```
openssl rand 16 > encrypt.key

生成一个 128-bit 密钥（16 字节）
```

### 2.3 创建密钥信息文件（`key_info.txt`）

```
这个文件 FFmpeg 会用到，格式如下（三行）

https://yourdomain.com/encrypt.key
encrypt.key
00000000000000000000000000000000

-第1行：播放器可访问的 .key 文件 URL（必须 HTTP 链接）
-第2行：本地 .key 文件路径
-第3行：密钥 IV（初始化向量），可以写成16个0或随机生成
```

### 2.4 使用 FFmpeg 加密生成 HLS（.m3u8 + .ts）

```
ffmpeg -i input.mp4 -hls_time 10 -hls_key_info_file key_info.txt -hls_playlist_type vod -hls_segment_filename "segment%03d.ts" output.m3u8

这会生成：
-output.m3u8
-segment000.ts, segment001.ts, ...
-encrypt.key
```

### 2.5 M3U8 文件内容示例

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-KEY:METHOD=AES-128,URI="http://your-server.com/keyfile.key",IV=0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
#EXTINF:10.000,
output_000.ts
#EXTINF:10.000,
output_001.ts
#EXT-X-ENDLIST
```

### 2.6 托管文件

```
将以下文件上传到服务器，确保可以通过 HTTP/HTTPS 访问：

-output.m3u8：M3U8 播放列表文件。
-output_*.ts：分片后的 TS 文件。
-keyfile.key：密钥文件（确保 URL 与 key_info.txt 中的一致）。
```

## 三 播放加密的 M3U8视频

### 3.1 播放器要求

```
播放器支持 HLS AES-128 解密协议，并能访问 .key 文件地址
```

### 3.2 常见播放器支持情况

|     播放器/平台     | AES-128 解密支持 |         说明          |
| :-----------------: | :--------------: | :-------------------: |
|         VLC         |      ✅ 支持      | 直接打开 `.m3u8` 即可 |
|  Safari (iOS/mac)   |      ✅ 支持      |     原生支持 HLS      |
|   ffplay / ffmpeg   |      ✅ 支持      |    自动识别 `.key`    |
| ExoPlayer (Android) |      ✅ 支持      |        需配置         |
|    IPTV 盒子部分    |   ⚠️ 依实现不同   |   有些不支持加密流    |

### 3.3 示例文件结构(部署到 HTTP 服务器)

```
/video/
├── encrypt.key
├── output.m3u8
├── segment000.ts
├── segment001.ts
...

output.m3u8 内容类似于
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-KEY:METHOD=AES-128,URI="https://yourdomain.com/video/encrypt.key"
#EXTINF:10.000,
segment000.ts
#EXTINF:10.000,
segment001.ts
...
```

## 四 完整部署&播放流程图

```
📺 input.mp4
   ↓ ffmpeg + key_info.txt
📦 加密分段 + m3u8 + key
   ↓
🧰 上传到 HTTP 服务器 (如 nginx)
   ↓
🌐 播放器访问 https://yourdomain.com/video/output.m3u8
   ↓
🟢 自动拉取 key + ts 文件并解密播放
```

## 五 一键命令打包加密 HLS

```
openssl rand 16 > encrypt.key
echo "https://yourdomain.com/encrypt.key" > key_info.txt
echo "encrypt.key" >> key_info.txt
echo "00000000000000000000000000000000" >> key_info.txt

ffmpeg -i input.mp4 -hls_time 10 -hls_key_info_file key_info.txt -hls_playlist_type vod -hls_segment_filename "segment%03d.ts" output.m3u8
```


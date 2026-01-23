---
title: Android面试题——掘金-音视频之相关API(9.2)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 3e36d1ff
date: 2025-04-07 19:53:20
---
## 一 概述

```
1.Android 中如何进行音频采集？使用什么类？
2.如何播放本地音频？MediaPlayer 和 ExoPlayer 的区别？
3.如何录制音频和视频？MediaRecorder 的使用注意点？
4.MediaCodec 的使用流程？
5.MediaExtractor 和 MediaMuxer 的作用？
6.SurfaceView 与 TextureView 的区别？
7.如何自定义音视频播放器？
```

<!--more-->

## 二 相关API

### 2.1 Android 中如何进行音频采集？使用什么类？

```
在 Android 中，音频采集可以通过 AudioRecord 类来实现。
AudioRecord 提供了低级别的音频录制接口，可以从麦克风采集音频数据。

一、使用类：
AudioRecord：
这是Android提供的音频录制类，能够访问设备的麦克风，并以指定的采样率、位深度和声道数录制音频数据。

二、主要步骤：
-初始化 AudioRecord：配置音频录制参数，如音频源（麦克风）、采样率、声道配置、位深度等。
-开始录制：调用 startRecording() 方法开始录音。
-读取音频数据：通过 read() 方法获取音频数据流，存入缓冲区。
-停止录制：调用 stop() 方法停止录音。

三、示例代码：

int sampleRateInHz = 44100; // 采样率
int channelConfig = AudioFormat.CHANNEL_IN_MONO; // 单声道
int audioFormat = AudioFormat.ENCODING_PCM_16BIT; // 16位编码
AudioRecord audioRecord = new AudioRecord(
    MediaRecorder.AudioSource.MIC, sampleRateInHz, channelConfig, audioFormat, bufferSize);
audioRecord.startRecording();
byte[] buffer = new byte[1024];
int read = audioRecord.read(buffer, 0, buffer.length);
// 处理录制的数据
audioRecord.stop();
audioRecord.release();

通过 AudioRecord，可以实现高效的音频采集，用于录音、语音识别等应用场景。
```

### 2.2 如何播放本地音频？MediaPlayer 和 ExoPlayer 的区别？

```
一、播放本地音频：
在 Android 中，可以使用 MediaPlayer 或 ExoPlayer 播放本地音频文件。

1.1 MediaPlayer：
内置于 Android 系统中，支持播放本地音频文件。
可以通过 setDataSource() 方法指定文件路径，然后调用 start() 方法开始播放。

示例：
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setDataSource("/path/to/audiofile.mp3");
mediaPlayer.prepare(); // 或者 prepareAsync()
mediaPlayer.start();

1.2 ExoPlayer：
是一个由 Google 提供的开源播放器，适用于更复杂的音视频播放需求。
它支持本地音频播放并提供更多的自定义功能，如流媒体播放、缓存等。

示例：
SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();
MediaItem mediaItem = MediaItem.fromUri(Uri.parse("file:///path/to/audiofile.mp3"));
player.setMediaItem(mediaItem);
player.prepare();
player.play();

二、MediaPlayer 和 ExoPlayer 的区别：
2.1 功能和扩展性：
-MediaPlayer：适用于简单的音视频播放，功能较为基础。
-ExoPlayer：功能更强大，支持高级特性如自适应码率流、缓存、带宽检测等。

2.2 支持的协议：
-MediaPlayer：主要支持本地文件和流媒体（如 RTMP、HLS）。
-ExoPlayer：支持更多协议，如 HLS、DASH、SmoothStreaming 等，适合更复杂的流媒体播放场景。

2.3 性能：
-MediaPlayer：内置于 Android 系统中，性能较为稳定，但在播放流媒体时灵活性较差。
-ExoPlayer：性能更好，特别是在处理流媒体和自定义需求时，支持硬件解码等优化。

总结：
MediaPlayer 适合简单的本地音频播放，
ExoPlayer 适合需要更多功能和灵活性的场景，如流媒体、缓存等高级功能。
```


### 2.3 如何录制音频和视频？MediaRecorder 的使用注意点？

```
一、录制音频和视频：
在 Android 中，使用 MediaRecorder 类可以实现音频和视频的录制。

1.1 音频录制：
使用 MediaRecorder 录制音频时，通常配置音频源为麦克风，设置输出格式和编码格式，然后启动录制。

MediaRecorder mediaRecorder = new MediaRecorder();
mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC); // 设置音频来源
mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4); // 设置输出格式
mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC); // 设置音频编码格式
mediaRecorder.setOutputFile("/path/to/output.mp4"); // 设置输出文件路径

mediaRecorder.prepare();
mediaRecorder.start(); // 开始录音

1.2 视频录制：
除了音频录制，还可以配置视频源（如摄像头），设置视频编码格式、输出文件等。

MediaRecorder mediaRecorder = new MediaRecorder();
mediaRecorder.setCamera(camera); // 设置摄像头
mediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA); // 设置视频来源
mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC); // 设置音频来源
mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4); // 设置输出格式
mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264); // 设置视频编码格式
mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC); // 设置音频编码格式
mediaRecorder.setOutputFile("/path/to/output.mp4"); // 设置输出文件路径

mediaRecorder.prepare();
mediaRecorder.start(); // 开始录制

二、MediaRecorder 的使用注意点：
2.1 权限问题：
必须申请 录音 和 摄像头 权限（RECORD_AUDIO 和 CAMERA），以及写入存储的权限（WRITE_EXTERNAL_STORAGE）。

2.2 录制状态管理：
-在调用 start() 之前，必须调用 prepare() 来准备录制。
-录制完成后，必须调用 stop() 停止录制，并调用 release() 释放资源。

2.3硬件资源释放：
在停止录制后，确保调用 release() 来释放摄像头、麦克风等硬件资源，避免内存泄漏。

2.4 错误处理：
录制过程中可能出现错误，使用 setOnErrorListener() 来监听并处理错误。

mediaRecorder.setOnErrorListener(new MediaRecorder.OnErrorListener() {
    @Override
    public void onError(MediaRecorder mr, int what, int extra) {
        // 错误处理
    }
});

2.5 预处理：
确保在录制前，调用 prepare() 对 MediaRecorder 进行初始化，以避免异常。

总结：
MediaRecorder 是录制音频和视频的基本工具，使用时需注意权限申请、状态管理、硬件资源释放等问题，
以确保录制过程稳定。
```

### 2.4 MediaCodec 的使用流程？

```
一、概念
MediaCodec 是 Android 提供的一个用于音视频编解码的类，
能够高效地利用硬件加速进行音视频数据的编解码。
其使用流程主要包括以下几个步骤：

二、MediaCodec 使用流程：
2.1 创建 MediaCodec 实例：
使用MediaCodec.createDecoderByType()或MediaCodec.createEncoderByType()
创建编解码器实例，指定音频或视频的 MIME 类型（如 H.264、AAC 等）。

MediaCodec codec = MediaCodec.createDecoderByType("video/avc");  // H.264 解码器

2.2 配置 MediaCodec：配置编解码器的格式，包括输入和输出的缓冲区大小、采样率、分辨率、颜色格式等。

MediaFormat format = MediaFormat.createVideoFormat("video/avc", width, height);
codec.configure(format, surface, null, 0);  // 视频解码输出到 SurfaceView

2.3 启动编解码器： 调用 start() 启动编解码器。
codec.start();

2.4 提供输入数据： 获取输入缓冲区（inputBuffer），将编解码所需的数据填充到输入缓冲区。

int inputIndex = codec.dequeueInputBuffer(-1);
ByteBuffer inputBuffer = codec.getInputBuffer(inputIndex);
inputBuffer.put(data);  // 将数据填充到输入缓冲区
codec.queueInputBuffer(inputIndex, 0, data.length, presentationTimeUs, 0);

2.5 获取输出数据： 获取输出缓冲区（outputBuffer），获取解码后的数据并渲染（或编码后处理）。
int outputIndex = codec.dequeueOutputBuffer(info, 0);
ByteBuffer outputBuffer = codec.getOutputBuffer(outputIndex);
// 渲染或保存解码数据
codec.releaseOutputBuffer(outputIndex, true);  // 渲染到 Surface 或释放缓冲区

2.6 释放资源： 完成解码或编码任务后，调用 stop() 和 release() 方法释放资源。
codec.stop();
codec.release();

三、总结：
MediaCodec 的使用流程包括创建实例、配置格式、启动、提供数据、获取输出以及释放资源。
它是一个底层 API，能够高效地处理音视频数据的编解码，广泛用于高性能音视频应用中。
```


### 2.5 MediaExtractor 和 MediaMuxer 的作用？

```
MediaExtractor 和 MediaMuxer 是 Android 提供的用于音视频文件处理的类，
常用于多媒体应用中的数据提取和合成。

1. MediaExtractor：
MediaExtractor 用于从媒体文件中提取音视频数据。
它支持不同格式的音视频文件，可以读取音频、视频轨道并获取其数据。

1.1 主要作用：
-提取音频、视频轨道数据。
-支持解析常见的音视频格式，如 MP4、MKV、3GP 等。
-提供对媒体文件的元数据（如时长、轨道类型）访问。

1.2 使用场景：
从媒体文件中获取音频、视频流进行处理或转码。

2. MediaMuxer：
MediaMuxer 用于将音视频数据合成成一个新的媒体文件。
它可以将音频和视频轨道的数据输出到文件中，支持多种格式如 MP4。

2.1 主要作用：
-将不同的音视频轨道合并到一个新文件中。
-支持设置输出文件格式（如 MP4、3GP）。

2.2 使用场景：
-将解码后的音视频数据重新封装成目标格式。
-用于视频编辑或合成任务。

3.总结：
-MediaExtractor：用于从多媒体文件中提取音视频数据。
-MediaMuxer：用于将音视频数据合并到一个新的多媒体文件中。
```


### 2.6 SurfaceView 与 TextureView 的区别？

```
SurfaceView 和 TextureView 都是 Android 提供的用于显示视频或图像的视图组件，
但它们有一些关键区别：

1. SurfaceView：
-显示方式：SurfaceView使用单独的窗口进行渲染，渲染内容会被直接绘制到硬件的表面上，这意味着它不会受到其他视图的影响。
-性能：由于 SurfaceView 使用硬件加速渲染，适合用于需要高性能渲染的场景，比如视频播放。
-布局行为：SurfaceView 会脱离正常的视图层次结构，渲染内容不会参与视图的布局计算，因此无法处理其他视图层级上的动画或变换。
-常见用途：视频播放、游戏渲染、实时摄像头预览等。

SurfaceView surfaceView = findViewById(R.id.surfaceView);
SurfaceHolder holder = surfaceView.getHolder();
// 设置视频渲染的 Surface

2. TextureView：
-显示方式：TextureView 使用一个 SurfaceTexture 来渲染内容，并且它是一个普通的视图组件，可以参与布局和动画。
-性能：虽然TextureView支持硬件加速，但相比SurfaceView，性能稍低，适合渲染不那么依赖性能的内容。
-布局行为：TextureView 可以和其他视图共同使用，它可以参与布局、动画和变换操作（如旋转、缩放等）。
-常见用途：需要对渲染内容进行动画、旋转、缩放等变换的场景，或需要将视频嵌入到普通布局中的场景。

TextureView textureView = findViewById(R.id.textureView);
SurfaceTexture surfaceTexture = textureView.getSurfaceTexture();
// 设置视频渲染的 SurfaceTexture

3.总结：
-SurfaceView：适合性能要求较高、需要独立渲染的场景，渲染内容不受其他视图影响。
-TextureView：适合需要与其他视图一起布局、动画和变换的场景，但性能稍逊于 SurfaceView。
```

### 2.7 如何自定义音视频播放器？

```
要自定义音视频播放器，
可以结合 Android 提供的MediaPlayer或ExoPlayer等类来实现播放控制、UI 展示、音视频解码等功能。自定义播放器通常涉及以下几个步骤：

1. 选择播放器框架：
-MediaPlayer：适合简单的视频和音频播放。
-ExoPlayer：适合需要更高自定义和高级功能（如网络流播放、DRM 保护）的播放器。

2. 创建播放界面：
设计播放器 UI，包括播放/暂停按钮、进度条、音量控制、全屏按钮等。
你可以使用 SurfaceView 或 TextureView 来显示视频。

<SurfaceView
    android:id="@+id/surfaceView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
<Button
    android:id="@+id/playButton"
    android:text="Play"/>

3. 初始化播放器：
根据选用的框架，初始化播放器并设置数据源。

-使用 MediaPlayer 示例：
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setDataSource("video_url_or_path");
mediaPlayer.setDisplay(surfaceHolder); // 设置视频渲染的 Surface
mediaPlayer.prepareAsync(); // 异步准备

-使用 ExoPlayer 示例：
SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();
player.setMediaItem(MediaItem.fromUri("video_url_or_path"));
player.prepare();

4. 控制播放：
实现播放、暂停、停止等功能，监听播放器的状态变化。

Button playButton = findViewById(R.id.playButton);
playButton.setOnClickListener(v -> {
    if (mediaPlayer.isPlaying()) {
        mediaPlayer.pause();
    } else {
        mediaPlayer.start();
    }
});

5. 处理生命周期：
在播放器使用的 Activity 或 Fragment 生命周期中，确保正确地管理资源，
如在 onPause() 和 onStop() 中释放播放器资源。

@Override
protected void onPause() {
    super.onPause();
    mediaPlayer.pause(); // 暂停播放
}

@Override
protected void onDestroy() {
    super.onDestroy();
    mediaPlayer.release(); // 释放资源
}

6. 添加高级功能：
-缓冲管理：通过监听缓冲事件，显示加载进度。
-错误处理：处理播放错误，显示提示信息。
-音量控制：使用系统的音量控制或自定义音量调节。
-全屏播放：切换播放模式，调整界面布局。

总结：
自定义音视频播放器涉及初始化播放器、设计用户界面、控制播放、处理生命周期和资源管理等。
可以根据需求选择合适的框架（如 MediaPlayer 或 ExoPlayer），
并实现基本播放功能和高级特性（如缓冲、错误处理、音量控制等）。
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)
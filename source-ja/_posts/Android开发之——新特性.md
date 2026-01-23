---
title: Android开发之——新特性
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 新特性
abbrlink: fb211eb4
date: 2018-01-10 22:38:27
---
# 前言
Google每发布一个Android新版本，都会在官网更新最新的功能，我们通过[https://developer.android.google.cn/about/versions/nougat/index.html][0]
查看每个版本的功能，针对新特性作产品兼容。否则App运行在新的版本会出现一系列问题。下面是Android每个版本的功能和行为变更。
![][1]
<!--more-->
# Android行为变更
Android官网提供的版本从4.x开始，4.x之前的版本兼容做的较少，不做分析，本文主要分析Android5,6,7,8版本变更。  
## Android 5.0(Lollipop) 
Api级别：21  
### Android Runtime(ART) 
大多数Android应用无需任何更改就可以在ART下工作。不过，部分适合Dalvik的技术并不适用于ART。如需立交有关最重要的问题的信息，请参阅在Android Runtime(ART)上验证应用行为。如存在一下情况，应特别注意：   

- 你的应用使用Java原生接口(JNI)运行C/C++代码
- 你使用生成非标准代码的开发工具(例如，一些代码混淆工具) 
- 你使用与压缩垃圾回收不兼容的技术

### 声音和震动
如果你当前使用Ringtone、MediaPlayer或Vibrator类向通知中添加声音和震动，则移除此代码，以便系统可以在"优先"模式中正确显示通知。取而代之的是，使用Notification.Builder方法添加声音和震动。 
  
将设备设为RINGER_MODE_SILENT可使设备进入新的优先模式。如果你将设备设为RINGER_MOVE_NORMAL或RINGER_MODE_VIBRATE，则设备将退出优先模式。  

以前，Android使用STREAM_MUSIC作为主流式传输来控制平板电脑设备上的音量。在Android 5.0中，手机和平板电脑设备的主音量模式传输现已合并，由STREAM_RING或STREAM_NOTIFICATION进行控制。  
### 锁定屏幕可见性
默认情况下，在Android 5.0中，通知现在显示用户的锁定屏幕上，用户可以选择保护敏感信息不被公开，再次情况下，系统会自动删减通知显示的文本。要自定义此删减的通知，请使用setPublicVersion()。  

如果通知不包含个人信息，或者你想允许媒体播放控件显示在通知上，则调用setVisibility()方法并将通知的可见性级别设为VISIBILITY_PUBLIC 。  
### 浮动通知 
现在，当设备处于活动状态时(即，设备未锁定且其屏幕已打开)，通知可以显示在小型浮动窗口中(也称为"浮动通知")。这些通知看上去类似于精简版的通知，只是浮动通知还显示按钮。用户可以在不离开当前应用的情况下处理或清除浮动通知。  

可能触发浮动通知的条件示例包括： 
 
- 用户的activity处于全屏模式中(应用使用fullScreenIntent)
- 通知具有较高的优先级并使用铃声或震动 

如果你的应用在以上任何情形下实现通知，请确保系统正确显示浮动通知。  

### getRecentTasks
为提升用户隐私的安全性，现已弃用activityManager.getRecentTask（）方法。对于向后兼容性，此方法仍会返回它的一小部分数据，包括应用自己的任务和可能的一些其他非敏感任务(如首页)。如果你的应用使用此方法检索它自己的任务，则改用getAppTasks检索信息。  

### 绑定到服务  
Context.bindService() 方法现在需要显式 Intent，如果提供隐式 intent，将引发异常。为确保应用的安全性，请使用显式 intent 启动或绑定 Service，且不要为服务声明 intent 过滤器。  
### webview  
Android 5.0 更改了应用的默认行为。如果您的应用是面向 API 级别 21 或更高级别：默认情况下，系统会阻止混合内容和第三方 Cookie。要允许混合内容和第三方 Cookie，请分别使用 setMixedContentMode() 和 setAcceptThirdPartyCookies() 方法。系统现在可以智能地选择要绘制的 HTML 文档部分。这个新的默认行为有助于减少内存占用和提升性能。如果您要一次渲染整个文档，可通过调用 enableSlowWholeDocumentDraw() 停用此优化。  

如果您的应用是面向低于 21 的 API 级别：系统允许混合内容和第三方 Cookie，并始终一次渲染整个文档。
 
## Android 6.0  
API级别：23  
### 运行时权限
对于以 Android 6.0（API 级别 23）或更高版本为目标平台的应用，请务必在运行时检查和请求权限。要确定您的应用是否已被授予权限，请调用新增的 checkSelfPermission() 方法。要请求权限，请调用新增的 requestPermissions() 方法。即使您的应用并不以 Android 6.0（API 级别 23）为目标平台，您也应该在新权限模式下测试您的应用。  

### 取消支持Apache HTTP客户端  
Android 6.0 版移除了对 Apache HTTP 客户端的支持。如果您的应用使用该客户端，并以 Android 2.3（API 级别 9）或更高版本为目标平台，请改用 HttpURLConnection 类。此 API 效率更高，因为它可以通过透明压缩和响应缓存减少网络使用，并可最大限度降低耗电量。要继续使用 Apache HTTP API，您必须先在 build.gradle 文件中声明以下编译时依赖项：

	android {useLibrary 'org.apache.http.legacy'}
###  BoringSSL  
Android 正在从使用 OpenSSL 库转向使用 BoringSSL 库。如果您要在应用中使用 Android NDK，请勿链接到并非 NDK API 组成部分的加密库，如 libcrypto.so 和 libssl.so。这些库并非公共 API，可能会在不同版本和设备上毫无征兆地发生变化或出现故障。此外，您还可能让自己暴露在安全漏洞的风险之下。请改为修改原生代码，以通过 JNI 调用 Java 加密 API，或静态链接到您选择的加密库。  
### 通知
此版本移除了 Notification.setLatestEventInfo() 方法。请改用 Notification.Builder 类来构建通知。要重复更新通知，请重复使用 Notification.Builder 实例。调用 build() 方法可获取更新后的 Notification 实例。

adb shell dumpsys notification 命令不再打印输出您的通知文本。请改用 adb shell dumpsys notification --noredact 命令打印输出 notification 对象中的文本。 

### 音频管理器变更  
不再支持通过 AudioManager 类直接设置音量或将特定音频流静音。setStreamSolo() 方法已弃用，您应该改为调用 requestAudioFocus() 方法。类似地，setStreamMute() 方法也已弃用，请改为调用 adjustStreamVolume() 方法并传入方向值 ADJUST_MUTE 或 ADJUST_UNMUTE。  
### 相机服务变更  
在此版本中，相机服务中共享资源的访问模式已从之前的“先到先得”访问模式更改为高优先级进程优先的访问模式。对服务行为的变更包括：  

- 根据客户端应用进程的“优先级”授予对相机子系统资源的访问权，包括打开和配置相机设备。带有对用户可见 Activity 或前台Activity 的应用进程一般会被授予较高的优先级，从而使相机资源的获取和使用更加可靠； 
- 当高优先级的应用尝试使用相机时，系统可能会“驱逐”正在使用相机客户端的低优先级应用。在已弃用的 Camera API 中，这会导致系统为被驱逐的客户端调用 onError()。在 Camera2 API 中，这会导致系统为被驱逐的客户端调用onDisconnected()；
- 在配备相应相机硬件的设备上，不同的应用进程可同时独立打开和使用不同的相机设备。但现在，如果在多进程用例中同时访问相机会造成任何打开的相机设备的性能或能力严重下降，相机服务会检测到这种情况并禁止同时访问。即使并没有其他应用直接尝试访问同一相机设备，此变更也可能导致低优先级客户端被“驱逐”。
- 更改当前用户会导致之前用户帐户拥有的应用内活动相机客户端被驱逐。对相机的访问仅限于访问当前设备用户拥有的用户个人资料。举例来说，这意味着，当用户切换到其他帐户后，“来宾”帐户实际上无法让使用相机子系统的进程保持运行状态

## Android 7.0  
API级别：24 
### 电池和内存 
Android 7.0 包括旨在延长设备电池寿命和减少 RAM 使用的系统行为变更。这些变更可能会影响您的应用访问系统资源，以及您的应用通过特定隐式 intent 与其他应用交互的方式。  
### Project Svelte：后台优化 
Android 7.0 移除了三项隐式广播，以帮助优化内存使用和电量消耗。此项变更很有必要，因为隐式广播会在后台频繁启动已注册侦听这些广播的应用。删除这些广播可以显著提升设备性能和用户体验。

移动设备会经历频繁的连接变更，例如在 WLAN 和移动数据之间切换时。目前，可以通过在应用清单中注册一个接收器来侦听隐式 CONNECTIVITY_ACTION 广播，让应用能够监控这些变更。由于很多应用会注册接收此广播，因此单次网络切换即会导致所有应用被唤醒并同时处理此广播。

同理，在之前版本的 Android 中，应用可以注册接收来自其他应用（例如相机）的隐式 ACTION_NEW_PICTURE 和 ACTION_NEW_VIDEO 广播。当用户使用相机应用拍摄照片时，这些应用即会被唤醒以处理广播。

为缓解这些问题，Android 7.0 应用了以下优化措施：  

- 面向 Android 7.0 开发的应用不会收到 CONNECTIVITY_ACTION 广播，即使它们已有清单条目来请求接受这些事件的通知。在前台运行的应用如果使用 BroadcastReceiver 请求接收通知，则仍可以在主线程中侦听 CONNECTIVITY_CHANGE。 
- 应用无法发送或接收 ACTION_NEW_PICTURE 或 ACTION_NEW_VIDEO 广播。此项优化会影响所有应用，而不仅仅是面向 Android 7.0 的应用。

的应用使用任何 intent，您仍需要尽快移除它们的依赖关系，以正确适配 Android 7.0 设备。Android 框架提供多个解决方案来缓解对这些隐式广播的需求。例如，JobScheduler API 提供了一个稳健可靠的机制来安排满足指定条件（例如连入无限流量网络）时所执行的网络操作。您甚至可以使用 JobScheduler 来适应内容提供程序变化。
### 系统权限更改
为了提高私有文件的安全性，面向 Android 7.0 或更高版本的应用私有目录被限制访问　(0700)。此设置可防止私有文件的元数据泄漏，如它们的大小或存在性。此权限更改有多重副作用：  

- 私有文件的文件权限不应再由所有者放宽，为使用 MODE_WORLD_READABLE 和/或 MODE_WORLD_WRITEABLE 而进行的此类尝试将触发 SecurityException。   
注：迄今为止，这种限制尚不能完全执行。应用仍可能使用原生 API 或 File API 来修改它们的私有目录权限。但是，我们强烈反对放宽私有目录的权限。   
- 传递软件包网域外的 file:// URI 可能给接收器留下无法访问的路径。因此，尝试传递 file:// URI 会触发 FileUriExposedException。分享私有文件内容的推荐方法是使用 FileProvider。  
- DownloadManager 不再按文件名分享私人存储的文件。旧版应用在访问 COLUMN_LOCAL_FILENAME 时可能出现无法访问的路径。面向 Android 7.0 或更高版本的应用在尝试访问 COLUMN_LOCAL_FILENAME 时会触发 SecurityException。通过使用DownloadManager.Request.setDestinationInExternalFilesDir() 或DownloadManager.Request.setDestinationInExternalPublicDir() 将下载位置设置为公共位置的旧版应用仍可以访问 COLUMN_LOCAL_FILENAME 中的路径，但是我们强烈反对使用这种方法。对于由 DownloadManager 公开的文件，首选的访问方式是使用ContentResolver.openFileDescriptor() 。 

### 在应用件共享文件
对于面向 Android 7.0 的应用，Android 框架执行的 StrictMode API 政策禁止在您的应用外部公开 file:// URI。如果一项包含文件 URI 的 intent 离开您的应用，则应用出现故障，并出现 FileUriExposedException 异常。   

要在应用间共享文件，您应发送一项 content:// URI，并授予 URI 临时访问权限。进行此授权的最简单方式是使用 FileProvider 类。

### 屏幕缩放 
ndroid 7.0 支持用户设置显示尺寸，以放大或缩小屏幕上的所有元素，从而提升设备对视力不佳用户的可访问性。用户无法将屏幕缩放至低于最小屏幕宽度 sw320dp，该宽度是 Nexus 4 的宽度，也是常规中等大小手机的宽度。

当设备密度发生更改时，系统会以如下方式通知正在运行的应用： 
 
- 如果是面向 API 级别 23 或更低版本系统的应用，系统会自动终止其所有后台进程。这意味着如果用户切换离开此类应用，转而打开 Settings 屏幕并更改 Display size 设置，则系统会像处理内存不足的情况一样终止该应用。如果应用具有任何前台进程，则系统会如处理运行时更改中所述将配置变更通知给这些进程，就像对待设备屏幕方向变更一样。
- 如果是面向 Android 7.0 的应用，则其所有进程（前台和后台）都会收到有关配置变更的通知，如处理运行时更改中所述。

大多数应用并不需要进行任何更改即可支持此功能，不过前提是这些应用遵循 Android 最佳做法。具体要检查的事项：  

- 在屏幕宽度为 sw320dp 的设备上测试您的应用，并确保其充分运行。
- 当设备配置发生变更时，更新任何与密度相关的缓存信息，例如缓存位图或从网络加载的资源。当应用从暂停状态恢复运行时，检查配置变更。   
注：如果您要缓存与配置相关的数据，则最好也包括相关元数据，例如该数据对应的屏幕尺寸或像素密度。保存这些元数据便于您在配置变更后决定是否需要刷新缓存数据。  
- 避免用像素单位指定尺寸，因为像素不会随屏幕密度缩放。应改为使用与密度无关像素 (dp) 单位指定尺寸。  

### 检查你的应用是否使用私有库  
为帮助您识别加载私有库的问题，logcat 可能会生成一个警告或运行时错误。例如，如果您的应用面向 API 级别 23 或更低级别，并在运行 Android 7.0 的设备上尝试访问私有库，您可能会看到一个类似于下面所示的警告：  

	library "libandroid_runtime.so"("/system/lib/libandroid_runtime.so") needed   
	or dlopened by "/data/app/com.popular-app.android-2/lib/arm/libapplib.so"   
	is not accessible for the namespace "classloader-namespace" - the access  
	is temporarily granted as a workaround for http://b/26394120  

这些 logcat 警告通知您哪个库正在尝试访问私有平台 API，但不会导致您的应用崩溃。但是，如果应用面向 API 级别 24 或更高级别，logcat 会生成以下运行时错误，您的应用可能会  

	java.lang.UnsatisfiedLinkError: dlopen failed:   
	library "libcutils.so"("/system/lib/libcutils.so") needed or dlopened  
	by"/system/lib/libnativeloader.so" is not accessible for the   
	namespace "classloader-namespace"
	at java.lang.Runtime.loadLibrary0(Runtime.java:977)
	at java.lang.System.loadLibrary(System.java:1602)  

如果您的应用使用动态链接到私有平台 API 的第三方库，您可能也会看到上述 logcat 输出。利用 Android 7.0DK 中的 readelf 工具，您可以通过运行以下命令生成给定 .so 文件的所有动态链接的共享库列表：   

	aarch64-linux-android-readelf -dW libMyLibrary.so
### 其他重要说明
- 如果一个应用在 Android 7.0 上运行，但却是针对更低 API 级别开发的，那么在用户更改显示尺寸时，系统将终止此应用进程。应用必须能够妥善处理此情景。否则，当用户从最近使用记录中恢复运行应用时，应用将会出现崩溃现象。

	您应测试应用以确保不会发生此行为。要进行此测试，您可以通过 DDMS 手动终止应用，以造成相同的崩溃现象。  

	在密度发生更改时，系统不会自动终止面向 N 及更高版本的应用；不过，这些应用仍可能对配置变更做出不良响应。  

- Android 7.0 上的应用应能够妥善处理配置变更，并且在后续启动时不会出现崩溃现象。您可以通过更改字体大小 (Setting >Display > Font size) 并随后从最近使用记录中恢复运行应用，来验证应用行为。  
- 由于之前的 Android 版本中的一项错误，系统未能将对主线程上的一个 TCP 套接字的写入操作举报为违反严格模式。Android 7.0 修复了此错误。呈现出这种行为的应用现在会引发 android.os.NetworkOnMainThreadException 。一般情况下，我们不建议在主线程上执行网络操作，因为这些操作通常会出现可能导致 ANR 和卡顿的高尾延迟。    
- Debug.startMethodTracing() 方法系列现在默认在您的共享存储空间上的软件包特定目录中存储输出，而非 SD 卡根目录。这意味着应用不再需要请求 WRITE_EXTERNAL_STORAGE 权限来使用这些 API 。
- 许多平台 API 现在开始检查在 Binder 事务间发送的大负载，系统现在会将 TransactionTooLargeExceptions 作为 RuntimeExceptions 再次引发，而不再只是默默记录或抑制它们。一个常见例子是在 Activity.onSaveInstanceState() 上存储过多数据，导致 ActivityThread.StopInfo 在您的应用面向 Android 7.0 时引发 RuntimeException。
- 如果应用向 View 发布 Runnable 任务，并且 View 未附加到窗口，系统会用 View 为 Runnable 任务排队；在 View 附加到窗口之前，不会执行 Runnable 任务。此行为会修复以下错误：

	如果一项应用是从并非预期窗口 UI 线程的其他线程发布到 View，则 Runnable 可能会因此运行错误的线程。

	如果 Runnable 任务是从并非环路线程的其他线程发布，则应用可能会曝光 Runnable 任务。  

- 如果 Android 7.0 上一项有 DELETE_PACKAGES 权限的应用尝试删除一个软件包，但另一项应用已经安装了这个软件包，则系统需要用户进行确认。在这种情况下，应用在调用 PackageInstaller.uninstall() 时预计的返回状态应为 STATUS_PENDING_USER_ACTION 。 
- 名为 Crypto 的 JCA 提供程序已弃用，因为它仅有的 SHA1PRNG 算法为弱加密。应用无法再使用 SHA1PRNG（不安全地）派生密钥，因为不再提供此提供程序。  

## Android 8.0(概念)  
API级别：24   
### 合并Chrome OS 
据传，谷歌或可合并Android与Chrome OS以使平台更加统一。  
### 多窗口模式
多窗口模式能够充分利用大屏手机、平板的屏幕空间。  
### OpenJDK替换Java API  
Android不再使用Java API是因为官司败诉过。OpenJDK能够更简单地创建通用代码，从而改善Android的开发环境。  
### 3D Touch功能
实际上国产华为已经有相关产品预先支持3D
Touch功能了，而三星也将会提供相应的支持。  
### 独立升级  
如果真的可以实现的话，用户就可以直接通过谷歌进行升级，完全避开第三方的限制，相信这是用户及其渴望的。无需等待，可从官方直升最新版，但是怎样解决兼容等问题是急需解决的问题。  

参考：  
[Android5,6,7,8新特性][2]




[0]: https://developer.android.google.cn/about/versions/nougat/index.html
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-change.png
[2]: http://blog.csdn.net/fanenqian/article/details/56479714 
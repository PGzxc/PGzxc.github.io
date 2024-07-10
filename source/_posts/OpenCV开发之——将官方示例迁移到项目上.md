---
title: OpenCV开发之——将官方示例迁移到项目上
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 4e2a3f6c
date: 2021-07-14 17:45:10
---
## 一 概述

* 官方示例提供的`DetectionBasedTracker.java`与jni下的`DetectionBasedTracker_jni.cpp`交互
* 当进行项目迁移时，包名发生变化，若将jni下的内容copy到新包后，`DetectionBasedTracker.java`找不到jni下的`DetectionBasedTracker_jni.cpp`文件
* 重新编写jni下的文件生成`DetectionBasedTracker_jni.h`和`DetectionBasedTracker_jni.cpp`

<!--more-->

## 二 FdActivity、DetectionBasedTracker和jni的关系

### 2.1 之间的调用关系

FdActivity中调用DetectionBasedTracker.java中的start()方法时

执行DetectionBasedTracker.java中的native方法`nativeStart(long thiz)`

DetectionBasedTracker.java中的native方法已在jni中的`DetectionBasedTracker_jni.h`中声明

DetectionBasedTracker_jni.cpp中实现了`DetectionBasedTracker_jni.h`中声明的方法

![][1]

### 2.2 调用关系示意图
![][2]

## 三 知识要点

* 具备知识：NDK和JNI
* 依赖：OpenCV和javacpp及javacv

## 四 项目迁移

### 4.1 创建新项目如(MyOpenCV)

![][3]

### 4.2 添加opencv及依赖

#### 4.2.1 导入opencv-sdk

依次点击：File——>New——>Import module from source，导入opencv-sdk
![][4]

#### 4.2.2 配置NDK

导入后，可能会显示如下错误(可能是未下载NDK或配置NDK引起)
![][5]

安装NDK：点击SDK Manager——>Appearance&Behavior>System Settings>Android SDK——>SDK Tools，安装NDK和CMake
![][6]

配置SDK：依次点击：File——>Project Struct——>SDK Location，选择NDK文件位置

![][7]

settings.gradle中配置opencv-sdk(因为与项目在同一目录下，opencvsdk=''，上一级目录，opencvsdk='../')

```
def opencvsdk=''
//def opencvsdk='/<path to OpenCV-android-sdk>'
include ':opencv'
project(':opencv').projectDir = new File(opencvsdk + '/sdk')
```

app/build.gradle下添加opencv和javacpp，javacv

```
  //opencv-人脸检测
  implementation project(':opencv')
  //人脸识别
  implementation 'org.bytedeco:javacpp:1.5.5' //javacpp
  implementation 'org.bytedeco:javacv:1.5.5' //javac

  implementation group: 'org.bytedeco', name: 'javacv-platform', version: '1.5.5'
  implementation group: 'org.bytedeco', name: 'javacpp-platform', version: '1.5.5'
```

### 4.3 迁移项目代码(代码文件+jni文件+布局文件)

* 代码文件：将文件(FdActivity和DetectionBasedTracker)迁移到新项目的java/[包名]下
* 布局文件：`layout/face_detect_surface_view.xml`迁移到新项目layout下
* 资源文件：`raw/lbpcascade_frontalface.xml`迁移到新项目res目录下
* jni：`face-detection/jni`迁移到新项目的`main`目录下

![][8]

### 4.4  根据native方法生成jni下的`.h`和`.cpp`文件

jni下的`.h`和`.cpp`文件是根据包名生成的，新项目的native识别不了旧项目的`.h`和`.cpp`文件出错

![][9]

将jni文件夹中的`DetectionBasedTracker_jni.h`和`DetectionBasedTracker_jni.cpp`删除，此时jni下只有

```
Android.mk
Application.mk
CMakeLists.txt
```

在main/java右键——>`Open in Terminal`，打开CMD终端，此时cmd中代码显示位置为

```
D:\Code\Android\MyOpenCV\app\src\main\java>
```

执行`javah`命令，将将native方法生成对应的`.h`头文件

```
javah -d ../jni -jni com.example.myopencv.DetectionBasedTracker
```

说明：

* javah：是javah命令集，可以执行操作生成`.h`头文件
* -d：目的文件位置：`../jni`：表示java上一级的jni目录下
* -jni：生成 JNI 样式的标头文件 (默认值)(输入javah时，可显示options选项查看)
* com.example.myopencv.DetectionBasedTracker：native方法所在文件的路径(包名+类名)

![][10]

删除包名前缀`com_example_myopencv_`，文件名为`DetectionBasedTracker_jni.h`，同时将`DetectionBasedTracker_jni.h`复制一份改名为`DetectionBasedTracker_jni.cpp`（因为Android.mk指定了cpp的文件名）

```
LOCAL_SRC_FILES  := DetectionBasedTracker_jni.cpp
LOCAL_C_INCLUDES += $(LOCAL_PATH)
LOCAL_LDLIBS     += -llog -ldl

LOCAL_MODULE     := detection_based_tracker

include $(BUILD_SHARED_LIBRARY)
```

### 4.5 配置NDK

#### 4.5.1  app/build.grale

defaultConfig

```
externalNativeBuild {
    cmake {
              arguments "-DOpenCV_DIR=" + project(':opencv').projectDir + "/native/jni",
                        "-DANDROID_TOOLCHAIN=clang",
                        "-DANDROID_STL=c++_shared"
              targets "detection_based_tracker"
                ///abiFilters  "armeabi-v7a" , "arm64-v8a", "x86", "x86_64"
          }
   }
```

android{}

```
sourceSets {  //配置地址修改
        main {
            java.srcDirs = ['src/main/java']
            aidl.srcDirs = ['src/main/java']
            res.srcDirs = ['src/main/res']
            manifest.srcFile 'src/main/AndroidManifest.xml'
        }
    }
externalNativeBuild {
        cmake {
            path 'src/main/jni/CMakeLists.txt'  //配置地址修改
        }
    }     
```

#### 4.5.2 project/build.gradle（APP_ABI）

```
gradle.afterProject { project ->
    if (project.pluginManager.hasPlugin('com.android.application')
            || project.pluginManager.hasPlugin('com.android.library')
            || project.pluginManager.hasPlugin('com.android.test')
            || project.pluginManager.hasPlugin('com.android.feature') ) {
        if (true) {
            gradle.println("Override build ABIs for the project ${project.name}")
            project.android {
                splits {
                    abi {
                        enable true
                        universalApk false

//reset()
//include 'armeabi-v7a'
//include 'arm64-v8a'
//include 'x86'
//include 'x86_64'

                    }
                }
            }
        }

        if (true) {
            gradle.println("Override lintOptions for the project ${project.name}")
            project.android {
                lintOptions {
                    // checkReleaseBuilds false
                    abortOnError false
                }
            }
        }

        // (you still need to re-build OpenCV with debug information to debug it)
        if (true) {
            gradle.println("Override doNotStrip-debug for the project ${project.name}")
            project.android {
                buildTypes {
                    debug {
                        packagingOptions {
                            doNotStrip '**/*.so'  // controlled by OpenCV CMake scripts
                        }
                    }
                }
            }
        }
        if (false || project.hasProperty("doNotStrip")) {
            gradle.println("Override doNotStrip-release for the project ${project.name}")
            project.android {
                buildTypes {
                    release {
                        packagingOptions {
                            doNotStrip '**/*.so'  // controlled by OpenCV CMake scripts
                        }
                    }
                }
            }
        }

    }
}
```

#### 4.5.3  OpenCV API level is android-21(opencv-sdk的minSdkVersion为21)

```
D:\Code\Android\MyOpenCV\app\src\main\jni\CMakeLists.txt : C/C++ debug|x86 : CMake Warning at D:/Code/Android/MyOpenCV/sdk/native/jni/abi-x86/OpenCVConfig.cmake:105 (message):
  Minimum required by OpenCV API level is android-21
Call Stack (most recent call first):
  D:/Code/Android/MyOpenCV/sdk/native/jni/OpenCVConfig.cmake:44 (include)
  CMakeLists.txt:8 (find_package)
```

请将minSdkVersion设置为21

```
minSdkVersion 21
```

#### 4.5.4 OS independent 冲突

现象

```
More than one file was found with OS independent path 'META-INF/native-image/ios-x86_64/jnijavacpp/reflect-config.json'.
```

解决

```
 packagingOptions {
        exclude 'META-INF/proguard/androidx-annotations.pro'
        exclude 'META-INF/native-image/**'
}        
```

#### 4.5.5 修改`DetectionBasedTracker_jni.cpp`文件

**将示例项目中的头文件copy到`DetectionBasedTracker_jni.cpp`头部**

```
#include <DetectionBasedTracker_jni.h>
#include <opencv2/core.hpp>
#include <opencv2/objdetect.hpp>

#include <string>
#include <vector>

#include <android/log.h>

#define LOG_TAG "FaceDetection/DetectionBasedTracker"
#define LOGD(...) ((void)__android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__))

using namespace std;
using namespace cv;

inline void vector_Rect_to_Mat(vector<Rect>& v_rect, Mat& mat)
{
    mat = Mat(v_rect, true);
}

class CascadeDetectorAdapter: public DetectionBasedTracker::IDetector
{
public:
    CascadeDetectorAdapter(cv::Ptr<cv::CascadeClassifier> detector):
            IDetector(),
            Detector(detector)
    {
        LOGD("CascadeDetectorAdapter::Detect::Detect");
        CV_Assert(detector);
    }

    void detect(const cv::Mat &Image, std::vector<cv::Rect> &objects)
    {
        LOGD("CascadeDetectorAdapter::Detect: begin");
        LOGD("CascadeDetectorAdapter::Detect: scaleFactor=%.2f, minNeighbours=%d, minObjSize=(%dx%d), maxObjSize=(%dx%d)", scaleFactor, minNeighbours, minObjSize.width, minObjSize.height, maxObjSize.width, maxObjSize.height);
        Detector->detectMultiScale(Image, objects, scaleFactor, minNeighbours, 0, minObjSize, maxObjSize);
        LOGD("CascadeDetectorAdapter::Detect: end");
    }

    virtual ~CascadeDetectorAdapter()
    {
        LOGD("CascadeDetectorAdapter::Detect::~Detect");
    }

private:
    CascadeDetectorAdapter();
    cv::Ptr<cv::CascadeClassifier> Detector;
};

struct DetectorAgregator
{
    cv::Ptr<CascadeDetectorAdapter> mainDetector;
    cv::Ptr<CascadeDetectorAdapter> trackingDetector;

    cv::Ptr<DetectionBasedTracker> tracker;
    DetectorAgregator(cv::Ptr<CascadeDetectorAdapter>& _mainDetector, cv::Ptr<CascadeDetectorAdapter>& _trackingDetector):
            mainDetector(_mainDetector),
            trackingDetector(_trackingDetector)
    {
        CV_Assert(_mainDetector);
        CV_Assert(_trackingDetector);

        DetectionBasedTracker::Parameters DetectorParams;
        tracker = makePtr<DetectionBasedTracker>(mainDetector, trackingDetector, DetectorParams);
    }
};
```

**将示例项目中每个方法的实现copcy到对应方法上(nativeCreateObject为例)**

修改前

```
/*
 * Class:     com_example_myopencv_DetectionBasedTracker
 * Method:    nativeCreateObject
 * Signature: (Ljava/lang/String;I)J
 */
JNIEXPORT jlong JNICALL Java_com_example_myopencv_DetectionBasedTracker_nativeCreateObject
  (JNIEnv *, jclass, jstring, jint);
```

修改后

```
/*
 * Class:     com_example_myopencv_DetectionBasedTracker
 * Method:    nativeCreateObject
 * Signature: (Ljava/lang/String;I)J
 */
JNIEXPORT jlong JNICALL Java_com_example_myopencv_DetectionBasedTracker_nativeCreateObject
        (JNIEnv * jenv, jclass, jstring jFileName, jint faceSize)
{
    LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeCreateObject enter");
    const char* jnamestr = jenv->GetStringUTFChars(jFileName, NULL);
    string stdFileName(jnamestr);
    jlong result = 0;

    LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeCreateObject");

    try
    {
        cv::Ptr<CascadeDetectorAdapter> mainDetector = makePtr<CascadeDetectorAdapter>(
                makePtr<CascadeClassifier>(stdFileName));
        cv::Ptr<CascadeDetectorAdapter> trackingDetector = makePtr<CascadeDetectorAdapter>(
                makePtr<CascadeClassifier>(stdFileName));
        result = (jlong)new DetectorAgregator(mainDetector, trackingDetector);
        if (faceSize > 0)
        {
            mainDetector->setMinObjectSize(Size(faceSize, faceSize));
            //trackingDetector->setMinObjectSize(Size(faceSize, faceSize));
        }
    }
    catch(const cv::Exception& e)
    {
        LOGD("nativeCreateObject caught cv::Exception: %s", e.what());
        jclass je = jenv->FindClass("org/opencv/core/CvException");
        if(!je)
            je = jenv->FindClass("java/lang/Exception");
        jenv->ThrowNew(je, e.what());
    }
    catch (...)
    {
        LOGD("nativeCreateObject caught unknown exception");
        jclass je = jenv->FindClass("java/lang/Exception");
        jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeCreateObject()");
        return 0;
    }

    LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeCreateObject exit");
    return result;
}
```

### 4.6 添加权限

```
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.CAMERA" />

  <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
  <uses-feature
        android:name="android.hardware.camera.autofocus"
        android:required="false" />
  <uses-feature
        android:name="android.hardware.camera.front"
        android:required="false" />
  <uses-feature
        android:name="android.hardware.camera.front.autofocus"
        android:required="false" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### 4.7 效果图
![][11]

## 五 说明
* 因为添加了人脸识别导致apk的体积增大(700M左右)
* 下面讲解如何通过修改依赖降低apk的体积


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-fdactivity-native-jni-progress.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-file-use-order.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-new-project-create.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-project-import-opencv-sdk.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-sdk-import-not-configure-eror.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-ndk-camke-download.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-project-ndk-config.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-face-detection-move-new-project.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-native-fun-error.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-javah-hfile-make.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-porject-move-result.png


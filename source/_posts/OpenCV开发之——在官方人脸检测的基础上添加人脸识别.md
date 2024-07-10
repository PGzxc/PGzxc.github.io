---
title: OpenCV开发之——在官方人脸检测的基础上添加人脸识别
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 12f8f642
date: 2021-07-13 17:24:32
---
## 一 概述

* OpenCV自带的`face-detection`示例，只有人脸检测功能，没有人脸识别
* 识别成功有多个人脸的情况，选择第一个出现的人脸
* 识别人脸的结果(Mat(人脸特征)和Rect(识别区域大小))保存为本地图像
* 将本地图像和本地图片库进行对比，识别结果>90为识别成功

<!--more-->

## 二 类库说明

### 2.1 人脸检测库(opencv)

**仓库地址**

* [Github地址-opencv](https://github.com/opencv/opencv)
* [OpenCV官网地址](https://opencv.org/)

**引用方式**

```
implementation project(':opencv')
```

### 2.2 人脸识别库(javacpp和javacv)

**仓库地址**

* [MavenCenter-javacpp](https://mvnrepository.com/artifact/org.bytedeco/javacpp)
* [MavenCenter-javacpp-platform](https://mvnrepository.com/artifact/org.bytedeco/javacpp-platform)
* [MavenCenter-JavaCV](https://mvnrepository.com/artifact/org.bytedeco/javacv)
* [MavenCenter-JavaCV-platform](https://mvnrepository.com/artifact/org.bytedeco/javacv-platform)

**引用方式**

```
 //人脸识别
implementation 'org.bytedeco:javacpp:1.5.5' //javacpp
implementation 'org.bytedeco:javacv:1.5.5' //javac

implementation group: 'org.bytedeco', name: 'javacv-platform', version: '1.5.5'
implementation group: 'org.bytedeco', name: 'javacpp-platform', version: '1.5.5'
```

## 三 face-detection项目说明

### 3.1 项目代码结构

![][1]

### 3.2 代码说明

* FdActivity：人脸识别界面
* DetectionBasedTracker.java：JNI，FdActivity通过此方法调用jni文件夹下的`DetectionBasedTracker_jni.cpp`文件
* DetectionBasedTracker_jni.h：DetectionBasedTracker.java实现的方法头
* DetectionBasedTracker_jni.cpp：DetectionBasedTracker_jni.h中方法实现

### 3.3 调用关系
![][2]

## 四 人脸识别实现(FdActivity)

### 4.1 人脸检测成功

#### 4.1.1 过程

* 检测到了人脸(facesArray数组不为空)
* 2秒内检测到的人脸大于5个
* 人懒检测失败后，重新进行检测
* 人脸检测成功，进行人脸识别

#### 4.1.2 代码

**人脸检测代码**

```
  boolean isFirst = true;
  long startTime;
  long endTime;
  public Mat onCameraFrame(CvCameraViewFrame inputFrame) {
  		//...省略代码部分
        Rect[] facesArray = faces.toArray();
        for (Rect rect : facesArray) {
            Imgproc.rectangle(mRgba, rect.tl(), rect.br(), FACE_RECT_COLOR, 3);
        }
        //执行人脸识别操作
        if (isFirst && facesArray.length != 0) {
            startTime = System.currentTimeMillis();
            endTime = System.currentTimeMillis() + 2000;
            isFirst = false;
        }
        if (isFaceRecon(System.currentTimeMillis(), endTime, facesArray) && facesArray.length != 0) {
            onFaceLocalLib(mRgba, facesArray[0], mOpenCvCameraView);
        } else { //识别失败，重新识别
            isFirst = true;
        }
        return mRgba;
    }
```

**2s内识别人脸个数大于5**

```
/**
 * 在2秒内识别出的数目>5才是识别成功
 */
 public boolean isFaceRecon(long startTime, long endTime, Rect[] facesArray) {
        if (startTime < endTime) {
            if (facesArray.length == 1) {
                num++;
            } else {
                num = 0;
            }
        }
        return num > 5;
    }
```

### 4.2 人脸识别

#### 4.2.1 界面布局
![][3]

```
第一个图像显示识别出的图像
相似度：根据识别出的图像与本地库对比结果
照片库：显示照片库中的图片
```

#### 4.2.2 FaceUtil工具类

```
public class FaceUtil {

    private static final String TAG = "FaceUtil";

    private FaceUtil() {
    }

    /**
     * 特征保存
     *
     * @param image Mat
     * @param rect  人脸信息
     * @return 保存是否成功
     */
    public static boolean saveImage(Mat image, Rect rect) {
        // 原图置灰
        Mat grayMat = new Mat();
        Imgproc.cvtColor(image, grayMat, Imgproc.COLOR_BGR2GRAY);
        //Imgproc.cvtColor(image, grayMat, Imgproc.COLORMAP_JET);
        // 把检测到的人脸重新定义大小后保存成文件
        Mat sub = grayMat.submat(rect);
        Mat mat = new Mat();
        Size size = new Size(100, 100);
        Imgproc.resize(sub, mat, size);
        return Imgcodecs.imwrite(getRecFileName(), mat);
    }

    /**
     * 删除特征
     *
     * @param context  Context
     * @param fileName 特征文件
     * @return 是否删除成功
     */
    public static boolean deleteImage(Context context, String fileName) {
        // 文件名不能为空
        if (TextUtils.isEmpty(fileName)) {
            return false;
        }
        // 文件路径不能为空
        String path = getRecFileNameList()[0];
        if (path != null) {
            File file = new File(path);
            return file.exists() && file.delete();
        } else {
            return false;
        }
    }

    /**
     * 提取特征
     *
     * @param
     * @param fileName 文件名
     * @return 特征图片
     */
    public static Bitmap getImage(String fileName) {
        //String filePath = getRecFileNameList()[0];
        if (TextUtils.isEmpty(fileName)) {
            return null;
        } else {
            return BitmapFactory.decodeFile(fileName);
        }
    }

    public static double recon(Context context) {
        String[] dataPath = getDataFileNameList();
        String recPath = getRecFileNameList()[0];
        double diff = 0;
        for (int i = 0; i < dataPath.length; i++) {
            diff = compare(dataPath[i], recPath);
            if (diff >= 90) {
                break;
            }
        }
        return diff;
    }

    /**
     * 特征对比
     *
     * @param
     * @param fileName1 人脸特征
     * @param fileName2 人脸特征
     * @return 相似度
     */
    public static double compare(String fileName1, String fileName2) {
        try {
            IplImage image1 = cvLoadImage(fileName1, opencv_imgcodecs.IMREAD_GRAYSCALE);
            IplImage image2 = cvLoadImage(fileName2, opencv_imgcodecs.IMREAD_GRAYSCALE);
            if (null == image1 || null == image2) {
                return -1;
            }

            int l_bins = 256;
            int hist_size[] = {l_bins};
            float v_ranges[] = {0, 255};
            float ranges[][] = {v_ranges};

            IplImage imageArr1[] = {image1};
            IplImage imageArr2[] = {image2};
            CvHistogram Histogram1 = CvHistogram.create(1, hist_size, CV_HIST_ARRAY, ranges, 1);
            CvHistogram Histogram2 = CvHistogram.create(1, hist_size, CV_HIST_ARRAY, ranges, 1);
            cvCalcHist(imageArr1, Histogram1, 0, null);
            cvCalcHist(imageArr2, Histogram2, 0, null);
            cvNormalizeHist(Histogram1, 100.0);
            cvNormalizeHist(Histogram2, 100.0);
            // 参考：http://blog.csdn.net/nicebooks/article/details/8175002
            double c1 = cvCompareHist(Histogram1, Histogram2, CV_COMP_CORREL) * 100;
            double c2 = cvCompareHist(Histogram1, Histogram2, CV_COMP_INTERSECT);
//            Log.i(TAG, "compare: ----------------------------");
//            Log.i(TAG, "compare: c1 = " + c1);
//            Log.i(TAG, "compare: c2 = " + c2);
//            Log.i(TAG, "compare: 平均值 = " + ((c1 + c2) / 2));
//            Log.i(TAG, "compare: ----------------------------");
            return (c1 + c2) / 2;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    /**
     * @return 路径
     */
    public static File getDataSourcePath() {
        File file = new File(Environment.getExternalStorageDirectory(), "/FaceDetect/sourcePic/");
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
        //return new File(Environment.getExternalStorageDirectory(),"/FaceDetect/sourcePic/");
    }

    public static File getRecPath() {
        File file = new File(Environment.getExternalStorageDirectory(), "FaceDetect");
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
        // return new File(Environment.getExternalStorageDirectory(),"FaceDetect");
    }

    private static String getRecFileName() {
        String name = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss").format(new Date()) + ".jpg";
        return new File(getRecPath().getAbsolutePath(), name).getAbsolutePath();
        //return getRecPath().getAbsolutePath() + new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss").format(new Date()) + ".jpg";
    }

    /**
     * @return
     * @description：获取识别库下的所有文件
     */
    public static String[] getDataFileNameList() {
        File pathName = getDataSourcePath();
        File[] files = pathName.listFiles();
        String[] fileNames = null;
        if (files != null) {
            fileNames = fileFilterEnd(files, "jpg");
            Arrays.sort(fileNames, Collections.reverseOrder());
        }
        return fileNames;
    }

    /**
     * @return
     * @description：获取最近识别出的文件
     */
    public static String getRecFileAbsolutePath() {
        String fileName = FaceUtilNew.getRecFileNameList()[0];
        return new File(getRecPath().getAbsolutePath(), fileName).getAbsolutePath();
    }

    public static String[] getRecFileNameList() {
        File pathName = getRecPath();
        File[] files = pathName.listFiles();
        String[] fileNames = null;
        if (files != null) {
            fileNames = fileFilterEnd(files, "jpg");
            Arrays.sort(fileNames, Collections.reverseOrder());
        }
        return fileNames;
    }
    //删除所有临时文件
    public static void deleteRecFiles(){
        String [] recStringFiles=getRecFileNameList();
        for (String str:recStringFiles) {
            File file=new File(getRecPath().getAbsolutePath(),str);
            file.delete();
        }
    }

    private static String[] fileFilterEnd(File[] f, String end) {
        int count = 0;
        for (int i = 0; i < f.length; i++) {
            if (f[i].getName().endsWith(end)) count++;
        }
        String[] s1 = new String[count];
        count = 0;
        for (int i = 0; i < f.length; i++) {
            if (f[i].getName().endsWith(end)) {
                s1[count] = f[i].getName();
                count++;
            }
        }
        return s1;
    }
}
```

#### 4.2.3 识别成功后，将识别到的图像保存到本地文件夹下([内部存储]/FaceDetect/yyyy-MM-dd-HH:mm:ss.jpg)

```
FaceUtil.saveImage(mat, rect); //将当前识别到的图像保存到/SDCard/FaceDetect文件夹下
```

#### 4.2.4 将识别到图片与本地库进行对比

```
 public void onFaceLocalLib(final Mat mat, final Rect rect, final CameraBridgeViewBase mOpenCvCameraView) {
 runOnUiThread(new Runnable() {
            @Override
            public void run() {
                FaceUtil.saveImage(mat, rect); //将当前识别到的图像保存到/SDCard/FaceDetect文件夹下
                String[] dataFileNameList = FaceUtil.getDataFileNameList(); //本地库所有源文件
                recPath = FaceUtil.getRecFileAbsolutePath();
                if (dataFileNameList.length == 0) {
                    Toast.makeText(FdActivity2.this,"图片库为空，请先准备本地图片库",Toast.LENGTH_SHORT).show();
                    //FaceUtil.deleteRecFiles();
                    //finish();
                    return;
                }
                for (String fileName : dataFileNameList) {
                    dataNamePath = new File(FaceUtilNew.getDataSourcePath().getAbsolutePath(), fileName).getAbsolutePath();
                    diff = FaceUtil.compare(dataNamePath, recPath);
                    mImageViewFace1.setImageBitmap(FaceUtilNew.getImage(recPath));
                    mImageViewFace2.setImageBitmap(FaceUtilNew.getImage(dataNamePath));
                    mCmpPic.setText(String.format("相似度 :  %.2f", diff) + "%");
                    if (diff >= 75)
                        break;
                }
                if (diff <= 75) {
                    mOpenCvCameraView.enableView();
                } else {
                    mOpenCvCameraView.disableView();
                    Toast.makeText(FdActivity2.this, "识别成功！！" + diff, Toast.LENGTH_LONG).show();
                }
            }
        });
    }
```

说明：

* 若本地图片库为空，提示用户，实现存储本地图片库
* 若本地图片库不为空，获取本地库中的每一个图片进行对比

#### 4.2.5 摄像头前置

opencv默认的为后置摄像头，若修改打开时的摄像头为前置请设置

```
mOpenCvCameraView.setCameraIndex(CameraBridgeViewBase.CAMERA_ID_FRONT);
```

前置和后置摄像头属性

```
 public static final int CAMERA_ID_BACK  = 99;
 public static final int CAMERA_ID_FRONT = 98;
```
#### 4.2.6 识别成功或识别后，删除识别图片

```
FaceUtil.deleteRecFiles()
```

### 4.3 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-face-detection-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-file-use-order.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-fdactivity-layout.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-people-recognize.png


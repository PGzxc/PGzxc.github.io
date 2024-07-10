---
title: Android硬件开发之——传感器概述
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 传感器概述
abbrlink: 209a37a7
date: 2018-02-28 10:44:57
---
# 前言 
本文主要讲述与Android硬件相关的传感器方面的知识，将从以下几个方面展开：  

- 传感器种类  
- Android sensor framework
- 硬件传感器和软件传感器 
- ASF支持的传感器  
- ASF中的主要类和接口  
- 获取当前Android设备支持的传感器
  
<!--more-->   

## 传感器种类   
传感器是第二代智能手机的重要标志之一。可以毫不客气地说，现在市面上的Android手机和平板电脑（TV除外）都内置了传感器。否则很多游戏和应用就无法使用了。Android SDK支持的传感器并不是每一部Android设备都支持所有的传感器。大多数Android设备只支持一部分传感器。例如，方向传感器（电子罗盘）、重力传感器（屏幕翻转、赛车游戏等）。    

Android传感器主要分为以下三个方面   

- 动作（Motion）传感器  
- 环境（Environmental）传感器  
- 位置（Position）传感器  

### 动作（Motion）传感器    
 这类传感器在三个轴（X、Y、Z）上测量加速度和旋转角度。包括如下几个传感器。  

- 加速（accelerometer）传感器
- 重力（gravity）传感器  
- 陀螺仪（gyroscope）传感器  
- 旋转向量（rotational vector ）传感器  

### 环境（Environmental）传感器    
这类传感器可以测量不同环境的参数，例如，周围环境的空气温度和压强、光照强度和湿度。包括如下几个传感器。   

- 湿度（barometer）传感器  
- 光线（photometer）传感器   
- 温度（thermometer）传感器  

### 位置（Position）传感器    
这类传感器可以测量设备的物理位置。包括如下几个传感器。  

- 方向（orientation）传感器  
- 磁力（magnetometer）传感器  

## Android sensor framework  
Android SDK提供了Android sensor framework，可以用来访问当前Android设备内置的传感器。ASF提供了很多类和接口，可以帮助我们完成各种与传感器有关的任务。例如，可以利用ASF完成下面的工作。   

- 确定当前Android设备内置了哪些传感器。  
- 确定某一个传感器的技术指标。例如，该传感器能测量的最大范围、传感器的制造商、对电量的要求、测量的精度等。  
- 获取传感器传回来的数据，以及定义传感器回传数据的精度。  
- 注册和注销传感器事件监听器，这些监听器用于监听传感器的变化，通常从传感器回传的数据需要利用这些监听器完成。   

## 硬件传感器和软件传感器   
ASF允许我们访问很多传感器类型，这些传感器有一些是基于硬件的传感器，还有一些是基于软件的传感器。基于硬件的传感器就是直接以芯片形式嵌入到Android设备中，这些传感器直接从外部环境获取数据，例如，加速传感器、磁场传感器都属于硬件传感器。基于软件的传感器并不是实际的硬件芯片，尽管这些传感器重使用上很像基于硬件的传感器。基于软件的传感器传回的数据本质上也来自于基于硬件的传感器，只是这些数据通常会经过二次加工，也就是说，基于软件的传感器传回的数据可能来自一个或多个基于硬件的传感器，并且有可能Android系统使用某些算法处理了这些数据。所以基于软件的传感器也可以称为虚拟（virtual）传感器或合成（synthetic）传感器。    

## ASF支持的传感器   
所有的常量都在Sensor类中定义。   
![][1]  

- TYPE_ACCELEROMETER：加速传感器（硬件传感器）
- TYPE_AMBIENT_TEMPERATURE：温度传感器（硬件传感器）
- TYPE_GRAVITY：重力传感器（硬件或软件传感器）
- TYPE_GYROSCOPE：陀螺仪传感器（硬件传感器）
- TYPE_LIGHT：光线传感器（硬件传感器）
- TYPE_LINEAR_ACCELERATION：线性加速传感器（硬件或软件传感器）
- TYPE_MAGNETIC_FIELD：磁场传感器（硬件传感器）
- TYPE_ORIENTATION：方向传感器（软件传感器），数据来自重力和磁场传感器
- TYPE_PRESSURE：压力传感器（硬件传感器）
- TYPE_PROXIMITY：临近传感器（硬件传感器）
- TYPE_RELATIVE_HUMIDITY：湿度传感器（硬件传感器）
- TYPE_ROTATION_VECTOR：旋转向量传感器（硬件或软件传感器）
-  TYPE_TEMPERATURE：温度传感器（硬件传感器），从Android4.0（API Level = 14）开始被TYPE_AMBIENT_TEMPERATURE取代。   

## ASF中的主要类和接口  

- SensorManager类：用于创建sensor service的实例。该类提供了很多用于访问和枚举传感器，注册和注销传感器监听器的方法。而且还提供了与传感器精度、扫描频率、校正有关的常量。
- Sensor类：提供了一些用于获取传感器技术参数的方法。如版本、类型、生产商等。
- SensorEvent类：系统使用该类创建传感器事件对象。该对象可以提供与传感器事件有关的信息。传感器事件对象包括的信息有原始的传感器回传数据、传感器类型、数据的精度以及触发事件的时间。
- SensorEventListener接口：该接口包含两个回调方法，当传感器的回传值或精度发生变化时，系统会调用这两个回调方法。

# 获取手机传感器  
具体请参考[代码][3]
![][2]  




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sense-type.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/sense-list-phone.png  
[3]: https://github.com/PGzxc/SenseList
  

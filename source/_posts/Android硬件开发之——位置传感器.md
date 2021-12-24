---
title: Android硬件开发之——位置传感器
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 位置传感器
abbrlink: 526e60bb
date: 2018-02-28 16:32:20
---
# 前言  
本文主要讲述位置传感器，主要包含以下内容：   

- 位置传感器概述  
- 位置传感器的作用  
- 位置传感器的回传数据  

<!--more-->  

# 位置传感器  

## 位置传感器概述
Android平台提供了两个传感器用于确定设备的位置，这两个传感器是磁场传感器和方向传感器。Android平台还提供了测量设备正面到某一个邻近物体距离的传感器（邻近传感器）。磁场传感器和邻近传感器是基于硬件的传感器。大多数Android手机和平板电脑都有磁场传感器。而邻近传感器通常在手机中很常见。因为可以用该传感器测试接听电话时手机屏幕离脸有多远。可以可以在贴近耳朵接听电话时完成某些工作。方向传感器是基于软件的，该传感器的回传数据来自加速度传感器和磁场传感器。  

## 位置传感器的作用  
位置传感器对于确定设备在真实世界中的物理位置非常有用。例如，可以组合磁场传感器和加速度传感器测量设备相对于地磁北极的位置，还可以利用方向传感器确定当前设备相对于自身参照系的位置。   

磁场传感器和方向传感器都返回值3个值（SensorEvent.values），而邻近传感器只返回1个值。  

## 方向传感器  

### SensorEvent.values[0]：
绕着Z轴旋转的角度。如果Y轴（正常拿手机的方向）正对着北方，该值是0，如果Y轴指向南方，改值是180，Y轴指向东方，该值是90，如果Y轴指向西方，该值是270。  

### SensorEvent.values[1]  
绕着X轴旋转的度数。当从Z轴正方向朝向Y轴正方向，改值为正值。反之，为负值。该值在180至-180之间变动。
### SensorEvent.values[2]  
绕着Y轴旋转的度数。当从Z轴正方向朝向X轴正方向，改值为正值。反之，为负值。该值在180至-180之间变动。  

## 磁场传感器  
### SensorEvent.values[0]  
沿着X轴的磁力(μT，millitesla）
### SensorEvent.values[1]  
沿着Y轴的磁力(μT，millitesla）
### SensorEvent.values[2]
沿着Y轴的磁力(μT，millitesla）
## 邻近传感器  
### SensorEvent.values[0]  
手机正面距离邻近物理的距离（CM）

# 实战 
以位置传感器为例：  
## OnResume注册监听  

	mSensorManager.registerListener(this,
                mSensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY),
                SensorManager.SENSOR_DELAY_UI);  

## OnPause反注册 

	 mSensorManager.unregisterListener(this);  



 
 


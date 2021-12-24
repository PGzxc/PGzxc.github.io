---
title: Android硬件开发之——环境传感器
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 环境传感器
abbrlink: 2c10b3e1
date: 2018-02-28 16:50:05
---
# 前言 
本文讲述环境传感器，主要内容有：  

- 环境传感器概述 
- 环境传感器的回传数据

<!--more-->  

# 环境传感器 
## 环境传感器概述
Android平台提供了4个传感器，用于检测不同的外部环境。我们可以使用这些传感器检测周围。例如，可以检测周围空气的湿度、光线、空气的压强和温度。这4个传感器都是基于硬件的传感器。除了光线传感器外，其他3个传感器在普通的Android设备中很少见。所以如果使用环境传感器，最好运行时对当前Android设备所支持的传感器是否检测。
  
## 环境传感器的返回值 
大多数动作传感器和位置传感器都返回多个值，而所有的环境传感器都只返回一个值（SensorEvent.values[0]）。例如温度传感器返回摄氏度（°C）、压力传感器返回压强值（hPa）。还有就是环境传感器返回的值很少收到杂音的干扰，而动作和位置传感器经常需要消除杂音的影响。例如，加速度传感器要消除重力对其回传值的影响。
  
## 环境传感器的返回值（说明）  

- YPE_AMBIENT_TEMPERATURE ：event.values[0] 	°C
- TYPE_LIGHT：event.values[0] 	lx 
- TYPE_PRESSURE：event.values[0] 	hPa
- TYPE_RELATIVE_HUMIDITY ：event.values[0] 	RH（%）	

## 光线传感器回传数据
 
### public static final float LIGHT_SUNLIGHT_MAX = 120000.0f;    
	//最强的光线强度（估计只有沙漠地带才能达到这个值）
### public static final float LIGHT_SUNLIGHT  =  110000.0f;   
	//万里无云时阳光直射的强度
### public static final float LIGHT_SHADE  =  20000.0f;    
	//有阳光，但被云彩抵消了部分光线时的强度
###  public static final float LIGHT_OVERCAST     = 10000.0f;	    
	//多云时的光线强度 
### public static final float LIGHT_SUNRISE      = 400.0f;  
	//太阳刚刚升起时（日出）的光线强度
### public static final float LIGHT_CLOUDY       = 100.0f;   
	//在阴雨天，没有太阳时的光线强度
### public static final float LIGHT_FULLMOON     = 0.25f;   
	//夜晚有月亮时的光线强度
### public static final float LIGHT_NO_MOON      = 0.001f;  
	//夜晚没有月亮时的光线强度（当然，也不能有路灯，就是漆黑一片）



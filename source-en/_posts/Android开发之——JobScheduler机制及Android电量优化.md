---
title: Android开发之——JobScheduler机制及Android电量优化
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - JobScheduler
  - 优化
abbrlink: 9dde4748
date: 2018-01-04 21:49:54
---
# 前言 

在Android Lollipop版本中增加了JobScheduler API，JobScheduler翻译为任务调度器，可以替代WakeLock和Alarm运行任务。那么他们的区别在哪呢？JobScheduler又有什么特别之处呢？   
<!--more-->

# JobScheduler特点   
## JobScheduler的省点功能  
使用JobScheduler替代WakeLock和Alarm运行任务，是因为后者在每个App中是相互独立的，而JobScheduler运行在操作系统层面。举个例子，如果10个App每小时唤醒设备一次，由于这些任务的执行时机不可能同步，因此使用WakeLock和Alarm一个小时内设备被唤醒了10一次！但由于JobScheduler是操作系统层面的，因此系统会执行设备唤醒的调度工作，每小时设备唤醒次数会显著减少。   

可能有朋友会问了，那使用JobScheduler每小时设备被唤醒次数降低到多少次呢？这个还真说不准，为什么说不准。是因为JobScheduler允许设定获取数据的时间间隔，比如把唤醒时间限制在8min后10min之前，这就给操作系统留出了一定的调整范围，使系统更好地协调设备唤醒任务，会达到一定的省电效果。  

2014年Google开发大会上指出，如果每个APP都使用这个API,那么可以节省15%到20%的电量     

## JobScheduler拥有更多的触发选项   
JobScheduler比AlarmManager有更多的触发选项，后者只有一个定时功能。   

	//Use the android.app.job.JobInfo.Builder toconfigure how the scheduled task should run.  
	//You can schedule the task to run underspecific conditions, such as:  
	//1.The device is charging  
	//2.The device is connected to an unmeterednetwork  
	//3.The system deems the device to be idle  
	//4.Completion with a minimum delay or within aspecific deadline 

这四个例子包括：充电状态、Wifi状态、设备空闲以及延长失败链接后重连的间隔时间，JobScheduler包下了这些状态的检测。有助于开发configure how the scheduled task should run.  

## JobScheduler的一些补充 

JobScheduler一个值得一提的是执行重复工作的能力，上面的状态4也提到了，这里的重复工作执行周期可以是线性的，也可以是指数性衰减的，即JobScheduler有两种延时工作的衰减方式，即线性衰减和指数衰减。  

因为我们的APP不处于前台时，可能并不需要这种频繁的数据更新，当然你依旧频繁的数据更新也没有让用户把耗电的罪名拐到你头上，因此为了Android生态的更加美好，我还是建议你如果看到这篇文章请尽可能的优化好你的APP。  

## Android电量优化的其他建议 
- 延迟非必须的操作到充电状态时，比如可以在夜间充电时完成APP的更新。  
- 当不需要传感器采集数据时，要取消注册  
- 合理使用定位功能，减少位置更新频率，或者根据实际情况使用不同精度的定位需求。   

参考：  


[JobServiceSample][1]  
[Android开发——JobScheduler机制以及Android电量优化][2]   
[在Android 5.0中使用JobScheduler][3]
[Android JobScheduler/JobService 工作调度][4]
[Android 8.0 的开机广播 和 IntentService][5]
[JobIntentService详解及使用][6]


[1]: https://github.com/PGzxc/JobServiceSample/
[2]: http://blog.csdn.net/SEU_Calvin/article/details/54799939     
[3]: http://blog.csdn.net/bboyfeiyu/article/details/44809395    
[4]: http://blog.csdn.net/qq_31726827/article/details/50462025 
[5]: https://www.jianshu.com/p/378819c21bde    
[6]: http://blog.csdn.net/houson_c/article/details/78461751
  



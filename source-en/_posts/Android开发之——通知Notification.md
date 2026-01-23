---
title: Android开发之——通知Notification
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Notification
abbrlink: de09b701
date: 2018-01-07 18:16:15
---
# 介绍
Android O引入了通知渠道(Notification Channels)，以提供统一的系统来帮助用户管理通知，如果是针对Android O为目标平台时，必须实现一个或者多个通知渠道，以向用户显示通知。若并不以Android O为目标平台，当应用运行在Android O设备上时，其行为将与运行在Android 7.0上时相同。  

开发者可以为需要发送的每个不同的通知类型创建一个通知渠道。还可以创建通知渠道来反映应用的用户做出的选择。例如，可以为聊天应用的用户创建的每个聊天组建立单独的通知渠道。  

Android O的用户可以使用一致的系统UI管理大多数与通知有关的设置。所有发布至通知渠道的通知都具有相同的行为。当用户修改任何下列特性的行为时，修改将作用于通知渠道；  
<!--more--> 

# 使用Notification  
## 通过NotificationManager的creaeNotificationChannel方法来创建NotificationChannel。  

	public void createNotificationChannel(String id, String name, int importance, String desc) {
        if (mNotificationManager.getNotificationChannel(id) != null) return;
        NotificationChannel notificationChannel = new NotificationChannel(id, name, importance);
        notificationChannel.enableLights(true);
        notificationChannel.enableVibration(true);
        notificationChannel.setLightColor(Color.RED);
        notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        notificationChannel.setShowBadge(true);
        notificationChannel.setBypassDnd(true);
        notificationChannel.setVibrationPattern(new long[]{100, 200, 300, 400});
        notificationChannel.setDescription(desc);
        mNotificationManager.createNotificationChannel(notificationChannel);
    }
NotificationChannel的方法列表：  

- getId()-获取ChannelId
- enableLights()-开启指示灯，如果设备有的话 
- setLightColor()-设置指示灯颜色
- enableVibration()-开启震动
- setImportance()-设置频道重要性
- getImportance()-获取频道重要性
- setSound()-设置声音
- getSound()-获取声音
- setGroup()-设置ChannleGroup
- getGroup()-得到ChannleGroup
- setBypassDnd()-设置绕过免打扰模式
- canBypassDnd()-检测是否绕过免打扰模式
- getName()-获取名称
- setLockScreenVisibility()-设置是否应在锁定屏幕上显示此频道的通知
- getLockScreenVisibility()-检测是否在锁定屏幕上显示此频道的通知
- setShowBage()-设置是否显示角标
- canShowBage()-检测是否显示角标

## setImportance重要程度 
importance越高，提示权限就越高，最高的支持发出声音和悬浮通知 

	public static final int IMPORTANCE_DEFAULT = 3;
	public static final int IMPORTANCE_HIGH = 4;
	public static final int IMPORTANCE_LOW = 2;
	public static final int IMPORTANCE_MAX = 5;
	public static final int IMPORTANCE_MIN = 1;
	public static final int IMPORTANCE_NONE = 0;
	public static final int IMPORTANCE_UNSPECIFIED = -1000;
## 删除NotificationChannel  
通过NotificationManager的deleteNotificationChannel方法来删除NotificationChannel。  

	mNotificationManager.deleteNotificationChannel(chatChannelId);
## 发出通知 
只需要设置一个Channelld既可发布到对应的Channel上，需要注意的是NotificationChannel一定要先创建才行。  

	Notification.Builder builder = new Notification.Builder(this, chatChannelId);
	builder.setSmallIcon(R.mipmap.ic_launcher)
        .setContentTitle("Gavin")
        .setContentText("Today released Android 8.0 version of its name is Oreo")
        .setAutoCancel(true);
	Intent resultIntent = new Intent(this, MainActivity.class);
	TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
	stackBuilder.addParentStack(MainActivity.class);
	stackBuilder.addNextIntent(resultIntent);
	PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
	builder.setContentIntent(resultPendingIntent);
	mNotificationManager.notify((int) System.currentTimeMillis(), builder.build());
## 显示角标 
首先要开启允许使用通知圆点，这个是用户可以取消的，如果你要显示一定要代码中保证是开启状态。  

### NotificationChannel开启角标 
	notificationChannel.setShowBadge(true);
### NotificationChannel设置角标样式
	new Notification.Builder(this, chatChannelId).setBadgeIconType(BADGE_ICON_SMALL)
### Notification设置角标计数
	new Notification.Builder(this, chatChannelId).setNumber(1)
## 跳转到设置
	Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
	intent.putExtra(Settings.EXTRA_CHANNEL_ID, chatChannelId);
	intent.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
	startActivity(intent);
## 使用NotificationChannleGroup 
如果你的通知渠道比较多，那么就可以考虑使用NotificationChannelGroup来管理一下  

### 创建NotificationChannleGroup 
和创建NotificaitonChannle类似 
	mNotificationManager.createNotificationChannelGroup(new NotificationChannelGroup(groupId, groupName)); 
### NotificationChannle 绑定 groupId  
	notificationChannel.setGroup(groupId);  
### 删除 NotificationChannleGroup  
可以批量删除该 Group 下的所有 Channel  
	mNotificationManager.deleteNotificationChannelGroup(groupId2);  

源码：  
[NotificationSample][0]

参考：  
[Android - 吃奥利奥系列(1) Notification][1]
[Android O Preview 之 通知渠道（Notification Channels）][2]



[0]: https://github.com/PGzxc/NotificationSample
[1]: https://juejin.im/entry/599cf2896fb9a0248228b2bf  
[2]: https://www.jianshu.com/p/92afa56aee05
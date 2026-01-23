---
title: Android开发之——Notification中使用TaskStackBuilder
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Notification
abbrlink: 92d18b21
date: 2018-01-07 16:00:33
---
# 前言 
在使用Notification通知栏的时候，用TaskStackBuilder来获取PendingIntent处理点击跳转到别的Activity，首先是用一般的PendingIntent来进行跳转。   

	
    mBuilder = new NotificationCompat.Builder(this).setContent(view)  
        .setSmallIcon(R.drawable.icon).setTicker("新资讯")  
        .setWhen(System.currentTimeMillis())  
        .setOngoing(false)  
        .setAutoCancel(true);  
	Intent intent = new Intent(this, NotificationShow.class);  
 	PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,  
 	intent, PendingIntent.FLAG_UPDATE_CURRENT);  
	mBuilder.setContentIntent(pendingIntent);  

<!--more-->  

# 简述  
这里是直接用PendingIntent来跳转到指定的NotificationShow，在运行效果上来看，首先发送了一条Notification到通知栏上，然后这时，我退出程序，即MainActivity已经不存在了，回到home主菜单，看到Notification仍然存在，当然，我们还没有点击或者cancle它。现在去点击Notification，跳转到NotificationShow界面，然后我们按下Back键，发现直接回到主界面。现在大多数Android应用都是在通知栏如果有Notification通知的话，点击它，然后会直接跳转到对应的应用程序的某个界面，这时如果回退，即按下Back键，会返回到该应用程序的主界面，而不是系统的主界面。所以用上面这种PendingIntent的做法达不到目的。这里我们使用TaskStackBuilder来做。  

	mBuilder = new NotificationCompat.Builder(this).setContent(view)  
                .setSmallIcon(R.drawable.icon).setTicker("新资讯")  
                .setWhen(System.currentTimeMillis())  
                .setOngoing(false)  
                .setAutoCancel(true);  
        Intent intent = new Intent(this, NotificationShow.class);  
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);  
        stackBuilder.addParentStack(NotificationShow.class);  
        stackBuilder.addNextIntent(intent);  
        PendingIntent pendingIntent = stackBuilder.getPendingIntent(0,  
                PendingIntent.FLAG_UPDATE_CURRENT);  
        mBuilder.setContentIntent(pendingIntent);  

显示用TaskStackBuilder.create(this)一个stackBuilder实例，接下来addParentStack()；关于这个方法，我们查一下官方API文档：Add the activity parent chain as specified by the parentActivityName attribute of the activity(or activity-alias) element in the application's mainifest to the task stack builder.这句话是说添加一个activity,与这个activity的mainifest文件中的parentActivityName的属性相关联。  

那么我们就在manifest文件中添加这个属性   

	<activity  
		android:name="com.shulf.notificationtest.NotificationShow"  
    	android:parentActivityName=".MainActivity" >  
	</activity>  
这里我让它的parentActivity为MainActivity，也就是说在NotificationShow这个界面点击回退时，会跳转到MainActivity这个界面，而不是像上面一样直接回到了程序的主菜单。运行一下，最后效果确实这样。  
# 效果  
![][3]  


参考：  
[Notification中使用TaskStackBuilder][1]     
[Android中的任务和返回栈][2]



[1]: http://blog.csdn.net/alone_slfly/article/details/41744323  
[2]: http://blog.csdn.net/lixiaodaoaaa/article/details/51700981  
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-notify.gif
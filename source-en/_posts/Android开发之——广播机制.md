---
title: Android开发之——Android广播机制
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 广播
abbrlink: 35f8b34f
date: 2018-01-05 00:08:25
---
# 前言  
BroadcastReceiver(广播接收器)，属于Android四大组件之一，在Android开发中，BroadcastReceiver的应用场景非常多，今天，我们将详细讲解关于BroadcastReceiver的一切相关知识。   
![][1]   

<!--more-->  
# 理论
## 定义  
广播，是一个全局的监听器，属于Android四大组件之一。Android广播分为两个角色：广播发送者、广播接收者。   
## 作用  
用于监听/接收应用发出的广播消息，并作出响应  
## 应用场景  
- 不同组件之间通信(包括应用内/不同应用之间)  
- 与Android系统在特定情况下的通信  
	如当电话呼入时，网络可用时  
- 多线程通信  
## 实现原理  
Android中的广播使用了设计模式中的观察者模式：基于消息的发布/订阅事件模型。因此，Android将广播的发送者和接收者解耦，使得系统方便集成，更易扩展。  
## 模型中有3个角色  
- 消息订阅者(广播接收者) 
- 消息发布者(广播发布者)
- 消息中心(AMS，即Activity Manager Service)  
![][2]   
## 原理描述：  
- 广播接收者通过Binder机制在AMS注册
- 广播发送者通过Binder机制向AMS发送广播
- AMS根据广播发送者要求，在已注册列表中，寻找合适的广播接收者    
	寻找依据：IntentFilter/Permission  
- AMS将广播发送到合适的广播接收者响应的消息循环队列中；
- 广播接收者通过消息循环拿到此广播，并回调onReceiver()   
特别注意：广播发送者和广播接收者的执行时异步的，发出去的广播不会关心有无接收者，也不确定接收者到底是何时才能接收到；  
## 具体流程  
具体使用流程如下：  
![][3]  

# 具体使用

## 自定义广播接收者BroadcastReceiver  
自定义广播接收者，继承自BroadcstReceiver基类，必须复写抽象方法onReceiver()方法 
 
- 广播接收器接收到响应广播后，会自动回调onReceiver()方法 
- 一般情况下，onReceiver方法会涉及其他组件之间的交互，如发送Notification、启动Service等 
- 默认情况下，广播接收器运行在UI线程，因此，onReceiver方法不能执行耗时操作，否则将导致ANR  

代码范例   
mBroadcastReceiver.java  

	public class mBroadcastReceiver extends BroadcastReceiver 
	{
		//接收到广播后自动调用该方法
		@Override
		public void onReceive(Context context, Intent intent) {//写入接收广播后的操作}
	}
## 广播接收器注册 
注册的方式分为两种：静态注册、动态注册  
### 静态注册  
- 在AndroidManifest.xml里通过<receiver>标签声明  
- 属性说明：   

		<receiver 
    	android:enabled=["true" | "false"]
		//此broadcastReceiver能否接收其他App的发出的广播
		//默认值是由receiver中有无intent-filter决定的：如果有intent-filter，默认值为true，否则为false
    	android:exported=["true" | "false"]
    	android:icon="drawable resource"
    	android:label="string resource"
		//继承BroadcastReceiver子类的类名
    	android:name=".mBroadcastReceiver"
		//具有相应权限的广播发送者发送的广播才能被此BroadcastReceiver所接收；
    	android:permission="string"
		//BroadcastReceiver运行所处的进程
		//默认为app的进程，可以指定独立的进程
		//注：Android四大基本组件都可以通过此属性指定自己的独立进程
    	android:process="string" >
		//用于指定此广播接收器将接收的广播类型
		//本示例中给出的是用于接收网络状态改变时发出的广播
		<intent-filter>
		<action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    	</intent-filter>
		</receiver>

- 注册示例  

		<receiver 
    	//此广播接收者类是mBroadcastReceiver
    	android:name=".mBroadcastReceiver" >
    	//用于接收网络状态改变时发出的广播
    	<intent-filter>
        	<action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    	</intent-filter>
		</receiver>
当此APP首次启动时，系统会自动实例化mBroadcastReceiver类，并注册到系统中。  
### 动态注册  
在代码中通过调用Context的registerReceiver()方法进行动态注册BroadcastReceiver，具体代码如下：  

	@Override
  	protected void onResume()
	{
      super.onResume();
    //实例化BroadcastReceiver子类 &  IntentFilter
     mBroadcastReceiver mBroadcastReceiver = new mBroadcastReceiver();
     IntentFilter intentFilter = new IntentFilter();
    //设置接收广播的类型
     intentFilter.addAction(android.net.conn.CONNECTIVITY_CHANGE);
    //调用Context的registerReceiver（）方法进行动态注册
     registerReceiver(mBroadcastReceiver, intentFilter);
	}
	//注册广播后，要在相应位置记得销毁广播
	//即在onPause() 中unregisterReceiver(mBroadcastReceiver)
	//当此Activity实例化时，会动态将MyBroadcastReceiver注册到系统中
	//当此Activity销毁时，动态注册的MyBroadcastReceiver将不再接收到相应的广播。
	@Override
	protected void onPause() 
	{
      super.onPause();
      //销毁在onResume()方法中的广播
      unregisterReceiver(mBroadcastReceiver);
     }
### 特别注意 
动态广播最好在Activity的onResume()注册、onPause销毁 
##### 原因：  
- 对于动态广播，有注册就必然得有注销，否则会导致内存泄漏   
重复注册、重复注销也不允许  
- Activity声明周期如下：  
![][4]  
Activity声明周期你的方法是成对出现的：
  
	- onCreate()&onDestroy()  
	- onstart()&onStop()  
	- onResume()&onPause()  

	在onResume()注册、onPause注销是因为onPause()在App死亡之前一定会被执行，从而保证广播在App死亡之前一定会被注销，从而防止内存泄漏。   

- 不在onCreate()&onDestroy()或onStart()&onStop()注册、注销是因为： 当系统内存不足(优先级更高的应用需要内存，请看上图红框)要回收Activity暂用的资源时，Activity在执行完onPause()方法后就会被销毁，有些声明周期方法onStop()，onDestroy()就不会执行。当再回到此Activity时，是从onCreate方法开始执行。  
- 假设我们将广播的注销放在onStop(),onDestroy()方法里的话，有可能在Activity被销毁后还未执行onStop，onDestroy()方法，即广播仍未注销，从而导致内存泄漏。   
- 但是，onPause()一定会被执行，从而保证了广播在App死亡前一定会被注销，从而防止了内存泄漏。  

### 两种注册方式的区别  
![][5]  
  
### 广播发送者向AMS发送广播  
### 广播的发送 
广播的类型主要分为5类：  

- 广播是用"意图(intent)"标识 
- 定义广播的本质：定义广播所具备的"意图(intent)" 
- 广播发送：广播发送者将次广播的"意图"通过sendBroadcast()方法发送出去   

### 广播的类型  
广播的类型主要分为5类
 
- 普通广播(Normal Broadcast)  
- 系统广播(System Broadcast)  
- 有序广播(Orderd Broadcast)  
- 粘性广播(Sticky Broadcast)  
- App应用内广播(Local Broadcast)   

具体说明如下：  
#### 普通广播(Normal Broadcast)  
即开发者自身定义intent的广播(最常用)，发送广播使用如下：   

	Intent intent=new Intent();  
	//对应BroadcastReceiver中intentFilter的action  
	intent.setAction(BROADCAST_ACTION);  
	//发送广播 
	sendBroadcast(intent);
- 若被注册了的广播接收者中注册时intentFilter的action与上述匹配，则会接受此广播(即进行回调onReceiver())。如下mBroadcastReceiver则会接收上述广播   

		<receiver 
    		//此广播接收者类是mBroadcastReceiver
    		android:name=".mBroadcastReceiver" >
    		//用于接收网络状态改变时发出的广播
    		<intent-filter>
        	<action android:name="BROADCAST_ACTION" />
    		</intent-filter>
		</receiver>
- 若发送广播有相应权限，那么广播接收者也需要相应权限  
#### 系统广播(System Broadcast)  
- Android中内置了多个系统广播：只要涉及到手机的基本操作(如开机、网络状态改变、拍照等等)，都会发出相应的广播  
- 每个广播都有特定的intent-Filter(包括具体的action),Android系统广播action如下：   
![][6]  
![][7]  
注：当使用系统广播时，只需要在注册广播接收者时定义相关的action既可，并不需要手动发送广播，当系统有相关操作时会自动进行系统广播  
#### 有序广播(Ordered Broadcast)  
##### 定义 
发送出去的广播被广播接收者按照先后顺序接收  
有序是针对广播接收而言的   
##### 广播接收者接收广播的顺序规则(同时面向静态和动态注册的广播接收者)  
- 按照Priority属性值从大到小排序；  
- Priority属性相同者，动态注册的广播优先；  
##### 特点  
- 接收广播按顺序接收  
- 先接收的广播接收者可以对广播进行截断，即后接收的广播接收者不在接收到此广播；  
- 先接收的广播接收者可以对广播进行修改，那么后接收的广播接收者收到被修改后的广播  
##### 具体使用 
有序广播的使用过程与普通广播非常类似，差异仅在于广播的发送方式：  

	sendOrderBroadcast(intent)  
#### App应用内广播(Local Broadcast)  
##### 背景  
Android中的广播可以跨App直接通信(exported对于有intent-filter情况下默认值为true)  
##### 冲突  
可能出现的问题  

- 其他App针对性发出与当前App intent-filter相匹配的广播，由此导致当前App不断接收广播并处理；   
- 其他App注册与当前App一致的intent-filter用于接收广播，获取当前广播具体信息；即会出现安全性&效率性的问题。  

##### 解决方案  
使用App应用内广播(Local Broadcast)  
- App应用内广播可理解为一种局部广播，广播的发送者和接收者都同属于一个App。  
- 相比于全局广播(普通广播)，App应用内广播优势体现在：安全性高&效率高   

##### 具体使用1-将全局广播设置成局部广播 
- 注册广播时将exported属性设置为false，使得非本App内部发出的此广播不被接收；  
- 在广播发送和接收时，增设相应权限permission，用于权限验证；  
- 发送广播时指定该广播接收器所在的报名，此广播将只会发送到此包中的App内与之相匹配的有效广播接收器中。  
通过intent.setPackage(packageName)指定包名  
##### 具体使用2-使用封装好的LocalBroadcastManager类 
使用方式上与全局广播几乎相同，只是注册/取消注册广播接收器和发送广播时将参数的context变成了LocalBroadcastManager的单一实例  

注：对于LocalBroadcastManager方式发送的应用内广播，只能通过LocalBroadcastManager动态注册，不能静态注册  

	//注册应用内广播接收器
	//步骤1：实例化BroadcastReceiver子类 & IntentFilter mBroadcastReceiver 
	mBroadcastReceiver = new mBroadcastReceiver(); 
	IntentFilter intentFilter = new IntentFilter(); 

	//步骤2：实例化LocalBroadcastManager的实例
	localBroadcastManager = LocalBroadcastManager.getInstance(this);

	//步骤3：设置接收广播的类型 
	intentFilter.addAction(android.net.conn.CONNECTIVITY_CHANGE);

	//步骤4：调用LocalBroadcastManager单一实例的registerReceiver（）方法进行动态注册 
	localBroadcastManager.registerReceiver(mBroadcastReceiver, intentFilter);

	//取消注册应用内广播接收器
	localBroadcastManager.unregisterReceiver(mBroadcastReceiver);

	//发送应用内广播
	Intent intent = new Intent();
	intent.setAction(BROADCAST_ACTION);
	localBroadcastManager.sendBroadcast(intent);
#### 粘性广播(Sticky Broadcast)  

android的粘性广播，是指广播接收器一注册马上就能接收到广播的一种机制，当然首先系统要存在广播。而普通广播就是要先注册广播接收器，然后广播被发送到系统，广播接收器才能接收到广播。
所以他们的区别是：
粘性广播调用registerReceiver能马上接受广播，而普通广播不行。  
##### 对于粘性广播  
	sendStickyBroadcast(Intent intent) 
##### 注册广播接收器  
	registerReceiver(BroadcastReceiver receiver, IntentFilter filter)  
##### 特别注意  
对于不同注册方式的广播接收器回调onReceiver(Context context,Intent intent)中的context返回值是不一样的：  
- 对于静态注册(全局+应用内广播)，回调onReceiver(context,intent)中的context返回值：ReceiverRestrictedContext;   
- 对于全局广播的动态注册，回调onReceive(context,intent)中的context返回值是Activity Context;  
- 对于应用内广播的动态注册(LocalBroadcastManager方式)，回调onReceiver(context,intent)中的context返回值是Application Context;  
- 对于应用内广播的动态注册(非LocalBroadcastManager方式)，回调onReceiver（context,intent)中的context返回值是：Activity Context;   


参考：   
[Android四大组件：BroadcastReceiver史上最全面解析][8]  
[android 广播机制(2) 粘性广播][9]  
[BroadCastSample][10]  


    



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/broadcast.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/boradcast-ams.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/boradcast-detail.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/boradcast-life.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/broadcast-style.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/system-broadcast1.png  
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/system-broadcast2.png  
[8]: https://www.jianshu.com/p/ca3d87a4cdf3  
[9]: https://www.jianshu.com/p/c85ee69553b5 
[10]: https://github.com/PGzxc/BroadCastSample 


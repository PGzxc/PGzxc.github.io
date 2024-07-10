---
title: Android开发之——EventBus3.x的使用
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - EventBus3.x
abbrlink: 172008d
date: 2018-02-01 14:35:58
---
# 简介
EventBus是[http://greenrobot.org/][0]出的一个发布者/订阅者（Publisher/Subscriber）的事件总线。主要是用来在Android各个组件之间进行消息传递的。能够很好地对发布者和订阅者之间进行解耦。 

官方地址：[https://github.com/greenrobot/EventBus][1]  
<!--more-->  
# 集成 
## 添加依赖

	compile 'org.greenrobot:eventbus:3.1.1'

## 定义事件
	public static class MessageEvent { /* Additional fields if needed */ }

## 发送事件
	EventBus.getDefault().post(new MessageEvent());
## 注册事件

	@Override
	public void onStart() 
	{
    	 super.onStart();
    	 EventBus.getDefault().register(this);
	}

	@Override
	public void onStop() 
	{
      super.onStop();
      EventBus.getDefault().unregister(this);
	}
## 处理事件

	@Subscribe(threadMode = ThreadMode.MAIN)  
	public void onMessageEvent(MessageEvent event) {/* Do something */};

# 实例分析
先看效果图   

![][2] ![][3]

如上图分别在同一个页面和不同页面展示数据
## 数据发送和展示在同一页
![][4]
## 数据发送和展示不在同一页
![][5] ![][6]  

参考：  
[EventBusSample][7]







[0]: http://greenrobot.org/
[1]: https://github.com/greenrobot/EventBus
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eventbus1.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eventbus2.gif
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eventbus_method1.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eventbus_send.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/eventbus_receive.png
[7]: https://github.com/PGzxc/EventBusSample
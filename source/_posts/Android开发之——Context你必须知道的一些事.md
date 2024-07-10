---
title: Android开发之——Context你必须知道的一些事
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Context
abbrlink: 717ee561
date: 2017-11-22 17:01:21
---
## 一 概述

作为开发者，对于Context的使用一定不陌生；你在加载资源、启动一个新的Activity、获取系统服务、获取内部文件（夹）路径、创建View操作时等都需要Context的参与，可见Context的常见性；
<!--more-->

## 二 什么是Context上下文 

###  2.1 Context  
字面意思上下文，或者叫做场景，也就是用户与操作系统操作的一个过程，比如你打电话，场景包括电话程序对应的界面，以及隐藏在背后的数据

### 2.2 源码中的Context
![源码][1]


## 三 一个应用程序有几个Context
Context数量=Activity数量+Service数量+1(Application)

## 四  Context能干什么
弹出Toast、启动Activity、启动Service、发送广播、操作数据库等等

## 五  Context作用域
![作用域][2]

##  六 如何获取Context
- View.getContext：返回当前View对象的Context对象，通常是当前正在展示的Activity对象
- Activity.getApplicationContext：获取当前Activity所在的(应用)进程的Context对象，通常我们使用Context对象时，要优先考虑这个全局的进程Context
- ContextWrapper.getBaseContext()：用来获取一个ContextWrapper进行装饰之前的Context，可以使用这个方法，这个方法在实际开发中使用并不多，也不建议使用
- Activity.this： 返回当前的Activity实例，如果是UI控件需要使用Activity作为Context对象，但是默认的Toast实际上使用ApplicationContext也可以

## 七 Context引起的内存泄露

### 7.1 错误的单例模式

```
public class Singleton {
	private static Singleton instance;
	private Context mContext;

	private Singleton(Context context) {
		this.mContext = context;
	}

	public static Singleton getInstance(Context context) {
		if (instance == null) {
			instance = new Singleton(context);
		}
		return instance;
	}
}
```

这是一个非线程安全的单例模式，instance作为静态对象，其生命周期要长于普通的对象，其中也包含Activity，假如Activity A去getInstance获得instance对象，传入this，常驻内存的Singleton保存了你传入的Activity A对象，并一直持有，即使Activity被销毁掉，但因为它的引用还存在于一个Singleton中，就不可能被GC掉，这样就导致了内存泄漏

### 7.2 View持有Activity引用

```
public class MainActivity extends Activity {
	private static Drawable mDrawable;

	@Override
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.activity_main);
		ImageView iv = new ImageView(this);
		mDrawable = getResources().getDrawable(R.drawable.ic_launcher);
		iv.setImageDrawable(mDrawable);
	}
}
```

有一个静态的Drawable对象当ImageView设置这个Drawable时，ImageView保存了mDrawable的引用，而ImageView传入的this是MainActivity的mContext，因为被static修饰的mDrawable是常驻内存的，MainActivity是它的间接引用，MainActivity被销毁时，也不能被GC掉，所以造成内存泄漏。

## 八 正确使用Context
- 当Application的Context能搞定的情况下，并且生命周期长的对象，优先使用Application的Contex
- 不要让生命周期长于Activity的对象持有到Activity的引用
- 量不要在Activity中使用非静态内部类，因为非静态内部类会隐式持有外部类实例的引用，如果使用静态内部类，将外部实例引用作为弱引用持有 


参考：  
[Android Context 上下文 你必须知道的一切][3]  
[Context都没弄明白，还怎么做Android开发？][4]





[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-context.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-context-use.png
[3]: http://blog.csdn.net/lmj623565791/article/details/40481055/
[4]: http://www.jianshu.com/p/94e0f9ab3f1d
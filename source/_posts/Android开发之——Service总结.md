---
title: Android开发之——Service总结
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Service
abbrlink: ec2f3945
date: 2018-01-07 21:55:21
---
# 概述 

Service全部内容基本会在本篇涉及到，我们将围绕以下主要知识点进行分析：  

- Service简单概述
- Service在清单文件中的声明
- Service启动服务实现方式及其详解
- Service绑定服务的三种方式 
- 关于启动服务与绑定服务间的转换问题
- 前台服务以及通知发送 
- 服务Service与线程Thread的区别 
- 管理服务声明周期的要点
- Android5.0以上的隐式启动问题及其解决方案
- 保证服务不被杀死的实现思路 

<!--more-->
# Service简单概述
Service(服务)是一个一种可以在后台执行长时间运行操作而没有用户界面的应用组件。服务可由其他应用组件启动(如Activity)，服务一旦被启动将在后台一直运行，即使启动服务的组件(Activity)已销毁也不受影响。此外，组件可以绑定到服务，以与之进行交互，甚至是执行进程间通信(IPC)。例如，服务可以处理网络事物、播放音乐，执行文件I/O或与内容提供程序交互，而所有这一切均可在后台进行，Service基本上分为两种形式：  

## 启动状态 
当应用组件(如Activity)通过调用startService()启动服务时，服务即处于"启动"状态。一旦启动，服务即可在后台无限期运行，即使启动服务的组件已被销毁也不受影响，除非手动调用才能停止服务，已启动的服务通常是执行单一操作，而且不会讲结果返回给调用方。  

## 绑定状态  
当应用 组件通过调用bindService()绑定到服务时，服务即处于"绑定"状态。绑定服务提供了一个客户端-服务器接口，允许组件与服务进行交互、发送请求、获取结果，甚至是利用进程间通信(IPC)跨进程执行这些操作。仅当与另一个应用组件绑定时，绑定服务才会运行。多个组件可以同时绑定到该服务，但全部取消绑定后，该服务即会被销毁。  

# Service在清单文件中的声明 
前面说过Service分为启动状态和绑定状态两种，但无论哪种具体的Service启动类型，都是通过继承Service基类自定义而来，也都是需要在AndroidManfest.xml中声明，那么在分析这两种状态之前，我们先来了解一下Service在AndroidManfest.xml中的声明语法，其格式如下：  

	<service android:enabled=["true"|"false"]
			 android:exported=["true"|"false"]
			 android:icon="drawable resource"
			 android:isolateProcess=["true"|"false"]
			 android:label="string resource"
			 android:name="string"
			 android:permission="string"
			 android:process="string"
			 ...
	</service>	
- android:exported:代表是否能被其他应用隐式调用，其默认值是由service中有无intent-filter决定的，如果有intent-filter，默认值为true，否则为false。为false的情况下，即使有intent-filter匹配，也无法打开，即无法被掐应用隐式调用。 
- android:name：对应Service类名
- android:permission:是权限声明
- android:process：是否需要在单独的进程中运行，当设置为android:process=":remote"时，代表Service在单独的进程中运行。注意：":"很重要，它的意思是指要在当前进程名称前面附加上当前的包名，所以"remote"和":remote"不是同一个意思，前者的进程名称为：remote，而后者的进程名称为：App-packageName:remote.  
- android:isolatedProcess：设置true意味着，服务会在一个特殊的进程下运行，这个进程与系统其它进程分开且没有自己的权限。与其通信的唯一途径死通过服务的API(bind and start)。  
- android:enabled:是否可以被系统实例化，默认为true。因为父标签也有enable属性，所以必须两个都为默认值true的情况下服务才会被激活，否则不会被激活。  

ok，关于Service在清单文件的声明我们先了解这些就行，接下来分别针对Service启动服务和绑定服务进行详细分析。  

# Service启动服务  
首先要重新创建服务，必须创建Service的子类(或使用它的一个现有子类如IntentService)。在实现中，我们需要重写一些回调方法，已处理声明周期的某些关键过程，下面我们通过简单案例来分析需要重写的回调方法有哪些？  

	public class SimpleService extends Service 
	{
    	private static final String TAG = SimpleService.class.getSimpleName();

    	/** 绑定服务时才会调用的方法，必须要实现的方法*/
    	@Nullable
    	@Override
    	public IBinder onBind(Intent intent) 
		{
        	Log.d(TAG, "onBind: ");
        	return null;
    	}
 		/** 首次创建服务时，系统将调用此方法来执行以此设置程序(在调用onStartCommand()或onBind()之前)。如果
   		* 如果服务已在运行，则不会调用此方法。该方法只被调用一次。
   		* */
    	@Override
    	public void onCreate() 
		{
			Log.d(TAG, "onCreate: ");
        	super.onCreate();
    	}
    	/** 每次通过startService()方法启动Service时都会被回调*/
    	@Override
    	public int onStartCommand(Intent intent, int flags, int startId) 
		{
        	Log.d(TAG, "onStartCommand: ");
        	return super.onStartCommand(intent, flags, startId);
    	}

    	@Override
    	public void onDestroy() 
		{
        	Log.d(TAG, "onDestroy: ");
        	super.onDestroy();
		}
	}
上面的代码我们可以看出SimpleService继承了Service类，并重写了onBind方法，该方法是必须重写的，但是由于此时是启动状态的服务，则该方法无需实现，返回null既可，只有在绑定状态的情况下才需要实现该方法并返回一个IBinder的实现类(后面会详细说)，接着重写onCreate、onStartCommand、onDestory三个主要的声明周期方法，关于这几个方法说明如下：  

## onBind() 
当另一个组件想通过调用bindService()与服务绑定(例如执行RPC)时，系统将调用此方法。在此方法的实现中，必须返回一个IBinder接口的实现类，供客户端用来与服务进行通信。无论是启动状态还是绑定状态，此方法必须重写，但在启动状态下直接返回null.  

## onCreate() 
首次创建服务时，系统将调用此方法来执行一次性设置程序(在调用onStartCommand()或onBind()之前)。如果服务已在运行，则不会调用此方法，该方法只调用一次。  

## onStartCommand() 
当另一个组件(如Activity)通过调用startService()请求启动服务时，系统将调用此方法。一旦执行此方法，服务即会启动并在后台无限期运行。如果自己实现此方法，则需要在服务工作完成后，通过调用stopSelf()或stopService()来停止服务。(在绑定状态下，无需实现此方法。)  

## onDestroy() 
当服务不再使用且将被销毁时，系统将调用此方法。服务应该实现此方法来清理所有资源，如线程，注册的侦听器、接收器等，这是服务接收的最后一个调用。  

我们通过Demo测试一下Service启动状态方法的调用顺序，MainActivity代码如下：  

	public class MainActivity extends AppCompatActivity 
	{
    	@Override
    	protected void onCreate(Bundle savedInstanceState) 
		{
        	super.onCreate(savedInstanceState);
        	setContentView(R.layout.activity_main);
        	setListener();
    	}

    	private void setListener() 
		{
        	Intent intent=new Intent(this, SimpleService.class);
        	findViewById(R.id.start_service).setOnClickListener(view->{startService(intent);});
        	findViewById(R.id.stop_service).setOnClickListener(view->{stopService(intent);});
    	}
	}
记得在清单文件中声明Service(声明方式跟Activity相似)： 

	<application ... >
      <service android:name=".service.SimpleService" />
      ...
	</application>  
从代码可以看出，启动服务使用startService(Intent intent)方法，仅需要传递一个Intent对象既可，在intent对象中指定需要启动的服务。而使用startService()方法启动的服务，在服务的外部，必须使用stopService()方法停止，在服务的内部可以调用stopSelf()方法停止当前服务。如果使用stopService()或者stopSelf()方法请求停止服务，即使访问它的组件被销毁了，这个服务也一致运行下去，知道手动调用停止服务才被销毁，至于onBind方法，只有在绑定服务时才会起作用，在启动状态下，无需关注此方法，ok，我们运行程序并多次调用startService方法，最后调用stopService方法。log截图如下：  
![][1]   
从Log可以看出，第一次调用startService方法时，onCreate方法、onStartCommand方法将以此被调用，而多次调用startService是，只有onStartCommand方法被调用，最后我们调用stopService方法停止服务时onDestory方法被回调，这就是启动状态下Service的执行周期。接着我们重新回过头来进一步分析onStartCommand(Intent intent,int flag,int startid)，这个方法有3个传入参数，它们的含义如下：  
## onStartCommand(Intent intent,int flags,int startid) 
### intent  
启动时，启动组件传递过来的intent，如Activity可利用intent封装所需要的参数并传递给Service  

### flags  
表示启动请求时是否有额外数据，可选值有0，START_FLAG_REDELIVERY，START_FLAG_RETRY,0代表没有，它们具体含义如下：  

- START_FLAG_REDELIVERY  
这个值代表了onStartCommand方法的返回值为START_REDELIVER_INTENT，而且在上一次服务被杀死前会去调用stopSelf方法停止服务。其中START_REDELIVER_INTENT意味着当Service因内存不足而被系统kill后，则会重建服务，并通过传递给服务的最后一个intent调用onstartCommand()，此时intent是有值的。  

- START_FLAG_RETRY 
该flag代表党onStartCommand调用后一直没有返回值，会尝试重新去调用onStartCommand()。  
### startid  
指明当前服务的唯一ID，与stopSelfResult(int startid)配合使用，stopSelfResult可以更安全地根据ID停止服务。  

实际上onStartCommand的返回值int类型才是最最值得注意的，它有三种可选值，START_STICKY,START_NOT_STICKY,START_REDELIVER_INTENT,它们具体含义如下：  

- START_STICKY  
当Service内存不足而被系统kill后，一段时间后内存再次空闲时，系统将会尝试重新创建此Service，一旦创建成功后将回调onStartCommand方法，但其中的intent将是null，除非有挂起的intent，如pendingintent，这个状态下比较适用于不执行命令，但无限期运行等待作用的媒体播放器或类似服务。  
- START_NOT-STICKY  
当Service因内存不足而被系统kill后，即使系统内存再次空闲时，系统也不会尝试创建此Service。除非程序中再次调用startService启动此Service，这是最安全的选项，可以避免在不必要时以及应用能够轻松重启所有未完成的作业时运行服务。  
- START_REDELIVER_INTENT  
当Service因内存不足而被系统kill后，则会重建服务，并通过传递给服务的最后一个intent调用onStartCommand()，任何挂起intent均依次传递。与START_STICKY不同的是，其中的传递的intent将是非空，是最后依次调用startService中的intent。这个值适用于主动执行应该立即恢复的作业(例如下载文件)的服务。  

由于每次启动服务(调用startService)时，onStartCommand方法都会被调用，因此我们可以通过该方法使用intent给Service传递所需要的参数，然后在onStartCommand方法中处理的事件，最后根据需要选择不同法flag返回值，以达到对程序更友好的控制。好，以上便是service在启动状态下的分析，接着我们再来看看绑定状态下的Service又是如何处理的？  

# Service绑定服务 
绑定服务是Service的另一种变形，当Service处于绑定状态时，其代表着客户端-服务器接口中的服务器。当其他组件(如Activity)绑定到服务时(有时候我们可能需要从Activity组件中去调用Service中的方法，此时Activity以绑定的方式挂靠到Service后，我们就可以轻松地调用到Service中的指定方法)，组件(如Activity)可以向Service(也就是服务端)发送请求，或者调用Service(服务端)的方法，此时被绑定的Service（服务端）会接收信息并响应，甚至可以通过绑定服务进行执行进程间通信(即IPC，这个后面再单独分析)。与启动服务不同的是绑定服务的声明周期通常只在为其他应用组件(如Activity)服务时处于活动状态，不会无限期在后台运行，也就是说宿主(如Activity)解除绑定后，绑定服务就会被销毁。那么在提供绑定的服务时，该如何实现呢？实际上我们必须提供一个IBinder接口的实现类，该类用意提供客户端用来与服务进行交互的编程接口，该接口可以通过三种方法定义接口：  

## 扩展Binder类 
如果服务是提供给自有应用专有的，并且Service(服务端)与客户端相同的进程中运行(常见情况)，则应通过扩展Binder类并从onBind()返回它到底一个实例来创建接口。客户端收到Binder后，可利用它直接访问Binder实现中以及Service中可用的公共方法。如果我们的服务只是自有应用的后台工作线程，则优先采用这种方法。不采用该方式创建接口的唯一原因是，服务被其他应用或不同的进程调用。  
## 使用Messenger 
Messenger可以翻译为信使，通过它可以在不同的进程中共传递Message对象(Handler中的Messager，因此Handler是Messenger的基础)，在Message中可以存放我们需要传递的数据，然后在进程间传递。如果需要让接口跨不同的进程工作，则可使用Messenger为服务创建接口，客户端就可以利用Message对象向服务发送命令。同时客服端也可自定义自有Messenger，以便服务回传消息。这是执行进程间通信(IPC)的最简单方法，因为Messenger会在单一线程中创建包含所有请求的队列，也就是说Messager是以串行的方式处理客户端发来的消息，这样我们就不必对服务进行线程安全设计了。  
## 使用AIDL  
由于Messenger是以串行的方式处理客户端发来的消息，如果当前有大量消息同时发送到Service(服务端)，Service仍然只能一个个处理，这也就是Messenger跨进程通信的缺点了，因此如果有大量并发请求，Messenger就会显得力不从心，这时AIDL(android接口定义语言)就派上用场了，但实际上Messenger的跨进程方式其底层实现就是AIDL，只不过Android系统帮我们封装成透明的Messenger罢了。因此，如果我们想让服务同时处理多个请求，则应该使用AIDL。在此情况下，服务必须具备多线程处理能力，并采用线程安全设计，使用AIDL必须创建一个定义编程接口的.aidl文件。Android SDK工具利用该文件生成一个实现接口并处理IPC的抽象类，随后可在服务内对其进行扩展。  

以上3种实现方式，我们可以根据需求自由的选择，但需要注意的是大多数应用"都不会"使用AIDL来创建绑定服务，因为它可能要求具备多线程处理能力，并可能导致实现的复杂性增加。因此，AIDL并不适合大多数应用，本篇中也不打算阐述如何使用AIDL，接下来我们分别针对扩展Binder类和Messenger的使用进行分析。  

## 扩展Binder类 
前面描述过，如果我们的服务仅供本地应用使用，不需要跨进程工作，则可以实现自有Binder类，让客户端通过该类直接访问服务中的公共方法。其实用开发步骤如下：   

- 创建BindService服务端，继承自Service并在类中创建一个实现IBinder接口的实例对象并提供公共方法给客户端调用 
- 从onBind()回调方法返回此Binder实例
- 在客户端中，从onServiceConnected()回调方法接收Binder，并使用提供的方法调用绑定服务。  

注意：此方式只有在客户端和服务端位于同一应用和进程中才有效，如对于需要将Activity绑定到在后台播放音乐的自有服务的音乐应用，此方式非常有效。另一点之所以要求服务和客户端必须在统一应用内，是为了便于客户端转换返回的对象和正确调用其API。服务和客户端还必须在同一进程内，因为此方式不执行任何跨进程编程。  

以下十四一个扩展Binder类的实例，先看看Service端的实现BindService.java  

	public class LocalService extends Service 
	{
    	private static final String TAG = LocalService.class.getSimpleName();
    	private int count;
    	private boolean quit;
    	private Thread thread;
    	private LocalBinder binder = new LocalBinder();

    	/** 把Binder类返回给客户端*/
    	@Nullable
    	@Override
    	public IBinder onBind(Intent intent) 
		{
        	return binder;
    	}

    	/**创建Binder对象，返回给客户端即Activity使用，提供数据交换的接口*/
    	public class LocalBinder extends Binder 
		{
        	/**声明一个方法，getService。（提供给客户端调用）*/
        	LocalService getService() 
			{
            	/**返回当前对象LocalService,这样我们就可在客户端端调用Service的公共方法了 */
            	return LocalService.this;
        	}
    	}
    	@Override
    	public void onCreate() 
		{
        	super.onCreate();
        	Log.d(TAG, "onCreate: ");
        	thread = new Thread(() -> {
            // 每间隔一秒count加1 ，直到quit为true。
            while (!quit) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                count++;
            }
        });
        thread.start();
    	}
    	public int getCount() {return count;}

    	@Override
    	public boolean onUnbind(Intent intent) 
		{
        	Log.d(TAG, "onUnbind: ");
        	return super.onUnbind(intent);
    	}

    	@Override
    	public void onDestroy() 
		{
        	super.onDestroy();
        	Log.d(TAG, "onDestroy: ");
        	this.quit=true;
    	}
	}
BindeService类集成自Service，在该类中创建一个LocalBinder继承自Binder类，LocalBinder中声明了一个getService方法，客户端可访问该方法获取LocalService对象的实例，只要客户端获取到LocalService对象的实例就可调用LocalService服务端的公共方法，如getCount方法，值得注意的是，我们在onBinder方法中返回了binder对象，该对象便是LocalBinder的具体实例，而binder对象最终会返回给客户端，客户端通过返回的binder对象便可以与服务端交互。接着看看客户端BindActivity的实现：  

	public class BindActivity extends AppCompatActivity 
	{
    	private static final String TAG = BindActivity.class.getSimpleName();
    	ServiceConnection connection;
    	private LocalService localService;
    	@Override
    	protected void onCreate(@Nullable Bundle savedInstanceState) 
		{
        	super.onCreate(savedInstanceState);
        	setContentView(R.layout.activity_bind);
        	setListener();
    	}

    private void setListener() 
	{

        Intent intent = new Intent(this, LocalService.class);// 创建绑定对象
        findViewById(R.id.btn_bind_service).setOnClickListener(view -> {
            Log.d(TAG, "绑定调用：bindService");
            bindService(intent,connection, Service.BIND_AUTO_CREATE);
        });
        findViewById(R.id.btn_unbind_service).setOnClickListener(view -> {
            Log.d(TAG, "解除绑定调用：unbindService");
            if(localService!=null){
                localService=null;
                unbindService(connection);
            }
        });
        findViewById(R.id.btn_get_data).setOnClickListener(view -> {
            if(localService!=null){
                //通过绑定服务传递的Binder对象，获取Service暴露出来的数据
                Log.d(TAG, "从服务获取数据: "+localService.getCount());
            }else {
                Log.d(TAG, "还没绑定呢，先绑定,无法从服务端获取数据: ");
            }
        });
        connection=new ServiceConnection() 
		{
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) 
			{
                /**与服务器端交互的接口方法 绑定服务的时候被回调，在这个方法获取绑定Service传递过来的IBinder对象，
                 *通过这个IBinder对象，实现宿主和Service的交互。
                 * */
                LocalService.LocalBinder binder= (LocalService.LocalBinder) service;
                localService = binder.getService();
            }

            @Override
            public void onServiceDisconnected(ComponentName name) 
			{
                localService=null;
            }
        };
    }

	}

在客户端中我们创建一个ServiceConnection对象，该代表与服务的连接，它只有两个方法，onServiceConnected和onServiceDisconnected，其含义如下：  

### onServiceConnected(ComponentName name,IBinder service) 
系统会调用该方法以传递服务的onBind()方法返回的IBinder。其中service便是服务端返回的IBinder实现类对象，通过该对象我们便可以调用获取LocalService实例对象，进而调用服务端的公共方法。而ComponentName是一个封装了组件(Activity,Service，BroadcastReceiver or ContentProvider)信息的类，如包名，组件描述等信息，较少使用该参数。  

### onServiceDisconnected(ComponentName name)  
android系统会在与服务的连接意外中断时(例如当服务崩溃或终止时)调用该方法。注意：当客户端取消绑定时，系统"绝对不会"调用该方法。  

	conn = new ServiceConnection() 
	{
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) 
		{
              Log.d(TAG, "绑定成功调用：onServiceConnected");
              // 获取Binder
              LocalService.LocalBinder binder = (LocalService.LocalBinder) service;
              mService = binder.getService();
        }

        @Override
        public void onServiceDisconnected(ComponentName name) 
	   {
                mService=null;
       }
     };
在onServiceConnected()被回调前，我们还需要把当前Activity绑定到服务LocalService上，绑定服务是通过bindService()方法，解绑服务则使用unbindService()方法，这两个方法解析如下：  

### bindService(Intent service,ServiceConnection conn,int flags) 

该方法执行绑定服务操作，其中Intent是我们要绑定的服务(也就是LocalService)的意图，而ServiceConnection代表与服务的连接，它只有两个方法，前面已分析过，flags则是指定绑定时是否自动创建Service。0代表不自动创建，BIND_AUOT_CREATE则代表自动创建。  

### unbindService(ServiceConnection conn)  
该方法执行解除绑定的操作，其中ServiceConnection代表与服务的连接，它只有两个方法，前面已分析过。  

Activity通过bindeService()绑定到LocalService后，ServiceConection的onServiceConnected()便会被回调并可以获取到LocalService实例对象mService，之后我们就可以调用LocalService服务端的公共方法了，最后还需要在清单文件中声明该Service。而客户端布局文件实现如下：  

	<?xml version="1.0" encoding="utf-8"?>
	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    	android:orientation="vertical" android:layout_width="match_parent"
    	android:layout_height="match_parent">

    	<Button
        	android:id="@+id/BindService"
        	android:layout_width="wrap_content"
        	android:layout_height="wrap_content"
        	android:text="绑定服务器"/>

       <Button
        	android:id="@+id/unBindService"
        	android:layout_width="wrap_content"
        	android:layout_height="wrap_content"
        	android:text="解除绑定"/>

    	<Button
        	android:id="@+id/getServiceDatas"
        	android:layout_width="wrap_content"
        	android:layout_height="wrap_content"
        	android:text="获取服务方数据"/>
	</LinearLayout>
我们运行程序，点击绑定服务并多次点击绑定服务接着多次调用LocalService中的getCount()获取数据，最后调用解除绑定的方法移除服务，其结果如下：  
![][2]   
通过Log可知，当我们第一次点击绑定服务时，LocalService服务端的onCreate、onBind方法会依次被调用，此时客户端的ServiceConnection的onServiceConnected()被调用并返回LocalBinder对象，接着调用LocalBinder#getService类中的声明公共方法了。更值得注意的是，我们多次调用bindService方法绑定LocalService服务端，而LocalService的onBind方法只调用一次，那就是在第一次调用bindService时才会回调onBind方法。接着我们点击获取服务端的数据，从log中看出我们点击了三次通过getCount()获取了服务端的3个不同数据，最后点击解除绑定，此时LocalService的onUnbind、onDestory方法一次被回调，并且多次绑定只需一次解绑既可。此情景也就说明了绑定状态下的Service生命周期方法的调用依次为onCreate()、onBind、onUnBind、onDestroy。ok~，以上便是同一应用同一进程中客户端与服务端的绑定回调方式。  

## 使用Messenger  
前面了解了如何使用IBinder应用内同一进程的通信后，我们接着来了解服务与远程进程（即不同进程间）通信，而不同进程间的通信，最简单的方式就是使用 Messenger 服务提供通信接口，利用此方式，我们无需使用 AIDL 便可执行进程间通信 (IPC)。以下是 Messenger 使用的主要步骤：  

- 服务实现一个 Handler，由其接收来自客户端的每个调用的回调
- Handler 用于创建 Messenger 对象（对 Handler 的引用）
- Messenger 创建一个 IBinder，服务通过 onBind() 使其返回客户端
- 客户端使用 IBinder 将 Messenger（引用服务的 Handler）实例化，然后使用Messenger将 Message 对象发送给服务
- 服务在其 Handler 中（在 handleMessage() 方法中）接收每个 Message

以下是一个使用 Messenger 接口的简单服务示例，服务端进程实现如下： 

	public class MessengerService extends Service 
	{
    	/** Command to the service to display a message */
    	static final int MSG_SAY_HELLO = 1;
    	private static final String TAG =MessengerService.class.getSimpleName() ;

    	/**
     	* 用于接收从客户端传递过来的数据
     	*/
    	class IncomingHandler extends Handler 
		{
        	@Override
        	public void handleMessage(Message msg) 
			{
            switch (msg.what) 
				{
                	case MSG_SAY_HELLO:
                    	Log.i(TAG, "thanks,Service had receiver message from client!");
                    	break;
                	default:
                    	super.handleMessage(msg);
            	}
        	}
    }

    	/**
     	* 创建Messenger并传入Handler实例对象
     	*/
    	final Messenger mMessenger = new Messenger(new IncomingHandler());

    	/**
    	 * 当绑定Service时,该方法被调用,将通过mMessenger返回一个实现
     	* IBinder接口的实例对象
     	*/
    	@Override
    	public IBinder onBind(Intent intent) 
		{
        	Log.i(TAG, "Service is invoke onBind");
        	return mMessenger.getBinder();
    	}
	}
首先我们同样需要创建一个服务类MessengerService继承自Service，同时创建一个继承自Handler的IncomingHandler对象来接收客户端进程发送过来的消息并通过其handleMessage(Message msg)进行消息处理。接着通过IncomingHandler对象创建一个Messenger对象，该对象是与客户端交互的特殊对象，然后在Service的onBind中返回这个Messenger对象的底层Binder即可。下面看看客户端进程的实现：  

	public class ActivityMessenger extends AppCompatActivity 
	{
    	/**
     	* 与服务端交互的Messenger
     	*/
    	Messenger mService = null;
    	/**
     	* Flag indicating whether we have called bind on the service.
     	*/
    	boolean mBound;

    	/**
     	* 实现与服务端链接的对象
     	*/
    	private ServiceConnection mConnection = new ServiceConnection() 
		{
        public void onServiceConnected(ComponentName className, IBinder service) {
            /**
             * 通过服务端传递的IBinder对象,创建相应的Messenger
             * 通过该Messenger对象与服务端进行交互
             */
            mService = new Messenger(service);
            mBound = true;
        }

        public void onServiceDisconnected(ComponentName className) {
            // This is called when the connection with the service has been
            // unexpectedly disconnected -- that is, its process crashed.
            mService = null;
            mBound = false;
        }
    };

    public void sayHello(View v) {
        if (!mBound) return;
        // 创建与服务交互的消息实体Message
        Message msg = Message.obtain(null, MessengerService.MSG_SAY_HELLO, 0, 0);
        try {
            //发送消息
            mService.send(msg);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messenager);
        Button bindService = findViewById(R.id.bindService);
        Button unbindService = findViewById(R.id.unbindService);
        Button sendMsg = findViewById(R.id.sendMsgToService);

        bindService.setOnClickListener(v -> {
            Log.d("zj", "onClick-->bindService");
            //当前Activity绑定服务端
            bindService(new Intent(ActivityMessenger.this, MessengerService.class), mConnection,
                    Context.BIND_AUTO_CREATE);
        });

        //发送消息给服务端
        sendMsg.setOnClickListener(v -> sayHello(v));


        unbindService.setOnClickListener(v -> {
            // Unbind from the service
            if (mBound) {
                Log.d("zj", "onClick-->unbindService");
                unbindService(mConnection);
                mBound = false;
            }
        });
    }
	}
在客户端进程中，我们需要创建一个ServiceConnection对象，该对象代表与服务端的链接，当调用bindService方法将当前Activity绑定到MessengerService时，onServiceConnected方法被调用，利用服务端传递给来的底层Binder对象构造出与服务端交互的Messenger对象，接着创建与服务交互的消息实体Message，将要发生的信息封装在Message中并通过Messenger实例对象发送给服务端。关于ServiceConnection、bindService方法、unbindService方法，前面已分析过，这里就不重复了，最后我们需要在清单文件声明Service和Activity，由于要测试不同进程的交互，则需要将Service放在单独的进程中，因此  

	<service android:name=".messenger.MessengerService"
         android:process=":remote"
        />
其中android:process=":remote"代表该Service在单独的进程中创建，最后我们运行程序，结果如下：   
接着多次点击绑定服务，然后发送信息给服务端，最后解除绑定，Log打印如下：  
![][3] 
通过上述例子可知Service服务端确实收到了客户端发送的信息，而且在Messenger中进行数据传递必须将数据封装到Message中，因为Message和Messenger都实现了Parcelable接口，可以轻松跨进程传递数据（关于Parcelable接口可以看博主的另一篇文章：序列化与反序列化之Parcelable和Serializable浅析），而Message可以传递的信息载体有，what,arg1,arg2,Bundle以及replyTo，至于object字段，对于同一进程中的数据传递确实很实用，但对于进程间的通信，则显得相当尴尬，在android2.2前，object不支持跨进程传输，但即便是android2.2之后也只能传递android系统提供的实现了Parcelable接口的对象，也就是说我们通过自定义实现Parcelable接口的对象无法通过object字段来传递，因此object字段的实用性在跨进程中也变得相当低了。不过所幸我们还有Bundle对象，Bundle可以支持大量的数据类型。接着从Log我们也看出无论是使用拓展Binder类的实现方式还是使用Messenger的实现方式，它们的生命周期方法的调用顺序基本是一样的，即onCreate()、onBind、onUnBind、onDestroy，而且多次绑定中也只有第一次时才调用onBind()。好~，以上的例子演示了如何在服务端解释客户端发送的消息，但有时候我们可能还需要服务端能回应客户端，这时便需要提供双向消息传递了，下面就来实现一个简单服务端与客户端双向消息传递的简单例子。   

## 关于绑定服务的注意点

- 多个客户端可同时连接到一个服务。不过，只有在第一个客户端绑定时，系统才会调用服务的 onBind() 方法来检索 IBinder。系统随后无需再次调用 onBind()，便可将同一 IBinder 传递至任何其他绑定的客户端。当最后一个客户端取消与服务的绑定时，系统会将服务销毁（除非 startService() 也启动了该服务）。

- 通常情况下我们应该在客户端生命周期（如Activity的生命周期）的引入 (bring-up) 和退出 (tear-down) 时刻设置绑定和取消绑定操作，以便控制绑定状态下的Service，一般有以下两种情况：  

 - 如果只需要在 Activity 可见时与服务交互，则应在 onStart() 期间绑定，在 onStop() 期间取消绑定
 - 如果希望 Activity 在后台停止运行状态下仍可接收响应，则可在 onCreate() 期间绑定，在 onDestroy() 期间取消绑定。需要注意的是，这意味着 Activity 在其整个运行过程中（甚至包括后台运行期间）都需要使用服务，因此如果服务位于其他进程内，那么当提高该进程的权重时，系统很可能会终止该进程。

- 通常情况下(注意)，切勿在 Activity 的 onResume() 和 onPause() 期间绑定和取消绑定，因为每一次生命周期转换都会发生这些回调，这样反复绑定与解绑是不合理的。此外，如果应用内的多个 Activity 绑定到同一服务，并且其中两个 Activity 之间发生了转换，则如果当前 Activity 在下一次绑定（恢复期间）之前取消绑定（暂停期间），系统可能会销毁服务并重建服务，因此服务的绑定不应该发生在 Activity 的 onResume() 和 onPause()中。
- 我们应该始终捕获 DeadObjectException DeadObjectException 异常，该异常是在连接中断时引发的，表示调用的对象已死亡，也就是Service对象已销毁，这是远程方法引发的唯一异常，DeadObjectException继承自RemoteException，因此我们也可以捕获RemoteException异常。
- 应用组件（客户端）可通过调用 bindService() 绑定到服务,Android 系统随后调用服务的 onBind() 方法，该方法返回用于与服务交互的 IBinder，而该绑定是异步执行的。

# 关于启动服务与绑定服务间的转换问题
通过前面对两种服务状态的分析，相信大家已对Service的两种状态有了比较清晰的了解，那么现在我们就来分析一下当启动状态和绑定状态同时存在时，又会是怎么的场景？    

虽然服务的状态有启动和绑定两种，但实际上一个服务可以同时是这两种状态，也就是说，它既可以是启动服务（以无限期运行），也可以是绑定服务。有点需要注意的是Android系统仅会为一个Service创建一个实例对象，所以不管是启动服务还是绑定服务，操作的是同一个Service实例，而且由于绑定服务或者启动服务执行顺序问题将会出现以下两种情况：  

- 先绑定服务后启动服务
 如果当前Service实例先以绑定状态运行，然后再以启动状态运行，那么绑定服务将会转为启动服务运行，这时如果之前绑定的宿主（Activity）被销毁了，也不会影响服务的运行，服务还是会一直运行下去，指定收到调用停止服务或者内存不足时才会销毁该服务。 
- 先启动服务后绑定服务  
如果当前Service实例先以启动状态运行，然后再以绑定状态运行，当前启动服务并不会转为绑定服务，但是还是会与宿主绑定，只是即使宿主解除绑定后，服务依然按启动服务的生命周期在后台运行，直到有Context调用了stopService()或是服务本身调用了stopSelf()方法抑或内存不足时才会销毁服务。 

以上两种情况显示出启动服务的优先级确实比绑定服务高一些。不过无论Service是处于启动状态还是绑定状态，或处于启动并且绑定状态，我们都可以像使用Activity那样通过调用 Intent 来使用服务(即使此服务来自另一应用)。 当然，我们也可以通过清单文件将服务声明为私有服务，阻止其他应用访问。最后这里有点需要特殊说明一下的，由于服务在其托管进程的主线程中运行（UI线程），它既不创建自己的线程，也不在单独的进程中运行（除非另行指定）。 这意味着，如果服务将执行任何耗时事件或阻止性操作（例如 MP3 播放或联网）时，则应在服务内创建新线程来完成这项工作，简而言之，耗时操作应该另起线程执行。只有通过使用单独的线程，才可以降低发生“应用无响应”(ANR) 错误的风险，这样应用的主线程才能专注于用户与 Activity 之间的交互， 以达到更好的用户体验。

参考：  

[关于Android Service真正的完全详解，你需要知道的一切][4]
[Android总结篇系列：Android Service][5]
[Android四大组件：Service史上最全面解析][6]
[Android 综合揭秘 —— 全面剖释 Service 服务][7]  
[Android Service完全解析，关于服务你所需知道的一切(上)][8]  
[Android Service完全解析，关于服务你所需知道的一切(下)][9]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/start-service.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/bind-service.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/manager-service.png
[4]: http://blog.csdn.net/javazejian/article/details/52709857
[5]: https://www.cnblogs.com/lwbqqyumidi/p/4181185.html 
[6]: https://www.jianshu.com/p/d963c55c3ab9 
[7]: https://www.cnblogs.com/leslies2/p/5401813.html
[8]: http://blog.csdn.net/guolin_blog/article/details/11952435/
[9]: http://blog.csdn.net/guolin_blog/article/details/9797169


					

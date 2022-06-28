---
title: Android开发之——APK安装流程概述
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - APK安装
abbrlink: 350cd010
date: 2017-11-17 10:47:53
---
## 一 前言 

开始前，我们先来思考几个问题？ 
- 安装和卸载APK的方法由哪些，每种方法得实现的原理是什么？
- APK安装和卸载过程中，系统数据发生了哪些变化？
- Android App端常用的Package Manager 用来做什么？ 

<!--more-->
## 二 APK安装简介 
什么是APK?  
APK为Android Package的缩写。  
Android应用安装有如下四种方式： 

- 1.系统应用安装--开机时完成，没有安装界面；
- 2.网络下载应用安装--通过market应用完成，没有安装界面；
- ADB工具安装--没有安装界面；
- 第三方应用下载--通过SD卡里的APK文件安装，有安装界面，由packageinstaller.apk应用处理安装及卸载过程的界面；  

应用安装涉及到如下几个目录：

- system/app——————————系统自带的应用程序，获得adb root权限才能删除；
- data/app————————————应用程序安装的目录，安装时把apk文件复制到此目录；
- data/data————————————存放应用程序的数据；
- data/dalvik-cache————将apk中的dex文件安装到dalvik-cache目录下(dex文件时dalvik虚拟机的可执行文件，其大小约为原始apk文件大小的四分之一)  

## 三 APK 安装和卸载浅析

### 3.1 APK安装可以归纳一下几个过程：

- 将APK文件复制到指定的目录下；
- 解压APK，拷贝文件，创建应用的数据目录；
- 把dex文件(Dalvik字节码)保存到dalvik-cache目录
- 解析APK的AndroidMainfest.xml文件，将其中声明的组件信息保存在PMS中；更新PMS中相应的数据结构；

### 3.2 APK卸载：    
* 将APK文件，data/data/packageName/，dalvik-cache目录中相应的文件删除；
* 并更新PMS中相应的数据结构；

## 四 安装应用的过程浅析 

### 4.1 开机安装 
PackageManagerService处理各种应用的安装，卸载，管理工作，开机时由systemService启动此服务；  
packageManagerService服务启动的流程： 

- 首先扫描安装"system\framework"目录下的jar包 

   ```
   //Find base frameworks (resource packages without code).
    mFrameworkInstallObserver = new AppDirObserver(  
    mFrameworkDir.getPath(), OBSERVER_EVENTS, true);
    mFrameworkInstallObserver.startWatching();
    scanDirLI(mFrameworkDir, PackageParser.PARSE_IS_SYSTEM|
      PackageParser.PARSE_IS_SYSTEM_DIR,scanMode | SCAN_NO_DEX, 0);
   ```

- 扫描安装系统system/app的应用程序   

   ```
   //Collect all system packages.  
    mSystemAppDir = new File(Environment.getRootDirectory(),"app");  
    mSystemInstallObserver = new AppDirObserve(
    mSystemAppDir.getPath(), OBSERVER_EVENTS, true);
    mSystemInstallObserver.startWatching();
    scanDirLI(mSystemAppDir, PackageParser.PARSE_IS_SYSTEM
             | PackageParser.PARSE_IS_SYSTEM_DIR, scanMode, 0); 
   ```

- 制造商的目录下/vendor/app应用包

   ```
   // Collect all vendor packages.
     mVendorAppDir = new File("/vendor/app");
   	mVendorInstallObserver = new AppDirObserver(
     mVendorAppDir.getPath(), OBSERVER_EVENTS, true);
     mVendorInstallObserver.startWatching();
     scanDirLI(mVendorAppDir, PackageParser.PARSE_IS_SYSTEM
      | PackageParser.PARSE_IS_SYSTEM_DIR, scanMode, 0);
   ```
- 扫描"data\app"目录，即用户安装的第三方应用

   ```
   scanDirLI(mAppInstallDir, 0, scanMode, 0);
   ```
- 扫描" data\app-private"目录，即安装DRM保护的APK文件（一个受保护的歌曲或受保 护的视频是使用 DRM 保护的文件)
	
   ```
   scanDirLI(mDrmAppPrivateInstallDir,
	PackageParser.PARSE_FORWARD_LOCK,scanMode, 0);	
	```
   

	扫描方法的代码清单

   ```
    private void scanDirLI(File dir, int flags, int scanMode, long currentTime)   
         {
            String[] files = dir.list();
            if (files == null)   
           {
            Log.d(TAG, "No files in app dir " + dir);
            return;
            }
         if (false) 
          {
           Log.d(TAG, "Scanning app dir " + dir);
             }
         int i;
         for (i=0; i<files.length; i++) {
         File file = new File(dir, files[i]);
         if (!isPackageFilename(files[i])) {
             // Ignore entries which are not apk's
             continue;
         }
         PackageParser.Package pkg = scanPackageLI(file,
                 flags|PackageParser.PARSE_MUST_BE_APK, scanMode, currentTime);
         // Don't mess around with apps in system partition.
         if (pkg == null && (flags & PackageParser.PARSE_IS_SYSTEM) == 0  
   
           &&mLastScanError == PackageManager.INSTALL_FAILED_INVALID_APK) {
              //Delete the apk
              Slog.w(TAG, "Cleaning up failed install of " + file);
              file.delete();
           }
              }
           }  
   
   ```

	并且从该扫描方法中可以看出调用了scanPackageLI（）
	
	```
	 private PackageParser.Package scanPackageLI(File scanFile,
	 		                   int parseFlags, int scanMode, long currentTime)
	```
	
	跟踪scanPackageLI（）方法后发现，程序经过很多次的if else 的筛选，最后判定可以安装apk后，调用了 mInstaller.install
	
	```
	if (mInstaller != null) {
	 	              int ret = mInstaller.install(pkgName, useEncryptedFSDir,  pkg.applicationInfo.uid,pkg.applicationInfo.uid);
	 	                if(ret < 0) {
	 	                    // Error from installer
	 	                    mLastScanError =PackageManager.INSTALL_FAILED_INSUFFICIENT_STORAG;
	 	                    return null;
	 	                }
	 	            }
	 		mInstaller.install();
	```
	通过
	
	```
	LocalSocketAddress address = new LocalSocketAddress(
	 	            "installd", LocalSocketAddress.Namespace.RESERVED);
	```
	指挥installd在C语言的文件中完成工作  
	 PackageManagerService小节 ：    
 - 从apk，xml中载入package信息，存储到内部成员变量中，用于后面的查找，关键的方法是scanPackageLI()；
 - 各种查询操作，包括query intent操作
 - install package和delete package的操作，还有后面的关键方法是installPackageLI();  

### 4.2 从网络上下载应用：  
下载完成后，会自动调用PackageManager的安装方法installPackage() 

```
/*Called when a downloaded package installation has been confirmed by the user */  
	由英文注释可见PackageManagerService 类的installPackage()函数为安装程序的入口。   
	   
		public void installPackage(final Uri packageURI,final IPackageInstallObserver observer, 
		final int flags,final String installerPackageName) 
		{
	    mContext.enforceCallingOrSelfPermission(
	    android.Manifest.permission.INSTALL_PACKAGES, null);
	    Message msg = mHandler.obtainMessage(INIT_COPY);
	    msg.obj = new InstallParams(packageURI, observer, flags,installerPackageName);
	    mHandler.sendMessage(msg);
	    }  
```

其中是通过PackageHandler的实例mhandler.sendMessage（msg）把信息发给继承Handler的类HandleMessage()方法; 

```
 class PackageHandler extends Handler{
     *****************省略若干********************
     public void handleMessage(Message msg) {
        try 
		{
            doHandleMessage(msg);
        } finally {
            Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND);
        }
    }
	******************省略若干**********************
    }
```

把信息发给doHandleMessage()方法,方法中用switch（）语句进行判定传来Message; 

```
void doHandleMessage(Message msg) {
        switch (msg.what) {
            case INIT_COPY: 
			{
                if (DEBUG_SD_INSTALL) 
				Log.i(TAG, "init_copy");
                HandlerParams params = (HandlerParams) msg.obj;
                int idx = mPendingInstalls.size();
                if (DEBUG_SD_INSTALL)  
				 Log.i(TAG, "idx=" + idx);
                // If a bind was already initiated we dont really
                // need to do anything. The pending install
                // will be processed later on.
                if (!mBound) {

                    // If this is the only one pending we might
                    // have to bind to the service again.
                    if (!connectToService()) {
                        Slog.e(TAG, "Failed to bind to media container service");
                        params.serviceError();
                        return;
                    } else {
                        // Once we bind to the service, the first
                        // pending request will be processed.
                        mPendingInstalls.add(idx, params);
                    }

                } else {
                    mPendingInstalls.add(idx, params);
                    // Already bound to the service. Just make
                    // sure we trigger off processing the first request.
                    if (idx == 0) {
                        mHandler.sendEmptyMessage(MCS_BOUND);
                    }
                }
                break;
            }
            case MCS_BOUND: {
                if (DEBUG_SD_INSTALL) 
				Log.i(TAG, "mcs_bound");
                if (msg.obj != null) {
                    mContainerService = (IMediaContainerService) msg.obj;
                }
                if (mContainerService == null) {
                    // Something seriously wrong. Bail out
                    Slog.e(TAG, "Cannot bind to media container service");
                    for (HandlerParams params : mPendingInstalls) {
                        mPendingInstalls.remove(0);
                        // Indicate service bind error
                        params.serviceError();
                    }
                    mPendingInstalls.clear();
                } else if (mPendingInstalls.size() > 0) {
                    HandlerParams params = mPendingInstalls.get(0);
                    if (params != null) {
                        params.startCopy();
                    }

                } else {
                    // Should never happen ideally.
                    Slog.w(TAG, "Empty queue");
                }
                break;
            }
          ****************省略若干**********************
		}
	}
```

注：  
public final boolean sendMessage (Message msg)  
public final boolean sendEmptyMessage (int what)  
两者参数有别。     
然后调用抽象类HandlerParams中的一个startCopy（）方法

```
abstract class HandlerParams {
	final void startCopy() {
   ***************若干if语句判定否这打回handler消息*******
   handleReturnCode();
   }
}
```

handleReturnCode（）复写了两次其中有一次是删除时要调用的，只列出安装调用的一个方法

```
 @Override
    void handleReturnCode() {
        // If mArgs is null, then MCS couldn't be reached. When it
        // reconnects, it will try again to install. At that point,this
        // will succeed.
        if (mArgs != null) {
            processPendingInstall(mArgs, mRet);
        }
    }
```

这时可以清楚的看见 processPendingInstall（）被调用。  
其中run（）方法如下：

```
run(){
synchronized (mInstallLock) {
************省略*****************
 installPackageLI(args, true, res);             
 }
} 
```

instaPacakgeLI（）args,res参数分析    
//InstallArgs 是在PackageService定义的static abstract class InstallArgs 静态抽象类。

```
static abstract class InstallArgs {
*********************************************************************
其中定义了flag标志，packageURL，创建文件，拷贝apk，修改包名称，
 还有一些删除文件的清理，释放存储函数。

*********************************************************************
}

class PackageInstalledInfo {
    String name;
    int uid;
    PackageParser.Package pkg;
    int returnCode;
    PackageRemovedInfo removedInfo;

}  
private void installPackageLI(InstallArgs args,
        boolean newInstall, PackageInstalledInfo res) {
    int pFlags = args.flags;
    String installerPackageName = args.installerPackageName;
    File tmpPackageFile = new File(args.getCodePath());
    boolean forwardLocked = ((pFlags & PackageManager.INSTALL_FORWARD_LOCK) != 0);
    boolean onSd = ((pFlags & PackageManager.INSTALL_EXTERNAL) != 0);
    boolean replace = false;
    int scanMode = (onSd ? 0 : SCAN_MONITOR) | SCAN_FORCE_DEX | SCAN_UPDATE_SIGNATURE
            | (newInstall ? SCAN_NEW_INSTALL : 0);
    // Result object to be returned
    res.returnCode = PackageManager.INSTALL_SUCCEEDED;
    // Retrieve PackageSettings and parse package
    int parseFlags = PackageParser.PARSE_CHATTY |
    (forwardLocked ? PackageParser.PARSE_FORWARD_LOCK : 0) |
    (onSd ? PackageParser.PARSE_ON_SDCARD : 0);
    parseFlags |= mDefParseFlags;
    PackageParser pp = new PackageParser(tmpPackageFile.getPath());
    pp.setSeparateProcesses(mSeparateProcesses);
    final PackageParser.Package pkg = pp.parsePackage(tmpPackageFile,
            null, mMetrics, parseFlags);
    if (pkg == null) {
        res.returnCode = pp.getParseError();
        return;
    }
    String pkgName = res.name = pkg.packageName;
    if ((pkg.applicationInfo.flags&ApplicationInfo.FLAG_TEST_ONLY) != 0) {
        if ((pFlags&PackageManager.INSTALL_ALLOW_TEST) == 0) {
            res.returnCode = PackageManager.INSTALL_FAILED_TEST_ONLY;
            return;
        }
    }
    if (GET_CERTIFICATES && !pp.collectCertificates(pkg, parseFlags)) {
        res.returnCode = pp.getParseError();
        return;
    }
    // Get rid of all references to package scan path via parser.
    pp = null;
    String oldCodePath = null;
    boolean systemApp = false;
    synchronized (mPackages) {
        // Check if installing already existing package
        if ((pFlags&PackageManager.INSTALL_REPLACE_EXISTING) != 0) {
            String oldName = mSettings.mRenamedPackages.get(pkgName);
            if (pkg.mOriginalPackages != null
                    && pkg.mOriginalPackages.contains(oldName)
                    && mPackages.containsKey(oldName)) {
                // This package is derived from an original package,
                // and this device has been updating from that original
                // name.  We must continue using the original name, so
                // rename the new package here.
                pkg.setPackageName(oldName);
                pkgName = pkg.packageName;
                replace = true;
            } else if (mPackages.containsKey(pkgName)) {
                // This package, under its official name, already exists
                // on the device; we should replace it.
                replace = true;
            }
        }
        PackageSetting ps = mSettings.mPackages.get(pkgName);
        if (ps != null) {
            oldCodePath = mSettings.mPackages.get(pkgName).codePathString;
            if (ps.pkg != null && ps.pkg.applicationInfo != null) {
                systemApp = (ps.pkg.applicationInfo.flags &
                        ApplicationInfo.FLAG_SYSTEM) != 0;
            }
        }
    }
    if (systemApp && onSd) {
        // Disable updates to system apps on sdcard
        Slog.w(TAG, "Cannot install updates to system apps on sdcard");
        res.returnCode = PackageManager.INSTALL_FAILED_INVALID_INSTALL_LOCATION;
        return;
    }
    if (!args.doRename(res.returnCode, pkgName, oldCodePath)) {
        res.returnCode = PackageManager.INSTALL_FAILED_INSUFFICIENT_STORAGE;
        return;
    }
    // Set application objects path explicitly after the rename
    setApplicationInfoPaths(pkg, args.getCodePath(), args.getResourcePath());
    pkg.applicationInfo.nativeLibraryDir = args.getNativeLibraryPath();
    if (replace) {
        replacePackageLI(pkg, parseFlags, scanMode,
                installerPackageName, res);
    } else {
        installNewPackageLI(pkg, parseFlags, scanMode,
                installerPackageName,res);
    }
}  
```

最后判断 如果以前 不存在 那么调用installNewPackageLI()

```
private void installNewPackageLI(PackageParser.Package pkg,
        int parseFlags,int scanMode,
        String installerPackageName, PackageInstalledInfo res) {
 ***********************省略若干*************************************************
    PackageParser.Package newPackage = scanPackageLI(pkg, parseFlags, scanMode,
           System.currentTimeMillis());
 ***********************省略若干**************************************************  
} 
```

最后终于 回到了和 开机安装 一样的地方. 与开机方式安装 调用统一方法。  

### 4.3 从ADB工具安装  
其入口函数源文件为pm.java   
(源文件路径：android\frameworks\base\cmds\pm\src\com\android\commands\pm\Pm.java)  
其中\system\framework\pm.jar包管理库  
包管理脚本 \system\bin\pm 解析  

Pm.java 文件里的 showUsage就是使用方法

```
	private static void showUsage() { 
    System.err.println("usage: pm [list|path|install|uninstall]"); 
    System.err.println("       pm list packages [-f]"); 
    System.err.println("       pm list permission-groups"); 
    System.err.println("       pm list permissions [-g] [-f] [-d] [-u] [GROUP]"); 
    System.err.println("       pm list instrumentation [-f] [TARGET-PACKAGE]"); 
    System.err.println("       pm list features"); 
    System.err.println("       pm path PACKAGE"); 
    System.err.println("       pm install [-l] [-r] [-t] [-i INSTALLER_PACKAGE_NAME] [-s] [-f] PATH"); 
    System.err.println("       pm uninstall [-k] PACKAGE"); 
    System.err.println("       pm enable PACKAGE_OR_COMPONENT"); 
    System.err.println("       pm disable PACKAGE_OR_COMPONENT"); 
    System.err.println("       pm setInstallLocation [0/auto] [1/internal] [2/external]");
  	**********************省略**************************
	} 
```

安装时候 会调用 runInstall()方法 

```
private void runInstall() {
    int installFlags = 0;
    String installerPackageName = null;
    String opt;
    while ((opt=nextOption()) != null) {
        if (opt.equals("-l")) {
            installFlags |= PackageManager.INSTALL_FORWARD_LOCK;
        } else if (opt.equals("-r")) {
            installFlags |= PackageManager.INSTALL_REPLACE_EXISTING;
        } else if (opt.equals("-i")) {
            installerPackageName = nextOptionData();
            if (installerPackageName == null) {
                System.err.println("Error: no value specified for -i");
                showUsage();
                return;
            }
        } else if (opt.equals("-t")) {
            installFlags |= PackageManager.INSTALL_ALLOW_TEST;
        } else if (opt.equals("-s")) {
            // Override if -s option is specified.
            installFlags |= PackageManager.INSTALL_EXTERNAL;
        } else if (opt.equals("-f")) {
            // Override if -s option is specified.
            installFlags |= PackageManager.INSTALL_INTERNAL;
        } else {
            System.err.println("Error: Unknown option: " + opt);
            showUsage();
            return;
        }
    }
    String apkFilePath = nextArg();
    System.err.println("\tpkg: " + apkFilePath);
    if (apkFilePath == null) {
        System.err.println("Error: no package specified");
        showUsage();
        return;
    }
    PackageInstallObserver obs = new PackageInstallObserver();
    try {
        mPm.installPackage(Uri.fromFile(new File(apkFilePath)), obs, installFlags,
                installerPackageName);
        synchronized (obs) {
            while (!obs.finished) {
                try {
                    obs.wait();
                } catch (InterruptedException e) {
                }
            }
            if (obs.result == PackageManager.INSTALL_SUCCEEDED) {
                System.out.println("Success");
            } else {
                System.err.println("Failure ["
                        + installFailureToString(obs.result)
                        + "]");
            }
        }
    } catch (RemoteException e) {
        System.err.println(e.toString());
        System.err.println(PM_NOT_RUNNING_ERR);
     }
	}  
```

其中：

```
PackageInstallObserver obs = new PackageInstallObserver();  
mPm.installPackage(Uri.fromFile(new File(apkFilePath)), obs, installFlags,
            installerPackageName); 
```

如果 安装成功 

```
obs.result == PackageManager.INSTALL_SUCCEEDED)
```

又因为有：

```
IPackageManage mPm；
mPm = IpackageManager.Stub.asInterface(ServiceManager.getService("package"));  
Stub是接口IPackageManage的静态抽象类，asInterface是返回IPackageManager代理的静态方法。  
因为class PackageManagerService extends IPackageManager.Stub  
所以mPm.installPackage 调用   
/* Called when a downloaded package installation has been confirmed by the user */  

	public void installPackage(
        final Uri packageURI, final IPackageInstallObserver observer, final int flags,final String installerPackageName) 
```

这样最后就是相当于调用从网络下载安装的 入口了。 

### 4.4 从SD卡安装  
系统调用 PackageInstallerActivity.java 
源码路径：android/packages/apps/PackageInstaller/src/com/android/packageinstaller/PackageInstallerActivity.java    
进入这个Activity会判断信息是否有错，然后调用private void initiateInstall() 判断 是否 曾经有过 同名包的安装，或者包已经安装    
通过后 执行private void startInstallConfirm() 点击OK按钮后经过一系列的安装信息的判断 Intent跳转到 

```
public class InstallAppProgress extends Activity implements View.OnClickListener, OnCancelListener
	public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        Intent intent = getIntent();
        mAppInfo = intent.getParcelableExtra(PackageUtil.INTENT_ATTR_APPLICATION_INFO);
        mPackageURI = intent.getData();
        initView();
	 } 
```

方法中调用了initView()方法 

```
public void initView() {
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    setContentView(R.layout.op_progress);
    int installFlags = 0;
    PackageManager pm = getPackageManager();
    try {
        PackageInfo pi = pm.getPackageInfo(mAppInfo.packageName, 
                PackageManager.GET_UNINSTALLED_PACKAGES);
        if(pi != null) {
            installFlags |= PackageManager.INSTALL_REPLACE_EXISTING;
        }
    } catch (NameNotFoundException e) {
    }
    if((installFlags & PackageManager.INSTALL_REPLACE_EXISTING )!= 0) {
        Log.w(TAG, "Replacing package:" + mAppInfo.packageName);
    }
    PackageUtil.AppSnippet as = PackageUtil.getAppSnippet(this, mAppInfo,
            mPackageURI);
    mLabel = as.label;
    PackageUtil.initSnippetForNewApp(this, as, R.id.app_snippet);
    mStatusTextView = (TextView)findViewById(R.id.center_text);
    mStatusTextView.setText(R.string.installing);
    mProgressBar = (ProgressBar) findViewById(R.id.progress_bar);
    mProgressBar.setIndeterminate(true);
    // Hide button till progress is being displayed
    mOkPanel = (View)findViewById(R.id.buttons_panel);
    mDoneButton = (Button)findViewById(R.id.done_button);
    mLaunchButton = (Button)findViewById(R.id.launch_button);
    mOkPanel.setVisibility(View.INVISIBLE);
    String installerPackageName = getIntent().getStringExtra(
            Intent.EXTRA_INSTALLER_PACKAGE_NAME);
    PackageInstallObserver observer = new PackageInstallObserver();
    pm.installPackage(mPackageURI, observer, installFlags, installerPackageName);
}  
```
方法最后 我们可以看到 再次调用安装接口 完成安装，相当于 又 调用了 网络安装。  

## 五 总结：
- 1.系统应用安装――开机时完成；
- 2.网络下载应用安装――最后 会 调用  系统应用安装 的 scanPackageLI 接口；
- 3.ADB工具安装――最后 会 调用   网络下载应用安装 的installPackage 接口，从而 相当于 走的 还是系统应用安装 的 路径；
- 4.第三方应用安装――由 packageinstaller.apk 应用处理安装及卸载，最后也会 调用   网络下载应用安装 的installPackage 接口，从而 相当于 走的 还是系统应用安装的路径。
  

参考：  
[APK安装简介][1]  
[Android APK安装与卸载机制][2]  
[APK安装过程及原理详解][3]  
[APK打包安装过程][4]

[1]: https://www.cnblogs.com/neo-java/p/7117482.html
[2]: http://lib.csdn.net/article/android/53120
[3]: http://blog.csdn.net/wh_19910525/article/details/7909686
[4]: https://segmentfault.com/a/1190000004916563


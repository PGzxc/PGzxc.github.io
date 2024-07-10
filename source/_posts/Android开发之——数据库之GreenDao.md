---
title: Android开发之——数据库之GreenDao
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 数据库
  - GreenDao
abbrlink: ae39a0be
date: 2018-01-03 10:48:37
---
# 前言  
GreenDao是一个将对象映射到SQLite数据库中的轻量级且快速的ORM解决方案。关于GreenDao的相关信息可以查看官网[GreenDao][1]      
GreenDao的优势：   

- 一个精简的库
- 性能最大化
- 内存开销最小化
- 易于使用的API 
- 对Android进行高度优化
<!--more-->
# GreenDao的配置  
GreenDao 3.0采用注解的方式来定义实体类，通过gradle插件生成相应的代码。   
## 在项目下build.gradle中进行配置   

	classpath 'org.greenrobot:greendao-gradle-plugin:3.2.2' // add plugin  

![][2]
## 在moudle下的单build.gradle中进行配置  

	compile 'org.greenrobot:greendao:3.2.2' // add library
![][3]   
## 自定义路径  

	greendao 
	{
    	schemaVersion 1
    	daoPackage 'com.example.greendaosample.gen'
    	targetGenDir 'src/main/java'
	}
![][4]   
在gradle的根模块中加入上述代码，就完成了我们的基本配置了。
属性介绍： 
 
- schemaVersion:指定数据库schema版本号，迁移等操作会用到
- daoPackage:dao的报名，报名默认是entry所在的包
- targetGenDir:生成数据库文件的目录
## 创建一个User的实体类  

	@Entity
	public class User 
	{
    	@Id 
    	private Long id; 
    	private String name; 
    	@Transient 
    	private int tempUsageCount; // not persisted  
	}
## MakeProject  
点击Build->ReBuild Project，等待项目编译完成后，User实体类会自动编译，生成get/set方法并且会在daoPackage目录下生成三个文件   
![][5]  

# GreenDao的使用  

## 设置DBHelper管理数据库  

	public class DBHelper 
	{
    	private static DaoMaster daoMaster;
    	private static DaoSession daoSession;
    	/**
     	* 取得DaoMaster
     	* @param context
     	* @return
    	 */
    	public static DaoMaster getDaoMaster(Context context) 
		{
        	if (daoMaster == null) 
			{
            	DaoMaster.OpenHelper helper = new DaoMaster.DevOpenHelper(context,
                    "notes.db", null);
            	daoMaster = new DaoMaster(helper.getWritableDatabase());
        	}
        	return daoMaster;
    	}
    	/**
     	* 取得DaoSession
     	* @param context
     	* @return
     	*/
    	public static DaoSession getDaoSession(Context context) 
		{
        	if (daoSession == null) 
			{
            	if (daoMaster == null) 
				{
                	daoMaster = getDaoMaster(context);
            	}
            	daoSession = daoMaster.newSession();
        	}
        	return daoSession;
    	}
	}
获取UserDao对象：DBHelper.getDaoSession(this).getUserDao();  

## 简单的增删改查实现  
### 增加数据(保存数据) 
	user=new User( 1l,"张三");
	userDao.insert(user);
![][6]
### 删除数据 
	userDao.deleteByKey(1l);
![][7]   
### 修改数据(更新数据)  
	user=new User(2l,"lisi");
	userDao.update(user);  
![][8]  
### 查询数据  
	List<User> users = userDao.loadAll(); 
![][9]  
### GreenDao的表  
![][10]  

参考：   
[GreenDaoSample][11]

 

[1]: https://github.com/greenrobot/greenDAO
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-build-gradle.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-compile.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-config.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-gen.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-save.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-del.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-update.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-query.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/greendao-table.png
[11]: https://github.com/PGzxc/GreenDaoSample

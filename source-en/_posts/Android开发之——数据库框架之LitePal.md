---
title: Android开发之——数据库框架之LitePal
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 数据库
  - LitePal
abbrlink: 6771de5f
date: 2018-01-02 20:43:22
---
# 简述  
LitePal是郭神（郭霖）在2014年的杰作，Github地址：[LitePal][1]。LitePal是一款开源的Android数据库框架，它采用了对象关系映射(ORM)的模式，并将我们平时开发时最常用到的一些数据库功能进行了封装，使得不用编写一行SQL语句就可以完成各种建表、増删改查的操作。并且LitePal很"轻"，jar包只有100k不到，而且近乎零配置，这一点和hibernate这类的框架有很大区别。  
<!--more-->

# LitePal的基本配置
## 引入Jar包或依赖   

	dependencies 
	{
    	compile 'org.litepal.android:core:1.6.1'
	}
![][2]
## 配置litepal.xml
在main/assets目录下创建一个litepal.xml文件，复制以下代码进去  

	<?xml version="1.0" encoding="utf-8"?>  
	<litepal>  
    	<dbname value="数据库名" ></dbname>  
    	<version value="数据库版本号，用于更新数据库" ></version>  
    <list>
        <!--这里是类映射-->  
    </list>  
	</litepal>
## 配置LitePalApplication  
这里有两种方式：   

- 指定application name为LitePalApplicatio   
![][3]
- 自定义Application，并添加application name     
![][4]  
# LitePal的用法  
## 创建实体类  
每个实体类对应一张数据表，这里创建两个实体类Song和Album  

	public class Song extends DataSupport 
	{
    	@Column(nullable = false)
		private String name;
		private int duration;
    	// generated getters and setters.
	}

	public class Album extends DataSupport 
	{

    	@Column(unique = true, defaultValue = "unknown")
    	private String name;
    	private float price;
    	private int number;
    	//generated getters and setters.
	}
创建的数据表分别为：    
![][5]  
![][6]  
## 加入新表对就实体类的引用   
![][7]
## 增删改查  
### 增加数据(保存数据)  

		Album album = new Album();
        album.setName("album");
        album.setPrice(10.99f);
        album.setNumber(100);
        album.save();

        Song song1 = new Song();
        song1.setName("song1");
        song1.setDuration(150);
        song1.save();

### 修改数据(更新数据)  
这里有提供两种操作：  
 
- 第一种：  

		Song songToUpdate = DataSupport.find(Song.class, 1);
        songToUpdate.setDuration(300);
        songToUpdate.save();
        Toast.makeText(this, "数据已更新" , Toast.LENGTH_SHORT).show();
- 第二种：   
 
        Song songToUpdate = new Song();
        songToUpdate.setDuration(300); // raise the price
        songToUpdate.update(1);
### 删除数据 
这里也有两种操作：  

- 删除某一条件  
		DataSupport.delete(Song.class, 1);
- 删除满足条件所有 
	DataSupport.deleteAll(Song.class, "duration > ?", "100");
### 查找数据  
	List<Song> allSongs = DataSupport.findAll(Song.class);      

参考：   
[LitePalSample][8]


[1]: https://github.com/LitePalFramework/LitePal
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/litepal-compile.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/LiteApplication-1.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/LiteApplication-2.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/litepal-album.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/litepal-song.png  
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/litepal-list.png
[8]: https://github.com/PGzxc/LitePalSample
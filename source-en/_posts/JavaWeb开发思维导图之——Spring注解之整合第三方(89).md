---
title: JavaWeb开发思维导图之——Spring注解之整合第三方(89)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c244429c
date: 2025-03-24 09:01:49
---
## 一 概述

* 整合MyBatis(案例)
* 整合Junit(案例)

<!--more-->

## 二 内容详情

### 2.1 整合MyBatis(案例)

1-步骤

```
1-修改mybatis外部配置文件格式为注解格式 
2-业务类使用@Component声明bean，使用@Auowired注入对象
3-建立配置文件JDBCConfig与MyBatisConfig类，并将其导入到核心配置类SpringConfig
4-开启注解扫描
5-使用AnnotationConfigApplicationContext对象加载配置项
```

2-拆解

```
1-拆解文件: applicatioContext.xml
2-拆解成：SpringConfig(核心配置类)
-1-JDBCConfig //JDBC配置类
-2-MyBatisConfig  //MyBati配置类
```

### 2.2 整合Junit(案例)

1-如何在Junit中使用spring中资源

```
1-spring接管Junit的运行权，使用spring专用的junit类加载器
2-为Junit测试用例设定对应的spring容器
```

2-案例改版(整合Junit)

```
1-导入spring整合Junit坐标//org.springframework.spring-test.5.1.9
2-spring整合junit测试用例注解格式
-@RunWith(SpringJunit4ClassRunner.class)
-@ContextConfiguration(classes=SpringConfig.class)
-public class UserServiceTest{}
```

## 三 思维导图

![javaweb-xmind-spring-third-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-third-8.png
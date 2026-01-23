---
title: IOS开发之——AFN-网络状态监控(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - AFN
abbrlink: 47fcc895
date: 2022-03-21 21:49:26
---
## 一 概述

* AFN中监控网络可达状态的类是AFNetworkReachabilityManager
* AFN监控网络开始后返回的网络状态是AFNetworkReachabilityStatus
* AFNetworkReachabilityStatus：包含4种网络类型：WI-FI、自带网络、没有网络、状态未知

<!--more-->

## 二 监控网络状态示例

### 2.1 代码

```
-(void)startNetWorkMonitor
{
    AFNetworkReachabilityManager *mgr=[AFNetworkReachabilityManager sharedManager];
    [mgr setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
        switch (status) {
            case AFNetworkReachabilityStatusReachableViaWiFi:
                NSLog(@"WIFI");
                break;
            case AFNetworkReachabilityStatusReachableViaWWAN:
                NSLog(@"自带网路");
                break;
            case AFNetworkReachabilityStatusNotReachable:
                NSLog(@"没有网络");
                break;
            case AFNetworkReachabilityStatusUnknown:
                NSLog(@"未知网络");
                break;
            default:
                NSLog(@"其他");
                break;
        }
    }];
    //开始监控
    [mgr startMonitoring];
}
-(void)dealloc
{
    [[AFNetworkReachabilityManager sharedManager]stopMonitoring];
}
```

### 2.2 结果

```
2022-03-21 21:23:59.330719+0800 AFN-Demo1[43751:751083] WIFI
```


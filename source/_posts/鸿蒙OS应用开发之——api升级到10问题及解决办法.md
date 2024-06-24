---
title: 鸿蒙OS应用开发之——api升级到10问题及解决办法
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 8d94ae42
date: 2024-06-22 11:58:24
---
## 一 问题概述

1. 'params' is possibly 'undefined'. \<ArkTSCheck>
2. Not all code paths return a value. \<ArkTSCheck>
3. Use explicit types instead of "any", "unknown" (arkts-no-any-unknown)
4. Argument of type 'Tag[]' is not assignable to parameter of type 'string'.
5. Object literal must correspond to some explicitly declared class or interface (arkts-no-untyped-obj-literals)
6. Array literals must contain elements of only inferrable types (arkts-no-noninferrable-arr-literals) \<ArkTSCheck>
7. Type 'null' is not assignable to type 'UserData'. \<ArkTSCheck>
8. try catch报错
9. 传值null问题
10. Property 'searchEvent' has no initializer and is not definitely assigned in the constructor

<!--more-->

## 二 问题解决

### 2.1 'params' is possibly 'undefined'. \<ArkTSCheck>

1-api10之前

```
function httpRequest(url: string, method: http.RequestMethod, params?: object): Promise<ResponseResult>

AppStorage.Set(Constants.Cookie, `loginUserName_wanandroid_com=${params['username']};` + value.header['set-cookie'])
}
```

2-api10之后

```
AppStorage.Set(Constants.Cookie, `loginUserName_wanandroid_com=${params?['username']:''};` + value.header['set-cookie'])
```

说明：params需要判空

### 2.2 Not all code paths return a value. \<ArkTSCheck>

1-api10之前

```
async getStringData(key: string) {
    Logger.info(TAG, `Get begin`)
    if (preferenceTheme !== null) {
      let data: string = ''
      data = await preferenceTheme.get(key, '') as string
      return  data;
    }
}
```

2-api10之后

```
async getStringData(key: string) {
    Logger.info(TAG, `Get begin`)
    if (preferenceTheme !== null) {
      let data: string = ''
      data = await preferenceTheme.get(key, '') as string
      return  data;
    }else{
      return ''
    }
  }
```

说明：增加else返回值

### 2.3 Use explicit types instead of "any", "unknown" (arkts-no-any-unknown)

1-api10之前

```
const isEmpty = (data) => {
  return data == undefined || data == "" || data.length <= 0 || data === '0'

};
```

2-api10之后

```
const isEmpty = (data:string) => {
  return data == undefined || data == "" || data.length <= 0 || data === '0'

};
```

说明：需要注明数据类型，ArkTS不支持`any`和`unknown`类型

### 2.4 Argument of type 'Tag[]' is not assignable to parameter of type 'string'.

1-api10之前

```
const isEmpty = (data) => {
  return data == undefined || data == "" || data.length <= 0 || data === '0'

};
```

2-api10之后

```
const isEmpty = (data:string|[]|number) => {
  return data == undefined || data == "" || (data as []).length <= 0 || data === '0'

};
```

### 2.5 Object literal must correspond to some explicitly 

1-api10之前

```
interface MyOptions {
  options?: Object; // options 可以是任何非原始类型的对象, {} 或字典对象
}
const myOptions: MyOptions = {
  options: { key1: 'value1', key2: 42 } // options 是一个具有属性的对象
};
```

2-api10之后

```
const myOptions: MyOptions = {
  options: Object({ key1: 'value1', key2: 42 }) // options 是一个具有属性的对象
};
```

### 2.6 Array literals must contain elements of only inferrable types

1-api10之前

```
 gridData= [
    {
      name: "工具",
      backgroundColor: Color.Red
    },
    {
      name: "问答",
      backgroundColor: Color.Orange
    },
    {
      name: "消息",
      backgroundColor: Color.Yellow
    },
    {
      name: "课程",
      backgroundColor: Color.Green
    },
    {
      name: "待办清单",
      backgroundColor: Color.Pink
    },
    {
      name: "分享文章",
      backgroundColor: Color.Grey
    },
  ]
```

2-api10之后

```
1-声明数据类型
interface FuncInterface {
  'name': string;
  'backgroundColor': Color;
}
2-定义数据
gridData:FuncInterface[]= [
    {
      name: "工具",
      backgroundColor: Color.Red
    },
    {
      name: "问答",
      backgroundColor: Color.Orange
    },
    {
      name: "消息",
      backgroundColor: Color.Yellow
    },
    {
      name: "课程",
      backgroundColor: Color.Green
    },
    {
      name: "待办清单",
      backgroundColor: Color.Pink
    },
    {
      name: "分享文章",
      backgroundColor: Color.Grey
    },
  ]
```

### 2.7 Type 'null' is not assignable to type 'UserData'

1-api10之前

```
@State userData: UserData = null
```

2-api10之后

```
@State userData: UserData = new UserData()
```

### 2.8 try catch报错

1-api10之前

```
catch(err  => {
     
})
```

2-api10之后

```
catch((err:Error)  => {
      
})
```

### 2.9 传值null问题

1-api10之前

```
new SettingItem($r('app.string.setting_list_theme'), $r('app.media.ic_theme'), null)
```

2-api10之后

```
new SettingItem($r('app.string.setting_list_theme'), $r('app.media.ic_theme'), $r(null))
```

### 2.10 Property 'searchEvent' has no initializer and is not definitely assigned in the constructor

1-api10之前

```
export default struct BookDefaultItem {
  item: Book
  searchEvent: (event: ClickEvent) => void
  moreEvent: (event: ClickEvent) => void
}  
```

2-api10之后

```
export default struct BookDefaultItem {
  item: Book = new Book()
  searchEvent: (event: ClickEvent) => void = ()=>{}
  moreEvent: (event: ClickEvent) => void = ()=>{}
}
```

## 三 参考

* [Object literal must correspond to some explicitly declared class or interface (arkts-no-untyped-obj-literals) <ArkTSChec](https://developer.huawei.com/consumer/cn/forum/topic/0207152450831694624)
* [ 从TypeScript到ArkTS的适配规则](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/quick-start/typescript-to-arkts-migration-guide.md)
* 


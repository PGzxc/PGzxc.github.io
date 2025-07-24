---
title: React Native开发之——组件ListView(20)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件ListView
abbrlink: 4d4d5258
date: 2018-03-14 10:00:29
---
## 一 概述

```
ListView是React Native中渲染大量数据的组件，ListView是日常开发最常用的控件之一，
会话列表（微信），商品列表（淘宝），问题列表（汽车大师）等等各种列表均用到了ListView。
这篇文章简单介绍下ListView的入门。 
```

<!--more-->  

## 二 ListView

### 2.1 属性
```
使用ListView必须熟悉以下几个属性

- dataSource
- renderRow
- rowHasChanged
```

### 2.2 常用方法

```
1、dataSource和renderRow

ListView组件必须的两个属性是dataSource和renderRow。
dataSource是列表的数据源，而renderRow则逐个解析数据源中的数据，然后返回一个设定好格式的组件来渲染。

2、rowHasChanged

rowHasChanged函数也是ListView的必需属性。
这里我们只是简单的比较两行数据是否是同一个数据（===符号只比较基本类型数据的值，和引用类型的地址）来判断某行数据是否变化了。
```

### 2.3 实例

	export default class App extends Component<Props> 
	{
		constructor(props) 
		{
	    	super(props);
	    	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    	this.state = {
	        dataSource: ds.cloneWithRows([
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"},
	            {"title": "hzw", "img": "hzw"},
	            {"title": "xiaoxin", "img": "xiaoxin"}]),
	    		};
		}
	
		render() 
		{
	    	return (
	        <View style={styles.container}>
	            <ListView
	                dataSource={this.state.dataSource}
	                renderRow={this.renderRow}/>
	        </View>
	    );
		}
	
	// 返回一个Item
	renderRow(rowData) 
		{
	    	return (
	        <TouchableHighlight onPress={()=>alert(rowData.title)} activeOpacity={0.3} underlayColor={'#ccc'}>
	            <View style={styles.itemStyle} >
	                <Image source={{uri: rowData.img}} style={styles.imageStyle}/>
	                <View style={styles.subItemStyle}>
	                    <Text style={{marginTop: 5, fontSize: 17}}>{rowData.title}</Text>
	                    <Text style={{marginBottom: 5, fontSize: 13, color: 'green'}}>简介</Text>
	                </View>
	            </View>
	        </TouchableHighlight>
	    	);
		}
	}

### 2.4 效果图 
![][1]  

## 三 参考
参考:[Github下载地址][2]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-listview.gif
[2]: https://github.com/PGzxc/RN_ListView



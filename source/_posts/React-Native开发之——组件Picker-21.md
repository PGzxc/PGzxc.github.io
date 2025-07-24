---
title: React Native开发之——组件Picker(21)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件Picker
abbrlink: 14f0d83d
date: 2018-03-15 09:33:20
---
## 一 概述
```
Picker常用于显示时间、地址选择器，是常用的控件之一。
在RN开发中，系统也为我们提供Picker控件，并且提供了IOS专用的PickerIOS组件。  

本文主要讲解Picker的使用，并介绍常用的Picker属性：  
```

<!--more-->

## 二 Picker
### 2.1 Picker属性介绍
```
1、onValueChange 
某一项被选中时执行此回调。调用时带有如下参数：

- itemValue: 被选中项的value属性
- itemPosition: 被选中项在picker中的索引位置

2、selectedValue 
默认选中的值。可以是字符串或整数。

3、testID
用于在端对端测试中定位此视图。

4、enabled（Android特有）
如果设为false，则会禁用此选择器。

5、mode（Android特有）
在Android上，可以指定在用户点击选择器时，以怎样的形式呈现选项：

- dialog（对话框形式）: 显示一个模态对话框。默认选项。
- dropdown（下拉框形式）: 以选择器所在位置为锚点展开一个下拉框

6、prompt（Android特有）
设置选择器的提示字符串。在Android的对话框模式中用作对话框的标题。

7、itemStyle（ios特有）
指定应用在每项标签上的样式。
```

### 2.2 代码示例

	export default class App extends Component<Props> 
	{
		constructor(props) 
		{
			super(props);
			this.state = 
			{
	  			language:''
			};
		}
	render() 
	{
		return (
	  	<View style={{margin:30}}>
	    <Picker selectedValue={this.state.language} mode={Picker.MODE_DIALOG} style={{width:200}} prompt='请选择语言'
	            enabled={true}
	          itemStyle={{fontSize:25, color:'red',textAlign:'left',fontWeight:'bold'}} onValueChange={(lang)=>this.setState({language:lang})}>
	      <Picker.Item  label='Java' value='java'/>
	      <Picker.Item  label="JavaScript" value="js" />
	      <Picker.Item  label="C++" value="cpp" />
	      <Picker.Item  label="Swift" value="swift" />
	    </Picker>
	    <TouchableOpacity onPress={this.onPress.bind(this,this.state.language)}>
	    <Text>确定</Text>
	    </TouchableOpacity>
	  </View>
	);
	}
		onPress(language)
		{
			alert(language)
		}
	}

### 2.3 效果图 
![][1]  

## 三 参考
参考：[Github下载][2]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-picker.gif
[2]: https://github.com/PGzxc/RN_Picker
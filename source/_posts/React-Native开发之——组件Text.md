---
title: React Native开发之——组件Text
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件Text
abbrlink: '9735e687'
date: 2018-03-04 00:40:05
---
# 前言 
Text组件是React中的一个基本组件，它与Android上的TextView组件相类似，就是用来显示文本的，这个控件除了基本的显示布局之外，可以嵌套使用，设置样式，添加事件处理功能。
![][1]
<!--more-->

# 基本用法
## 属性方法  
在这里我只是举出一些比较常用的属性方法，只是起到抛砖引玉的作用，如果要了解更多的知识可以查看官方网址。
![][2]
## 风格样式——Style标签
Text组件可以使用View组件所有的Style，View组件的所有Style可以查看官方文档  
![][3]
![][4]
# 实战 
## 基本属性练习  
### 代码 

	export default class TextInANest extends Component {constructor(props) 
	{
    	super(props);
    	this.state = 
		{
      		titleText: "Bird's Nest",
      		bodyText: 'This is not really a bird nest.'
    	};
	}
	render() 
	{
    	return (
      		<Text style={styles.baseText}>
        	<Text style={styles.titleText} onPress={this.onPressTitle}>
          		{this.state.titleText}{'\n'}{'\n'}
        	</Text>
        	<Text numberOfLines={5}>{this.state.bodyText}</Text>
      		</Text>
    		);
	}
	}

	const styles = StyleSheet.create(
	{
		baseText: {
    	fontFamily: 'Cochin',
	},
	titleText: 
	{
    	fontSize: 20,
    	fontWeight: 'bold',
	},
	});
### 效果 
![][5]
## onPress和onLongPress
### 代码 
![][9]
### 效果  
![][10]
## onLayout
### 代码 
![][11]
### 效果图 
![][12]
# 嵌套练习  
## 代码 

	export default class BoldAndBeautiful extends Component 
	{
		render() 
		{
    		return (
      		<Text style={{fontWeight: 'bold'}}>
        		I am bold
        		<Text style={{color: 'red'}}>
          		and red
        		</Text>
      		</Text>
    	);
		}
	}
## 效果图 
![][6]  
# 组合练习 
## 代码 

	<View>
		<MyAppText>
    		Text styled with the default font for the entire application
		</MyAppText>
		<MyAppHeaderText>Text styled as a header</MyAppHeaderText>
	</View>
## 效果图 
![][7]

# 其他  
参考： [RN_Text][8]




[1]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-text.png
[2]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-prop-type.png
[3]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-style-1.png
[4]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-style-2.png
[5]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-prop.png
[6]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-nesting.png
[7]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-compontent-tv-combinat.png
[8]: https://github.com/PGzxc/RN_Text
[9]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-text-onpress.png
[10]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-text-onlongpress.gif
[11]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-text-onlayout-code.png
[12]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-text-onlayout-look.png
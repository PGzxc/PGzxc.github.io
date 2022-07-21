---
title: React Native开发之——组件TouchableOpacity
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TouchableOpacity
abbrlink: c0c33208
date: 2018-03-09 09:09:56
---
# 前言 
TouchableOpacity用于使视图正确响应触摸的包装器。按下，封装视图的透明度降低，使其变暗。 这个组件比较简单，属性较少，简单说明如下：  

- activeOpacity

<!--more-->

# TouchableOpacity使用说明 
## activeOpacity属性
activeOpacity用于显示透明度，0-完全透明，1-完全不透明
## 实例练习  

	export default class App extends Component<Props> 
	{
    	render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressImage} activeOpacity={0.3}>
                    <Image
                        style={styles.button}
                        source={require('./imgs/mybutton.jpg')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onPressText} activeOpacity={0.3}>
                    <Text>文本</Text>
                </TouchableOpacity>
            </View>
        );
    }
    	_onPressImage() 
		{
    	    //alert("onPressButton")
    	}
    	_onPressText() 
		{

    	}
	}
## 效果图 
![][1]
# 其他 
参考：[RN_TouchableOpacity][2]  


[1]: https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-image/rn-touchableOpacity.gif
[2]: https://github.com/PGzxc/RN_TouchableOpacity

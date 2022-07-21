---
title: React Native开发之——组件ProgressBarAndroid
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件ProgressBarAndroid
abbrlink: e4f34554
date: 2018-03-13 11:49:24
---
# 前言 
ProgressBarAndroid是React Native封装了Android平台的显示进度组件，用来在App中内容加载进度显示。本文主要熟悉以下属性：  

- color：设置进度的颜色属性值
- indeterminate： 设置是否要显示一个默认的进度信息，该假设styleAttr的风格设置成Horizontal的时候该值必须设置成false
- progress：  number 设置当前的载入进度值(该值在0-1之间)
- styleAttr    进度条框的风格 ，能够取的值例如以下:

	- Horizontal     
	- Small   
	- Large
	- Inverse
	- SmallInverse
	- LargeInverse


<!--more-->

# ProgressBarAndroid
## 示例代码 

	export default class App extends Component<Props> 
	{
    	constructor(props) 
		{
      		super(props);
      		this.state = 
			{
         		value:0,
          		text:''
      		};
    	}
    render() 
	{
        return (
            <View>
                <ProgressBarAndroid />
                <ProgressBarAndroid animating={false}/>
                <ProgressBarAndroid color='red'/>
                <ProgressBarAndroid styleAttr={'Horizontal'}indeterminate={true} />
                <ProgressBarAndroid styleAttr={'Horizontal'}indeterminate={false}progress={0.5}/>
                <ProgressBarAndroid styleAttr={'SmallInverse'}/>

                <ProgressBarAndroid styleAttr={'Horizontal'}indeterminate={false}progress={this.state.value}/>
                <TextInput onChangeText={this.onChangeText.bind(this)} placeholder='请输入0到1之间的小数'/>
                <TouchableHighlight onPress={this.onPress.bind(this)} activeOpacity={0.5} underlayColor={'#ccc'}>
                    <Text>更新进度</Text>
                </TouchableHighlight>
            </View>
        );
    }
    	onChangeText(text)
		{
    		this.setState({text:text})
    	}
    	onPress()
		{
    		this.setState({value:parseFloat(this.state.text)})
    	}
	}
## 效果图 
![][1]  
## 其他
[Github代码][2]


[1]: https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-image/rn-progressbar.gif
[2]: https://github.com/PGzxc/RN_ProgressBarAndroid
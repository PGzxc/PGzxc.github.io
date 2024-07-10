---
title: Zepto开发之——入门详解
categories:
  - 开发
  - C-前端开发
  - Zepto
tags:
  - Zepto
abbrlink: a029ec17
date: 2024-05-15 21:46:33
---
## 一 概述

* Zepto项目地址
* Zepto介绍
* Zepto入门案例
* 参考

<!--more-->

## 二  Zepto项目地址

### 2.1 项目地址Zepto

Zepto：https://github.com/madrobby/zepto

### 2.2 文件下载：zepto/src/目录下

![][1]

### 2.3 如何使用

![][2]

说明：

* 将js文件放入js目录下
* 示例项目导入js中的依赖文件(目录结构如上图)

##  三 Zepto介绍

* 发音：仄普托
* 用文档的话来说，**Zepto**是一个轻量级的**针对现代高级浏览器的JavaScript库，** 它与jquery**有着类似的api**
*  如果你会用jquery，那么你也会用zepto
* 主要针对移动端，因为不兼容IE浏览器，所以更轻量级，体积更小，才10k左右
* 为移动端各事件提供很好的支持，但它也有部分API是和jQuery的实现方式是不同的

## 四 Zepto入门案例

### 4.1 Hello Zepto

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>第一个Demo</title>
</head>
<body>
    <div></div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('div').html("Hello Zepto")
    });
</script>
</html>
```

### 4.2 事件ready和onload的区别

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件ready和onload的区别</title>
</head>
<body>
    <script type="text/javascript" src="./js/zepto.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
           //DOM加载完毕，图片并未完全加载，调用时机比较快
        });
        $(function () {

        });
        $().ready(function () {
            
        })
        window.onload = function () {
            //全部文件加载完毕，调用时机比较久
        }
    </script>
</body>
</html>
```

### 4.3 zepto转Dom对象

如果需要用到原生js的api，可将zepto的对象和dom对象互相转换

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>dom对象和zepto对象互转</title>
</head>
<body>
    <div id="two"></div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script>
    $(document).ready(function () {
        // zepto对象转DOM对象
        $('div')[0].className = "one"
        // dom对象转zepto对象
        $(two).addClass("two")
    });
</script>
</html>
```

### 4.4 选择器

选择器的使用基本跟jquery类似，基本选择器，后台选择器，子元素选择器，相邻元素选择器等等

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>选择器</title>
</head>
<body>
    <div></div>
    <div id="demo1"></div>
    <div class="demo2"></div>
    <p class="p1"></p>
    <p class="p2"></p>
    <div id="demo3">
        <div class="one">
            <p>你好</p>
        </div>
    </div>
    <div id="demo4">
        <div class="two">
            <p>你好</p>
        </div>
    </div>
    <div id="demo5">
        <div>11</div>
        <p>22</p>
        <p>33</p>
    </div>
    <div id="demo6">
        <div>我是兄弟节点</div>
        <p>44</p>
        <p>55</p>
        <p>66</p>
    </div>
    <div id="demo7">
        <div title="demo8"></div>
        <div title="demo9"></div>
        <div title="demo10"></div>
        <div title="demo11"></div>
        <div title="demo12"></div>
    </div>
    <div id="demo13">
        <div>过滤1</div>
        <div>过滤2</div>
        <div>过滤3</div>
    </div>
</body>
    <script type="text/javascript" src="./js/zepto.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //元素选择器
            //$('div').html("我是元素选择器")
            //id选择器
            $('#demo1').html("我是id选择器")
            //类选择器
            $('.demo2').html("我是类元素选择器")
            //群组选择器
            $('.p1,.p2').html("我们是群组选择器")
            //通配符选择器
            $('*').addClass("act")
            //后代选择器
            $("#demo3 .one p").css("color","red");
            //子元素选择器
            $("#demo4 > .two").css("font-size","30px")
            //相邻元素选择器
            $("#demo5 div + p").css("color","blue")
            //兄弟选择器
            $("#demo6 div ~ p").css("color","green")
            //属性过滤选择器
            $("#demo7 div[title='demo9']").html("属性过滤选择器")
            //子元素过滤选择器
            $("#demo13 div:nth-child(2)").html("我是子元素过滤选择器")
        })
    </script>
</html>
```

### 4.5 Zepto对DOM的操作

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>zepto对dom操作</title>
</head>
<body>
    <div id="demo">
        <div>
            <p>你好</p>
        </div>
    </div>
    <ul>
        <li>删除</li>
    </ul>
    <p>要被替换的节点</p>
    <p id="demo1">被包裹的节点</p>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //var $demo = $("<div class='cr'>被插入的div</div>")
        //$("#demo").append($demo); //元素插入到选中的元素后面
        //$demo.appendTo("#demo")
        //$("#demo").prepend($demo) //元素插入到选中元素的第一个
        //$demo.prependTo("#demo")
        //$("#demo").after($demo)  //插入到元素之后，同级别
        //$demo.insertAfter("#demo")
        //$("#demo").before($demo)

        //删除操作
        //$("ul li").remove() //节点删除
        //$("ul li").empty()
        //复制节点
        // $("ul li").click(function () {
        //     $(this).clone().appendTo("ul")
        // })
        // 替换节点replaceWith
        //$("p").replaceWith("<span>我已被替换</span>")
        //包裹节点 wrap
        $("#demo1").wrap("div")
    })
</script>
</html>
```

### 4.6 Zepto对dom属性操作

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>zepto对dom属性操作</title>
    <style type="text/css">
        .red{
            color: red;
        }
        .lager{
            font-size: 30px;
        }
    </style>
</head>
<body>
    <div title="sx" class="red">属性操作</div>
    <button>按钮</button>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    //console.log($("div").attr("title"))  //获取属性值
    //$("div").attr("name","att") //添加属性值
    //$("div").attr({"name":"attr","class":"test"})//添加多个属性值
    //删除属性值
    //$("div").removeAttr("title")
    //添加样式操作
    //$("div").addClass("red lager")
    //删除样式
    //$("div").removeClass()
    //切换样式 toggle toggleClass（控制样式的添加和删除）
    $("button").click(function () {
        //$("div").toggle()
        $("div").toggleClass("red")
    });
    //判断是否含有某个样式 hasClass
    console.log($("div").hasClass("red"));
</script>
</html>
```

### 4.7 获取元素对象api

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="demo">
        <p>我是第一个元素</p>
        <h3>我是第二个元素</h3>
        <p>我是第三个元素</p>
    </div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //next是取得紧邻的后面的同辈元素
        console.log($("#demo p").next())
        //prev获取紧邻的前面的同辈元素
        console.log($("#demo h3").prev())
        //siblings获取前后的所有同辈元素
        console.log($("#demo h3").siblings())
        //获取直系父节点
        console.log($("#demo h3").parent())
        console.log($("#demo h3").parents())
    })
</script>
</html>
```

### 4.8 Zepto进行css样式修改

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>zepto中的css-dom操作</title>
</head>
<body>
    <div class="one">我是一个CSS的测试div</div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //$(".one").css("color","red").css("font-size","36px");
        $(".one").css({
            color:"blue",
            fontSize:"30px"
        });
        $(".one").width(500);
        $(".one").height(500);
        $(".one").css("background","red");
    })
</script>
</html>
```

### 4.9 事件绑定

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件绑定</title>
</head>
<body>
    <div id="one">事件绑定</div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#one").bind("click",function (ev) {
            console.log("我是bind方式的绑定")
        })
        $("#one").click(function (ev) {
            console.log("我是click方式的点击")
        })
        $("#one").on("click",function (ev) {
            console.log("我是on事件")
        })
    });
</script>
</html>
```

### 4.10 事件冒泡和事件捕获

Zepto不能进行事件捕获，所以需要用原生js，并将绑定事件默认值false改成true

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件冒泡和事件捕获</title>
</head>
<body>
    <div id="c">
        <div id="b">
            <div id="a">我是事件A</div>
        </div>
    </div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    //事件冒泡，从底到顶级冒泡，过程中凡是元素添加事件的，都会被执行
    $(document).ready(function () {
        $("#c").bind("click",function () {
            console.log("我是事件c")
        })
        $("#a").bind("click",function () {
            console.log("我是事件a")
        })
    });
    //从顶级到底，过程中凡是元素添加事件的，都会被执行
    // document.getElementById("a").addEventListener("click",function () {
    //     console.log("我是事件a")
    // },true);
    // document.getElementById("c").addEventListener("click",function () {
    //     console.log("我是事件c")
    // },true);
</script>
</html>
```

### 4.11 事件委托

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件委托代理</title>
</head>
<body>
<ul>
    <li>我是1</li>
    <li>我是2</li>
    <li>我是3</li>
    <li>我是4</li>
</ul>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //绑定事件非常消耗性能
        // $("li").bind("click",function () {
        //     console.log("我被bind事件绑定了")
        // })
        //click非常消耗性能
        // $("li").click(function () {
        //     console.log("我被click事件绑定了")
        // })
        //one 只能被调用一次
        // $("li").one("click",function () {
        //     console.log("one事件只能被执行一次")
        // })

        //live document绑定事件（只绑定一次） 存在多层冒泡缺点
        // 利用冒泡事件的方式，就叫做事件委托或代理
        // $("li").live("click",function () {
        //     console.log("live方式绑定")
        // })
        //delegate 事件代理
        // $("ul").delegate("li","click",function () {
        //     console.log("delegate事件代理绑定")
        // })

        // on 事件以上几种方式的集合
        $("ul").on("click","li",function () {
            console.log("on事件代理绑定")
        })
        //事件解除绑定
        $("ul").off()
        $("ul").unbind()

    });
</script>
</html>
```

### 4.12 事件其他用法

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件其他用法</title>
</head>
<body>
    <button>按钮</button>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript" src="./js/flexible.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //自定义事件
        // $("button").bind("muke",function () {
        //     console.log("触发自定义事件")
        // })
        // $("button").trigger("muke")

        //命名空间
        // $("button").bind("click",function () {
        //     console.log("我是普通的点击事件")
        // })
        // $("button").bind("click.muke",function () {
        //     console.log("我是第二个普通事件")
        // })
        // $("button").unbind(".muke")

        //绑定多个事件
        $("button").bind("click",function () {
            console.log("111")
        }).bind("touchstart",function () {
           console.log("222")
        })
    })
</script>
</html>
```

### 4.13 Zepto动画

因为zepto.min是轻量级的，只保留核心功能，所以动画需要引入相关的js代码，可自行到git下载

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Zepto动画</title>
</head>
<body>
    <div>123</div>
    <button>按钮</button>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript" src="./js/fx.js"></script>
<script type="text/javascript" src="./js/fx_methods.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("div").css({"fontSize":"30px","color":"red"})
        $("button").bind("click",function () {
            //$("div").toggle("slow") //切换元素的显示和隐藏
            //$("div").hide(3000)  隐藏
            //$("div").hide("slow")
            //$("div").show("slow")
            //$("div").fadeIn("slow")
            //$("div").fadeOut("slow")
            //$("div").fadeToggle("slow") //切换元素的淡入和淡出
            //$("div").fadeToggle("slow")
            $("div").fadeTo(3000,0.3)
        })
    })
</script>
</html>
```

### 4.14 自定义animate动画函数

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>zepto动画函数</title>
    <style type="text/css">
        div{
            position: absolute;
            width: 200px;
            height: 200px;
            background-color: #f27c01;
            text-align: center;
            line-height: 200px;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <div>我是方块</div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript" src="./js/fx.js"></script>
<script type="text/javascript">
    // animate 动画函数
    $(document).ready(function () {
        $("div").click(function () {
            // $("div").animate({"left":"500px"},3000,function () {
            //     alert("动画执行完毕")
            // })

            // $("div").animate({"left":"500px"},3000,function () {
            //     this.animate({"height":"500px"},3000,function () {
            //         alert("动画已执行")
            //     });
            // });
            $("div").animate({"left":"500px","height":"500px"},3000,function () {
                alert("执行完毕")
            })
        })
    })
</script>
</html>
```

### 4.15 移动端事件

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>触屏事件</title>
    <style type="text/css">
        div{
            width: 250px;
            height: 250px;
            line-height: 250px;
            background-color: #f27c01;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>屏幕</div>
</body>
<script type="text/javascript" src="./js/flexible.js"></script>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript" src="./js/touch.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("div").bind("touchmove",function (e) {
            e.preventDefault()
        })

        function listen_to(el) {
            $(el).tap(function () {
                console.log("| tap")
            }).doubleTap(function () {
                console.log("double tap")
            }).swipe(function () {
                console.log("| swipe")
            }).swipeLeft(function () {
                console.log("swipe left")
            }).swipeUp(function () {
                console.log("swipe up")
            }).swipeDown(function () {
                console.log("swipe down")
            })
        }
        listen_to("div")
    })
</script>
</html>
```

### 4.16 自定义Zepto插件

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div>我是插件</div>
</body>
<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript">
    ;(function ($) {
        $.fn.color = function(option){
            var options = $.extend({
                col:"blue",
                fz:"20px"
            },option);

            this.css("color",options.col);
            this.css("fontSize",options.fz);

            return this
        }
    })(Zepto);
    $('div').color()
</script>
</html>
```

## 五 参考

* [博客园—Zepto入门详解](https://www.cnblogs.com/dslx/p/16525380.html)
* [Zepto.js API 中文版](https://www.runoob.com/manual/zeptojs.html#)
* [Zepto官网](https://zeptojs.com/)
* [Github-Zepto](https://github.com/madrobby/zepto)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/zepto-src-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/zepto-vscode-project-struct.png
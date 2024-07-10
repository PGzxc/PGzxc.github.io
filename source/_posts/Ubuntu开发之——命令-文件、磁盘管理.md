---
title: Ubuntu开发之——命令-文件、磁盘管理
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: 490c29b7
date: 2017-12-12 14:58:25
---
# 文件管理  

## 查看文件信息：ls
ls是英文单词list的简写，其功能为列出目录的内容，是用户最常用的命令之一，它类似于DOS下的dir命令。   

Linux文件或者目录名称最长可以有265个字符，“.”代表当前目录，“..”代表上一级目录，以“.”开头的文件为隐藏文件，需要用 -a 参数才能显示。  
ls常用参数：
<!--more-->  
<table>
  <tr>
   <th>参数</th>
   <th>含义</th>
 </tr>
 <tr>
   <th>-a</th>
   <th>显示指定目录下所有子目录与文件，包括隐藏文件</th>
 </tr>
 <tr>
 <th>-l</th>
  <th>以列表方式显示文件的详细信息</th>
 </tr>
 <tr>
  <th>-h</th>
  <th>配合 -l 以人性化的方式显示文件大小</th>
  </tr>
</table>

![][1]
![][2]
![][3]
图中列出的信息含义如下图所示：   
![][4]
与DOS下的文件操作类似，在Unix/Linux系统中，也同样允许使用特殊字符来同时引用多个文件名，这些特殊字符被称为通配符。   
<table>
        <tr>
            <th>通配符</th>
            <th>含义</th>
        </tr>
        <tr>
            <th>*</th>
            <th>文件代表文件名中所有字符</th>
        </tr>
        <tr>
            <th>ls te*</th>
            <th>查找以te开头的文件</th>
        </tr>
        <tr>
            <th>ls *html</th>
            <th>查找结尾为html的文件</th>
        </tr>
        <tr>
            <th>？</th>
            <th>代表文件名中任意一个字符</th>
        </tr>
 		<tr>
            <th>ls ?.c</th>
            <th>只找第一个字符任意，后缀为.c的文件</th>
        </tr>
		<tr>
            <th>ls a.?</th>
            <th>只找只有3个字符，前2字符为a.，最后一个字符任意的文件</th>
        </tr>
		<tr>
            <th>[]</th>
            <th>[”和“]”将字符组括起来，表示可以匹配字符组中的任意一个。“-”用于表示字符范围。</th>
        </tr>
		<tr>
            <th>[abc]</th>
            <th>匹配a、b、c中的任意一个</th>
        </tr>
		<tr>
            <th>[a-f]</th>
            <th>匹配从a到f范围内的的任意一个字符</th>
        </tr>
		<tr>
            <th>ls [a-f]*</th>
            <th>找到从a到f范围内的的任意一个字符开头的文件</th>
        </tr>
		<tr>
            <th>ls a-f</th>
            <th>查找文件名为a-f的文件,当“-”处于方括号之外失去通配符的作用</th>
        </tr>
		<tr>
            <th>\</th>
            <th>如果要使通配符作为普通字符使用，可以在其前面加上转义字符。“?”和“*”处于方括号内时不用使用转义字符就失去通配符的作用。</th>
        </tr>
		<tr>
            <th>ls \*a</th>
            <th>查找文件名为*a的文件</th>
        </tr>
</table>

## 输出重定向命令：>
Linux允许将命令执行结果重定向到一个文件，本应显示在终端上的内容保存到指定文件中。  
如：ls > test.txt ( test.txt 如果不存在，则创建，存在则覆盖其内容 )  
![][5]  
注意： >输出重定向会覆盖原来的内容，>>输出重定向则会追加到文件的尾部。

## 分屏显示：more  
查看内容时，在信息过长无法在一屏上显示时，会出现快速滚屏，使得用户无法看清文件的内容，此时可以使用more命令，每次只显示一页，按下空格键可以显示下一页，按下q键退出显示，按下h键可以获取帮助。   
如图，用more打开桌面上的html
![][6]
![][7]

## 管道：|
管道：一个命令的输出可以通过管道做为另一个命令的输入。  
管道我们可以理解现实生活中的管子，管子的一头塞东西进去，另一头取出来，这里“ | ”的左右分为两端，左端塞东西(写)，右端取东西(读)。  
![][8]  

## 清屏：clear
lear作用为清除终端上的显示(类似于DOS的cls清屏功能)，也可使用快捷键：Ctrl + l ( “l” 为字母 )。  
## 切换工作目录： cd  
在使用Unix/Linux的时候，经常需要更换工作目录。cd命令可以帮助用户切换工作目录。Linux所有的目录和文件名大小写敏感   
cd后面可跟绝对路径，也可以跟相对路径。如果省略目录，则默认切换到当前用户的主目录。   
<table>
        <tr>
            <th>命令</th>
            <th>含义</th>
        </tr>
		<tr>
            <th>cd</th>
            <th>切换到当前用户的主目录(/home/用户目录)，用户登陆的时候，默认的目录就是用户的主目录。</th>
        </tr>
		<tr>
            <th>cd ~</th>
            <th>切换到当前用户的主目录(/home/用户目录)</th>
        </tr>
		<tr>
            <th>cd .</th>
            <th>切换到当前目录</th>
        </tr>
		<tr>
            <th>cd ..</th>
            <th>切换到上级目录</th>
        </tr>
		<tr>
            <th>cd -</th>
            <th>可进入上次所在的目录</th>
        </tr>
</table>
如果路径是从根路径开始的，则路径的前面需要加上 “ / ”，如 “ /mnt ”，通常进入某个目录里的文件夹，前面不用加 “ / ”。  

## 显示当前路径：pwd
使用pwd命令可以显示当前的工作目录，该命令很简单，直接输入pwd即可，后面不带参数。  
## 创建目录：mkdir
通过mkdir命令可以创建一个新的目录。参数-p可递归创建目录。

需要注意的是新建目录的名称不能与当前目录中已有的目录或文件同名，并且目录创建者必须对当前目录具有写权限。  
![mkdir][9]
## 删除目录：rmdir
可使用rmdir命令删除一个目录。必须离开目录，并且目录必须为空目录，不然提示删除失败。  
![][10]
## 删除文件：rm
可通过rm删除文件或目录。使用rm命令要小心，因为文件删除后不能恢复。为了防止文件误删，可以在rm后使用-i参数以逐个确认要删除的文件。  
常用参数及含义如下表所示：  
<table>
        <tr>
            <th>参数</th>
            <th>含义</th>
        </tr>
		<tr>
            <th>-i</th>
            <th>以进行交互式方式执行</th>
        </tr>
		<tr>
            <th>-f</th>
            <th>强制删除，忽略不存在的文件，无需提示</th>
        </tr>
		<tr>
            <th>-r</th>
            <th>递归地删除目录下的内容，删除文件夹时必须加此参数</th>
        </tr>
</table>
## 建立链接文件：ln
Linux链接文件类似于Windows下的快捷方式。

链接文件分为软链接和硬链接。

软链接：软链接不占用磁盘空间，源文件删除则软链接失效。

硬链接：硬链接只能链接普通文件，不能链接目录。
 
使用格式：   

ln 源文件 链接文件    
ln -s 源文件 链接文件  
如果没有-s选项代表建立一个硬链接文件，两个文件占用相同大小的硬盘空间，即使删除了源文件，链接文件还是存在，所以-s选项是更常见的形式。   
注意：如果软链接文件和源文件不在同一个目录，源文件要使用绝对路径，不能使用相对路径。  
![][11]  
## 查看或者合并文件内容：cat
![][12]
## 文本搜索：grep
Linux系统中grep命令是一种强大的文本搜索工具，grep允许对文本文件进行模式查找。如果找到匹配模式， grep打印包含模式的所有行。

grep一般格式为：  

 	grep [-选项] ‘搜索内容串’文件名
在grep命令中输入字符串参数时，最好引号或双引号括起来。例如：grep‘a ’1.txt。

常用选项说明：  
<table>
        <tr>
            <th>选项</th>
            <th>含义</th>
        </tr>
		<tr>
            <th>-v</th>
            <th>显示不包含匹配文本的所有行（相当于求反）</th>
        </tr>
		<tr>
            <th>-n</th>
            <th>显示匹配行及行号</th>
        </tr>
		<tr>
            <th>-i</th>
            <th>忽略大小写</th>
        </tr>
</table>
grep搜索内容串可以是正则表达式。

正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。

grep常用正则表达式：   
<table>
        <tr>
            <th>参数</th>
            <th>含义</th>
        </tr>
		<tr>
            <th>^a</th>
            <th>行首,搜寻以 m 开头的行；grep -n '^a' 1.txt</th>
        </tr>
		<tr>
            <th>ke$</th>
            <th>行尾,搜寻以 ke 结束的行；grep -n 'ke$' 1.txt</th>
        </tr>
		<tr>
            <th>[Ss]igna[Ll]</th>
            <th>匹配 [] 里中一系列字符中的一个；搜寻匹配单词signal、signaL、Signal、SignaL的行；grep -n '[Ss]igna[Ll]' 1.txt</th>
        </tr>
		<tr>
            <th>.</th>
            <th>点)匹配一个非换行符的字符；匹配 e 和 e 之间有任意一个字符，可以匹配 eee，eae，eve，但是不匹配 ee，eaae；grep -n 'e.e' 1.txt</th>
        </tr>
</table>

## 查找文件：find  
find命令功能非常强大，通常用来在特定的目录下搜索符合条件的文件，也可以用来搜索特定用户属主的文件。

常用用法：  
<table>
        <tr>
            <th>命令</th>
            <th>含义</th>
        </tr>
 		<tr>
            <th>find ./ -name test.sh</th>
            <th>查找当前目录下所有名为test.sh的文件</th>
        </tr>
		<tr>
            <th>find ./ -name '*.sh'</th>
            <th>查找当前目录下所有后缀为.sh的文件</th>
        </tr>
		<tr>
            <th>find ./ -name "[A-Z]*"</th>
            <th>查找当前目录下所有以大写字母开头的文件</th>
        </tr>
		<tr>
            <th>find /tmp -size 2M</th>
            <th>查找在/tmp 目录下等于2M的文件</th>
        </tr>
		<tr>
            <th>find /tmp -size +2M</th>
            <th>查找在/tmp 目录下大于2M的文件</th>
        </tr>
		<tr>
            <th>find /tmp -size -2M</th>
            <th>查找在/tmp 目录下小于2M的文件</th>
        </tr>
		<tr>
            <th>find ./ -size +4k -size -5M</th>
            <th>查找当前目录下大于4k，小于5M的文件</th>
        </tr>
		<tr>
            <th>find ./ -perm 0777</th>
            <th>查找当前目录下权限为 777 的文件或目录</th>
        </tr>
</table>

## 拷贝文件：cp
cp命令的功能是将给出的文件或目录复制到另一个文件或目录中，相当于DOS下的copy命令。

常用选项说明：  
<table>
        <tr>
            <th>选项</th>
            <th>含义</th>
        </tr>
 		<tr>
            <th>-a</th>
            <th>该选项通常在复制目录时使用，它保留链接、文件属性，并递归地复制目录，简单而言，保持文件原有属性。</th>
        </tr>
		<tr>
            <th>-f</th>
            <th>已经存在的目标文件而不提示</th>
        </tr>
		<tr>
            <th>-i</th>
            <th>互式复制，在覆盖目标文件之前将给出提示要求用户确认</th>
        </tr>
 		<tr>
            <th>-r</th>
            <th>若给出的源文件是目录文件，则cp将递归复制该目录下的所有子目录和文件，目标文件必须为一个目录名。</th>
        </tr>
		<tr>
            <th>-v</th>
            <th>显示拷贝进度</th>
        </tr>
</table>
![][13]
## 移动文件：mv
用户可以使用mv命令来移动文件或目录，也可以给文件或目录重命名。

常用选项说明：  
<table>
        <tr>
            <th>选项</th>
            <th>含义</th>
        </tr>
 		<tr>
            <th>-f</th>
            <th>禁止交互式操作，如有覆盖也不会给出提示</th>
        </tr>
		<tr>
            <th>-i</th>
            <th>确认交互方式操作，如果mv操作将导致对已存在的目标文件的覆盖，系统会询问是否重写，要求用户回答以避免误覆盖文件</th>
        </tr>
		<tr>
            <th>-v</th>
            <th>显示移动进度</th>
        </tr>
</table>
![mv][14]
## 归档管理：tar

计算机中的数据经常需要备份，tar是Unix/Linux中最常用的备份工具，此命令可以把一系列文件归档到一个大文件中，也可以把档案文件解开以恢复数据。

tar使用格式 tar [参数] 打包文件名 文件

tar命令很特殊，其参数前面可以使用“-”，也可以不使用。    
常用参数：   
<table>
        <tr>
            <th>选项</th>
            <th>含义</th>
        </tr>
		 <tr>
            <th>-c</th>
            <th>生成档案文件，创建打包文件</th>
        </tr>
		<tr>
            <th>-v</th>
            <th>列出归档解档的详细过程，显示进度</th>
        </tr>
		<tr>
            <th>-f</th>
            <th>指定档案文件名称，f后面一定是.tar文件，所以必须放选项最后</th>
        </tr>
		<tr>
            <th>-t</th>
            <th>列出档案中包含的文件</th>
        </tr>
		<tr>
            <th>-x</th>
            <th>解开档案文件</th>
        </tr>
</table>
注意：除了f需要放在参数的最后，其它参数的顺序任意  
![][15]
![][16]
## 文件压缩解压：gzip
tar与gzip命令结合使用实现文件打包、压缩。 tar只负责打包文件，但不压缩，用gzip压缩tar打包后的文件，其扩展名一般用xxxx.tar.gz。

gzip使用格式如下：

	gzip  [选项]  被压缩文件  

<table>
        <tr>
            <th>选项</th>
            <th>含义</th>
        </tr>
 		<tr>
            <th>-d</th>
            <th>解压</th>
        </tr>
		<tr>
            <th>-r</th>
            <th>压缩所有子目录</th>
        </tr>
</table>

![][17]
![][18]
## 文件压缩解压：bzip2

tar与bzip2命令结合使用实现文件打包、压缩(用法和gzip一样)。

tar只负责打包文件，但不压缩，用bzip2压缩tar打包后的文件，其扩展名一般用xxxx.tar.gz2。

在tar命令中增加一个选项(-j)可以调用bzip2实现了一个压缩的功能，实行一个先打包后压缩的过程。

压缩用法：tar jcvf 压缩包包名 文件...(tar jcvf bk.tar.bz2 *.c)

解压用法：tar jxvf 压缩包包名 (tar jxvf bk.tar.bz2)  

## 文件压缩解压：zip、unzip
通过zip压缩文件的目标文件不需要指定扩展名，默认扩展名为zip。

压缩文件：zip [-r] 目标文件(没有扩展名) 源文件

解压文件：unzip -d 解压后目录文件 压缩文件 
## 查看命令位置：which
![][19]

	



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-ls.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-ls_a.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-ls_l.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux_file_type.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-ls-redirect.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-more_file.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-more_open.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-pip.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-mkdir.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-rmdir.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-li-ln.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-cat.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-cp.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-mv.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-tar.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-tar_xvf.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-gzip-r.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-gzip-d.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-which.png
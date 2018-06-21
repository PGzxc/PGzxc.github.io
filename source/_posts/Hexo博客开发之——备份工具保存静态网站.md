---
title: Hexo博客开发之——备份工具保存静态网站
date: 2017-11-13 23:10:22
categories: [高级语言,Hexo博客]
tags: [备份]
---


# 工具：  

- [hexo-git-backup][1]
- git
- node

# 生成备份文件 

- 安装hexo-git-backup  
 <!--more-->
	 $ npm install hexo-git-backup --save 
       
     ![安装hexo-git-backup][2]

-  在项目根目录的_config.yml中添加back备份信息，如备份主题，备注信息，备份分支  
	
     ![添加备份信息][3]

- 执行备份执行，查看备份结果

	 $ hexo back   
     $ hexo b         

![备份结果][4]


# 从Github备份下载本地(用于更换电脑时使用)

- 在本地新建要备份的文件夹，此处备份到 /d/Code/backup 下
	
    ![][5]  

- 打开git bash，进入到此目录下  
	
    ![][6]

- 从Github从hexo分支，下载到本地  

	  git clone -b hexo git@github.com:PGzxc/PGzxc.github.io.git    

	 ![][7]
	 ![][8]

- 安装 hexo  

	$ npm install -g hexo

	![][9]	

- 安装hexo-deployer-git

	$ npm install hexo-deployer-git --save  

	![][10]
	 
- 执行 hexo g 指令，生成静态页面  

	$ hexo g

    ![][11]

- 执行 hexo s 指令，启动服务，在浏览器中输入http://localhost:4000/ 查看运行结果

	 $ hexo s  
	![][12]




[1]: https://github.com/coneycode/hexo-git-backup
[2]: http://oz732f72q.bkt.clouddn.com/hexo_git_back.png
[3]: http://oz732f72q.bkt.clouddn.com/hexo_up_info.png
[4]: http://oz732f72q.bkt.clouddn.com/hexo_branches.png
[5]: http://oz732f72q.bkt.clouddn.com/hexo_back_file.png
[6]: http://oz732f72q.bkt.clouddn.com/hexo_backup_git.png
[7]: http://oz732f72q.bkt.clouddn.com/hexo_git_clone.png
[8]: http://oz732f72q.bkt.clouddn.com/hexo_git_clone_resu.png
[9]: http://oz732f72q.bkt.clouddn.com/hexo_install_hexo_g.png
[10]: http://oz732f72q.bkt.clouddn.com/hexo_install_hexo_deplyer_git.png
[11]: http://oz732f72q.bkt.clouddn.com/hexo_back_hexo_g.png
[12]: http://oz732f72q.bkt.clouddn.com/hexo_hexo_s.png
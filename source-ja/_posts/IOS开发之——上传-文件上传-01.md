---
title: IOS开发之——上传-文件上传(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 上传
abbrlink: 801d351b
date: 2022-03-17 09:46:47
---
## 一 概述

* 用网页执行文件请求的过程
* 服务器端上传文件接收
* IOS端发送文件上传请求

<!--more-->

## 二 用网页执行文件请求的过程

### 2.1 启动服务器后，打开如下网址，到文件上传位置

```
http://localhost:8080/MJServer/
```

![][1]

### 2.2 请求成功后页面
![][2]
请求数据截取

```
-----------------------------161156855717866090712505782890
Content-Disposition: form-data; name="file"; filename="QQ20210705-0.jpg"
Content-Type: image/jpeg
	
.....//省略了文件数据代码

-----------------------------161156855717866090712505782890
Content-Disposition: form-data; name="username"


-----------------------------161156855717866090712505782890--

```

### 2.3 根据请求返回结果得到请求参数

* -----------------------------161156855717866090712505782890：请求开始
* Content-Disposition: form-data; name="file"; filename="QQ20210705-0.jpg"：请求参数(文件名)
* Content-Type: image/jpeg：传递文件类型
* 换行
* ExifMM：数据文件
* -----------------------------161156855717866090712505782890：标识符
* Content-Disposition: form-data; name="username"：传递参数
* 换行
* -----------------------------161156855717866090712505782890--：结束标识符
* 换行

## 三 服务器端上传文件接收

```
public class UploadAction extends BaseAction <UploadServiceResult> {
	// 文件上传到哪个文件夹下面(必须是存在的文件夹)
	static final String FILE_DIR = "/Users/zxc/Desktop/";
	private String username;
	private File file;
	private String fileFileName;
	public void setUsername(String username) {
		this.username = username;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public UploadAction()
	{
		service = new UploadServiceResult();
	}
	/**
	 * 处理文件上传
	 */
	public void upload() throws Exception {
		if (file != null) {
			service.setSuccess(true);
			service.setMessage("上传成功");
		     boolean isSuccess=file.renameTo(new File(FILE_DIR + fileFileName));
		     System.out.print(isSuccess);
			System.out.println(username + "上传了" + fileFileName + "文件");
		} else {
			service.setSuccess(false);
			service.setMessage("上传失败");
		}
		write();
	}
}
```

## 四 IOS端发送文件上传请求

### 4.1 代码

```
#import "ViewController.h"
#define FileBoundary @"boundary"
#define NewLien @"\r\n"
#define Encode(str) [str dataUsingEncoding:NSUTF8StringEncoding]

@interface ViewController ()
@end

@implementation ViewController

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self upload];
}
- (void)upload
{
    // 1.请求路径
    NSURL *url = [NSURL URLWithString:@"http://localhost:8080/MJServer/upload"];
    
    // 2.创建一个POST请求
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    
    // 3.设置请求体
    NSMutableData *body = [NSMutableData data];
    
    // 3.1.文件参数
    [body appendData:Encode(@"--")];
    [body appendData:Encode(FileBoundary)];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(@"Content-Disposition: form-data; name=\"file\"; filename=\"test123.png\"")];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(@"Content-Type: image/png")];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(NewLien)];
    UIImage *image = [UIImage imageNamed:@"minion_03"];
    NSData *imageData = UIImagePNGRepresentation(image);
    [body appendData:imageData];
    [body appendData:Encode(NewLien)];
    
    // 3.2.用户名参数
    [body appendData:Encode(@"--")];
    [body appendData:Encode(FileBoundary)];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(@"Content-Disposition: form-data; name=\"username\"")];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(NewLien)];
    [body appendData:Encode(@"张三")];
    [body appendData:Encode(NewLien)];
    
    // 3.3.结束标记
    [body appendData:Encode(@"--")];
    [body appendData:Encode(FileBoundary)];
    [body appendData:Encode(@"--")];
    [body appendData:Encode(NewLien)];
    
    request.HTTPBody = body;
    
    // 4.设置请求头(告诉服务器这次传给你的是文件数据，告诉服务器现在发送的是一个文件上传请求)
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", FileBoundary];
    [request setValue:contentType forHTTPHeaderField:@"Content-Type"];
    
    // 5.发送请求
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        NSLog(@"%@", dict);
        NSLog(@"%@",data);
    }];
}
@end
```

### 4.2 请求结果
#### 服务器端上传成功，桌面有上传文件
![][3]

#### app端收到服务器返回结果
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-upload-01-webpage-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-upload-01-webpage-request.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-upload-01-service-sucess.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-upload-01-app-sucess.png
---
title: Android数据加密之——异或加密算法
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 异或加密算法
abbrlink: a3cd3cd0
date: 2018-03-30 16:34:55
---

注：本文为转载文章，原文请参考：[Android数据加密之异或加密算法][1]  

# 什么是异或加密？
异或运算中，如果某个字符（或数值）x 与 一个数值m 进行异或运算得到y，则再用y 与 m 进行异或运算就可以还原为 x ，因此应用这个原理可以实现数据的加密解密功能。 

<!--more--> 

# 异或运算使用场景？   

- 两个变量的互换（不借助第三个变量）
- 数据的简单加密解密

# 异或加密解密实现？
## 固定key的方式
这种方式加密解密 算法一样
### 加密解密算法

	public byte[] encrypt(byte[] bytes) 
	{
        if (bytes == null) 
		{
            return null;
        }
        int len = bytes.length;
        int key = 0x12;
        for (int i = 0; i < len; i++) 
		{
            bytes[i] ^= key;
        }
        return bytes;
    }

### 测试加密解密

	byte[] bytes = encrypt("whoislcj".getBytes());//加密
	 String str1 = new String(encrypt(bytes));//解密

## 不固定key的方式 
### 加密实现

	public byte[] encrypt(byte[] bytes) 
	{
        if (bytes == null) 
		{
            return null;
        }
        int len = bytes.length;
        int key = 0x12;
        for (int i = 0; i < len; i++) 
		{
            bytes[i] = (byte) (bytes[i] ^ key);
            key = bytes[i];
        }
        return bytes;
    } 
### 解密实现

	public byte[] decrypt(byte[] bytes) 
	{
        if (bytes == null) 
		{
            return null;
        }
        int len = bytes.length;
        int key = 0x12;
        for (int i = len - 1; i > 0; i--) 
		{
            bytes[i] = (byte) (bytes[i] ^ bytes[i - 1]);
        }
        bytes[0] = (byte) (bytes[0] ^ key);
        return bytes;
    }

### 测试

	 byte[] bytes = encrypt("whoislcj".getBytes());//加密
     String str1 = new String(decrypt(bytes));//解密	


# 总结：
位运算可以实现很多高级，高效的运算。比如说加密，乘法中的n次方就是右移n位，速度还快。IM二进制数据包采用异或算法第一能够实现加密，第二采用异或加密算法不会改变二进制数据的长度这对二进制数据包封包起到不小的好处。故作此总结。



[1]: http://www.cnblogs.com/whoislcj/p/5944917.html

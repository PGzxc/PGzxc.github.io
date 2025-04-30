---
title: 数据结构与算法——第9章-查找表-键树存储结构-Trie树(9.11.3)
categories:
  - 开发
  - N-数据与算法
  - 数据结构与算法
tags:
  - 数据结构与算法
abbrlink: 49cd7434
date: 2023-05-26 16:14:18
---
## 一 概述

```
1.Trie树特点
2.Trie树图示
3.示例代码
4.总结
```

<!--more-->

## 二 Trie树特点

```
若以树的多重链表表示键树，则树中如同双链树一样，会含有两种结点：
1. 叶子结点：叶子结点中含有关键字域和指向该关键字的指针域；
2. 除叶子结点之外的结点（分支结点）：含有 d 个指针域和一个整数域（记录该结点中指针域的个数）；

d 表示每个结点中存储的关键字的所有可能情况，如果存储的关键字为数字，则 d= 11（0—9，以及 $），
同理，如果存储的关键字为字母，则 d=27（26 个字母加上结束符 $）。
```

## 三 Trie树图示

图 1 中的键树，采用字典树表示如图 3 所示

![][1]

```
注意：在 Trie 树中，如果从某个结点一直到叶子结点都只有一个孩子，
这些结点可以用一个叶子结点来代替，例如 ZHAO 就可以直接作为叶子结点。
```

## 四 示例代码

### 4.1 思路

```
使用 Trie 树进行查找时，从根结点出发，沿和对应关键字中的值相对应的指针逐层向下走，
一直到叶子结点，如果全部对应相等，则查找成功；反之，则查找失败。
```

### 4.2 具体实现代码

```
typedef enum {LEFT,BRANCH} NodeKind; //定义结点类型
typedef struct {//定义存储关键字的数组
	char a[20];
	int num;
} KeysType;
//定义结点结构
typedef struct TrieNode {
	NodeKind kind;//结点类型
	union {
		struct {
			KeysType k;
			struct TrieNode *infoptr;
		} lf; //叶子结点
		struct {
			struct TrieNode *ptr[27];
			int num;
		} bh; //分支结点
	};
}*TrieTree;
//求字符 a 在字母表中的位置
int ord(char a) {
	int b = a - 'A'+1;
	return b;
}
//查找函数
TrieTree SearchTrie(TrieTree T, KeysType K) {
	int i=0;
	TrieTree p = T;
	while (i < K.num) {
		if (p && p->kind==BRANCH && p->bh.ptr[ord(K.a[i])]) {
			i++;
			p = p->bh.ptr[ord(K.a[i])];
		} else {
			break;
		}
	}
	if (p) {
		return p->lf.infoptr;
	}
	return p;
}
```

```
使用 Trie 树进行查找的过程实际上是走了一条从根结点到叶子结点的路径，
所以使用 Trie 进行的查找效率取决于该树的深度。
```

## 五 总结

```
双链树和字典树是键树的两种表示方法，各有各的特点，具体使用哪种方式表示键树，需要根据实际情况而定。
例如，若键树中结点的孩子结点较多，则使用字典树较双链树更为合适。
```

## 六 参考

* [C语言中文网—键树查找法](https://c.biancheng.net/view/vip_3436.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-data-struct-basic/ds-chap9-11-3-1.png







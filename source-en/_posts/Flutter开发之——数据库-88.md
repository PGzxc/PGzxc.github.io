---
title: Flutter开发之——数据库(88)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 53f1317f
date: 2021-06-01 17:24:36
---
## 一 概述

Flutter中的数据库文件是SQLite，本文介绍Flutter中的数据操作

* 添加数据库依赖
* RawData数据库操作
* Model数据库操作

<!--more-->

## 二 添加数据库依赖

### 2.1 依赖地址

* SQLite pub地址：https://pub.flutter-io.cn/packages/sqflite
* SQLite Github：https://github.com/tekartik/sqflite

### 2.2 添加依赖

在cmd终端执行如下指令

```
flutter pub add sqflite
```

上述代码执行之后，会在 `pubspec.yaml`添加sqfile依赖

```
dependencies:
  sqflite: ^2.0.0+3
```

点击pubspec.yaml右上角的`Pub get`或者执行如下指令

```
flutter pub get
```
## 三 其他注意

### 3.1 项目中的其他依赖

* fluttertoast：弹窗提示信息
* path_provider：存储文件

### 3.2 权限(Android为例，添加存储权限)

```
 <uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 四 数据库初始化(创建数据库并返回创建后的数据库路径)

database.dart

### 4.1 有则返回，无则创建

```
Future<String> initDb(String dbName) async {
  final databasePath = await getDatabasesPath();
  final path = join(databasePath, dbName);
  if (await Directory(dirname(path)).exists()) {
    await Directory(dirname(path)).create(recursive: true);
  } else {
    try {
      await Directory(dirname(path)).create(recursive: true);
    } catch (e) {
      print(e);
    }
  }
  return path;
}
```

### 4.2 每次初始化都是新的数据库

```
Future<String> initDb(String dbName) async {
  final databasePath = await getDatabasesPath();
  final path = join(databasePath, dbName);
  if (await Directory(dirname(path)).exists()) {
    await deleteDatabase(path);
  } else {
    try {
      await Directory(dirname(path)).create(recursive: true);
    } catch (e) {
      print(e);
    }
  }
  return path;
}
```

## 五 RawData数据库操作

### 5.1 创建数据库

```
rawDBTableCreate() async {
    var path = await initDb('raw_simple.db');
    var db = await openDatabase(path);
    try {
      await db.execute('CREATE TABLE Test (id INTEGER PRIMARY KEY, name TEXT)');
    } finally {
      await db.close();
    }
  }
```

### 5.2 插入数据库

```
rawDBInsert() async {
    var path = await initDb('raw_simple.db');
    var db = await openDatabase(path);
    try {
     var insertResult= await db.rawInsert('INSERT INTO Test (name) VALUES (?)', ['test']);
     if (insertResult>0) {
       Fluttertoast.showToast(msg: "数据插入成功",gravity: ToastGravity.CENTER);
     }else {
         print("其他");
       }
    } finally {
      await db.close();
    }
  }
```

### 5.3 查询数据库

```
  rawDBQuery() async {
    var path = await initDb('raw_simple.db');
    var db = await openDatabase(path);
    try {
      var result = await db.query("Test");
      if (result.isNotEmpty) {
        Fluttertoast.showToast(
            msg: "数据查询成功:$result", gravity: ToastGravity.CENTER);
      } else {
        Fluttertoast.showToast(
            msg: "数据为空，请先写入数据", gravity: ToastGravity.CENTER);
      }
    } catch (ex) {
      Fluttertoast.showToast(msg: "$ex", gravity: ToastGravity.CENTER);
    } finally {
      await db.close();
    }
  }
```

### 5.4 更新数据库

```
rawDBUpdate() async {
    var path = await initDb('raw_simple.db');
    var db = await openDatabase(path);
    try {
      var update = await db.rawUpdate('UPDATE Test SET name = ? WHERE name = ?',
          ['updated name', 'test']);
      var result = await db.query('Test');
      if (result!=null) {
        Fluttertoast.showToast(msg: "数据更新成功:$result",gravity: ToastGravity.CENTER,);
      }else {
        print("其他");
      }
    } finally {
      await db.close();
    }
  }
```

### 5.5 删除数据库

```
rawDBDelete() async {
    var path = await initDb('raw_simple.db');
    var db = await openDatabase(path);
    try {
         deleteDatabase(path);
        Fluttertoast.showToast(msg: "数据删除成功",gravity: ToastGravity.CENTER,);
    } finally {
      await db.close();
    }
  }
```

### 5.6 界面布局

```
ListView(
        children: <Widget>[
          Center(child: Text("Raw数据库操作", style: TextStyle(color: Colors.orange, fontSize: 15.0),),),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('rawDBTableCreate'), onPressed: () => rawDBTableCreate())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('rawDBInsert'), onPressed: () => rawDBInsert())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('rawDBQuery'), onPressed: () => rawDBQuery())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('rawDBUpdate'), onPressed: () => rawDBUpdate())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('rawDBDelete'), onPressed: () => rawDBDelete())),
        ],
      )
```

![][1]

## 六 Model数据库操作

### 6.1 Model类及数据库操作类

```
import 'dart:io';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

/// `todo` table name
final String tableTodo = 'todo';

/// id column name
final String columnId = '_id';

/// title column name
final String columnTitle = 'title';

/// done column name
final String columnDone = 'done';

/// Todo model.
class Todo {
  /// Todo model.
  Todo();
  /// Read from a record.
  Todo.fromMap(Map map) {
    id = map[columnId] as int?;
    title = map[columnTitle] as String?;
    done = map[columnDone] == 1;
  }

  /// id.
  int? id;

  /// title.
  String? title;

  /// done.
  bool? done;

  /// Convert to a record.
  Map<String, Object?> toMap() {
    var map = <String, Object?>{
      columnTitle: title,
      columnDone: done == true ? 1 : 0
    };
    if (id != null) {
      map[columnId] = id;
    }
    return map;
  }
  @override
  String toString() {
    return "id=$id,title=$title,done=$done";
  }
}

/// Todo provider.
class TodoProvider {
  /// The database when opened.
  late Database db;

  /// Open the database.
  Future open(String path) async {
    db = await openDatabase(path, version: 1,
        onCreate: (Database db, int version) async {
          await db.execute('''
create table $tableTodo ( 
  $columnId integer primary key autoincrement, 
  $columnTitle text not null,
  $columnDone integer not null)
''');
        });
  }

  /// Insert a todo.
  Future<Todo> insert(Todo todo) async {
    todo.id = await db.insert(tableTodo, todo.toMap());
    return todo;
  }

  /// Get a todo.
  Future<Todo?> getTodo(int id) async {
    List<Map> maps = await db.query(tableTodo,
        columns: [columnId, columnDone, columnTitle],
        where: '$columnId = ?',
        whereArgs: [id]);
    if (maps.isNotEmpty) {
      return Todo.fromMap(maps.first);
    }
    return null;
  }

  /// Delete a todo.
  Future<int> delete(int id) async {
    return await db.delete(tableTodo, where: '$columnId = ?', whereArgs: [id]);
  }

  /// Update a todo.
  Future<int> update(Todo todo) async {
    return await db.update(tableTodo, todo.toMap(),
        where: '$columnId = ?', whereArgs: [todo.id!]);
  }

  /// Close database.
  Future close() async => db.close();
}
```

### 6.2 Model初始化

```
modelOpenDB() async {
    var path = await initDb('simple_todo.db');
    var todoProvider = TodoProvider();
    await todoProvider.open(path);
    await todoProvider.close();
  }
```

### 6.3 Model添加

```
 modelInsertDB() async {
    var path = await initDb('simple_todo.db');
    var todoProvider = TodoProvider();
    await todoProvider.open(path);

    var todo = Todo()..title = 'test';
    todo = await todoProvider.insert(todo);
    if (todo != null) {
      Fluttertoast.showToast(msg: "数据插入成功:$todo");
    }
  }
```

### 6.4 Model查询

```
 modelQuerytDB() async {
    var path = await initDb('simple_todo.db');
    var todoProvider = TodoProvider();
    await todoProvider.open(path);
    var todo = await todoProvider.getTodo(1);
    if (todo != null) {
      Fluttertoast.showToast(msg: "数据查询成功:$todo");
    } else {
      print("其他");
    }
    await todoProvider.close();
  }
```

### 6.5  Model更新

```
modelUpdateDB() async {
    var path = await initDb('simple_todo.db');
    var todoProvider = TodoProvider();
    await todoProvider.open(path);
    var todo = await todoProvider.getTodo(1);
    if (todo != null) {
      expect(todo.done, false);
      todo.done = true;
      var modify = await todoProvider.update(todo);
      if (modify > 0) {
        Fluttertoast.showToast(msg: "数据更新成功:$todo");
      }
      await todoProvider.close();
    }
  }
```

### 6.6 Model删除(一个用户)

```
 modelDelete() async {
    var path = await initDb('simple_todo.db');
    var todoProvider = TodoProvider();
    await todoProvider.open(path);
    var delete = await todoProvider.delete(1);
    if (delete > 0) {
      Fluttertoast.showToast(msg: "数据删除成功");
    }
    await todoProvider.close();
  }
```

### 6.7 Model删除数据库

```
 modelDeleteDB() async {
    var path = await initDb('simple_todo.db');
    deleteDatabase(path);
    Fluttertoast.showToast(msg: "数据库删除");
  }
```

### 6.8 界面布局

```
 ListView(
        children: <Widget>[
          Center(child: Text("Model数据库操作", style: TextStyle(color: Colors.orange, fontSize: 15.0),),),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelOpenDB'), onPressed: () => modelOpenDB())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelInsertDB'), onPressed: () => modelInsertDB())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelQuerytDB'), onPressed: () => modelQuerytDB())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelUpdateDB'), onPressed: () => modelUpdateDB())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelDelete'), onPressed: () => modelDelete())),
          Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('modelDeleteDB'), onPressed: () => modelDeleteDB())),
        ],
      )
```

![][2]

### 6.9 数据库文件位置

```
/data/user/0/com.example.flutter_image/databases
```
## 七  源码
* [下载地址](https://download.csdn.net/download/Calvin_zhou/21760858)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-raw-operation.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-model-operator.png
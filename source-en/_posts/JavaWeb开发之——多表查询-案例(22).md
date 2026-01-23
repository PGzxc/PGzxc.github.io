---
title: JavaWeb开发之——多表查询-案例(22)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: fa37d0d7
date: 2022-11-27 10:28:16
---
## 一 需求

1. 查询所有员工信息。查询员工编号，员工姓名，工资，职务名称，职务描述
2.  查询员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置
3. 查询员工姓名，工资，工资等级
4. 查询员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级
5. 查询出部门编号、部门名称、部门位置、部门人数

<!--more-->

## 二 数据准备

### 2.1 数据库执行语句

```
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS salarygrade;
-- 部门表
CREATE TABLE dept (
did INT PRIMARY KEY PRIMARY KEY, -- 部门id
dname VARCHAR(50), -- 部门名称
loc VARCHAR(50) -- 部门所在地
);
-- 职务表，职务名称，职务描述
CREATE TABLE job (
id INT PRIMARY KEY,
jname VARCHAR(20),
description VARCHAR(50)
);
-- 员工表
CREATE TABLE emp (
id INT PRIMARY KEY, -- 员工id
ename VARCHAR(50), -- 员工姓名
job_id INT, -- 职务id
mgr INT , -- 上级领导
joindate DATE, -- 入职日期
salary DECIMAL(7,2), -- 工资
bonus DECIMAL(7,2), -- 奖金
dept_id INT, -- 所在部门编号
CONSTRAINT emp_jobid_ref_job_id_fk FOREIGN KEY (job_id) REFERENCES job (id),
CONSTRAINT emp_deptid_ref_dept_id_fk FOREIGN KEY (dept_id) REFERENCES dept (did)
);
-- 工资等级表
CREATE TABLE salarygrade (
grade INT PRIMARY KEY, -- 级别
losalary INT, -- 最低工资
hisalary INT -- 最高工资
);
-- 添加4个部门
INSERT INTO dept(did,dname,loc) VALUES
(10,'教研部','北京'),
(20,'学工部','上海'),
(30,'销售部','广州'),
(40,'财务部','深圳');
-- 添加4个职务
INSERT INTO job (id, jname, description) VALUES
(1, '董事长', '管理整个公司，接单'),
(2, '经理', '管理部门员工'),
(3, '销售员', '向客人推销产品'),
(4, '文员', '使用办公软件');
-- 添加员工
INSERT INTO emp(id,ename,job_id,mgr,joindate,salary,bonus,dept_id) VALUES
(1001,'孙悟空',4,1004,'2000-12-17','8000.00',NULL,20),
(1002,'卢俊义',3,1006,'2001-02-20','16000.00','3000.00',30),
(1003,'林冲',3,1006,'2001-02-22','12500.00','5000.00',30),
(1004,'唐僧',2,1009,'2001-04-02','29750.00',NULL,20),
(1005,'李逵',4,1006,'2001-09-28','12500.00','14000.00',30),
(1006,'宋江',2,1009,'2001-05-01','28500.00',NULL,30),
(1007,'刘备',2,1009,'2001-09-01','24500.00',NULL,10),
(1008,'猪八戒',4,1004,'2007-04-19','30000.00',NULL,20),
(1009,'罗贯中',1,NULL,'2001-11-17','50000.00',NULL,10),
(1010,'吴用',3,1006,'2001-09-08','15000.00','0.00',30),
(1011,'沙僧',4,1004,'2007-05-23','11000.00',NULL,20),
(1012,'李逵',4,1006,'2001-12-03','9500.00',NULL,30),
(1013,'小白龙',4,1004,'2001-12-03','30000.00',NULL,20),
(1014,'关羽',4,1007,'2002-01-23','13000.00',NULL,10);
-- 添加5个工资等级
INSERT INTO salarygrade(grade,losalary,hisalary) VALUES
(1,7000,12000),
(2,12010,14000),
(3,14010,20000),
(4,20010,30000),
(5,30010,99990);
```

### 2.2 表模型

![][1]

## 三 需求示例

### 3.1 查询所有员工信息。查询员工编号，员工姓名，工资，职务名称，职务描述

```
/*
分析：
1. 员工编号，员工姓名，工资 信息在emp 员工表中
2. 职务名称，职务描述 信息在 job 职务表中
3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id
*/
-- 方式一 ：隐式内连接
SELECT
emp.id,
emp.ename,
emp.salary,
job.jname,
job.description
FROM
emp,
job
WHERE
emp.job_id = job.id;
-- 方式二 ：显式内连接
SELECT
emp.id,
emp.ename,
emp.salary,
job.jname,
job.description
FROM
emp
INNER JOIN job ON emp.job_id = job.id;
```

### 3.2  查询员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置

```
/*
分析：
1. 员工编号，员工姓名，工资 信息在emp 员工表中
2. 职务名称，职务描述 信息在 job 职务表中
3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id
4. 部门名称，部门位置 来自于 部门表 dept
5. dept 和 emp 一对多关系 dept.id = emp.dept_id
*/
-- 方式一 ：隐式内连接

SELECT
emp.id,
emp.ename,
emp.salary,
job.jname,
job.description,
dept.dname,
dept.loc
FROM
emp,
job,
dept
WHERE
emp.job_id = job.id
and dept.did = emp.dept_id
;
-- 方式二 ：显式内连接
SELECT
emp.id,
emp.ename,
emp.salary,
job.jname,
job.description,
dept.dname,
dept.loc
FROM
emp
INNER JOIN job ON emp.job_id = job.id
INNER JOIN dept ON dept.did = emp.dept_id
```

### 3.3 查询员工姓名，工资，工资等级

```
/*
分析：
1. 员工姓名，工资 信息在emp 员工表中
2. 工资等级 信息在 salarygrade 工资等级表中
3. emp.salary >= salarygrade.losalary and emp.salary <= salarygrade.hisalary
*/
SELECT
emp.ename,
emp.salary,
t2.*
FROM
emp,
salarygrade t2
WHERE
emp.salary >= t2.losalary
AND emp.salary <= t2.hisalary
```

### 3.4 查询员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级

```
/*
分析：
1. 员工编号，员工姓名，工资 信息在emp 员工表中
2. 职务名称，职务描述 信息在 job 职务表中
3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id
4. 部门名称，部门位置 来自于 部门表 dept
5. dept 和 emp 一对多关系 dept.did = emp.dept_id
6. 工资等级 信息在 salarygrade 工资等级表中
7. emp.salary >= salarygrade.losalary and emp.salary <= salarygrade.hisalary
*/
SELECT
emp.id,
emp.ename,
emp.salary,
job.jname,
job.description,
dept.dname,
dept.loc,
t2.grade
FROM
emp
INNER JOIN job ON emp.job_id = job.id
INNER JOIN dept ON dept.did = emp.dept_id
INNER JOIN salarygrade t2 ON emp.salary BETWEEN t2.losalary and t2.hisalary;
```

### 3.5 查询出部门编号、部门名称、部门位置、部门人数

```
/*
分析：
1. 部门编号、部门名称、部门位置 来自于部门 dept 表
2. 部门人数: 在emp表中 按照dept_id 进行分组，然后count(*)统计数量
3. 使用子查询，让部门表和分组后的表进行内连接
*/
-- 根据部门id分组查询每一个部门id和员工数
select dept_id, count(*) from emp group by dept_id;
SELECT
dept.did,
dept.dname,
dept.loc,
t1.count
FROM
dept,
(
SELECT
dept_id,
count(*) count
FROM
emp
GROUP BY
dept_id
) t1
WHERE
dept.did = t1.dept_id
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-22-more-relate-graph.png
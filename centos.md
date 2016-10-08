## 安装mongo

网络上的教程大多不靠谱。

花了一个下午去测试，终于成功。

linux下，mongo有两个包：服务端和工具包

安装服务端：
```
yum install mongodb-server
```
安装工具包：
```
yum install mongodb-server
```

启动：
```
service mongod start
```

创建数据库文件夹：
```
./bin/mongod --dbpath /data

```

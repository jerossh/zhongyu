// 先打开
// cd C:\Program Files\MongoDB\Server\3.2\bin
//  然后运行
// mongod -dbpath "C:\Program Files\MongoDB\Server\3.2\data\db"
// 作用：将mongodb的数据库文件创建到E:\Work_App\MongoDB\Data\db目录
// 注意：
// 1、注意是mongod.exe
// 2、此时界面会停在2015-03-26T15:19:17.135+0800 I NETWORK  [initandlisten] waiting for connections on port 27017 （此时数据库就已经启动）
// 4
// 初识MongoDB：
// 新开[注意是新开]一个cmd窗口后，再运行mongo.exe 程序（注意没有d) ，此时前一个窗口显示：2015-03-26T15:31:10.148+0800 I NETWORK  [initandlisten] connection accepted from 127.0.0.1:60408 #1 (1 connection now open)
// 现在就可以使用mongodb数据库了
//
// >help                    （查看相关信息）
// >db.foo.insert({a:1})    （往foo表插入a,1字段值,foo表为默认表)
// >db.foo.find()            （查看foo表数据）
//
//
//
// 以Windows Service的方式启动MongoDB
// 1
// 注册MongoDB Service
// 进入：E:\Work_App\MongoDB\bin
// 输入：mongod -dbpath "E:\Work_App\MongoDB\Data\db" -logpath "E:\Work_App\MongoDB\Data\log\MongoDB.log" -install -serviceName "MongoDB"（这里必须以管理员身份运行）
// 此时服务已经安装成功，运行
// >net start mongodb   (开启服务)
// >net stop mongodb   (关闭服务)
// MongoDB的安装与设置MongoDB服务
// 2
// 删除MongoDB Service
// mongod -dbpath "E:\Work_App\MongoDB\Data\db" -logpath "E:\Work_App\MongoDB\Data\log\MongoDB.log" -remove -serviceName "MongoDB"

show dbs
use dbname

db.dropDatabase()         // 删除当前数据库
db.collection.drop()      // 删除集合
show collections
db.collectionname.find()


// 密码验证
const crypto = require('crypto');
var salt = "kapu"
const cipher = crypto.createCipher('aes192', salt);
const decipher = crypto.createDecipher('aes192', salt);

var encrypted = cipher.update('lb1988', 'utf8', 'hex');
console.log(encrypted);          // 没有东西产生
encrypted += cipher.final('hex');
console.log(encrypted);


var decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);

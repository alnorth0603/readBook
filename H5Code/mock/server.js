const express = require('express')
const Mock = require('mockjs')
const Random = Mock.Random
const app = express()
const port = process.env.PORT || 3001
bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const router = express.Router()

router.get('/test', function(req, res) {
  let data = Mock.mock({
    "user|1-3":[{//随机生成1-3个数组元素
      'name':'@cname',//中文名称
      'id|+1':88,//属性值自动加一，初始值为88
      'age|18-28':0,//18-28以内的随机数，0只是确定类型
      'birthday':'@data("yyyy-MM-dd")',//日期
      'city':'@city(true)',//中国城市
      'color':'@color',//16进制颜色
      'fromObj|2':{'aa':'11','bb':'22','cc':'33','dd':'44'}//从obj对象中随机获取2个属性
    }, {
      'gf':'@cname'
    }]
  });
  return res.send({data:data});
})
router.get('/test1', function(req, res) {
  res.json({ message: 'hooray! welcome to our api11!' });   
})
app.use('/api', router)

app.listen(port);
console.log('mock server listen on port ' + port)
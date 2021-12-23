import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

/**
 * 使用 JSON 中间件
 */
app.use(express.json());

app.listen(port, () => {
  console.log('🚀 服务已启动! ');
});

app.get('/', (request: Request, response: Response) => {
  response.send('您好');
});

const data = [
  {
    id: 1,
    title: '芪康',
    content:
      '【主要成分】黄芪多糖<br />【功能】益气固本，诱导产生干扰素，调节机体免疫功能，促进抗体形成。<br />【主治】用于鸡传染性法氏囊病等病毒性疾病。<br />【用法与用量】肌内、皮下注射：每1kg体重,鸡2ml，连用2日。<br />【规格】以葡萄糖计100ml:1.0g<br />【包装】100ml/瓶<br />【详细说明】见产品标签说明书',
  },
  {
    id: 2,
    title: '注射用头孢噻呋钠1.0g',
    content:
      '【主要成分】头孢噻呋钠<br />【作用与用途】β-内酰胺类抗生素。主要用于治疗畜禽细菌性疾病。如猪细菌性呼吸道感染和鸡的大肠埃希菌、沙门氏菌感染等。<br />【用法与用量】肌内或静脉注射。以头孢噻呋计，一次量，每1kg体重，牛1.1～2.2mg，羊、猪3～5mg，鸡、鸭5mg，一日1次，连用3日。<br />【不良反应】1.可能引起胃肠道菌群紊乱或二重感染。2.有一定的肾毒性。3.可能出现局部一过性疼痛。<br />【注意事项】1.现配现用。2.对肾功能不全动物应调整剂量。3.对β-内酰胺类抗生素高敏的人应避免接触本品，避免儿童接触。<br />【休药期】猪4日。<br />【规格】以C19H17N5O7S3计1.0g<br />【包装】10瓶/盒',
  },
];

app.get('/posts', (request: Request, response: Response) => {
  response.send(data);
});

app.get('/posts/:postId', (request: Request, response: Response) => {
  // 获取内容 ID
  const { postId } = request.params;

  // 查找具体内容
  const posts = data.filter(item => item.id == parseInt(postId, 10));

  // 作出响应
  response.send(posts[0]);
});

app.post('/posts', (request, response) => {
  // 获取请求里的数据
  const { content } = request.body;

  // 设置响应状态码
  response.status(201);

  // 作出响应
  response.send({
    message: `成功创建了内容：${content}`,
  });
});

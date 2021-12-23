# 广州唑下生物科技有限公司 - 官方网站

# 生产密钥与公钥

```
cd config
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
exit
```

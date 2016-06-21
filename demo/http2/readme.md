# http startup

##实验目的

1. 在浏览器内访问node http2 服务器，看到http2起作用
2. 测试可以支持http2的web框架

##环境

	$ npm i http2

## 运行

	$ node server.js

重要：node版本必须>= 5.0 ,此版本的node支持http2需要的ASPN协商。后面会就此问题详细说明。

## 浏览器内

访问 https://localhost:8080 ,第一次会你遇到安全警告，忽略，继续。看到

	it works 

打开chrome - 开发工具 -network，加入protocols列，刷新，可以看到protocols内的和
字样。

DONE.

## 证书生成

我决定为了测试方便，使用域名localhost ，并通过生成自签名证书，并让chrome（浏览器）信任此证书，以便避开安全警告，以及看起来不舒服的红色的地址栏。

###生成证书

	openssl req -x509 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -days 101 -nodes

其中的Common Name (e.g. server FQDN or YOUR name) 比较关键，得输入localhost 

### 信任自签名证书(self signed certificate trust)

	This can be done by clicking on the warning icon in the address bar, then click

	Certificate Information -> Details Tab -> Export...

	Save the certificate.

	Use Chrome's Preferences -> Under The Hood -> Manage Certificates -> Import.
	下面这条非常关键：放到 Trusted Root Certification Authorities ，不要放到Person。
	On the "Certificate Store" screen of the import, choose "Place all certificates in the following store" and browse for "Trusted Root Certification Authorities." Restart Chrome.

然而我按照google：chrome self signed certificate mac怎样双击也是无法导入的，最后使用命令行搞定：

	 sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" "/Users/rita/github/liuchuanjun 1.cer"


随即发现还是不行，因为这个自签名证书已经在2015年过期了。
###验证

重启chrome后，访问
	https://localhost:8080
地址条变绿了。
## http2兼容框架

当然做web app肯定还是希望使用框架的。比较知名的express.js对http2支持还是不可用的，因为会报错。

  dest.end();
         ^
TypeError: dest.end is not a function

https://github.com/expressjs/express/issues/2761

issue 讨论了很久。解决的不太利索，而且后人怀疑未必会解决：http://stackoverflow.com/questions/28639995/node-js-server-and-http-2-2-0-with-express-js


一个不该知名的（我之前没有听说的）hapi比较轻松的搞定：

见 aprac - demo/http2/hapi_hi.js 

## 坎

### 协商方式支持问题

chrome仅仅支持aspn协商，而node-http2在node5.0之前仅仅支持NPN协商。所以总是在protocols处看到http/1.1。解决方法：升级node到6.2.1 。

firefox比chrome要全面些，它支持的协商方式是完整的（包括NPN，，因此，测试firefox时，很快就看到h2字样。

###使用openssl验证服务器协商机制

openssl s_client -nextprotoneg h2 -connect localhost:8080 

Protocols advertised by server: h2, http/1.1, http/1.0
Next protocol: (1) h2


发现服务器不支持ALPN:

	$ /usr/local/Cellar/openssl/1.0.2h_1/bin/openssl s_client -alpn h2 -connect localhost:8080 

	No ALPN negotiated

所以，当前node-http2没有alpn协商。在issue内有提到，它们正在等待openssl实现并且稳定。然而，chrome，drops NPN support for HTTP/2, ALPN only chrome只能alpn，node-http2只能npn。FUCK。怪不得总是工作于1.1


最后发现node-http2的readme提到： ALPN is only supported in node.js >= 5.0

当前：

	$ node --version
	v3.0.0

升级后测试就对了。

### 协议url

必须是
	https://localhost:8080
而非：
	http://localhost:8080

chrome和firefox都仅仅支持tls，不支持plain。

###chrome supports http2
chrome://flags

Search for HTTP/2. Find the option called Enable SPDY/4.

On version 47 of chrome it’s not even listed for me. It’s enabled by default on the newer browsers.

查看chrome的http2状态：chrome://net-internals/#http2



### firefox supports http2
firefox version >= 36在地址栏里进入'about:config'，“network.http.spdy.enabled.http2”的配置项，并默认设置为true。

请记住Firefox只在TLS上实现了http2。你只会在看到http2只在https://的网站里得到支持

在UI上，没有任何元素标明你正在使用http2。但想确认也并不复杂，一种方法是启用“Web developer->Network”，再查看响应头里面服务器发回来的内容。这个响应是“HTTP/2.0”，并且Firefox也插入了一个自己头“X-Firefox-Spdy:”，如上面截图所示。


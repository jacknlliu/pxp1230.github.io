# 安装Apache服务器

下载地址：http://httpd.apache.org/download.cgi
选择 Stable Release - Latest Version 进行下载，点击 Files for Microsoft Windows，点击 ApacheHaus，最后点击相应的发布版本进行下载。

解压之后，修改D:\application_software\Apache24\conf\httpd.conf文件中的ServerRoot参数为
```
Define SRVROOT "D:/application_software/Apache24"
ServerRoot "${SRVROOT}"
```

安装服务：
```
httpd.exe -k install -n apache
```

卸载服务：
```
sc delete apache
```

修改HTTP根目录：
修改D:\application_software\Apache24\conf\httpd.conf文件中的DocumentRoot参数为
```
DocumentRoot "F:/手机备忘录"
<Directory "F:/手机备忘录">
```


# Apache为本地主机配置多个网站根目录

在httpd.conf文件末尾添加：
```
Listen 81
NameVirtualHost *:81
<VirtualHost *:81>
DocumentRoot "F:/项目管理/项目管理培训/自动发送邮件_files"
<Directory "F:/项目管理/项目管理培训/自动发送邮件_files">
	Options Indexes FollowSymLinks
	AllowOverride None
	Require all granted
</Directory>
</VirtualHost>
```

参考自：
http://blog.csdn.net/killerlegend/article/details/27195445



# Apache下实现禁止目录浏览

在Options Indexes FollowSymLinks在Indexes前面加上 -  符号
即： Options -Indexes FollowSymLinks

备注：在Indexes前，加 + 代表允许目录浏览；加 -  代表禁止目录浏览。

注意：虚拟主机中，要把上面的  Options Indexes FollowSymLinks 注释掉，虚拟主机才起作用
```
Listen 81
NameVirtualHost *:81
<VirtualHost *:81>
DocumentRoot "F:/AGY/UDP+TCP+WebSocket+HTTP服务器程序/AdapterCode/ConsoleApplication1/bin/Debug/库"
<Directory "F:/AGY/UDP+TCP+WebSocket+HTTP服务器程序/AdapterCode/ConsoleApplication1/bin/Debug/库">
#	Options Indexes FollowSymLinks
	AllowOverride None
	Require all granted
</Directory>
</VirtualHost>
```

参考自：
http://blog.163.com/pqilai77@126/blog/static/491548842012111510637532/



# 禁止访问某些文件/目录

<Files>：提供基于文件名的访问控制，类似于<Directory>和<Location>指令。
语法：<Files filename> ... </Files>

filename参数应当是一个文件名或是一个包含通配符的字符串，其中"?"匹配任何单个字符，"*"匹配任何字符串序列。在"~"字符之后可以使用正则表达式。

在此配置段中定义的指令将作用于其基本名称(不是完整的路径)与指定的文件名相符的对象。<Files>段将根据它们在配置文件中出现的顺序被处理：在<Directory>段和.htaccess

文件被处理之后，但在<Location>段之前。<Files>能嵌入到<Directory>段中以限制它们作用的文件系统范围，也可用于.htaccess文件当中，以允许用户在文件层面上控制对它们自己文件的访问。

增加Files选项来控制，比如要不允许访问 .inc 扩展名的文件，保护php类库： 
```
<Files ~ ".inc$">
    Require all denied
</Files>
```
禁止访问config.xml文件：
```
<Files "config.xml">
    Require all denied
</Files>
```

参考自：
http://blog.csdn.net/sinat_25306771/article/details/52192357

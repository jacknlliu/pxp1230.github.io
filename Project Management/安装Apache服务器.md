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
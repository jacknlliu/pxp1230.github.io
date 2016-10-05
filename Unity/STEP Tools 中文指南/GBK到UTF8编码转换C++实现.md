在stp2webgl.cxx中添加：
```
//GBK到UTF8编码转换C++实现：http://blog.csdn.net/p569354158/article/details/6567175
#include <iostream>
#include <string>
#include <windows.h>
using namespace std;

string GBKToUTF8(const char* strGBK)
{
	string strOutUTF8 = "";
	wchar_t * str1;
	int n = MultiByteToWideChar(CP_ACP, 0, strGBK, -1, NULL, 0);
	str1 = new wchar_t[n];
	MultiByteToWideChar(CP_ACP, 0, strGBK, -1, str1, n);
	n = WideCharToMultiByte(CP_UTF8, 0, str1, -1, NULL, 0, NULL, NULL);
	char * str2 = new char[n];
	WideCharToMultiByte(CP_UTF8, 0, str1, -1, str2, n, NULL, NULL);
	strOutUTF8 = str2;
	delete[]str1;
	str1 = NULL;
	delete[]str2;
	str2 = NULL;
	return strOutUTF8;
}
```
并修改：
```
// Read the step file

opts.design = ROSE.findDesign(opts.srcfile);
```
为
```
// Read the step file

opts.design = ROSE.findDesign(GBKToUTF8(opts.srcfile).c_str());
```

资料来源：http://blog.csdn.net/p569354158/article/details/6567175
```
#include <iostream>
#include <string>
#include <fstream>
#include <windows.h> 

using namespace std;

string GBKToUTF8(const std::string& strGBK)
{
	string strOutUTF8 = "";
	WCHAR * str1;
	int n = MultiByteToWideChar(CP_ACP, 0, strGBK.c_str(), -1, NULL, 0);
	str1 = new WCHAR[n];
	MultiByteToWideChar(CP_ACP, 0, strGBK.c_str(), -1, str1, n);
	n = WideCharToMultiByte(CP_UTF8, 0, str1, -1, NULL, 0, NULL, NULL);
	char * str2 = new char[n];
	WideCharToMultiByte(CP_UTF8, 0, str1, -1, str2, n, NULL, NULL);
	strOutUTF8 = str2;
	delete[]str1;
	str1 = NULL;
	delete[]str2;
	str2 = NULL;
	return strOutUTF8;
}

string UTF8ToGBK(const std::string& strUTF8)
{
	int len = MultiByteToWideChar(CP_UTF8, 0, strUTF8.c_str(), -1, NULL, 0);
	unsigned short * wszGBK = new unsigned short[len + 1];
	memset(wszGBK, 0, len * 2 + 2);
	MultiByteToWideChar(CP_UTF8, 0, (LPCTSTR)strUTF8.c_str(), -1, wszGBK, len);

	len = WideCharToMultiByte(CP_ACP, 0, wszGBK, -1, NULL, 0, NULL, NULL);
	char *szGBK = new char[len + 1];
	memset(szGBK, 0, len + 1);
	WideCharToMultiByte(CP_ACP,0, wszGBK, -1, szGBK, len, NULL, NULL);
	//strUTF8 = szGBK;
	std::string strTemp(szGBK);
	delete[]szGBK;
	delete[]wszGBK;
	return strTemp;
}

int _tmain(int argc, _TCHAR* argv[])
{
	string test("我们中国是个强大的名族，强大的动力来自每个人的支持");
	fstream output("test.txt",ios_base::out | ios_base::app);
	output << GBKToUTF8(test);
	//system("iconv -f GBK -t utf-8");
	return 0;
}
```
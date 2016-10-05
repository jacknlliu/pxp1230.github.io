[串口监控器.exe](http://pan.baidu.com/s/1mhwXdNi)

首先需要一个客户端就是Arduino的程序
用arduino编译器新建一个程序，直接复制进去就可以了，简单解释一下：setup是启动函数，相当于unity的start函数，而loop函数相当于Update函数，serialEvent是串口事件回调函数。

```
int ledPin = 9;      // LED connected to digital pin 9
int analogPin = 3;   // potentiometer connected to analog pin 3
int val = 0;         // variable to store the read value
bool readCompleted = false;//指示是否完成读取串口数据
String serialString = "";//串口数据缓存字符串
unsigned long arduinoTime;

void setup(){
  Serial.begin(9600);
}

void loop()
{
  arduinoTime = micros();//测量时间
  Serial.write((byte*)&arduinoTime,4);//写入时间
  if (readCompleted) {
    Serial.write(61);
    serialString = "";
    readCompleted = false;
  }
  val = analogRead(analogPin);// read the input pin
  Serial.write(val);
  Serial.write(';');//结束标志
}

void serialEvent()//从串口读取字符串
{
  while(Serial.available())
  {
    char inChar = (char)Serial.read();
    if (inChar !=  ';')//结束标志
    {
      serialString += inChar;
    }
    else
    {
      readCompleted = true;
    }
  }
}
```

下面是unity的代码：

```C#
using UnityEngine;
using System.Collections;
using System.IO.Ports;//BuildSetting里API Compatibility Level要修改为.NET2.0，否则无法使用System.IO.Ports;
using UnityEditor;
using System;
using System.Collections.Generic;

public class SerialPortTest : MonoBehaviour
{
    SerialPort port;
    List<int> buffer = new List<int>();
    byte[] arduinoTime = new byte[4];
    uint micros;
    uint deltaMicros;

    void Start()
    {
        string[] names = SerialPort.GetPortNames();
        for (int i = 0; i < names.Length; i++)
        {
            if (names[i].StartsWith("COM"))
            {
                port = new SerialPort(names[i], 9600);
                port.ReadBufferSize = 1024;//默认值为4096
                port.NewLine = "\r\n";
                port.ReadTimeout = 1;//Unity在Windows平台下不能通过新线程与串口通信，这样会导致数据丢失，必须在主线程中进行
                //port.DataReceived += PortDataReceived;//Unity不支持DataReceived事件，参考：http://www.cnblogs.com/zhaozhengling/p/3696251.html
                //port.ReceivedBytesThreshold = 1;//理由同上
                break;
            }
        }
        if (port == null)
        {
            Application.Quit();
            EditorApplication.isPlaying = false;
            return;
        }
        else
        {
            port.Open();
        }
    }

    void Update()
    {
        if (buffer.Count > 0)
        {
            int i = 0;
            for (; i < buffer.Count; i++)
            {
                if ((char)buffer[i] == ';')
                {
                    if (i + 4 < buffer.Count)
                    {
                        arduinoTime[0] = (byte)buffer[i + 1];
                        arduinoTime[1] = (byte)buffer[i + 2];
                        arduinoTime[2] = (byte)buffer[i + 3];
                        arduinoTime[3] = (byte)buffer[i + 4];
                        uint newMicros = BitConverter.ToUInt32(arduinoTime, 0);
                        //UnityEngine.Debug.Log((char)((int)buffer[0]));
                        //UnityEngine.Debug.Log(BitConverter.ToInt16(buffer, 1));
                        //UnityEngine.Debug.Log(BitConverter.ToSingle(buffer, 3));
                        if (micros < newMicros)
                            deltaMicros = newMicros - micros;
                        else
                            deltaMicros = newMicros + uint.MaxValue - micros;
                        micros = newMicros;
                        UnityEngine.Debug.Log(micros / 1000000.0 + "\t" + deltaMicros);
                        i += 4;
                    }
                    else
                    {
                        buffer.RemoveRange(0, i);
                        break;
                    }
                }
            }
        }

        if (port != null && port.IsOpen)
        {
            if (Input.GetKeyDown(KeyCode.A))
            {
                byte[] bs = new byte[] { 0x61, 0x62, 0x3B };
                port.Write(bs, 0, 3);
            }

            try
            {
                for (int i = 0; i < port.ReadBufferSize; i++)
                {
                    buffer.Add(port.ReadByte());//port.ReadByte()：当串口缓冲区无数据可读时将触发"读取超时"异常
                }
            }
            catch (TimeoutException)
            {
                //UnityEngine.Debug.Log("读取超时");
            }
        }
    }
}
```
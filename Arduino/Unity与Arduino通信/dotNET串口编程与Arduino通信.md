C#核心代码如下：
```
private SerialPort port = null;
/// <summary>
/// 初始化串口实例
/// </summary>
private void InitialSerialPort()
{
    try
    {
        port = new SerialPort(portName, 9600);
        port.Encoding = Encoding.ASCII;
        port.DataReceived += port_DataReceived;//当由 SerialPort 对象表示的端口接收了数据时触发事件
        port.Open();
        this.ChangeArduinoSendStatus(true);
    }
    catch (Exception ex)
    {
        MessageBox.Show("初始化串口发生错误：" + ex.Message, "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
}
 
/// <summary>
/// 关闭并销毁串口实例
/// </summary>
private void DisposeSerialPort()
{
    if (port != null)
    {
        try
        {
            this.ChangeArduinoSendStatus(false);
            if (port.IsOpen)
            {
                port.Close();
            }
            port.Dispose();
        }
        catch (Exception ex)
        {
            MessageBox.Show("关闭串口发生错误：" + ex.Message, "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
 
/// <summary>
/// 改变Arduino串口的发送状态
/// </summary>
/// <param name="allowSend">是否允许发送数据</param>
private void ChangeArduinoSendStatus(bool allowSend)
{
    if (port != null && port.IsOpen)
    {
        if (allowSend)
        {
            port.WriteLine("serial start");
        }
        else
        {
            port.WriteLine("serial stop");
        }
    }
}
 
/// <summary>
/// 从串口读取数据并转换为字符串形式
/// </summary>
/// <returns></returns>
private string ReadSerialData()
{
    string value = "";
    try
    {
        if (port != null && port.BytesToRead > 0)//获取接收缓冲区中数据的字节数
        {
            value = port.ReadExisting();//在编码的基础上，读取 SerialPort 对象的流和输入缓冲区中所有立即可用的字节
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show("读取串口数据发生错误：" + ex.Message, "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
 
    return value;
}
```
## MiddleVRInput.cs ##

	using MiddleVR_Unity3D;
	
	
	vrNode3D node = MiddleVR.VRDisplayMgr.GetNode("HeadNode");
	transform.position = MVRTools.ToUnity(node.GetPositionVirtualWorld());
	transform.rotation = MVRTools.ToUnity(node.GetOrientationVirtualWorld());
	
	
	    struct ButtonState
	    {
	        public int count;
	        public bool isDown;
	        public bool isUp;
	        public bool isCounting;
	        public void Update(bool isPressed)
	        {
	            if (isPressed)
	            {
	                isCounting = true;
	                ++count;
	            }
	            else
	                isCounting = false;
	
	            if (isUp)
	                count = 0;
	
	            if (count == 1)
	                isDown = true;
	            else
	                isDown = false;
	
	            if (count != 0 && !isCounting)
	                isUp = true;
	            else
	                isUp = false;
	        }
	    }
	
	
	ButtonState triggerButtonState;
	void Update()
	{
	        triggerButtonState.Update(buttons.IsPressed(0));
	}
	vrButtons buttons = MiddleVR.VRDeviceMgr.GetButtons("VRPNButtons1.Buttons");
	public bool GetButtonTrigger()
	{
	        return triggerButtonState.isCounting;
	}
	public bool GetButtonTriggerDown()
	{
	        return triggerButtonState.isDown;
	}
	public bool GetButtonTriggerUp()
	{
	        return triggerButtonState.isUp;
	}
	
	
	vrAxis axis = MiddleVR.VRDeviceMgr.GetAxis("VRPNAxis0.Axis");
	public Vector2 GetAxis()
	{
	        Vector2 v = new Vector2(axis.GetValue(0), axis.GetValue(1));
	        return v;
	}





























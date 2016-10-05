## 获取Canvas的四个顶点世界坐标 ##

	#region 获取Canvas的四个顶点世界坐标，保存在fourCanvasWorldCorner（从左下角顶点开始顺时针方向）
	screen = GetComponentInParent<Canvas>();
	Vector3[] fourCanvasWorldCorner = new Vector3[4];
	Ray r = screen.worldCamera.ViewportPointToRay(new Vector3(0, 1, screen.planeDistance));
	Plane p = new Plane(-screen.worldCamera.transform.forward, screen.worldCamera.transform.TransformPoint(screen.planeDistance * Vector3.forward));
	float rayDistance;
	if (p.Raycast(r, out rayDistance))
	    fourCanvasWorldCorner[1] = r.GetPoint(rayDistance);
	r = screen.worldCamera.ViewportPointToRay(new Vector3(1, 1, screen.planeDistance));
	if (p.Raycast(r, out rayDistance))
	    fourCanvasWorldCorner[2] = r.GetPoint(rayDistance);
	r = screen.worldCamera.ViewportPointToRay(new Vector3(1, 0, screen.planeDistance));
	if (p.Raycast(r, out rayDistance))
	    fourCanvasWorldCorner[3] = r.GetPoint(rayDistance);
	r = screen.worldCamera.ViewportPointToRay(new Vector3(0, 0, screen.planeDistance));
	if (p.Raycast(r, out rayDistance))
	    fourCanvasWorldCorner[0] = r.GetPoint(rayDistance);
	#endregion
	
	#region 获取TriggerButton的四个顶点世界坐标，保存在fourTriggerButtonWorldCorner（从左下角顶点开始顺时针方向）
	Vector3[] fourTriggerButtonWorldCorner = new Vector3[4];
	triggerButton.GetWorldCorners(fourTriggerButtonWorldCorner);
	#endregion
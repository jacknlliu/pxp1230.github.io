## ButtonHelper.cs ##

	using UnityEngine;
	using System.Collections;
	using UnityEngine.EventSystems;
	using UnityEngine.UI;
	using UnityEngine.Events;

	[RequireComponent(typeof(Button))]
	public class ButtonHelper : MonoBehaviour {
	    public Text text;
	    public EventTrigger.TriggerEvent OnButtonClick;
	    BaseEventData eventData;
	    Button button;

		void Start () {
	        button = GetComponent<Button>();
	        button.onClick.AddListener(OnClick);
	        eventData = new BaseEventData(EventSystem.current);
	        if (!text)
	        {
	            text = GetComponentInChildren<Text>();
	        }
		}

	    void OnClick()
	    {
	        eventData.selectedObject = gameObject;
	        OnButtonClick.Invoke(eventData);
	    }
	}





















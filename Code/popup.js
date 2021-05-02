document.addEventListener('DOMContentLoaded', function() 
{
    var submit = document.getElementById('submit');

    var exclude = document.getElementById('exclude');

    submit.addEventListener('click', function() 
    {
    	let msg = 
    	{
    		words: document.getElementById("words").value
    	}
    	
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    	{
    		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) 
    		{
    	    	console.log(response.farewell);
    	  	});
    	});  
    	document.getElementById("words").value = "";  	 
    });

    exclude.addEventListener('click', function() 
    {
      let msg = 
      {
        exclude: true
      }
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
        chrome.tabs.sendMessage(tabs[0].id, msg, function(response) 
        {
            console.log(response);
          });
      });    
    });
});

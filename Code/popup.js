function getQueryVar(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) 
       {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
document.addEventListener('DOMContentLoaded', function() 
{
    var submit = document.getElementById('submit');

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
});

var counterContainer = document.getElementById("kix-documentmetrics-widget-content");
var counterNumReal = null;
var wordLim;
var timer = null;
function reverseNum()
{
	if (counterContainer.childElementCount > 0) 
	{
		var countType = counterContainer.innerText.split(" ");
		if (countType[1] == "words" || countType[1] == "word") 
		{;
			if (counterNumReal == null) 
			{
				counterNumReal = parseInt(counterContainer.innerText);
				counterContainer.firstElementChild.innerText = parseInt(counterContainer.innerText); - wordLim;
			}
			if (counterNumReal - wordLim != parseInt(counterContainer.innerText)) 
			{
				counterContainer.firstElementChild.innerText = parseInt(counterContainer.innerText) - wordLim;
				counterNumReal = parseInt(counterContainer.innerText) + wordLim;
			}
		}
	}
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
	wordLim = parseInt(message.words);
	pageLim = parseInt(message.pages);
	if (timer != null) 
	{
		clearInterval(timer)
		timer = setInterval(function(){reverseNum();},500);		
	}
	else
	{
		timer = setInterval(function(){reverseNum();},500);
	}
	sendResponse({farewell: "goodbye"});
});





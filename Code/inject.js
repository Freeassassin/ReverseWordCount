var counterContainer = document.getElementById("kix-documentmetrics-widget-content");
var counterNumReal = null;
var wordLim;
var exclude;
var timer = null;
function sleep(ms) 
{
      return new Promise(resolve => setTimeout(resolve, ms));
}

async function reverseNum()
{
	if (counterContainer == null) 
	{
		await sleep(2000);
		var counterContainer = document.getElementById("kix-documentmetrics-widget-content");
	}
	if (counterContainer.childElementCount > 0) 
	{

		if (exclude) 
		{
			wordLim = wordLim + counterNumReal;
			exclude=false;
		}
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
	if (message.words) 
	{
		wordLim = parseInt(message.words);
	}
	if (message.exclude)
	{
		exclude = message.exclude;		
	}
	if (timer != null) 
	{
		clearInterval(timer)
		timer = setInterval(function(){reverseNum();},500);		
	}
	else
	{
		timer = setInterval(function(){reverseNum();},500);
	}
	sendResponse({wordLim: wordLim});
});





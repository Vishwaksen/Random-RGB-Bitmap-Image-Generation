/*
  Author : Vishwaksen Mane
*/

$(document).ready(function(){
	$("#image_click").click(function(){
		event.preventDefault();
		var client = new HttpClient();
		client.get('https://www.random.org/integers/?num=3&min=0&max=127&col=1&base=10&format=plain&rnd=new', function(response) {
    	var j = JSON.stringify(response);
    	var sum=0,k=0;
    	var values = [];
    	for(var index in j)
    	{
    		if(j[index] != "\\" && j[index] != "n" && index != 0 && index != j.length-1) {
    			var sum = sum  + j[index];
    		}
    		if(j[index] == "\\" || index == j.length-2)
    		{
    			num = parseInt(sum);
    			values[k] = num;
    			k++;
    			sum = 0;
    		}
    	}
    	var createimg = new CreateBitMapImage();
		createimg.get(values[0],values[1],values[2], function(response) {
		});
	});
});
	});

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var CreateBitMapImage = function(){
this.get = function(num1, num2, num3, aCallback) {
        var c=document.getElementById("myCanvas");
		var ctx=c.getContext("2d");
		var imgData=ctx.createImageData(500,250);
		for (var i=0;i<imgData.data.length;i+=4)
  		{
  			imgData.data[i+0]=num1;
  			imgData.data[i+1]=num2;
		  	imgData.data[i+2]=num3;
			imgData.data[i+3]=255;
  		}
		ctx.putImageData(imgData,0,0);
    }
}
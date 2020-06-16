//const baseURL = 'http://localhost:8888';
//const baseURL = 'https://filmmusic.avmapping.co';

function QueryStringToJSON() {            
    var pairs = location.search.slice(1).split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.stringify(result);
}
/*
$(document).ready(function()
{   
    var query_string = QueryStringToJSON();
    var url = baseURL+'/api/parse/search';
    console.log('url>', url)
    console.log('search>', query_string);

    $.ajax({
	    type : "POST",
	    url  : url,
	    dataType: "json",
	    data : query_string,
	        success: function(response) {
	        	console.log(response);
			},
			error: function(error){
	            console.log('err',error);
	        }
	    });
    
});
*/
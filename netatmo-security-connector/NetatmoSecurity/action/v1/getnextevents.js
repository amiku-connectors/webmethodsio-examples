module.exports = {

  name: "getnextevents",

  title: "Getnextevents",

  description: "",
  version: "v1",

  input:{
    title: "Getnextevents",
    type: "object",
    properties: {
		home_id :{
			title: "home_id",
			displayTitle: "Home ID",
			type: "string"
		}, 
		event_id :{
			title: "event_id",
			displayTitle: "Before this event",
			type: "string"
		}, 
		size: {
			title: "size", 
			displayTitle: "Number of events (default 30)",
			type: "string"
		}
    }
  },

  output: {
    title: "output",
  	type: "object",
	displayTitle: "Output", 
	properties: {
	}
  },

  mock_input:{},

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    var request = require("request");	
	
    var options = {
      "method": "get",
      "url": "https://api.netatmo.com/api/getnextevents?home_id=" + input.home_id + "&event_id=" + input.event_id + "&size=" + input.size, 
      "headers": {
          "Accept": "application/json",
          "Authorization": "Bearer " + input.auth.access_token
      }
    }
    request(options, function(err, response, body) {
        if (err) {
            return output(err);
        }
        try {
            if (body && typeof(body) === "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return output(body);
        };
        if (response.statusCode === 401) {
            return output("Invalid access token");
        }
        if (response.statusCode !== 200) {
            return output(body);
        }
        if (response.statusCode === 200) {
            return output(null, body);
        }
        output(body);

    })
	
  }

}

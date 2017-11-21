$("#facilities").on("click",function(e){
      e.preventDefault();
      //Base url for nasa API
      var apiURL = "https://data.nasa.gov/resource/gvk9-iz74.json";

      //Making an Ajax request to the NASA API
      $.ajax(
        {
          url:apiURL,
          success: function(response){
            console.log(response);

            //Api key fo open weather
            var apiKey = "YOUR_API_KEY";

            //Here I go through each element that the NASA API have me
            response.forEach(function(res2){
                //Weather API
                //Here I extract the longitude and latitude of each Nasa facility
                var lat = res2.location.latitude;
                var lon = res2.location.longitude;

                //Here I create a query url with the latitude and longitude for the open weather API
                var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon;
                var weatherUrlKey = weatherUrl+"&appid="+apiKey;

                //Making an ajax request to the open weather API with the url
                  $.ajax(
                    {
                      url:weatherUrlKey,
                      success:function(res3){

                        var fahrenheit = Math.floor(((parseInt(res3.main.temp)-273.15)*1.8)+32);

                        //Appending to the ol a list element with the NASA facility's name and its current temperature
                        $("ol").append("<li>"+res2.facility+" Temp: "+fahrenheit+"F </li>");

                      },
                      error: function(er2){
                        console.log(er2);
                      }

                    }
                    );
            });//Close forEach
          },

          error: function(r){
            console.log(r);
          }
        }
      );



});

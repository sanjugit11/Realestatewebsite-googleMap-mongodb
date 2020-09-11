function initMap(){
	//var jirakpur= {lat: 30.668667 , lng:76.813472 }; //30.668667, 76.813472
	var map = new google.maps.Map(document.getElementById('map'),{ 
         	zoom: 12.5, //zoom to your location
         	center:{lat: 30.668667 , lng:76.813472},//30.707396, 76.807724 for the road so it can locate al properties
         	mapTypeId: 'satellite',//only for satellite image
           // tilt:45
         });
	

	function addmarker(place){
	var marker= new google.maps.Marker({
            position:place.coords,//{lat: 30.668667 , lng:76.813472 },
            map:map ,
            //icon: place.iconimage  
        });     

	         if(place.iconimage){
           	marker.setIcon(place.iconimage);
              }
			     if(place.content){
			     var infoWindow= new google.maps.InfoWindow({
			     	 content: place.content
			         });
				     marker.addListener('mouseover',function(){
				     	infoWindow.open(map,marker); 
				     });
				      marker.addListener('mouseout', function(){
	                    infoWindow.close(map, marker);
	                  });
			      }

     }
     addmarker({
     	 coords:{lat: 30.668667 , lng:76.813472 } , //office
         iconimage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
         content:'<strong><mark>eRealto.com</mark></strong> ,<br>plot No. 23 Lifeline Hospital,<br>Zirakpur-chandigarh Highway,<br>Zirakpur ,<br><b><a href="url" target="_blank">VIEW OFFICE</a></b>'
                   
         
         });
     
          addmarker({
	     	 coords:{lat: 30.662269, lng:76.832352 } , //shagun aprtment30.662269, 76.832352
	         iconimage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png',
	         content:'<strong><mark>SHAGUN Apartment</mark></strong>,<br>plot No.10, <br>Zirakpur-panchkula Highway,<br>Zirakpur,<br><b><a href="url">VIEW SITE</a></b>',
	         
	         });

}

  




        
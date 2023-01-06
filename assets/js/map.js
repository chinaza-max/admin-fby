
  let radius=40
  let cityCircle='';
  let position = [9.1016, 7.2139];
  let contentString ="";



function initAutocomplete() {
  let myRadius=document.getElementById("radius")

  let latlng = new google.maps.LatLng(position[0], position[1]);
  let myOptions = {
    center: latlng,
    zoom: 19,
    mapTypeId: "roadmap",
  }

    const geocoder = new google.maps.Geocoder();
    const map = new google.maps.Map(document.getElementById("map"), myOptions);
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");


    const searchBox = new google.maps.places.SearchBox(input);
  
   // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {

      searchBox.setBounds(map.getBounds());
    });
  
    
    let markers = [];

  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
     
      if (places.length == 0) {
        return;
      } 

     // console.log(places)
      let lng=places[0].geometry.location.lng()
      let lat=places[0].geometry.location.lat()

       transition([lat,lng]);

       geocoder.geocode({
        'latLng': places[0].geometry.location
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              console.log(results)

              contentString=results[0].formatted_address

                infowindow.setContent(contentString);

                console.log(contentString)
            }
          }
        });
  
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
  
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    

    let marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: "Latitude:"+position[0]+" | Longitude:"+position[1],
      draggable: true,
    });
    

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {

      infowindow.open({
        anchor: marker,
        map,
      });
    });

    marker.addListener("dragend", (ev) => {

      position=[ev.latLng.lat(),ev.latLng.lng()]
      console.log(ev.latLng.lat())
      console.log(ev.latLng.lng())
      console.log(ev)
      console.log(ev.latLng)

      marker.setTitle("Latitude:"+ev.latLng.lat()+" | Longitude:"+ev.latLng.lng());


      geocoder.geocode({
        'latLng': ev.latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            contentString=results[0].formatted_address

            
            console.log(results[0])
            infowindow.setContent(contentString);
          }
        }
      });
      let lng=ev.latLng.lng()
      let lat=ev.latLng.lat()

      removeCircumference()
      drawCircumference(lat,lng)
 
      //map.setCenter(marker.getPosition());
    });
  


    google.maps.event.addListener(map, 'click', function(event) {

      position=[event.latLng.lat(),event.latLng.lng()]

      geocoder.geocode({
        'latLng': event.latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            contentString=results[0].formatted_address
            infowindow.setContent(contentString);
          }
        }
      });
      var result = [event.latLng.lat(), event.latLng.lng()];
      transition(result);
    });

    let numDeltas = 100;
    let delay =2; //milliseconds
    let i = 0;
    let deltaLat;
    let deltaLng;

    function transition(result){
      i = 0;
      deltaLat = (result[0] - position[0])/numDeltas;
      deltaLng = (result[1] - position[1])/numDeltas;
      moveMarker();
  }
  
  function moveMarker(){
      position[0] += deltaLat;
      position[1] += deltaLng;
      let latlng = new google.maps.LatLng(position[0], position[1]);
      marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
      marker.setPosition(latlng);
      if(i!=numDeltas){
          i++;
          setTimeout(moveMarker, delay);
      }
      else{
        removeCircumference()
        drawCircumference(position[0], position[1])
      }
      
    }


    function drawCircumference(lat,lng){

      console.log(lat,lng)
      //radius is in meter
      cityCircle=new google.maps.Circle({
          radius, 
          center:  { lat, lng},
          map,
          fillColor: '#FF0000',
          fillOpacity: 0.2,
          strokeColor: '#FF0000',
          strokeOpacity: 0.6
      }); 
    }

    function removeCircumference(){
      if(cityCircle==''){
          return;
      }
      else{
        cityCircle.setMap(null)
      }

    }

    myRadius.addEventListener("change", (e)=>{
        radius=parseInt(e.target.value)
        removeCircumference()
        drawCircumference(position[0], position[1])
    });

/*
     // Attach it to the marker we've just added
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    */


    
let submitSite=document.getElementById("submitSite")
let inputJobCost=document.getElementById("inputJobCost")
let inputSiteName=document.getElementById("inputSiteName")
let inputGuardAmount=document.getElementById("inputGuardAmount")





submitSite.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log(inputSiteName.value,inputJobCost.value,inputGuardAmount.value)

})

  }
  
  window.initAutocomplete = initAutocomplete;



  //for moving marker 
  //https://www.codexworld.com/google-map-move-marker-smoothly-javascript-api/#:~:text=JavaScript%20Code,click%20on%20the%20Google%20map.

















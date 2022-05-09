function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return 0; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return 0; // Invalid Value
}

function getGarageValue() {
  var uiGarage = document.getElementsByName("uigarage");
  for(var i in uiGarage) {
    if(uiGarage[i].checked) {
        return parseInt(i)+1;
    }
  }
  return 0; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var lArea = document.getElementById("uiLArea");
  var fArea = document.getElementById("uiFArea");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var garage = getGarageValue();
  var year = document.getElementById("uiYears");
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");
  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "https://projectpredectprice.herokuapp.com/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      bedrooms: bhk,
      bathrooms: bathrooms,
      garage:garage,
      land_area: parseFloat(lArea.value),
      floor_area: parseFloat(fArea.value),
      build_year: parseFloat(year.value),
      SUBURB: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " AUD</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "https://projectpredectprice.herokuapp.com/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;

const refExportDollars = new Firebase("https://mhacks6bb.firebaseio.com/export%20dollars");
const refImportDollars = new Firebase("https://mhacks6bb.firebaseio.com/import%20dollars");

var map;
var minDate = 20120101;
var endDate = 20121231;

var ruSum = 0;
var cnSum = 0;
var bzSum = 0;


$(document).ready(function(){
  $("#begin-btn").click(function(){

    $(document.body).animate({
      "background-color": "#353535"
    }, "slow");

    $("#containerForMap").animate({
      opacity: "1"
    }, "slow", function(){
      $("#containerForMap").css("display","block");
    });

    $("#yearTextBox").animate({
      opacity: "1"
    }, "slow", function(){
      $("#yearTextBox").css("display","block");
    });

    $("#yearLabel").animate({
      opacity: "1"
    }, "slow");

    $("#main-title").animate({
      opacity: 0,
      top: "-=20"
    }, "slow", function(){
      fetchData();
      $(this).css("display", "none");
      map = new Datamap({
        element: document.getElementById('containerForMap'),
        geographyConfig: {
          highlightOnHover: false,
          // popupOnHover: false,
          borderWidth: 1,
          borderColor: '#F5F5F5'
        },
        fills: {
            defaultFill: '#F5F5F5',
        },
        projection: 'mercator',


      });
    });

    $("#main-description").animate({
      opacity: 0,
      top: "-=20"
    }, "slow", function(){
      $(this).css("display", "none");
    });

    $("#main-developers").animate({
      opacity: 0,
      top: "-=20"
    }, "slow", function(){
      $(this).css("display", "none");
    });

    $("#begin-btn").animate({
      opacity: 0,
      top: "-=20"
    }, "slow", function(){
      $(this).css("display", "none");
    });

  });
});

function fetchData(){
  var parsedData = [];
  var rawData = refExportDollars.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      childSnapshot.forEach(function(childChildSnapshot) {
        var childChildKey = childChildSnapshot.key();
        if (childChildKey == "Items"){
          childChildSnapshot.forEach(function(childChildChildSnapshot) {
            if (childChildChildSnapshot.key() != "ScannedCount"){
              var dateData = childChildChildSnapshot.val().Date;
              dateData = dateData.replace("-","");
              dateData = dateData.replace("-","");
              var countryData;
              if (childChildChildSnapshot.val().Ticker.substring(0,2) == "CN"){
                countryData = "China";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "BZ"){
                countryData = "Brazil";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "RU"){
                countryData = "Russia";
              }
              var valueData = childChildChildSnapshot.val().Value;
              if (countryData === "Brazil"){
                valueData = valueData/1000;
              }
              parsedData.push([dateData, countryData, valueData]);
            }
          });
        }
      });
    });
  }, function (errorObject) {
    console.log("the read failed: " + errorObject.code);
  });

  rawData = refImportDollars.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      childSnapshot.forEach(function(childChildSnapshot) {
        var childChildKey = childChildSnapshot.key();
        if (childChildKey == "Items"){
          childChildSnapshot.forEach(function(childChildChildSnapshot) {
            if (childChildChildSnapshot.key() != "ScannedCount"){
              var dateData = childChildChildSnapshot.val().Date;
              dateData = dateData.replace("-","");
              dateData = dateData.replace("-","");
              var countryData;
              if (childChildChildSnapshot.val().Ticker.substring(0,2) == "CN"){
                countryData = "China";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "BZ"){
                countryData = "Brazil";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "RU"){
                countryData = "Russia";
              }
              var valueData = -1 * childChildChildSnapshot.val().Value;
              if (countryData === "Brazil"){
                valueData = valueData/1000;
              }
              parsedData.push([dateData, countryData, valueData]);
            }
          });
        }
      });
    });
  }, function (errorObject) {
    console.log("the read failed: " + errorObject.code);
  });

  displayData(parsedData);

}

function displayData(parsedData){
  setTimeout(function () {
    var animationQueue = [];
    for (var i = 0; i < parsedData.length; i++){
      if (parsedData[i][0] == minDate){
        animationQueue.push(parsedData[i]);
        console.log(parsedData[i]);
      }
    }

    if (animationQueue.length > 0){

      for (var i = 0; i < animationQueue.length; i++){
        if (animationQueue[i][1] == "Russia"){
          ruSum += animationQueue[i][2];
          if (ruSum > 0){
            map.updateChoropleth({
              RUS: "rgba(51,204,51," + ruSum/175 +")"
            });
          }else if (ruSum < 0){
            map.updateChoropleth({
              RUS: "rgba(255,80,80," + ruSum/175 +")"
            });
          }else{
            map.updateChoropleth({
              RUS: "rgba(245,245,245,1)"
            });
          }
        }else if (animationQueue[i][1] == "China"){
          cnSum += animationQueue[i][2];
          if (cnSum > 0){
            map.updateChoropleth({
              CHN: "rgba(51,204,51," + cnSum/175 +")"
            });
          }else if (cnSum < 0){
            map.updateChoropleth({
              CHN: "rgba(255,80,80," + cnSum/175 +")"
            });
          }else{
            map.updateChoropleth({
              CHN: "rgba(245,245,245,1)"
            });
          }
        }else{
          bzSum += animationQueue[i][2];
          if (bzSum > 0){
            map.updateChoropleth({
              BRA: "rgba(51,204,51," + bzSum/175 +")"
            });
          }else if (bzSum < 0){
            map.updateChoropleth({
              BRA: "rgba(255,80,80," + bzSum/175 +")"
            });
          }else{
            map.updateChoropleth({
              BRA: "rgba(245,245,245,1)"
            });
          }
        }
      }

      animationQueue = [];
    }

    minDate++;
    if (minDate%100==32){
      minDate=minDate-31+100;
    }
    if (minDate <= endDate) {
       displayData(parsedData);
    }
  }, 75)
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

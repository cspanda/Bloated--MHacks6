// const refExportDollars = new Firebase("https://mhacks6bb.firebaseio.com/export%20dollars");
// const refImportDollars = new Firebase("https://mhacks6bb.firebaseio.com/import%20dollars");

const refExportDollars = new Firebase("https://mhacks6demo.firebaseio.com/export%20dollars");
const refImportDollars = new Firebase("https://mhacks6demo.firebaseio.com/import%20dollars");

var map;
var minDate = 20120101;
var endDate = 20121231;

var circle;

var ruSum = 0;
var cnSum = 0;
var bzSum = 0;
var geSum = 0;
var usSum = 0;
var deSum = 0;
var zeSum = 0;
var auSum = 0;
var ngSum = 0;
var caSum = 0;
var idSum = 0;
var grSum = 0;
var egSum = 0;
var cdSum = 0;
var dzSum = 0;
var saSum = 0;

var dayDelay = 5;
var stopFastForward;
var selectedBeginMonth;

$(document).ready(function(){
  $("#goBtnContainer").click(function(){

    circle.set(0);

    resetColours();

    selectedBeginMonth = parseInt($('#monthMenu').find(":selected").val(), 10);
    console.log(selectedBeginMonth);
    switch (selectedBeginMonth){
      case 0:
        circle.set(0);
        dayDelay = 75;
        stopFastForward = 20120101;
        break;
      case 1:
        circle.set(1/12);
        stopFastForward = 20120201;
        break;
      case 2:
        circle.set(2/12);
        stopFastForward = 20120301;
        break;
      case 3:
        circle.set(3/12);
        stopFastForward = 20120401;
        break;
      case 4:
        circle.set(4/12);
        stopFastForward = 20120501;
        break;
      case 5:
        circle.set(5/12);
        stopFastForward = 20120601;
        break;
      case 6:
        circle.set(6/12);
        stopFastForward = 20120701;
        break;
      case 7:
        circle.set(7/12);
        stopFastForward = 20120801;
        break;
      case 8:
        circle.set(8/12);
        stopFastForward = 20120901;
        break;
      case 9:
        circle.set(9/12);
        stopFastForward = 20121001;
        break;
      case 10:
        circle.set(10/12);
        stopFastForward = 20121101;
        break;
      default:
        circle.set(11/12);
        stopFastForward = 20121201;
        break;
    }

    fetchData();
    $(this).animate({
      opacity: "0"
    }, "slow", function(){
      $("#containerForMap").animate({
        top: "-=60px"
      });
    });
    var endColor = '#6FD57F';
    var timer = 372 * 75 - 31 * 75 * selectedBeginMonth;
    circle.animate(1.0,{
      duration: timer,
      from: {color: endColor},
      to: {color: endColor}

    });

  });

  $("#begin-btn").click(function(){

    $(document.body).animate({
      "background-color": "#353535"
    }, "slow");

    $("#containerForMap").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");
    });
    $("#calendarMonth").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");
    });

    $("#containerForTimer").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");

      var startColor = '#FC5B3F';
      var endColor = '#6FD57F';

      var element = document.getElementById('containerForTimer');
      circle = new ProgressBar.Circle(element, {
          color: startColor,
          trailColor: '#eee',
          trailWidth: 1,
          duration: 2000,
          strokeWidth: 5,
          // text: {
          //     value: '0'
          // },
          // step: function(state, bar) {
          //     bar.setText((bar.value() * 100).toFixed(0));
          // },
          // Set default step function for all animate calls
          step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
          }
      });

    });

    $("#monthMenu").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");
    });

    $("#monthLabel").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");
    });

    $("#goBtnContainer").animate({
      opacity: "1"
    }, "slow", function(){
      $(this).css("display","block");
    })

    $("#main-title").animate({
      opacity: 0,
      top: "-=20"
    }, "slow", function(){
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
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "DE"){
                countryData = "Germany";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "US"){
                countryData = "US";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "GR"){
                countryData = "Greece";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "ZA"){
                countryData = "Africa";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "AU"){
                countryData = "Australia";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "NG"){
                countryData = "Nigeria";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "CA"){
                countryData = "Canada";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "ID"){
                countryData = "Indonesia";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "GL"){
                countryData = "Greenland";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "EG"){
                countryData = "Egypt";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "DG"){
                countryData = "DRCongo";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "DZ"){
                countryData = "Algeria";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,3) == "SAU"){
                countryData = "Saudi Arabia";
              }

              var valueData = childChildChildSnapshot.val().Value;
              // if (countryData === "Brazil"){
              //   valueData = valueData/1000;
              // }
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
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "DE"){
                countryData = "Germany";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "US"){
                countryData = "US";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "GR"){
                countryData = "Greece";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "ZA"){
                countryData = "Africa";
              }else if (childChildChildSnapshot.val().Ticker.substring(0,2) == "AU"){
                countryData = "Australia";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "NG"){
                countryData = "Nigeria";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "CA"){
                countryData = "Canada";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "ID"){
                countryData = "Indonesia";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "GL"){
                countryData = "Greenland";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "EG"){
                countryData = "Egypt";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "DG"){
                countryData = "DRCongo";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,2) == "DZ"){
                countryData = "Algeria";
              }else if  (childChildChildSnapshot.val().Ticker.substring(0,3) == "SAU"){
                countryData = "Saudi Arabia";
              }

              var valueData = -1 * childChildChildSnapshot.val().Value;
              // if (countryData === "Brazil"){
              //   valueData = valueData/1000;
              // }
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

    var month = Math.floor((minDate/100)%100);
    console.log(month);
    switch (month){
      case 01:
        $("#calendarMonth").text("Jan");
        break;
      case 02:
        $("#calendarMonth").text("Feb");
        break;
      case 03:
        $("#calendarMonth").text("Mar");
        break;
      case 04:
        $("#calendarMonth").text("Apr");
        break;
      case 05:
        $("#calendarMonth").text("May");
        break;
      case 06:
        $("#calendarMonth").text("Jun");
        break;
      case 07:
        $("#calendarMonth").text("Jul");
        break;
      case 08:
        $("#calendarMonth").text("Aug");
        break;
      case 09:
        $("#calendarMonth").text("Sep");
        break;
      case 10:
        $("#calendarMonth").text("Oct");
        break;
      case 11:
        $("#calendarMonth").text("Nov");
        break;
      default:
        $("#calendarMonth").text("Dec");
        break;
    }

    var animationQueue = [];
    for (var i = 0; i < parsedData.length; i++){
      if (parsedData[i][0] == minDate){
        animationQueue.push(parsedData[i]);
      }
    }

    if (animationQueue.length > 0){

      for (var i = 0; i < animationQueue.length; i++){
        if (animationQueue[i][1] == "Russia"){
          ruSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(ruSum)/230 * 50);
          if (ruSum > 0){
            map.updateChoropleth({
              RUS: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (ruSum < 0){
            map.updateChoropleth({
              RUS: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              RUS: "rgba(245,245,245,1)"
            });
          }
          // console.log("ru "+colourAdditive);
        }else if (animationQueue[i][1] == "China"){
          cnSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(cnSum)/230 * 50);
          if (cnSum > 0){
            map.updateChoropleth({
              CHN: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (cnSum < 0){
            map.updateChoropleth({
              CHN: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              CHN: "rgba(245,245,245,1)"
            });
          }
          // console.log("cn "+colourAdditive);
        }else if (animationQueue[i][1] == "Brazil"){
          bzSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(bzSum)/230 * 50);
          if (bzSum > 0){
            map.updateChoropleth({
              BRA: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (bzSum < 0){
            map.updateChoropleth({
              BRA: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              BRA: "rgba(245,245,245,1)"
            });
          }
          // console.log("bz "+colourAdditive);
        }else if (animationQueue[i][1] == "Germany"){
          deSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(deSum)/230 * 50);
          if (deSum > 0){
            map.updateChoropleth({
              DEU: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (deSum < 0){
            map.updateChoropleth({
              DEU: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              DEU: "rgba(245,245,245,1)"
            });
          }
          // console.log("de "+colourAdditive);
        }else if (animationQueue[i][1] == "US"){
          usSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(usSum)/230 * 50);
          if (usSum > 0){
            map.updateChoropleth({
              USA: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (usSum < 0){
            map.updateChoropleth({
              USA: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              USA: "rgba(245,245,245,1)"
            });
          }
          // console.log("us "+colourAdditive);
        }else if (animationQueue[i][1] == "Greece"){
          geSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(geSum)/230 * 50);
          if (geSum > 0){
            map.updateChoropleth({
              GRC: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (geSum < 0){
            map.updateChoropleth({
              GRC: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              GRC: "rgba(245,245,245,1)"
            });
          }
          // console.log("ge "+"rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Africa"){
          zeSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(zeSum)/230 * 50);
          if (zeSum > 0){
            map.updateChoropleth({
              ZAF: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (zeSum < 0){
            map.updateChoropleth({
              ZAF: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              ZAF: "rgba(245,245,245,1)"
            });
          }
          // console.log("ze "+colourAdditive);
        }else if (animationQueue[i][1] == "Australia"){
          auSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(auSum)/230 * 50);
          if (auSum > 0){
            map.updateChoropleth({
              AUS: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (auSum < 0){
            map.updateChoropleth({
              AUS: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              AUS: "rgba(245,245,245,1)"
            });
          }
          // console.log("au "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Nigeria"){
          ngSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(ngSum)/230 * 50);
          if (ngSum > 0){
            map.updateChoropleth({
              NGA: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (ngSum < 0){
            map.updateChoropleth({
              NGA: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              NGA: "rgba(245,245,245,1)"
            });
          }
          // console.log("ng "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Canada"){
          caSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(caSum)/230 * 50);
          if (caSum > 0){
            map.updateChoropleth({
              CAN: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (caSum < 0){
            map.updateChoropleth({
              CAN: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              CAN: "rgba(245,245,245,1)"
            });
          }
          // console.log("ca "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Indonesia"){
          idSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(idSum)/230 * 50);
          if (idSum > 0){
            map.updateChoropleth({
              IDN: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (idSum < 0){
            map.updateChoropleth({
              IDN: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              IDN: "rgba(245,245,245,1)"
            });
          }
          // console.log("id "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Greenland"){
          grSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(grSum)/230 * 50);
          if (grSum > 0){
            map.updateChoropleth({
              GRL: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (grSum < 0){
            map.updateChoropleth({
              GRL: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              GRL: "rgba(245,245,245,1)"
            });
          }
          // console.log("gr "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Egypt"){
          egSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(egSum)/230 * 50);
          if (egSum > 0){
            map.updateChoropleth({
              EGY: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (egSum < 0){
            map.updateChoropleth({
              EGY: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              EGY: "rgba(245,245,245,1)"
            });
          }
          // console.log("eg "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "DRCongo"){
          cdSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(cdSum)/230 * 50);
          if (cdSum > 0){
            map.updateChoropleth({
              COD: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (cdSum < 0){
            map.updateChoropleth({
              COD: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              COD: "rgba(245,245,245,1)"
            });
          }
          // console.log("cd "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Algeria"){
          dzSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(dzSum)/230 * 50);
          if (dzSum > 0){
            map.updateChoropleth({
              DZA: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (dzSum < 0){
            map.updateChoropleth({
              DZA: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              DZA: "rgba(245,245,245,1)"
            });
          }
          // console.log("dz "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }else if (animationQueue[i][1] == "Saudi Arabia"){
          saSum += animationQueue[i][2];
          var colourAdditive = (Math.abs(saSum)/230 * 50);
          if (saSum > 0){
            map.updateChoropleth({
              SAU: "rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")"
            });
          }else if (saSum < 0){
            map.updateChoropleth({
              SAU: "rgb(255, " + (80 + colourAdditive) + ", " + (80 + colourAdditive) + ")"
            });
          }else{
            map.updateChoropleth({
              SAU: "rgba(245,245,245,1)"
            });
          }
          // console.log("dz "+"rgb(" + (0 + colourAdditive) + ", 153, "+ (51 + colourAdditive) + ")");
        }
      }

      animationQueue = [];
    }

    minDate++;
    if (minDate%100==32){
      minDate=minDate-31+100;
    }
    if (minDate == stopFastForward){
      dayDelay = 75;
      var endColor = '#6FD57F';
      var timer = 372 * 75 - 31 * 75 * selectedBeginMonth;
      circle.animate(1.0,{
        duration: timer,
        from: {color: endColor},
        to: {color: endColor}
      });
    }else if (minDate < stopFastForward){
      circle.stop();
    }
    if (minDate <= endDate) {
       displayData(parsedData);
    }
    else{
      $("#containerForMap").animate({
        top: "+=60px"
      }, "slow", function(){
        $("#goBtnContainer").animate({
          opacity: "1"
        });
      });
      reset();
    }
  }, dayDelay)
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function reset(){
  minDate=20120101;
  ruSum = 0;
  cnSum = 0;
  bzSum = 0;
  geSum = 0;
  usSum = 0;
  deSum = 0;
  zeSum = 0;
  auSum = 0;
  ngSum = 0;
  caSum = 0;
  idSum = 0;
  grSum = 0;
  egSum = 0;
}

function resetColours(){
  map.updateChoropleth({
    CHN: "#F5F5F5",
    BRA: "#F5F5F5",
    RUS: "#F5F5F5",
    DEU: "#F5F5F5",
    USA: "#F5F5F5",
    GRC: "#F5F5F5",
    ZAF: "#F5F5F5",
    GRL: "#F5F5F5",
    AUS: "#F5F5F5",
    NGA: "#F5F5F5",
    CAN: "#F5F5F5",
    IDN: "#F5F5F5",
    GRL: "#F5F5F5",
    EGY: "#F5F5F5"
  });
  console.log("reset colours");

}

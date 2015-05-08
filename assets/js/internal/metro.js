/**
 * Created by mjn on 5/7/15.
 */

var metroApp = {

    loadMetroAlerts: function () {

        var params = {
            'api_key': '06ab12b939d14769b2e887c967ccd000',
        };
        $.ajax({
            url: 'https://api.wmata.com/Incidents.svc/json/Incidents?' + $.param(params),
            type: 'GET'
        })
            .done(function (data) {
                var incidentsArray = [];
                for (x = 0; x < data.Incidents.length; x++) {
                    incidentsArray.push(data.Incidents[x].Description);
                }
                metroApp.publishAlerts(incidentsArray);
            })
            .fail(function () {
                console.log(error)
            });


    },

    publishAlerts: function (inputs) {

        if (inputs.length == 0) {
            $("#alerts-div").html("<h3>No Alerts!!! Holy F!</h3>");
        }
        else {
            for (x = 0; x < inputs.length; x++) {
                $("#alerts-list").append("<li class='alert-item'>" + inputs[x] + "</li>");
            }
        }
    },


    listStations: function (color) {
        $.ajax(color + ".json")
            .done(function(data){

                var stationsArray = [];
                for (var x = 0; x < data.Stations.length; x++){
                    var stationObj = {};
                    stationObj["station"] = data.Stations[x].Name;
                    stationObj["code"] = data.Stations[x].Code;
                    stationsArray.push(stationObj);

                }
                metroApp.fillMetroSelect(color, stationsArray);

            })
            .fail(function(){
                console.log("list stations failed");
                $("#list-fail").css("display", "inline");
            })

    },

    fillMetroSelect : function(color, inputArray) {
        for (x = 0; x < inputArray.length; x ++) {
            $("#" + color).append("<option style='padding-left: 10px' id='"+inputArray[x].code+"'>"+inputArray[x].station+"</option>")
        }
    },

    getArrivalTimesForStation: function (id) {
        $("#train-error").html("");
        var params = {
            'api_key': '06ab12b939d14769b2e887c967ccd000'

        };
        $.ajax({
            url:'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/'+id+'?' + $.param(params),
            type: 'GET'
        })
            .done(function(data){
                console.log(data);
                metroApp.writeArrivalTimes(data.Trains);
            })
            .fail(function(){
                console.log("arrival times error");
                $("#train-error").html("WMATA API error - please refresh page");
            });

    },

    writeArrivalTimes: function(inputArray){
            if (inputArray.length == 0) {
                $("#dest").html("No Trains");
            } else {
                for (var x = 0; x< inputArray.length; x++) {
                    if(inputArray[x].Group == '1') {
                        $("#dest").append("<li class='grp1'>" + inputArray[x].DestinationName + "</li><hr>");
                        $("#mins").append("<li class='grp1'>" + inputArray[x].Min + "</li><hr>");
                        $("#cars").append("<li class='grp1'>" + inputArray[x].Car + "</li><hr>");
                    } else {
                        $("#dest").append("<li class='grp2'>" + inputArray[x].DestinationName + "</li><hr>");
                        $("#mins").append("<li class='grp2'>" + inputArray[x].Min + "</li><hr>");
                        $("#cars").append("<li class='grp2'>" + inputArray[x].Car + "</li><hr>");
                    }
                }

            }



            // else {
            //    for (var x = 0; x < inputArray.length; x++) {
            //        if (inputArray[x].Group == "1") {
            //            $(".dir1list").append("<li>Dest: " + inputArray[x].DestinationName + " Min: " + inputArray[x].Min + " Car: " + inputArray[x].Car + "</li>" );
            //        } else {
            //            $(".dir2list").append("<li>Dest: " + inputArray[x].DestinationName + " Min: " + inputArray[x].Min + " Car: " + inputArray[x].Car + "</li>");
            //        }
            //    }
            //}
    },

    getElevatorStatus : function(id) {
        var params = {
            'api_key': '06ab12b939d14769b2e887c967ccd000',
            'StationCode' : id
        };
        $.ajax({
            url: 'https://api.wmata.com/Incidents.svc/json/ElevatorIncidents?' + $.param(params),
            type: 'GET'
        })
            .done(function(data){
                console.log(data);
                metroApp.writeElevatorStatus(data.ElevatorIncidents);
            })
            .fail(function(){
                console.log("error in elevator");
            })

    },
    writeElevatorStatus : function(inputArray) {
        if (inputArray.length == 0) {
            $("#elevators").html("<li>No current outages for this station!</li>");
        } else {
            for (var x = 0; x < inputArray.length; x++) {
                $("#elevators").append("<li>Issue: " +inputArray[x].LocationDescription+"</li>" +
                "<li>Reason: " + inputArray[x].SymptomDescription+"</li>" +
                "<li>Last Updated: " + inputArray[x].DateUpdated + "</li>");
            }
        }
    },

    triggerFills : function() {
        var colors = ["blue", "orange", "green", "red", "yellow", "silver"];
        for (var x = 0; x < colors.length; x++) {
            metroApp.listStations(colors[x]);
        }
    },

    stationHandler : function() {
        $('#red').change(function(){
            var id = $("#red option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);
            console.log(id);
        });
        $('#green').change(function(){
            var id = $("#green option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);

            console.log(id);
        });
        $('#yellow').change(function(){
            var id = $("#yellow option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);

            console.log(id);
        });
        $('#blue').change(function(){
            var id = $("#blue option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);

            console.log(id);
        });
        $('#orange').change(function(){
            var id = $("#orange option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);

            console.log(id);
        });
        $('#silver').change(function(){
            var id = $("#silver option:selected").attr("id");
            metroApp.getArrivalTimesForStation(id);
            metroApp.getElevatorStatus(id);

            console.log(id);
        });
    }

};


$(document).ready(function(){
    metroApp.loadMetroAlerts();
    metroApp.triggerFills();
    metroApp.stationHandler();
});
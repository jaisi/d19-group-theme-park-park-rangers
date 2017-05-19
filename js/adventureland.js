"use strict";

var _ = require("lodash");

let attractory = require("./attractory.js"),
	areaTemplate = require("../templates/main.hbs"),
	attractTemplate = require("../templates/attract.hbs");

function populateAdventureland(){
	attractory.loadAttractions(2)
	.then((data) => {
		return displayAdventurelandAttractions(data); //need to return to make sure data is there
	});
}

function displayAdventurelandAttractions(dat){


    //data was not transfering all info, used global to send data
    dat = _.filter(global.parkType, (item) =>{
        return (item.id === 1 || item.id === 2 || item.id === 3 || item.id ===5);
    });

	let output = $(".help");
	let attDiv = $('<div id="modal2" class="modal fade">');
	attDiv.append(attractTemplate(dat));
    $(".attractions").empty();
	$(".attractions").append(attDiv);
	$('#modal2').modal('toggle');

    $(".card-block").click((event)=>{
        let holdWhatClicked = event.currentTarget.id;
        $("#" + holdWhatClicked).off("click");
        let counter = 0;

        let id = event.currentTarget.id.substr(-1);

        for (let i = 0; i < global.attractionData.length; i++) {
            let attractID = global.attractionData[i];
            if (attractID.type_id == id) {
                let name = attractID.name;
                let nameCard = `<p>${name}</p>`;
                $("#card--" + id).append(nameCard);
                counter++;
                if (counter === 2) {
                    break;
                }
            }
        }
    });

    //data has to be loaded first before the modal so only
//    requires one click to open//
//	console.log("Adventureland attractions", dat);
//	$.each( dat, function( key, value ) {
//  		console.log( key ,": " , value );
//	});
}

module.exports = {populateAdventureland, displayAdventurelandAttractions};

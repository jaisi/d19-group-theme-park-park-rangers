"use strict";

let attractory = require("./attractory.js"),
	areaTemplate = require("../templates/main.hbs"),
	attractTypeTemplate = require("../templates/attractType.hbs"),
    _ = require("lodash");


//getter
function populateCindrellaland(id){
	console.log("within populateCindrellaland");
	attractory.loadAttractions(id)
	.then((data) => {
		return displayCindrellalandAttractions(data, id); //need to return to make sure data is there
	});
}

function displayCindrellalandAttractions(dat){

    let types = _.filter(global.parkType, (item) =>{
        return (item.id === 1 || item.id === 2 || item.id === 3 || item.id ===5);
    });

    let combinedArray = [];

    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let typeGroup ={};
        typeGroup.type = type.name;
        typeGroup.id = type.id;
        typeGroup.attractions = [];

        for (let a = 0; a < dat.length; a++) {
            let attraction = dat[a];

            if (attraction.area_id === 7  && attraction.type_id === type.id) {
                let combinedData = {
                    id: attraction.id,
                    name: attraction.name,
                    description: attraction.description
                };

                if (attraction.times !== undefined) {
                    combinedData.times = attraction.times.toString().split(",").join(", ");
                }
                typeGroup.attractions.push(combinedData);
            }
        }
        combinedArray.push(typeGroup);
    }


    let attDiv = $('<div id="cinderellaland" class="modal fade">');
	attDiv.append(attractTypeTemplate(combinedArray));
    $(".attractions").empty();
	$(".attractions").append(attDiv);
	$('#cinderellaland').modal('toggle');


    $(".card-title").click((event)=>{

        let elementID = event.currentTarget.id.replace("card--", "");
        $("#desc--" + elementID).toggle("slow");
        console.log("are you clicking", event.currentTarget);
        console.log("are you clicking", elementID);
    });
}
module.exports = {populateCindrellaland, displayCindrellalandAttractions};

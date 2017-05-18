"use strict";

let timeFunction = function timeMenu(data, attractionData, parkType)
{
	var startTime = data[0].operating_hours[0].opening;
	var closingTime = data[0].operating_hours[0].closing;
	var pastNoon = false;
	var hour = startTime;
	var menuItem = `<option><a href="#">${startTime}:00AM</a></option>`;
	$("#times").append(menuItem);
//loop has to run 13 times for hours and 13 times for half ours which is 26 :)
	for (var i = 0; i < 26; i++){
		var newTime;

		if ((i+1) % 2 === 0){
			newTime = (hour + 1) + ":00";
			hour++;
		}
		else{
			newTime = hour + ":30";
		}

        if(newTime == "12:30"){
			pastNoon = true;
			hour = 0;
		}

        if (pastNoon === true || newTime === "12:00") {
            newTime += "PM";
        } else {
            newTime += "AM";
        }

		menuItem = `<option><a href="#">${newTime}</a></option>`;
		$("#times").append(menuItem);
	}

    $("#increment30").click((event) =>{
        let timeSelected = $("#times").val();
        let timeselectedArray = timeSelected.split(":");
        let menuHour = parseInt(timeselectedArray[0]);
        let menuMinute = parseInt(timeselectedArray[1].substr(0,2));
        let menuMeridian = timeselectedArray[1].substr(-2);
        let totalMinutes = (menuHour * 60) + menuMinute;
        loopevents(totalMinutes, menuMeridian, data, attractionData, parkType);
    });
};


function loopevents(totalMinutes, menuMeridian, parkInfo, attractionData, parkType) {
    let hours;
    let minutes;
    let meridian;
    let openingHour = parseInt(parkInfo[0].operating_hours[0].opening);
    let openingMinutes = openingHour * 60;
    let timeArray4Objects = [];

    for (let i = 0; i < attractionData.length; i++) {
        let attractObj = attractionData[i];
        if (attractObj.times !== undefined) {
            let timesArray = attractObj.times;

//////GREG!!!!!! WHY DID YOU MAKE THE TIMES STRINGS??????? WHYYYYYYYYYY.....
            for (let poop = 0; poop < timesArray.length; poop++) {
//time poop is the only time that works from here on out
                let time = timesArray[poop];
                let timeSplit = time.split(":");
                hours = parseInt(timeSplit[0]);//sets first index which is the first number in the hour
                minutes = parseInt(timeSplit[1].substr(0, 2));//minutes become 2nd index
                meridian = timeSplit[1].substr(-2);
                let attractMinutes = (hours * 60) + minutes;

                if (totalMinutes === openingMinutes && menuMeridian === "AM") {

                    if ((attractMinutes - totalMinutes) === -5) {

                        let magicalTurdObject = {name: attractObj.name, time: time, attractionType: attractObj.type_id};
                        timeArray4Objects.push(magicalTurdObject);
                    }

                }else if ((attractMinutes - totalMinutes) <= 30 && (attractMinutes - totalMinutes) >=0) {
                    //setting up a special condition to test for 12pm
                    if((menuMeridian === meridian) || (totalMinutes === 690 && time === "12:00PM")){
                        let magicalTurdObject = {name: attractObj.name, time: time, attractionType: attractObj.type_id};
                        timeArray4Objects.push(magicalTurdObject);
                    }
                }

                let timeCompiled = " " + hours + ":" + minutes + " " + meridian;
                let eventName = attractObj.name;
                let attractTypeID = attractObj.type_id;
                let eventAndTime = eventName + timeCompiled;
            }
        }
    }
}

module.exports = {timeFunction};
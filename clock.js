	var $clockH = $(".hours");
	var $clockM = $(".minutes");
	var $clockS = $(".seconds");
	var $day = $(".day > em"); 
	var UTCTime, day, date, sec, min, hour; 
	var hourDiff = 0;
	var gmt = 99 

	$('.change li:nth-child(1)').addClass('selected');

	$('.change li').click(function(){
 		gmt = $(this).attr('role');
 		$('.change li').removeClass('selected');
 		$(this).addClass('selected');
 	});

	function changeTimeZone(offset) {
		d = new Date();
		var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		var nd = new Date(utc + (3600000*offset)).getHours();
		return nd.toLocaleString();
	}
	
	
	function formatHour(){
		if(gmt==99)
			var hours = new Date().getHours();
		else
			var hours = changeTimeZone(gmt);
		
		changeDayLight(hours);
			
		var hour = hours;
		if (hour >= 12) {
	      hour = hours-12;
	    }
	    return hour;
	}
	


	setInterval( function() {	      		
		date = new Date()
		day = date.getDate(); 
		UTCTime = date.getUTCHours();			
		sec = date.getUTCSeconds() * 360/60; //each sec is 6 deg : (360deg/60sec)
		min = date.getUTCMinutes() * (360/60) + (sec/60); //each min is 6deg + sec(deg) : (360deg/60min) + sec(deg) 
		hour = formatHour() * (360/12) + date.getUTCMinutes()*(360/60/12)
	
		$clockH.css("transform", "rotate("+hour+"deg)") //rotate the hour with hour deg
		$clockM.css("transform", "rotate("+min+"deg)")	//rotate the minute with min deg
		$clockS.css("transform", "rotate("+sec+"deg)")	//rotate the second wiht sec deg
		$day.each(function(){ $(this).html(day) })
   .first().css('margin-top', '-' + Math.round(sec / (60 * 60 * 24) * 30) + 'px');
	}, 1000 );


	function changeDayLight(hours){
		if(hours<7 || hours>=19) {
			$('.container').css('background-color','#000');
			$('.day_icon').hide();
			$('.night_icon').fadeIn(300);
		}
		else {
			$('.container').css('background-color','transparent');
			$('.night_icon').hide();
			$('.day_icon').fadeIn(300);
		}
	}



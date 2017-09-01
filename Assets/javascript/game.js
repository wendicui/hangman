


var trial = {};

function begin(){
//photos , cities, and audios to choose from
	var trace = [
		"SANTORINI" ,"MILAN","VENICE","ROME","FLORENCE","VANTICAN"
	];

	var image = [ 

			"Assets/images/Santorini.jpg",
			"Assets/images/Milano.jpg",
			"Assets/images/Venice.jpg",
			"Assets/images/Rome.jpg" ,
			"Assets/images/Florance.jpg",
			"Assets/images/Vantican.jpg",
	]

	var figures = [ "Assets/Figure/1.png","Assets/Figure/2.png","Assets/Figure/3.png","Assets/Figure/4.png","Assets/Figure/5.png","Assets/Figure/6.png", ]

	var mus = [ "Assets/Music/Santo.mp3",  "Assets/Music/Mlan.mp3" , "Assets/Music/Veni.mp3", "Assets/Music/Rome.mp3", "Assets/Music/flo.mp3", "Assets/Music/Vanti.mp3" ];
	//console.log(image.milan)
//choose a city randomly
	var i  = Math.floor(Math.random()* trace.length);
	var random = trace[i];
	var figure = figures[i];
//make bk same as chosen
	
	$(".img").css("background-image","url('"+image[i] + "')" );
	

	$("audio").attr('src', mus[i]);


//console.log("<audio src = " + mus[i] + " autoplay = 'true'>")
//make the selected city into letters
	var guess = random.split("");
	$("#left").html(guess.length);

//randomly choose two elements.
	var index1 = Math.floor(Math.random()* guess.length);

	var index2 = Math.floor(Math.random()* guess.length);

	
	do{index2 = Math.floor(Math.random()* guess.length);
	} while (index1 === index2)
//use object property to make varaible global;
	trial.guess = guess;
	trial.figure = figure;
//console.log(guess)

// create hidden array with unshown letters

	// ？？？？？？？？????????????
	//      if(index1 < index2){

	// 		var hidden = guess.splice(index1,1);
			
	// 		hidden = hidden.splice(index2 - 1,1);
	// 		 console.log(hidden);
	// 	}else{
	// 		var hidden = guess.splice(index2,1);
			
	// 		hidden = hidden.splice(index1 - 1,1);
	// 		console.log(hidden);
	// 	}


	var hidden = guess.reduce(function(a,v,i){

		if(i !=index1 && i!= index2){
			a.push(v);

		}
		return a
	}, [])


//console.log("_____________________")

//console.log(guess)
//console.log(index2)
//console.log(index1)
//console.log(hidden)

//smuggle array to other functions

	
	trial.hidden = hidden;

//add elements to page
		//add characters to page

			$.each (guess, function(i, value){


		//try to create a outer div, to make each letter space even, sothat 
		//the border line below are all same width.	
			var iString = i.toString();
			var nd = $("<div>")
			
			nd.attr("class","nd nd"+iString);

			$(".cities").append(nd);

			
			
			var nedw = $("<span>" + value +"</span>").attr("id", iString);
			nedw.attr("class","letter");
			$(".nd"+iString).append(nedw);

		}
	)
			for(var i = 0; i < guess.length; i++){

			if (i !=index1 && i !=index2){

			var str = i.toString();
			$("#" + str).css("opacity","0");
			
			}
		}

		// // add lines to page
		// 	$.each (guess, function(i, value){

		// 	var iString = i.toString();
		// 	var line = $("<span>" + "" +"</span>").attr("class", iString+"class");
		// 	var line = $("<span>" + "" +"</span>").attr("class", "letter");
		
		// 	$(".line").append(line);
		// 	//$("." + index1.toString() + "class").css("visibility","hidden");
		// 	//$("." + index2.toString() + "class").css("visibility","hidden");
			
		// })

}

		

	begin();
//console.log("_____________________")
//console.log(trial.guess)
	
	
//user side 
var before = [];
var guess = trial.guess
var count = guess.length;
var win = 0;
var lose = 0;
var hidden = trial.hidden; 
var left = hidden.length;
var start = false;

//functin bonus, so that I can call it afterwards

function bonus(){

function makeAround(){

	var h = $(window).height() ;
	var w = $(window).width();
 
	var hr = 0.15* h + Math.floor(Math.random()*h*0.5);
	
	var wr = 0.15 *w + Math.floor(Math.random()*w*0.5);

	return[hr, wr];

}

//console.log(makeAround());

//select random figure
	
 $(".bonus").html("<img src=" +trial.figure +" class = 'animate'>")

 //BONUS MOVE

 function mov(){

     var newq = makeAround();

     $(".animate").animate({ top: newq[0], left: newq[1] }, 900,
     function(){ mov();}
     );}

 mov();
}


//-------------------------------------------------------------
//usder interaction

document.onkeyup = function(event) {

    if (start === true){ 
    	$(".cities").empty()
    	$(".bonus").empty()
    	start = false;
    	before = [];
    	begin();
        guess = trial.guess
        count = guess.length;
        hidden = trial.hidden;
        left = hidden.length;    

		}
    else{ //user input

      var userGuess = event.key.toUpperCase();  


      if (jQuery.inArray(userGuess, before) != -1){
        
         count -=1;
         $("#left").html(count);
         alert("You have typed in this letter before")
         
         //console.log(before)

      }else{

            before.push(userGuess);
//console.log(before);
//console.log("------------------")
            var found = jQuery.inArray(userGuess, hidden);
            
//console.log(found)
            if (found != -1 && count > 0 ){
              
              //var all = grabAll(guess, userGuess)

              
                
                  
                  //check how many letters to go
                    var allInHidden = hidden.reduce(function(a, e, i) {
                            if (e === userGuess){
                                a.push(i);}
                            return a;
                        }, []);

                    left = left - allInHidden.length
                      
 //console.log("left: " + left)
 					if (left > 0){
                  //get all the index of the user input letter from guess
                  var all = guess.reduce(function(a, e, i) {
                      if (e === userGuess){
                          a.push(i);}
                      return a;
                  }, []); 

                    //change the guessed one to black to show them
        
                  $. each(all, function(index, value){

                    $("#" + value.toString()).css("opacity", "1")

                  })



                } else{

                 var all = guess.reduce(function(a, e, i) {
                      if (e === userGuess){
                          a.push(i);}
                      return a;
                  }, []); 

//console.log(all);
                  $. each(all, function(index, value){

                  $("#" + value.toString()).css("opacity", "1")

                  })

                  win += 1;
                  $("#win").html(win);
                  bonus();
                  start = true;
                  //begin();
//console.log("wining" + win);
                }

            	count -=1;
            	if (count < 0 ){
            		count = 0;
            	}
            	$("#left").html(count);


            }


            else if(found === -1 && count > 1) {

            	count -=1;
            	$("#left").html(count);
 //console.log("count: " + count);

            }
            else{

  //console.log("losecount: " + count);          	
              lose +=1;
              count -=1;
              $("#left").html(count);
              $("#lose").html(lose);
              $(".letter").css("opacity", "1");
           
              start = true;
            	//begin();
            }

      	}
}

}









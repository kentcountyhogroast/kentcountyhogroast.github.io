$( ".question" ).click(function() {
 	var question = this;
 	var answer = $(question).find('.answer')
	var answerId = answer[0].id;
	console.log(question)
	console.log(answer)
	console.log(answerId)
	$(".answer:not(#"+answerId+")").hide();
	console.log(answer.is(":visible"))
 	if(answer.is(":visible")){
 	 	answer.hide()	
 	} else {
 		answer.show()
 	}
});

$('.question').css( 'cursor', 'pointer' );

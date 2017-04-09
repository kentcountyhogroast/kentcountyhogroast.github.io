$( "#submit-button" ).click(function(){
  sendMail();
});

$( ".clear" ).click(function(){
  $('#name').val('');
  $('#email').val('');
  $('#email-body').val('');
  $('.count').text("Characters left until you can send: 30");
});

function sendMail() {
  $('.email-button').attr('disabled','disabled');

  var name = escape(document.getElementById('name').value);
  var email = escape(document.getElementById('email').value);
  var number = escape(document.getElementById('number').value);
  var date = escape(document.getElementById('date').value);
  var body = escape(document.getElementById('email-body').value);
  console.log(date)

  var url = "https://arcane-anchorage-33274.herokuapp.com/kcEmail?name="+name+"&email="+email+"&number="+number+"&date="+date+"&body="+body;

  var canSend = validateForm(name, date, number, email); 

  callAPI(canSend, url, body);
}

var validateForm = function(name, date, number, email){
  var canSend = true;

  if(name == ""){
    $('#name').addClass('animated shake');
    canSend = false;
    $('#name').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $('#name').removeClass('shake');
    });
  }
  if(number == "" || number.length < 11){
    $('#number').addClass('animated shake');
    canSend = false;
    $('#name').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $('#number').removeClass('shake');
    });
  }
  if(!validateEmail(email)){
    $('#email').addClass('animated shake');
    canSend = false;
    $('#email').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $('#email').removeClass('shake');
    });
  }
  if(date == ""){
    $('#date').addClass('animated shake');
    canSend = false;
    $('#date').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $('#date').removeClass('shake');
    });
  }
  return canSend;
}

var callAPI = function(canSend, url, body){
  if(canSend){
    $('.message-send-overlay').show();
    $.ajax({
      url: url, 
      success: function(result){
        $('.messageSent').text('You have sent to following message to Harley Rowland: ' + unescape(body));
        $('.modal').trigger('click');
        $('.email-button').removeAttr('disabled');
        $('.message-send-overlay').hide();
      }, 
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, thrownError);
        alert("There has been an error sending this message. Please try again later!")
        $('.email-button').removeAttr('disabled');
        $('.message-send-overlay').hide();
      }
    });
  } else {
    $('#submit-button').removeAttr('disabled'); 
  }
}



var validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
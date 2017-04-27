$( "#submit-button" ).click(function(){
  $('html, body').animate({scrollTop: '0px'}, 300);
  sendMail();
});


$( ".close-reveal-modal" ).click(function(){
  $('#myModal').hide()
});

$( ".clear" ).click(function(){
  $('#name').val('');
  $('#email').val('');
  $('#email-body').val('');
  $('#number').val('');
  $('#date').val('');
  $('#package').val('');
});

// Date.prototype.toDateInputValue = (function() {
//     var local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0,10);
// });

// $('#date').val(new Date().toDateInputValue());

function loadServer() {
  var url = "https://arcane-anchorage-33274.herokuapp.com"
  $.ajax({ url: url });
}

function sendMail() {
  $('.email-button').attr('disabled','disabled');

  var name = escape(document.getElementById('name').value);
  var email = escape(document.getElementById('email').value);
  var number = escape(document.getElementById('number').value);
  var package = escape(document.getElementById('package').value);
  var date = escape(document.getElementById('date').value);
  var body = escape(document.getElementById('email-body').value);

  var url = "https://arcane-anchorage-33274.herokuapp.com/kcEmail?name="+name+"&email="+email+"&number="+number+"&package="+package+"&date="+date+"&body="+body;

  var canSend = validateForm(name, date, number, email); 

  $('#submit-button').removeAttr('disabled'); 

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
      $('#email').removeClass('animated');
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
        $('.messageSent').text('We aim to reply within 48 hours. We will be in touch soon.');
        $('#myModal').show();
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

var getPackage = function() {
  var url = location.href;
  if(url.includes("bronze")){
    $('#package').val('Bronze Package');
  } else if(url.includes("silver")){
    $('#package').val('Silver Package');
  } else if(url.includes("gold")){
    $('#package').val('Gold Package');
  } else if(url.includes("platinum")){
    $('#package').val('Platinum Package');
  }
}

getPackage()

var validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
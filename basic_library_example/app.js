//set our variable
var g = G$('Marcus','Plienegger','es');
g.greet();
g.greet(true);
g.getFullName();
//chain a bit
g.setLang('en').greet();

//for example, get a click listener on our login button to initilize greetr
$('#login').click(function(){
   var loginGreeter = G$('Marcus', 'Plienegger','es'); 
    $('#logindiv').hide();
    //example usage
    loginGreeter.setLang($('#lang').val()).HTMLGreeting('#greeting',true).log();
});
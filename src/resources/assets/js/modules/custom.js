
/*------------------------------------------------------------------------------------
    
JS INDEX
=============

01 - Next Button
02 - Count

-------------------------------------------------------------------------------------*/
$(document).ready(function(){
   /* 
  =================================================================
  01 - Next Button 
  =================================================================	
  */


  $(".signature-pad, .sign-text").click(function(){
     $(".sign-text").hide();
 })
  var in_pad = false;
  $('#signature-pad').on('mouseover', function () {
    $("#sign-text-img").hide();
  });
  $('#signature-pad').on('click', function () {
    in_pad = true;
    $("#sign-text-img").hide();
  });
  $( "#signature-pad" ).mouseout(function() {
    if (in_pad == false) {
      $("#sign-text-img").show();
    }
  });
  $("#clear").click(function(){
    in_pad = false;
    $("#sign-text-img").show();
  });
});

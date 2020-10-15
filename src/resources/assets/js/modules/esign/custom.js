


var previouspostcode = new Array();

$("#address1_add_button").click(function() {
    $(".add_address_wrap").show();
  });

  $("#remvbtn_1").click(function() {
    $(".add_address_wrap").hide();
    $(".postcode_class1").val('');
    
    
  });

  
  $("#addressbtn_2").click(function() {
    $(".add_address_wrap2").show();
    $("#addressbtn_2").hide();
  });
  

  $("#remvbtn_2").click(function() {
    $(".add_address_wrap2").hide(); 
    $("#addressbtn_2").show();
    $(".postcode_class2").val('');
   
  });


function jsGetSiteUrl() {
    var ajaxpath = $('#ajax-path').val();
    var base_url = "";
    if (ajaxpath) {
        base_url = ajaxpath;
    }
    return base_url;
}
function postcodeVal(flFocus, flForCountry) {
    var txtPostCode = $.trim($("#txtPostCode").val());
    var visitor_id = $('#visitor_id').val();

    if(flForCountry){
        flCallGetCountry = true;
    }

    if (txtPostCode != '' && !flPostCodeValidation) {
        $("#txtPostCode").next(".tick").hide();
        $("#loader-txtPostCode").show();
        flPostCodeValidation = true;
        strAjaxUrl = jsGetSiteUrl() + 'ajax/ajax-postcode-val';
        strParam = '?postcode=' + txtPostCode + '&visitor_id=' + visitor_id;
        $.ajax({
            url: strAjaxUrl + strParam,
        }).done(function(result) {
            $("#loader-txtPostCode").hide();
            flPostCodeValidation = false;
            if (result == 0) {
                $("#postcode_err").text("Please Enter Valid Postcode");
                $("#applynow03").prop("disabled", true);
                $('#currentAddressCollapse').hide();
                if(flFocus){
                    $("#txtPostCode").focus();
                }
                jsShowHideTick($("#txtPostCode"), "N");
            } else {
                 if(flCallGetCountry){
                    getcounty(txtPostCode);

                    $('#currentAddressCollapse').show();
                    $('#postbtndiv').hide();
                }
                $("#postcode_err").text('');
                $("#applynow03").prop("disabled", false);
                jsShowHideTick($("#txtPostCode"), "Y");
            }
        });
    }
}

function getcounty(postcode,curentId,loderId,currentps){
	if (postcode != '') {
		var cids 	    = '#'+curentId;
		var cid_new 	= curentId+"_place";
		var visitor_id  = $('#visitor_id').val();
		// strAjaxUrl      = jsGetSiteUrl() + 'ajax/getAddrListPostCodeAPI_aditional.php';
		strAjaxUrl = jsGetSiteUrl() + 'ajax/get-addr-list-postcode-api';
		strParam        = '?postcode=' + postcode + '&visitor_id=' + visitor_id + "&rp_id=" + currentps;
		$.ajax({
		url: strAjaxUrl + strParam,
		})
		.done(function(msg) {
			if (msg != "Nothing found!") {
				if ($('#'+cid_new).length) {
					if ($('#'+cid_new).css('display') == 'none') {
						$('#'+cid_new).show();
						$(loderId).hide();
						$('#fullLoder').hide();
					}
					$('#'+cid_new).find('option').remove().end();
					$('#'+cid_new).append(msg);
					$(loderId).hide();
					$('#fullLoder').hide();

				} else{
						$('#cid_new').find('option').remove().end();
						$('#cid_new').append(msg);
						$(loderId).hide();
						$('#fullLoder').hide();
				}
			} 
		});
	} 
}


$('.post_evet').on('keyup change paste blur', function (){
	var txtPostCode = $(this).val();
	var curentId 	= this.id;
    var res         = curentId.split("_");
    var count       = res.length;
    var loderId     = '#loder_'+res[count-1];
    var currentps   = res[count-1];
	var visitor_id  = $.trim($('#visitor_id').val());
	var prv_address = '#previous_address_'+res[count-1];
	var cpostnonspace= $.trim(txtPostCode);
	if(txtPostCode.length>=6){
			if(previouspostcode[currentps] != cpostnonspace){
			console.log(currentps);

			$('#previous_address_'+currentps+'_company').val("");
			$('#previous_address_'+currentps+'_line1').val("");
			$('#previous_address_'+currentps+'_line2').val("");
			$('#previous_address_'+currentps+'_line3').val("");
			$('#previous_address_'+currentps+'_country').val("");
			$('#previous_address_'+currentps+'_city').val("");
			$('#previous_address_'+currentps+'_province').val("");
			$('#previous_fmt_postcode_'+currentps+'').val("");

			previouspostcode[currentps] = cpostnonspace;
			$(loderId).show();
			$('#fullLoder').show();
			$(prv_address).val('');
			var strAjaxUrl = jsGetSiteUrl() + 'ajax/ajax-postcode-val';
			var strParam = '?postcode=' + txtPostCode + '&visitor_id=' + visitor_id;
			$.ajax({
				url: strAjaxUrl + strParam,
			}).done(function(result) {
				 if (result == 0) {
					 $(loderId).hide();
					 $('#fullLoder').hide();
					 
				 }
				 else
				 {
						getcounty(txtPostCode,curentId,loderId,currentps);
				 }

			});
		}

	}
	else
	{
		previouspostcode[currentps] = cpostnonspace;
	}

    
});

function blockSpecialChar(e){
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}


function rpClickFunction(currnt)
{
   var currnt     =    currnt;
   var addrid = $("#previous_postcode_"+currnt+"_place").val();
   var visitor_id = $('#visitor_id').val();
   var txtPostCode = $("#previous_postcode_"+currnt).val();
   var visitor_id = $('#visitor_id').val();

   if(typeof(txtPostCode) != "undefined" && txtPostCode !== null){
        strAjaxUrl = jsGetSiteUrl() + 'ajax/get-addr-split-postcode-api';
        strParam = '?AddressID=' + addrid + '&postcode=' + txtPostCode + '&visitor_id=' + visitor_id;
        $.ajax({
            url: strAjaxUrl + strParam,
        })
        .done(function(msg) {
            if (msg != ",,") {
                var obj=JSON.parse(msg);

                var Company   = $.trim(obj.Company);
                var Line1     = $.trim(obj.Line1);
                var Line2     = $.trim(obj.Line2);
                var Line3     = $.trim(obj.Line3);
                var Town      = $.trim(obj.Town);
                var County     = $.trim(obj.County);
                var Udprn     = $.trim(obj.Udprn);
                var deliverypointsuffix = $.trim(obj.deliverypointsuffix);
                var pz_mailsort = $.trim(obj.pz_mailsort);
                var Country     = $.trim(obj.Country);
                var Fmt_PostCode = $.trim(obj.PostCode);
                var street = Line2;
                var housenumber = Line1;
                console.log(Company);

                $('#previous_address_'+currnt+'_company').val(Company);
                $('#previous_address_'+currnt+'_line1').val(Line1);
                $('#previous_address_'+currnt+'_line2').val(Line2);
                $('#previous_address_'+currnt+'_line3').val(Line3);
                $('#previous_address_'+currnt+'_country').val(Country);
                $('#previous_address_'+currnt+'_city').val(Town);
                $('#previous_address_'+currnt+'_province').val(County);
                $('#previous_fmt_postcode_'+currnt+'').val(Fmt_PostCode);
				$('#errorPostcode_'+currnt).html('');
				$('#previous_address_'+currnt).removeClass('myerror');
				$('#previous_address_'+currnt).val(Line1);

            }
        });
    }
}
$('#address1').on('change', function() {
        //   console.log("address");
        var addrid = $(this).val();
        var txtPostCode = $("#txtPostCode").val();
        var visitor_id = $('#visitor_id').val();
        if (addrid != '') {
            $("#address1_error").hide();
            $("#loader_divid").show();
            strAjaxUrl = jsGetSiteUrl() + 'ajax/get-addr-split-postcode-api';
            strParam = '?AddressID=' + addrid + '&postcode=' + txtPostCode + '&visitor_id=' + visitor_id;
            $.ajax({
                    url: strAjaxUrl + strParam,
                })
                .done(function(msg) {
                    $('#strdivid').show();
                    $('#housedivid').show();
                    //$('#postcodevalll').hide();

                    if (msg != ",,") {
                        var obj = $.parseJSON(msg);

                        var Company = $.trim(obj.Company);
                        var Line1 = $.trim(obj.Line1);
                        var Line2 = $.trim(obj.Line2);
                        var Line3 = $.trim(obj.Line3);
                        var Town = $.trim(obj.Town);
                        var County = $.trim(obj.County);
                        var Udprn = $.trim(obj.Udprn);
                        var deliverypointsuffix = $.trim(obj.deliverypointsuffix);
                        var pz_mailsort = $.trim(obj.pz_mailsort);
                        var Country = $.trim(obj.Country);

                        var street = Line2;
                        var housenumber = Line1;

                        $('#addrBox').show();
                        $('#address2').val(addrid);
                        $('#txtHouseName').val(Company);
                        $('#txtHouseNumber').val(Line1);
                        $('#txtStreet').val(Line2);
                        $('#txtAddress3').val(Line3);
                        $('#txtCounty').val(County);
                        $('#txtTown').val(Town);
                        $('#txtUdprn').val(Udprn);
                        $('#txtDeliveryPointSuffix').val(deliverypointsuffix);
                        $('#txtPz_mailsort').val(pz_mailsort);
                        $('#txtCountry').val(Country);
                        $('#applynow03div').show();
                        $("#address1").removeClass("anim_ylw");
                        $('#txtaddline').val(Line2);
                        if (street == "") {
                            $('#strdivid').hide();
                        }

                        if (housenumber == "") {
                            $('#housedivid').hide();
                        }
                    }
                    $("#loader_divid").hide();
                });
        } else {
            $("#address1").addClass("anim_ylw");
            $('#strdivid').hide();
            $('#housedivid').hide();
            $('#applynow03div').hide();
        }
    });
var prevpost1 ='';
var prevpost2 ='';
var prevpost3 ='';
var prevpost4 ='';
var prevpost5 ='';

$(document).on("click", "#submit_modal_button", function() {
    var singunature = $('#signature_data').val();
	var previous_postcode_1 = $('#previous_postcode_1').val();
	var previous_postcode_2 = $('#previous_postcode_2').val();
	
	var chk1 = chk2  = true;

	if(previous_postcode_1){
		if(previous_postcode_1.length<6){
			$('#errorPostcode_1').html('<p class="alert alert-danger">Please Enter valid postcode </p>');
			var elmnt = document.getElementById("previous_postcode_1");
			elmnt.scrollIntoView();
			return false;
		}
		else{
			if(previous_postcode_1!= prevpost1)
			{
				chk1 = false;
				rpPostcodeVal(previous_postcode_1,1);
			}
			else if(previous_address_1){
				$('#errorPostcode_1').html('');
				$('#previous_address_1').removeClass('myerror');
				chk1 = true;
			}
		    else{
				$('#errorPostcode_1').html('<p class="alert alert-danger">Please Select Address 1 </p>');
				$('#previous_address_1').addClass('myerror');
				var elmnt = document.getElementById("errorPostcode_1");
				elmnt.scrollIntoView();
				chk1 = false;
				return false;
				
			}
			
		}
	}
	if(previous_postcode_2){
		if(previous_postcode_2.length<6){
			$('#errorPostcode_2').html('<p class="alert alert-danger">Please Enter valid postcode </p>');
			var elmnt = document.getElementById("previous_postcode_2");
			elmnt.scrollIntoView();
			return false;
		}
		else{
			if(previous_postcode_2!= prevpost2)
			{
				chk2 = false;
				rpPostcodeVal(previous_postcode_2,2);
			}
			else if(previous_address_2){
				$('#errorPostcode_2').html('');
				$('#previous_address_2').removeClass('myerror');
				chk2 = true;
			}
			else{
				$('#errorPostcode_2').html('<p class="alert alert-danger">Please Select Address 2 </p>');
				$('#previous_address_2').addClass('myerror');
				var elmnt = document.getElementById("errorPostcode_2");
				elmnt.scrollIntoView();
				chk2 = false;
				return false;
				
			}
			
		}
	}
	if(previous_postcode_3){
		if(previous_postcode_3.length<6){
			$('#errorPostcode_3').html('<p class="alert alert-danger">Please Enter valid postcode </p>');
			var elmnt = document.getElementById("previous_postcode_3");
			elmnt.scrollIntoView();
			return false;
		}
		else{
			if(previous_postcode_3!= prevpost3)
			{
				chk3 = false;
				rpPostcodeVal(previous_postcode_3,3);
			}
			else if(previous_address_3){
				$('#errorPostcode_3').html('');
				$('#previous_address_3').removeClass('myerror');
				chk3 = true;
			}
			else{
				$('#errorPostcode_3').html('<p class="alert alert-danger">Please Select Address 3 </p>');
				$('#previous_address_3').addClass('myerror');
				var elmnt = document.getElementById("errorPostcode_3");
				elmnt.scrollIntoView();
				chk3 = false;
				return false;
				
			}
			
		}
	}
	if(previous_postcode_4){
		if(previous_postcode_4.length<6){
			$('#errorPostcode_4').html('<p class="alert alert-danger">Please Enter valid postcode </p>');
			var elmnt = document.getElementById("previous_postcode_4");
			elmnt.scrollIntoView();
			return false;
		}
		else{
			if(previous_postcode_4!= prevpost4)
			{
				chk4 = false;
				rpPostcodeVal(previous_postcode_4,4);
			}
			else if(previous_address_4){
				$('#errorPostcode_4').html('');
				$('#previous_address_4').removeClass('myerror');
				chk4 = true;
			}
			else{
				$('#errorPostcode_4').html('<p class="alert alert-danger">Please Select Address 4 </p>');
				$('#previous_address_4').addClass('myerror');
				var elmnt = document.getElementById("errorPostcode_2");
				elmnt.scrollIntoView();
				chk4 = false;
				return false;
				
			}
			
		}
	}
	if(previous_postcode_5){
		if(previous_postcode_5.length<6){
			$('#errorPostcode_5').html('<p class="alert alert-danger">Please Enter valid postcode </p>');
			var elmnt = document.getElementById("previous_postcode_5");
			elmnt.scrollIntoView();
			return false;
		}
		else{
			if(previous_postcode_5!= prevpost5)
			{
				chk5 = false;
				rpPostcodeVal(previous_postcode_5,5);
			}
			else if(previous_address_5){
				$('#errorPostcode_5').html('');
				$('#previous_address_5').removeClass('myerror');
				chk5 = true;
			}
			else{
				$('#errorPostcode_5').html('<p class="alert alert-danger">Please Select Address 2 </p>');
				$('#previous_address_5').addClass('myerror');
				var elmnt = document.getElementById("errorPostcode_5");
				elmnt.scrollIntoView();
				chk5 = false;
				return false;
				
				
			}
			
		}
	}
	
    if(singunature){
        if($('#acceptterms').prop("checked") == true){
			$('#acceptval').html('');
			if(chk1 && chk2 && chk3 && chk4 && chk5){
				$( "#cust_info" ).submit();
			}
        }
        else if($('#acceptterms').prop("checked") == false){
            $('#acceptval').html('<p class="error_msg1">Please Read the Terms of Instruction</p>');
			return false;
        }
    }
    else
    {
        $('#acceptval').html('<p class="alert alert-danger">Add Your Signature</p>');
    }

});


function rpPostcodeVal(postcode,pcnt) {
	
	switch(pcnt) {
	  case 1:
		prevpost1 = postcode;
		break;
	  case 2:
		prevpost2 = postcode;
		break;
	  case 3:
		prevpost3 = postcode;
		break;
	  case 4:
		prevpost4 = postcode;
		break;
	  case 5:
		prevpost5 = postcode;
		break;
	}
	
    var txtPostCode = $.trim(postcode);
    var visitor_id = $('#visitor_id').val();
	var previous_address  = $('#previous_address_'+pcnt).val();
    if (txtPostCode != '') {
        $("#txtPostCode").next(".tick").hide();
        $("#loader-txtPostCode").show();
        strAjaxUrl = jsGetSiteUrl() + 'ajax/ajax-postcode-val';
        strParam = '?postcode=' + txtPostCode + '&visitor_id=' + visitor_id;
        $.ajax({
            url: strAjaxUrl + strParam,
        }).done(function(result) {
            if (result == 0) {
                $('#errorPostcode_'+pcnt).html('<p class="alert alert-danger">Please Enter valid postcode '+pcnt+'</p>');
				var elmnt = document.getElementById("previous_address_"+pcnt);
				elmnt.scrollIntoView();
				return false;
            } else { 
				if(previous_address){
					$('#errorPostcode_'+pcnt).html('');
					$('#previous_address_'+pcnt).removeClass('myerror');
					switch(pcnt) {
					  case 1:
						chk1 = true;
						break;
					  case 2:
						chk2 = true;
						break;
					  case 3:
						chk3 = true;
						break;
					  case 4:
						chk4 = true;
						break;
					  case 5:
						chk5 = true;
						break;
					}
					if(chk1 && chk2 && chk3 && chk4 && chk5){
						$( "#submit_modal_button" ).trigger( "click" );
					}
				}
				else{
					switch(pcnt) {
					  case 1:
						chk1 = false;
						break;
					  case 2:
						chk2 = false;
						break;
					  case 3:
						chk3 = false;
						break;
					  case 4:
						chk4 = false;
						break;
					  case 5:
						chk5 = false;
						break;
					}
					$('#errorPostcode_'+pcnt).html('<p class="alert alert-danger">Please Select Address '+pcnt+' </p>');
					$('#previous_address_'+pcnt).addClass('myerror');
					var elmnt = document.getElementById("previous_address_"+pcnt);
					elmnt.scrollIntoView();
					return false;
				}
                
            }
        });
		
		
		
    }
	else{
		$('#errorPostcode_'+pcnt).html('<p class="alert alert-danger">Please Enter valid postcode '+pcnt+'</p>');
		var elmnt = document.getElementById("previous_address_"+pcnt);
		elmnt.scrollIntoView();
		return false;
		
	}
}


$('#acceptterms').on('click',function(){
	console.log("clicked");
   if(this.checked){
	$('#checkbox_required').html('');
   }
   else
   {
	$('#checkbox_required').text("Please Read the Terms of Instruction");
   }
});
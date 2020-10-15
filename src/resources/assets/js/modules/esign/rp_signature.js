var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  penColor: 'rgb(0, 0, 0)',
  onEnd:function(){
  	var data = signaturePad.toDataURL('image/png');
   	/*console.log(data);*/
   	$('#sgbtn').html('<button type="button" style="margin-top: 25px;" id="submit_modal_button" name="submit_modal_button" class="btn pull-right">Submit</button>');
   }
});
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('clear');
saveButton.addEventListener('click', function (event) {
	var rpdata = signaturePad.toData();
	$("#signatures_required").hide();
    $("#checkbox_required").hide();
     if (rpdata.length > 0) {
    	let signLength = 0;
    	$.each(rpdata, function( rpKey, rpvalue ) {
    		if (rpvalue.length>1) { signLength = signLength+rpvalue.length; }
		});
		if (signLength>13) {
			var data = signaturePad.toDataURL('image/png');
			$("#signatures_required").html("");
			$('#signature_data').val(data);
			$(".loader_full").show();
			var signature = $('#signature_data').val();
			if (signature) {
				if($("#acceptterms").prop('checked') == true){
					$(".loader_full").show();
					$("#cust_info").submit();
				} else {
					$("#checkbox_required").text("Please Agree to the Terms of Business");
					$("#checkbox_required").show();
					$(".loader_full").hide();
					return false;
				}
			} else {
				$('#acceptval').html('<p class="alert alert-danger">Add Your Signature</p>');
				document.getElementById("acceptterms").checked = false;
				$(".loader_full").hide();
				return false;
			}
		} else {
			$("#signatures_required").html("Draw valid signature!");
			document.getElementById("acceptterms").checked = false;
			$("#signatures_required").show();
			/*$(".click-here-tosign").click();*/
			return false;
		}
    } else {
    	$("#signatures_required").html("Signature is required!");
		$("#signatures_required").show();
		document.getElementById("acceptterms").checked = false;
		return false;
    }
  /*var data = signaturePad.toDataURL('image/png');
   console.log(data);*/

// Send data to server instead...
  /*window.open(data);*/
});
cancelButton.addEventListener('click', function (event) {
  signaturePad.clear();
});
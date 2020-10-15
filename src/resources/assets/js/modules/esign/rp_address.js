var count = 1;
$('.add_address_btn').on('click',function(){
	if(count<=2)
	{	
		$('.add_address_wrap:eq('+count+')').show();
	 	count++;
	}
	 	
	id = $(this).attr("id");   
  	if(id == 'addressbtn_2')
	{
		$('#addressbtn_2').hide();
	}
	else
	{
		if($('.add_address_wrap[data-item="2"]').is(':visible')) 
		{	
			$('#addressbtn_2').hide();
		}
		else
		{
			$('#addressbtn_2').show();
		}
	}

});
					  
$(".remove_address").on('click', function(){
	 count = count - 1;
	//   var div_id = $(this).attr('data-item');
	$('.add_address_wrap:eq('+count+')').hide();
	$('#previous_postcode_'+count+'').val('');
	$('#previous_address_'+count+'').val('');
	$('#previous_address_'+count+'_line1').val('');
	$('#previous_address_'+count+'_line2').val('');
	$('#previous_address_'+count+'_line3').val('');
	$('#previous_address_'+count+'_city').val('');
	$('#previous_address_'+count+'_province').val('');
	$('#previous_address_'+count+'_country').val('');
	$('#previous_address_'+count+'_company').val('');
	$('#previous_fmt_postcode_'+count+'').val('');
	//   $(".add_address_wrap[data-item="+div_id+"]").hide();
	console.log(count);
	if(count==2)
		$('#addressbtn_2').show();

});




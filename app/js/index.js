$(document).ready(function(){
	$('#menu').click(function() {
		if($('#myTopnav').hasClass('topnav')) {
			$('#myTopnav').addClass('responsive');
		}
		else {
			$('#myTopnav').removeClass('responsive');
		}
	});
})
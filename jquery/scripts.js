/* author: Kamil Wasniowski		*
 * www.wasniowski.pl 			*/

function initialize() {
	var myLatlng = new google.maps.LatLng(50.110383, 18.997678);
	var mapOptions = {
	  	center:  myLatlng,
	  	zoom: 16,
	  	scrollheel:false,
	  	panControl: false,
		zoomControl: false,
		scaleControl: false,
		mapTypeControl: false,
		streetViewControl: false,
	  	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var styles = [
		{
			stylers: [{ saturation: -100 }]
		}
	];
	
	var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	
	var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
	
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	
    
    var image = {
		url: 'gfx/pin.png',
		size: new google.maps.Size(126, 85), 
		scaledSize: new google.maps.Size(63, 43),
		anchor: new google.maps.Point(32, 43)                 
	};
	
	var marker = new google.maps.Marker({
	  	position: myLatlng,
	  	map: map,
	  	icon: image,
	  	title:""
	});

}


$(document).ready(function(){
	if($('#mapa').length > 0){
		initialize();
		
		
		function zmierzMape(){
			if($('.container').width() > 900 ){	
				var szerokoscokna = ( $(window).width() - $('.container').width() )/2;
				$('#mapa').css({'width': (375+szerokoscokna)+'px'})
			}else{
				$('#mapa').css({'width': '100%'})
			}
		}
		
		
		zmierzMape();
		
		$(window).on('resize', function(){
			zmierzMape();
		})
		
	}

	var windowHeight = parseInt($(window).height() - 150);
	if(windowHeight < 400){ windowHeight=400}
	$('.top').css({'height': windowHeight+'px'})
	$('.top .tab').css({'height': (windowHeight-190)+'px'})
	
	
	$('body').append('<div class="fixedNav"></div>');
	$('header').clone().appendTo('.fixedNav');
	
	$(window).on('scroll', function(){
		if( $(this).scrollTop() > 95 ){
			$('header').addClass('open')
		}else{
			$('header').removeClass('open')
		}
	})

	$('nav a').bind('click',function(event){
        var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-78
        }, 800);
        /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
        event.preventDefault();
    });

	// timeline
	var active = 0;
	var datesLength = $('#TLDates li').length;
	$('#TLDesc article').eq(0).show();
	
	$('#TLDates li').on('click', function(){
		var eq = $(this).index();
		var move = eq * 80
		$('#TLDates li').removeClass('active');
		$(this).addClass('active');
		$('#TLDates').css({
			'transform': 'translateX(-'+move+'px)',
			'-webkit-transform': 'translateX(-'+move+'px)',
			'-moz-transform': 'translateX(-'+move+'px)'
		});
		$('#TLDesc article').eq(active).fadeOut('normal', function(){
			$('#TLDesc article').eq(eq).fadeIn();
			active = eq;
		})
	})
	
	
	//$('#agenda_slider').owlCarousel();
});
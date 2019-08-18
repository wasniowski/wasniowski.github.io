
$(document).ready(function(){

	var coockieconfig = {
	    // text - wpisujesz tekst który ma się pojawić na pasku
		text : 'Nasza strona używa plików cookies. Brak zmiany ustawień przeglądarki oznacza zgodę na ich użycie.',
		// wordClose - wpisujesz tekst na guziku zamykającym
		wordClose: 'Zamknij',
		// isPolicy - Czy ma sie wyswietlać guzik 'polityka prywatności' - true/false
		isPolicy: false,
		// wordPolicy - wpisujesz tekst na guziku Polityki prywatności
		wordPolicy: 'Polityka Cookies',
		// linkPolicy - podajesz linka do którego ma kierować guzik polityki
		linkPolicy: 'http://www.onet.pl/',
		// radius - stopien zaokrąglenia guzików
		radius: 5
	}
	
	function setCookie(nazwa, wartosc, expire) {
        document.cookie = nazwa + "=" + escape(wartosc) + ((expire==null)?"" : ("; expires=" + expire.toGMTString()))
	}
	
	var dokiedy = new Date();
	dokiedy.setMonth(dokiedy.getMonth()+12);	
	
	function getCookie(nazwa) { 
	    if (document.cookie!="") { 
	    var toCookie=document.cookie.split("; ");  
	        for (i=0; i<toCookie.length; i++) { 
	            var nazwaCookie=toCookie[i].split("=")[0]; 
	            var wartoscCookie=toCookie[i].split("=")[1]; 
	            if (nazwaCookie==nazwa) return unescape(wartoscCookie)
	        }
	    }
	}
	
	var isCoockie=getCookie("politykaCoockies");
	
	if (isCoockie != '1'){
		if(coockieconfig.isPolicy){
			$('body').prepend('<div class="coockie">'+coockieconfig.text+' <a href="'+coockieconfig.linkPolicy+'">'+coockieconfig.wordPolicy+'</a> <span>'+coockieconfig.wordClose+'</span> </div>')
		}else{
			$('body').prepend('<div class="coockie">'+coockieconfig.text+' <span>'+coockieconfig.wordClose+'</span> </div>')
		}
	}
	
	$('.coockie span').click(function(){
		$('.coockie').remove();
		setCookie('politykaCoockies', 1, dokiedy);
	})
	
	$('.coockie').css({
		'background': 'rgba(0,0,0,0.7)',
		'padding': '7px 0',
		'position': 'fixed',
		'top': 0,
		'left': 0,
		'width': '100%',
		'color': '#fff', 
		'text-align': 'center',
		'z-index':'50001'
	});
	
	$('.coockie a, .coockie span').css({
		'border-radius': coockieconfig.radius+'px',
		'background': '#fff',
		'color': '#454545',
		'display': 'inline-block',
		'padding': '5px 10px',
		'cursor': 'pointer'
	})
});
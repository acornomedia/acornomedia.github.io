/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

	(function() {

		var $menu = $('.navigation nav'),
			optionsList = '<option value="" selected>Go to..</option>';

		$menu.find('li').each(function() {
			var $this   = $(this),
				$anchor = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}

			}
			$(".nav li").parent().addClass("bold");

			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		}).end()
		.after('<select class="selectmenu">' + optionsList + '</select>');
		
		$('select.selectmenu').on('change', function() {
			window.location = $(this).val();
		});
		
	})();

	
		  $('.toggle-link').each(function() {
			$(this).click(function() {
			  var state = 'open'; //assume target is closed & needs opening
			  var target = $(this).attr('data-target');
			  var targetState = $(this).attr('data-target-state');
			  
			  //allows trigger link to say target is open & should be closed
			  if (typeof targetState !== 'undefined' && targetState !== false) {
				state = targetState;
			  }
			  
			  if (state == 'undefined') {
				state = 'open';
			  }
			  
			  $(target).toggleClass('toggle-link-'+ state);
			  $(this).toggleClass(state);      
			});
		  });
	
		//add some elements with animate effect

		$(".big-cta").hover(
			function () {
			$('.cta a').addClass("animated shake");
			},
			function () {
			$('.cta a').removeClass("animated shake");
			}
		);
		$(".box").hover(
			function () {
			$(this).find('.icon').addClass("animated pulse");
			$(this).find('.text').addClass("animated fadeInUp");
			$(this).find('.image').addClass("animated fadeInDown");
			},
			function () {
			$(this).find('.icon').removeClass("animated pulse");
			$(this).find('.text').removeClass("animated fadeInUp");
			$(this).find('.image').removeClass("animated fadeInDown");
			}
		);
		
		
		$('.accordion').on('show', function (e) {
		
			$(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
			$(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
			$(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
		});
		
		$('.accordion').on('hide', function (e) {
			$(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
			$(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
			$(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
		});	


		
		//Navi hover
		$('ul.nav li.dropdown').hover(function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
		}, function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
		});
		
		// tooltip
		$('.social-network li a, .options_box .color a').tooltip();

		// fancybox
		$(".fancybox").fancybox({				
				padding : 0,
				autoResize: true,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});

		//link scrollables (only for index page)
		if (window.location.pathname === '/index.html' || window.location.pathname === '/'){
			$('.navbar a').smoothScroll();
			$('.link-list a').smoothScroll();
		}
		
		//scroll to top
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollup').fadeIn();
				} else {
				$('.scrollup').fadeOut();
			}
		});
		$('a.scrollup').click(function(){
			$.smoothScroll({
				scrollElement: null,
				speed: 1000
			});
			return false;
		});

		// $('#mycarousel').jcarousel();
		// $('#mycarousel1').jcarousel();

		//touchcarousel
		$("#mycarousel1").touchCarousel({					
			pagingNav: false,
			snapToItems: false,
			itemsPerMove: 4,				
			scrollToLast: false,
			loopItems: false,
			scrollbar: true,
			scrollbarAutoHide: true,
			scrollbarTheme: "dark",
			useWebkit3d: true
	    });

	
		//royalslider
		$('#full-width-slider').royalSlider({
			arrowsNav : true,
			loop : false,
			keyboardNavEnabled : true,
			controlsInside : false,
			imageScaleMode : 'fill',
			arrowsNavAutoHide : false,
			autoScaleSlider : true,
			autoScaleSliderWidth : 1900,
			autoScaleSliderHeight : 600,
			controlNavigation : 'bullets',
			thumbsFitInViewport : false,
			navigateByClick : true,
			autoPlay : {
				enabled : true,
				pauseOnHover : true
			},
			loopRewind : true,
			transitionType : 'move',
			globalCaption : false,
			deeplinking : {
				enabled : true,
				change : false,
				delay : 700
			},
			/* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
			imgWidth : 1900,
			imgHeight : 600
		});
		
		
		//mail
		// $('form').submit(function(e) {
		// 	e.preventDefault();
		// 	$('#requestQuote').modal('hide');
		// 	$.post('mail.php', $(this).serialize())
		// 	.done(function(data) {
		// 		$.fancybox( data );
		// 	})
		// 	.fail(function() {
		// 		$.fancybox( 'Something has broken. Please contact the administrator.' );
		// 	});
		// 	$('form').each(function() {
		// 		this.reset();
		// 	});
		// 	return true;
		// });
		
		
		//currency convertor
		$('#currency').change(function() {
			var toCurrency = document.getElementById('currency').value;
			var rate;
			if (toCurrency == 'SGD') {
				rate = 1;
	            $('.pricing-terms').each(function() {
	            	var price = $(this).attr('data-price');
	            	if (price) $(this).html('<h6>' + (price * rate).toFixed(0) + ' ' + toCurrency + '</h6>');
	            });
			} else {
				$.getJSON(
			        'http://rate-exchange.appspot.com/currency?from=SGD&to=' + toCurrency + '&callback=?',
			        function(data) {
			            var rate = data.rate;
			            $('.pricing-terms').each(function() {
			            	var price = $(this).attr('data-price');
			            	if (price) $(this).html('<h6>' + (price * rate).toFixed(2) + ' ' + toCurrency + '</h6>');
			            });
			        }
			    );
			}
		});

		$('#year').html((new Date()).getFullYear());

});
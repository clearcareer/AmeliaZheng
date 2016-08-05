/*
Template Name: Smartex
Author: TrendyTheme
Version: 1.0
*/

jQuery(function ($) {

    'use strict';

    /* ======= Blank Wrapper ======= */
    (function () {

        // content here...

    }());


    /* ======= Preloader ======= */
    (function () {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');
    }());



    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("sticky");
        } else {
            $(".navbar-fixed-top").removeClass("sticky");
        }
    });


    /* === jQuery for page scrolling feature - requires jQuery Easing plugin === */
    (function () {
        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }());
    

    
    /* === Collaps mobile menu when click on anchor === */
    (function () {
	    $('.navbar-custom a.page-scroll').on('click', function(event) {
	        $('.navbar-custom').find('.navbar-collapse').removeClass('in');
	    });
    }());
    


    /* ======= Full Screen Background ======= */
    
    $(".tt-fullHeight").height($(window).height());
    $(window).resize(function(){
        $(".tt-fullHeight").height($(window).height());
    });



    /* === magnificPopup === */

    $('.tt-lightbox').magnificPopup({
        type: 'image',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        fixedContentPos: false
        // other options
    });


    /* === Youtube Video Script === */
    if ($('.player').length > 0) {

        jQuery(".player").mb_YTPlayer();
        
    }


    /* === Progress Bar === */
    $('.progress').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'),function(){
                $(this).css('width', $(this).attr('aria-valuenow')+'%');
            });
            $(this).off('inview');
        }
    });






    /* === Counter === */
    $('.counter-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });




    /* ======= Recent Post Carousel ======= */
    (function () {

      var owl = $(".recent-post-carousel");
     
      owl.owlCarousel({
          items : 4, //4 items above 1000px browser width
          itemsDesktop : [1024,4], //4 items between 1000px and 901px
          itemsDesktopSmall : [900,2], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 480
          itemsMobile : [479,1], //1 item between 480 and 0
          pagination : false, // Show pagination
          autoPlay: true
      });


      // Custom Navigation Events
      $(".btn-next").on('click', function(){
        owl.trigger('owl.next');
      })
      $(".btn-prev").on('click', function(){
        owl.trigger('owl.prev');
      })


    }());


    /* ======= Partner Carousel ======= */
    (function () {

      var owl = $(".partner-carousel");
     
      owl.owlCarousel({
          items : 5, //5 items above 1000px browser width
          itemsDesktop : [1024,4], //4 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 480
          itemsMobile : [479,1], //1 item between 480 and 0
          pagination : false, // Show pagination
          autoPlay: true
      });

    }());




    /* ======= BlackAndWhite Script ======= */
    $('.bwWrapper').BlackAndWhite({
        hoverEffect : true, // default true
        // set the path to BnWWorker.js for a superfast implementation
        webworkerPath : false,
        // to invert the hover effect
        invertHoverEffect: false,
        // this option works only on the modern browsers ( on IE lower than 9 it remains always 1)
        intensity:1,
        speed: { //this property could also be just speed: value for both fadeIn and fadeOut
            fadeIn: 200, // 200ms for fadeIn animations
            fadeOut: 800 // 800ms for fadeOut animations
        },
        onImageReady:function(img) {
            // this callback gets executed anytime an image is converted
        }
    });




    /* ======= Contact Form ======= */
    $('#contactForm').on('submit',function(e){

        e.preventDefault();

        var $action = $(this).prop('action');
        var $data = $(this).serialize();
        var $this = $(this);

        $this.prevAll('.alert').remove();

        $.post( $action, $data, function( data ) {

            if( data.response=='error' ){

                $this.before( '<div class="alert alert-danger">'+data.message+'</div>' );
            }

            if( data.response=='success' ){

                $this.before( '<div class="alert alert-success">'+data.message+'</div>' );
                $this.find('input, textarea').val('');
            }

        }, "json");

    });






    /* ======= GOOGLE MAP ======= */
    if ($('#myMap').length > 0) {
        //set your google maps parameters
        var $latitude = 51.558588, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
            $longitude = -0.279540,
            $map_zoom = 16 /* ZOOM SETTING */

        //google map custom marker icon 
        var $marker_url = 'assets/images/pin.png';

        //we define here the style of the map
        var style = [{
            "stylers": [{
                "hue": "#000"
            }, {
                "saturation": -100
            }, {
                "gamma": 2.15
            }, {
                "lightness": 0
            }]
        }];

        //set google map options
        var map_options = {
            center: new google.maps.LatLng($latitude, $longitude),
            zoom: $map_zoom,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style
        }
        //inizialize the map
        var map = new google.maps.Map(document.getElementById('myMap'), map_options);
        //add a custom marker to the map                
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng($latitude, $longitude),
            map: map,
            visible: true,
            icon: $marker_url
        });

        var contentString = '<div id="mapcontent">' + '<p>Resume, Engineers Way, United Kingdom.</p></div>';
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 320,
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
       
    }


});





$(window).load(function() {

    "use strict";

    /* ======= shuffle js ======= */
    if ($('#portfolio-grid').length > 0) {
        /* initialize shuffle plugin */
        var $grid = $('#portfolio-grid');

        $grid.shuffle({
            itemSelector: '.portfolio-item' // the selector for the items in the grid
        });

        /* reshuffle when user clicks a filter item */
        $('#filter li').on('click', function (e) {
            e.preventDefault();

            // set active class
            $('#filter li').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName );
        });
    }


});
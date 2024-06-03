// Client Slider
jQuery("#carousel").owlCarousel({
    autoplay: true,
    rewind: false, /* use rewind if you don't want loop */
    margin: 20,
     /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
  
      600: {
        items: 3
      },
  
      1024: {
        items: 4
      },
  
      1366: {
        items: 5
      }
    }
  });

// Client Slider
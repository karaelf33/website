
// section 6 ----------------------------------------------------------------------------------------
var bg = document.querySelector('.item-bg');
var items = document.querySelectorAll('.news__item');
var item = document.querySelector('.news__item');

function cLog(content) {
    console.log(content)
}

if($(window).width() > 800) {
    $(document).on("mouseover", ".news__item", function (_event, _element) {

        var newsItem = document.querySelectorAll('.news__item');
        newsItem.forEach(function (element, index) {
            element.addEventListener('mouseover', function () {
                var x = this.getBoundingClientRect().left;
                var y = this.getBoundingClientRect().top;
                var width = this.getBoundingClientRect().width;
                var height = this.getBoundingClientRect().height;

                $('.item-bg').addClass('active');
                $('.news__item').removeClass('active');
                // $('.news__item').removeClass('active');


                bg.style.width = width + 'px';
                bg.style.height = height + 'px';
                bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
            });

            element.addEventListener('mouseleave', function () {
                $('.item-bg').removeClass('active');
                $('.news__item').removeClass('active');
            });

        });

    });
}


var swiper = new Swiper('.news-slider', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    speed: 300,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 3,
        slideShadows: false
    },
    breakpoints: {
        480: {
            spaceBetween: 0,
            centeredSlides: true
        }
    },
    simulateTouch: true,
    navigation: {
        nextEl: '.news-slider-next',
        prevEl: '.news-slider-prev'
    },
    pagination: {
        el: '.news-slider__pagination',
        clickable: true
    },
    on: {
        init: function () {
            var activeItem = document.querySelector('.swiper-slide-active');

            var sliderItem = activeItem.querySelector('.news__item');

            $('.swiper-slide-active .news__item').addClass('active');

            var x = sliderItem.getBoundingClientRect().left;
            var y = sliderItem.getBoundingClientRect().top;
            var width = sliderItem.getBoundingClientRect().width;
            var height = sliderItem.getBoundingClientRect().height;


            $('.item-bg').addClass('active');

            bg.style.width = width + 'px';
            bg.style.height = height + 'px';
            bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
        }
    }
});

swiper.on('touchEnd', function () {
    $('.news__item').removeClass('active');
    $('.swiper-slide-active .news__item').addClass('active');
});

swiper.on('slideChange', function () {
    $('.news__item').removeClass('active');
});

swiper.on('slideChangeTransitionEnd', function () {
    $('.news__item').removeClass('active');
    var activeItem = document.querySelector('.swiper-slide-active');

    var sliderItem = activeItem.querySelector('.news__item');

    $('.swiper-slide-active .news__item').addClass('active');

    var x = sliderItem.getBoundingClientRect().left;
    var y = sliderItem.getBoundingClientRect().top;
    var width = sliderItem.getBoundingClientRect().width;
    var height = sliderItem.getBoundingClientRect().height;


    $('.item-bg').addClass('active');

    bg.style.width = width + 'px';
    bg.style.height = height + 'px';
    bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
});
// section 6 ----------------------------------------------------------------------------------------
$('nav.main>.tab').each(function(index){
  $(this).css({'transition-delay':((index*0.1)+'s')});
});

$('#grid_wrapper>card').each(function(index){
  $(this).css({'transition-delay':((index*0.05)+'s')});
});
$('document').ready(function(){
  $('#grid_wrapper').removeClass('init');
});
//$('nav.main').removeClass('inactive');
$('nav.main>.tab').click(function(e){
  var $eq=$('nav.main>.tab').index($(this));
  var $ripple=$("<div/>");
  $ripple.addClass('ripple');
  $ripple.css({left:e.clientX-$(this).offset().left,top:e.clientY-$(this).offset().top});
  $(this).append($ripple);
  setTimeout(function(){
    $ripple.remove();
  },1000);
  var $megaRipple=$("<div/>");
  $megaRipple.addClass('ripple');
  $megaRipple.addClass('mega');
  $megaRipple.css({
                  left:e.clientX,
                  top:e.clientY,
                  background:$(this).css('border-color')
                  });
  $('#content_wrapper>div.content').append($megaRipple);
  setTimeout(function(){
    $megaRipple.animate({opacity:0},1000);
    setTimeout(function(){
      $megaRipple.remove();
    },1000);
  },500);
  $('nav.main').find('.active').removeClass('active');
  $(this).addClass('active');
  $('#grid_wrapper>card>div').removeClass('active');
  var $card=$('#grid_wrapper>card').eq($eq).find('div');
  $('#content_wrapper>div.clone>span').html($card.find('span').html());
  $card.addClass('active');
  $('#content_wrapper>div.content>section').removeClass('active');
  $('#content_wrapper>div.content>section').eq($eq).addClass('active');
});

hLists=document.getElementsByClassName('hList');
for(var i=0; i<hLists.length;i++)
  {
      hLists[i].leftScrollTarget=0;
      hLists[i].onmousewheel=function(event) {
      temp=this.leftScrollTarget-(event.wheelDelta*10);       if(temp<=0)
        this.leftScrollTarget=0;
      else if(temp>=this.scrollWidth-this.clientWidth)
        this.leftScrollTarget = this.scrollWidth-this.clientWidth;
      else
        this.leftScrollTarget = temp;
        event.preventDefault();
      };
  }
function render(){
  window.requestAnimationFrame(render);
  for(var i=0;i<hLists.length;i++)
    {
      hLists[i].scrollLeft+=(hLists[i].leftScrollTarget-hLists[i].scrollLeft)/10;
    }
}render();
var sections=document.getElementById('home').getElementsByTagName('section');
for(var i=0;i<sections.length;i++)
  {
    sections[i].transY=0;
  }
window.onscroll=function(e){
  for(var i=0;i<sections.length;i++){
    sections[i].transY=(i)*parseInt(window.scrollY)
    sections[i].style.transform='translateY(-'+sections[i].transY+'px)';
  }
}

$('#grid_wrapper>card>div').click(function(){

  //Get index of active section
  var $eq=$('#grid_wrapper>card').index($(this).parent());

  //clone the tab and add to content_wrapper
  var $clone = $(this).clone();
  $clone.addClass('clone');
  $('#content_wrapper').append($clone);
  setTimeout(function(){
    $clone.addClass('deactivate');
  },250);

  //Make overlay visible and animate to full size
$('#content_wrapper').removeClass('inactive');
  $('#content_wrapper>div.clone').css({
    top:$(this).offset().top - $(window).scrollTop() + ($(this).height()/2),
    left:$(this).offset().left - $(window).scrollLeft() + ($(this).width()/2),
    height:$(this).height(),
    width:$(this).width()
  }).show().animate({
    top:'50%',
    left:'50%',
    width:'100%',
    height:'100%'
  },500);

  //Add active class to clicked tab to make it disappear
  $('#grid_wrapper>card>div').removeClass('active');
  $(this).addClass('active');

  //500 ms after click
  //overlay is fullSize
  setTimeout(function(){

    //Show menu
    $('nav').removeClass('inactive');

    //Activate tab on menu
    $('nav.main>.tab').removeClass('active');
    $('nav.main>.tab').eq($eq).addClass('active');
    document.querySelectorAll('nav.main>.tab.active')[0].scrollIntoView();

  },500);

  //700ms after click
  //Menu is visible
  setTimeout(function(){

    //Animate corresponding section content to life
    $('#content_wrapper>div.content>section').removeClass('active');
    $('#content_wrapper>div.content>section').eq($eq).addClass('active');

  },700);

});

$('#content_wrapper>.close').click(function(){
  $('nav.main').addClass('inactive');
  $('#content_wrapper>div.content>section').removeClass('active');
  setTimeout(function(){
    $('#content_wrapper>div.clone').removeClass('deactivate');
  },750);
  setTimeout(function(){
    var $eq=$('nav.main>.tab').index($('nav.main>.active'));
    var $active=$('#grid_wrapper>card').eq($eq).find('div');
    $('#content_wrapper>div.clone').animate({
      top:$active.offset().top - $(window).scrollTop() +$active.height()/2,
      left:$active.offset().left- $(window).scrollLeft() +$active.width()/2,
      height:$active.height(),
      width:$active.width()
    },700,'easeOutCubic',function(){
      setTimeout(function(){
      $('#content_wrapper>div.clone').remove();
      $('#grid_wrapper>card>div').removeClass('active');
      });
    });
    $('#content_wrapper').addClass('inactive');
  },500);
});

//circle kısımı


function doSwap() {
    $("#nav li").each(function() {
        if ($(this).hasClass("active")) {
            swap($(this));
        }
        else {
            swapBack($(this));
        }
    });
}
doSwap();
function clear(o) {
    $("#nav li").each(function() {
        $(this).removeClass("active");
    });
}
$("#nav li").click(function() {
    clear();
    $(this).addClass("active");
    doSwap();
    rotate('.dial',$(this));

});

function rotate(m,o) {
    var id = "#" + $(o).attr("id");
    var menu = $(m);

    menu.removeClass('r0 lr1 lr2 rr1 rr2');

    if (id == "#email") {
        menu.addClass("lr2");
    }
    if (id == "#photo") {
        menu.addClass('lr1');

    }
    if (id == "#cloud") {
        menu.addClass('r0');
    }
    if (id == "#portfolio") {
        menu.addClass('rr1');
    }
    if (id == "#settings") {
        menu.addClass('rr2');
    }


}

function swap(o) {
    var id = "#" + $(o).attr("id");
    var cimg = new String;
    var burl = "http://grantcr.com/files/",
        ext = ".png"
    cimg = id + " img";
    console.log($(cimg).attr("src"));

    if (id == "#email") {
        var nimg = burl + "iemailh" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#photo") {
        var nimg = burl + "photosh" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#cloud") {
        var nimg = burl + "icloudh" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#portfolio") {
        var nimg = burl + "portfolioh" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#settings") {
        var nimg = burl + "settingsh" + ext;
        $(cimg).attr("src",nimg);
    }

}

function swapBack(o) {
    var id = "#" + $(o).attr("id");
    var cimg = new String;
    var burl = "http://grantcr.com/files/",
        ext = ".png"
    cimg = id + " img";
    console.log($(cimg).attr("src"));

    if (id == "#email") {
        var nimg = burl + "iemail" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#photo") {
        var nimg = burl + "iphoto" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#cloud") {
        var nimg = burl + "icloud" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#portfolio") {
        var nimg = burl + "portfolio" + ext;
        $(cimg).attr("src",nimg);
    }
    if (id == "#settings") {
        var nimg = burl + "settings" + ext;
        $(cimg).attr("src",nimg);
    }

}
//contact me ------------------------------------------------------------------------------------

// Input Lock
$('textarea').blur(function () {
    $('#hire textarea').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
            $this.addClass('focused');
            $('textarea + label + span').css({'opacity': 1});
        }
        else {
            $this.removeClass('focused');
            $('textarea + label + span').css({'opacity': 0});
        }
    });
});

$('#hire .field:first-child input').blur(function () {
    $('#hire .field:first-child input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
            $this.addClass('focused');
            $('.field:first-child input + label + span').css({'opacity': 1});
        }
        else {
            $this.removeClass('focused');
            $('.field:first-child input + label + span').css({'opacity': 0});
        }
    });
});

$('#hire .field:nth-child(2) input').blur(function () {
    $('#hire .field:nth-child(2) input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
            $this.addClass('focused');
            $('.field:nth-child(2) input + label + span').css({'opacity': 1});
        }
        else {
            $this.removeClass('focused');
            $('.field:nth-child(2) input + label + span').css({'opacity': 0});
        }
    });
});


var mainjs = (function(){
	var init = function(){
		_setUpListeners();
	},
	_setUpListeners = function(){
		/*$(".sidebar__title__link").on('click',_accardeon);*/
		$(".resetfilter__link").on('click',_resetfilter);
		//$(".sort__view-item").on('click',_changeview);
	};


/*	//Accardeon
	function _accardeon(event){
		event.preventDefault();
		var element = $(this),
			header = element.closest('.sidebar__item__title'),
			content = header.siblings('.sidebar-item__content');
		if(content.hasClass('hideblock')){
			content.stop(true, true).slideDown(600).removeClass('hideblock');
		}else{
			content.stop(true, true).slideUp(600).addClass('hideblock');
		}
	}*/

	//Reset filter
	function _resetfilter(event){
		event.preventDefault();

		var element = $(this),
			filter = $('.choice-list'),
			items = filter.find('.choice-chkbx');
		items.prop({"checked": false});
	}

	//slider
	$( ".sidebar__slider" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
/*    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );*/
	
	if($('.sort__select-elem').length){
		$('.sort__select-elem').select2({
			minimumResultsForSearch:Infinity
		});
	}

	return{
		init: init
	}
})();

mainjs.init();


var ViewStateChange = (function() {

  var _previousClass = '';

  var _changeState = function($this){
    var 
      item = $this.closest('.sort__view-item'),
      view = item.data('view'),
      listOfitems = $('#products__list'),
      modificationPrefix = 'products__list-',
      classOfViewState = modificationPrefix + view;

      if (_previousClass == '') {
        _previousClass = listOfitems.attr('class');
      }

      _changeActiveClass($this);
      listOfitems.attr('class', _previousClass + ' ' + classOfViewState);
  };

  var _changeActiveClass = function($this) {
    $this
      .closest('.sort__view-item').addClass('active')
      .siblings().removeClass('active');
  }

  return {
    init: function(){
      $('.sort__view-link').on('click', function(e){
        e.preventDefault();
        _changeState($(this));
      });
    }
  }
}());

var Accordeon = (function(){

  var _openSection = function($this){
    var
      container = $this.closest('.sidebar-item'),
      content = container.find('.sidebar-item__content'),
      otherContent = $this.closest('.asidebar-list').find('.sidebar-item__content');

    if (!container.hasClass('active')) {
      otherContent.slideUp().closest('.sidebar-item').removeClass('active');

      container.addClass('active');
      content.stop(true, true).slideDown();
    } else {
      container.removeClass('active');
      content.stop(true, true).slideUp();
    }

  }

  return {

    init: function(){
      $('.sidebar__title__link').on('click', function(e){
        e.preventDefault();
        _openSection($(this));
      });
    }
  }
}());


var SlideShow = (function(){

  var _changeSlide = function($this){
    var
      container = $this.closest('.products__slideshow'),
      path = $this.find('img').attr('src'),
      display = container.find('.products__slideshow-img');

    $this.closest('.products__slideshow-item').addClass('active')
    .siblings().removeClass('active');

    display.fadeOut(function(){
      $(this).attr('src', path).fadeIn();
    });
  }

  return {
    init: function(){
      $('.products__slideshow-link').on('click', function(e){
        e.preventDefault();

        var 
          $this = $(this);

          _changeSlide($this);
      });
    }
  }

}());


$(document).ready(function() {
	ViewStateChange.init();
	Accordeon.init();
	SlideShow.init();
	$('.important-info__text').columnize({ width: 500 });
	
});
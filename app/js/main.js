var mainjs = (function(){
	var init = function(){
		_setUpListeners();
	},
	_setUpListeners = function(){
		$(".resetfilter__link").on('click',_resetfilter);
	};


	//Reset filter
	function _resetfilter(event){
		event.preventDefault();

		var element = $(this),
			filter = $('.choice-list'),
			items = filter.find('.choice-chkbx');
		items.prop({"checked": false});
	}

  
	//slider
	
	
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


var SliderWidget = (function(){

        var _insertValue = function($this){
            var from = $this.closest('.pricefilter-wrap').find('.price__inpt-from'),
                to = $this.closest('.pricefilter-wrap').find('.price__lbl-to');
            var values = $this.slider('option','values');
            $('.price__inpt-from').val(values[0]);
             $('.price__inpt-to').val(values[1]);
        }

      return{
        init: function(){
        $(".sidebar__slider").each(function() {
          var $this = $(this),
              min = parseInt($this.data('min')),
              max = parseInt($this.data('max'));

          $this.slider({
                  range: true,
                  min: min,
                  max: max,
                  values: [ min, max ],
                  slide: function() {
                    /*$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );*/
                    _insertValue($this)
                  }
                });
          
        });

          
        }
      }
  }());


$(document).ready(function() {
	ViewStateChange.init();
	Accordeon.init();
	SlideShow.init();
	$('.important-info__text').columnize({ width: 500 });

  if($(".sidebar__slider").length){
    SliderWidget.init();
  }
	
});
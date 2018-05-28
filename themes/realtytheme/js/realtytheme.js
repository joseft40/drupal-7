(function ($) {
  Drupal.behaviors.ThemeRealty = {
    attach: function (context, settings) {
      if ($('body').hasClass('admin-menu')) {
        $('#top-header').css({'margin-top': '10px'});
        $('#navbar').css({'margin-top': '100px'});
        $('.main-container').css({'margin-top': '30px'});
	      $('.logo-navigation-home').css({'margin-top': '50px'});
      }
      $('.page-dashboard .flag-wrapper a').each(function() {
        var flag = $(this).find('i');
        $(this).html(flag);
      });


/*
  $( '#block-menu-menu-opciones-usuario li').on('click', function() {
      $(this.id).find('a').trigger('click');
  });*/

/*
 $('.page-dashboard .box-element-propertys').each(function() {
   var self = $(this);
   var margin = 0;
   $(self.id + ' .flag-wrapper a').each(function(index) {
     var flag = $(this).find('i');
     $(this).html(flag);
     margin = margin + 30;
     $(this).css({'margin-top': margin});
   });
  });*/

/*
      Drupal.ajax['some_element'].options.beforeSubmit = function (form_values, element, options) {
        console.log('values');        
console.log(Drupal.ajax);
      }*/

/*
      $('.page-user-propertys #block-menu-menu-opciones-usuario li, .page-dashboard-anuncios #block-menu-menu-opciones-usuario li, .page-dashboard-contacts #block-menu-menu-opciones-usuario li').hover(function() {
        $(this).css({'background-color': '#3d3d3d'});
      });
      $('.page-user-propertys #block-menu-menu-opciones-usuario li, .page-dashboard-anuncios #block-menu-menu-opciones-usuario li, .page-dashboard-contacts #block-menu-menu-opciones-usuario li').each(function() {
	$(this).hover(function () {
          $(this).css({'background-color': '#337AB7'});
	});
	$(this).mouseout(function () {
          $(this).css({'background-color': '#3d3d3d'});
          $('.page-user-propertys #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
          $('.page-dashboard-anuncios #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
          $('.page-dashboard-contacts #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
	});
      });
      $('.page-user-propertys #block-menu-menu-opciones-usuario li a, .page-dashboard-anuncios #block-menu-menu-opciones-usuario li a, .page-dashboard-contacts #block-menu-menu-opciones-usuario li a').each(function() {
	$(this).hover(function () {
          $(this).parent().css({'background-color': '#337AB7', 'cursor': 'pointer'});
	});
	$(this).mouseout(function () {
          $(this).parent().css({'background-color': '#3d3d3d'});
          $('.page-user-propertys #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
          $('.page-dashboard-anuncios #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
          $('.page-dashboard-contacts #block-menu-menu-opciones-usuario li a.active').css({'background-color': '#337AB7'});
	});
      });
      var height = $(".list-propertys .view-lista-de-propiedades").height();
      $('.page-user-propertys .region-filter-search-property').css({'height': height + 'px'});
      $('.field-vocabulary-multiple').each(function () {
        $(this).parent().css({"width": "100%", "display": "inline-flex"});
      });
*/

    }
  };
}(jQuery));
       
jQuery(document).ready(function($) {
  var heightb =  $(window).height() - 55;
/*  $('body').css({'min-height': heightb});*/
  $('.page-messages-new .main-container.container-fluid > .row').css({'min-height': heightb});
  //flexsglider
  $('ul.flex-direction-nav li a.flex-prev').addClass('fa fa-angle-left');
  $('ul.flex-direction-nav li a.flex-next').addClass('fa fa-angle-right');
  $('.page-propiedad .location .adr .region').before('<i class="fa fa-map-marker" aria-hidden="true"></i>');
  $('.page-propiedad .pane-node-field-location .field-item').before('<i class="fa fa-map-marker" aria-hidden="true"></i>');
  $('.field-vocabulary-multiple li').before('<i class="fa fa-check" aria-hidden="true"></i>');
  $('.page-user-propertys .region-filter-search-property').parent().parent().css({'background': '#ffffff', 'margin-top': '25px'});
  $('.page-propiedad .addressfield-container div').after('<span style="padding-right: 5px">,</span>');
  $('.panel-pane.pane-entity-field.pane-node-field-location .addressfield-container.locality-block.country-PA span').each(function(index) {
    if (index < 2) {
      $(this).after('<b>-</b>');
    }
  });
/*      $('addressfield-autocomplete-reveal').click();
      $('addressfield-autocomplete-reveal').change();*/
  $('.page-home .quicktabs-tabpage').each(function() {
    var string = '';
    var op = $('.quicktabs-tabs').find('.active a').text();
    var op = op.replace("(solapa activa)", ""); 

    if (op == "COMPRE") {
      string = "Venta";
    }
    else if (op == "ALQUILE") {
      string = "Alquiler";
    }
    var type = $(this).find('.views-exposed-form .views-exposed-widget select').val();
    var name = $(this).find('.views-exposed-form .views-exposed-widget input').val();
    if (type != '' && type != 'All') {
      //$(this).find('.views-exposed-form').after(Drupal.t("Busqueda anteriores <b>@type en @string en Panamá</b>", '@type' => type, '@string' => string}));
      $(this).find('.views-exposed-form').after("<p class='text-mini text-search-home'>Búsqueda anteriores <b>" + type + ' en ' + string + ' en Panamá</b></p>');
    }
  });
  var path = $("#background-parallex .block-image img").attr("src");
  $("#background-parallex .block-image img").hide();
  $("#background-parallex").css({'background-image': 'url(' + path + ')'});
  $("#background-parallex").css({'background-repeat': 'repeat-y'});
  $("#background-parallex").css({'min-height': '376px'});
  $("#background-parallex").css({'width': '102.5%'});

  $('a.zoom').each(function () {
    $(this).hover(function() {
      //var path = $(this).attr('href');
      $(this).zoom({url: path});
    });
  });
  $('.colorbox-zoom img').each(function () {
    var path = $(this).attr('src');
    //$(this).parent().attr('href', path);
    $(this).hover(function() {
      $(this).parent().zoom({url: path});
    });
  });
  //field location in views mapa
  $('.form-item-field-location-administrative-area .form-item.form-group').each(function(index) {
    if (index == 5) {
      $(this).after("<a id='more-location-map'><i class='fa fa-plus-square' aria-hidden='true'></i><span class='marginl15'>Ver más</span></a>");
    }
    if (index > 5) {
      $(this).hide();
     }
  });
  $('.form-item-field-location-administrative-area .form-item.form-group').last().after("<a id='minus-location-map'><i class='fa fa-minus-square' aria-hidden='true'></i><span class='marginl15'>Ver menos</span></a>");
  $('#minus-location-map').hide();
  $('#more-location-map').click(function () {
    $('.form-item-field-location-administrative-area .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).show();
      }
    });
    $('#more-location-map').hide();
    $('#minus-location-map').show();
    $('#minus-location-map').css({'display': 'block'});
  });

  $('#minus-location-map').click(function () {
    $('#minus-location-map').hide();
    $('#more-location-map').show();
    $('#more-location-map').css({'display': 'block'});
    $('.form-item-field-location-administrative-area .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).hide();
      }
    });
  });
  $('#minus-location-map, #more-location-map').css({'cursor':'pointer', 'padding-top': '5px'});
  //field tipo de desarrollo
  $(".form-item-field-tipo-de-desarrollo-tid .form-item.form-group").each(function(index) {
    if (index == 5) {
      $(this).after("<a id='more-desarrollo-map'><i class='fa fa-plus-square' aria-hidden='true'></i><span class='marginl15'>Ver más</span></a>");
    }
    if (index > 5) {
      $(this).hide();
     }
  });
  $('.form-item-field-tipo-de-desarrollo-tid .form-item.form-group').last().after("<a id='minus-desarrollo-map'><i class='fa fa-minus-square' aria-hidden='true'></i><span class='marginl15'>Ver menos</span></a>");
  $('#minus-desarrollo-map').hide();
  $('#more-desarrollo-map').click(function () {
    $('.form-item-field-tipo-de-desarrollo-tid .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).show();
      }
    });
    $('#more-desarrollo-map').hide();
    $('#minus-desarrollo-map').show();
    $('#minus-desarrollo-map').css({'display': 'block'});
  });

  $('#minus-desarrollo-map').click(function () {
    $('#minus-desarrollo-map').hide();
    $('#more-desarrollo-map').show();
    $('#more-desarrollo-map').css({'display': 'block'});
    $('.form-item-field-tipo-de-desarrollo-tid .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).hide();
      }
    });
  });
  $('#minus-desarrollo-map, #more-desarrollo-map').css({'cursor':'pointer', 'padding-top': '5px'});
  //field Beneficios
  $(".form-item-field-beneficios-tid .form-item.form-group").each(function(index) {
    if (index == 5) {
      $(this).after("<a id='more-beneficios-map'><i class='fa fa-plus-square' aria-hidden='true'></i><span class='marginl15'>Ver más</span></a>");
    }
    if (index > 5) {
      $(this).hide();
     }
  });
  $('.form-item-field-beneficios-tid .form-item.form-group').last().after("<a id='minus-beneficios-map'><i class='fa fa-minus-square' aria-hidden='true'></i><span class='marginl15'>Ver menos</span></a>");
  $('#minus-beneficios-map').hide();
  $('#more-beneficios-map').click(function () {
    $('.form-item-field-beneficios-tid .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).show();
      }
    });
    $('#more-beneficios-map').hide();
    $('#minus-beneficios-map').show();
    $('#minus-beneficios-map').css({'display': 'block'});
  });

  $('#minus-beneficios-map').click(function () {
    $('#minus-beneficios-map').hide();
    $('#more-beneficios-map').show();
    $('#more-beneficios-map').css({'display': 'block'});
    $('.form-item-field-beneficios-tid .form-item.form-group').each(function(index) {
      if (index > 5) {
        $(this).hide();
      }
    });
  });
  $('#minus-beneficios-map, #more-beneficios-map').css({'cursor':'pointer', 'padding-top': '5px'});

  $(".page-busqueda .views-exposed-form .views-exposed-widget .form-submit span").removeClass("glyphicon-filter");
  $(".page-busqueda-mapa .views-exposed-form .views-exposed-widget .form-submit span").removeClass("glyphicon-filter");
  var height = 0;
  $(".field-vocabulary-multiple").each(function (index) {
    if ($(this).height() > height) {
      height = $(this).height();
    }
  });
  $(".field-vocabulary-multiple-container td").css({'height': height});

  //menu opciones usuario firts sidebar
  $('#block-menu-menu-opciones-usuario li').hover(function() {
     $(this).css({'background-color': '#337AB7'});
  });
	$('#block-menu-menu-opciones-usuario li').mouseout(function () {
    $(this).find('a').each(function() {
      if ($(this).hasClass('active')) {
        /*$(this).parent().css({'background-color': '#337ab7'});*/
      }
      else {
        $(this).parent().css({'background-color': '#3d3d3d'});
      }
    });
	});
	$('#block-menu-menu-opciones-usuario li a.active').each(function () {
     $(this).parent().css({'background-color': '#337ab7'});
	});
/*
	$('#block-menu-menu-opciones-usuario li a.active').hover(function () {
     $(this).parent().css({'background-color': '#337ab7'});
	});
*/
	/*$('#block-menu-menu-opciones-usuario li').mouseout(function () {
    var self = this;
    $(this).find('a.active').each(function () {
      $(self).parent('li').css({'background-color': '#337ab7'});
    });*/

/*
	$('#block-menu-menu-options-user-header > li > a').hover(function () {
console.log('jose');
     $(this).parent('li').css({'background-color': '#337AB7'});
	});
*/


});

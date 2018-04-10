(function ($) {
  Drupal.behaviors.ThemeRealty = {
    attach: function (context, settings) {
      if ($('body').hasClass('admin-menu')) {
        $('#top-header').css({'margin-top': '10px'});
        $('#navbar').css({'margin-top': '100px'});
        $('.main-container').css({'margin-top': '30px'});
	$('.logo-navigation-home').css({'margin-top': '50px'});
      }

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
    }
  };
}(jQuery));
       
jQuery(document).ready(function($) {
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
  $("#background-parallex").css({'width': '100%'});

});

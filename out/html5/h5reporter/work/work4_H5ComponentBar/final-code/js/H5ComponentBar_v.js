$traceurRuntime.registerModule("../../../../../../../html5/h5reporter/work/work4_H5ComponentBar/final-code/js/H5ComponentBar_v.js", [], function() {
  "use strict";
  var __moduleName = "../../../../../../../html5/h5reporter/work/work4_H5ComponentBar/final-code/js/H5ComponentBar_v.js";
  var H5ComponentBar_v = function(name, cfg) {
    var component = new H5ComponentBar(name, cfg);
    var width = (100 / cfg.data.length) >> 0;
    component.find('.line').width(width + '%');
    $.each(component.find('.rate'), function() {
      var w = $(this).css('width');
      $(this).height(w).width('');
    });
    $.each(component.find('.per'), function() {
      $(this).appendTo($(this).prev());
    });
    return component;
  };
  return {};
});
$traceurRuntime.getModule("../../../../../../../html5/h5reporter/work/work4_H5ComponentBar/final-code/js/H5ComponentBar_v.js" + '');

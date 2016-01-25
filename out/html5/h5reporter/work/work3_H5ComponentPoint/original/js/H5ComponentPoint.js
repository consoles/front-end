$traceurRuntime.registerModule("../../../../../../../html5/h5reporter/work/work3_H5ComponentPoint/original/js/H5ComponentPoint.js", [], function() {
  "use strict";
  var __moduleName = "../../../../../../../html5/h5reporter/work/work3_H5ComponentPoint/original/js/H5ComponentPoint.js";
  var H5ComponentPoint = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var base = cfg.data[0][1];
    $.each(cfg.data, function(idx, item) {
      var point = $('<div class="point point_' + idx + '" >');
      var name = $('<div class="name">' + item[0] + '</div>');
      var rate = $('<div class="per">' + (item[1] * 100) + '%</div>');
      name.append(rate);
      point.append(name);
      var per = (item[1] / base * 100) + '%';
      point.width(per).height(per);
      if (item[2]) {
        point.css('background-color', item[2]);
      }
      if (item[3] !== undefined && item[4] !== undefined) {
        point.css('left', item[3]).css('top', item[4]);
      }
      point.css('transition', 'all 1s ' + idx * .5 + 's');
      component.append(point);
    });
    component.find('.point').on('click', function() {
      component.find('.point').removeClass('point_focus');
      $(this).addClass('point_focus');
      return false;
    }).eq(0).addClass('point_focus');
    return component;
  };
  return {};
});
$traceurRuntime.getModule("../../../../../../../html5/h5reporter/work/work3_H5ComponentPoint/original/js/H5ComponentPoint.js" + '');

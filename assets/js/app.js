  var layer1 = new ol.layer.Vector({
    title: 'Mundo',
    source: new ol.source.Vector({
     url: '../../data/dam/World.json',
     format: new ol.format.GeoJSON()
    }),
    style:new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'green',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.1)'
      })
    }),
  });

  var layer2 = new ol.layer.Vector({
    title: 'Presas',
    source: new ol.source.Vector({
     url: '../../data/dam/Mexico.json',
     format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
     image: new ol.style.Circle({
       radius: 5,
       fill: new ol.style.Fill({color: 'rgba(0, 145, 255, 1)'})
     })
    })
  });

  var layer3 = new ol.layer.Vector({
    title: 'Layer 3',
    source: new ol.source.Vector({
     url: '../../data/regiones_michoacan.json',
     format: new ol.format.GeoJSON()
    }),
    style:new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    }),
  });

  var layers = {
    mundo: layer1,
    presas: layer2,
    michoacan: layer3
  };

  var mapLayers = [];

  mapLayers.push(new ol.layer.Tile({
      source: new ol.source.OSM()
  }));

  for (var prop in layers) {
    layers[prop].setVisible(false);
    mapLayers.push(layers[prop]);
  }

  var map = new ol.Map({
    layers: mapLayers,
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: ({
        collapsible: false
      })
    }),
    view: new ol.View({
      center: ol.proj.fromLonLat([-101.18, 19.70]),
      zoom: 7 
    })
  });

  $('.btn-layer').click(function(event) {
    var target = $(event.target);

    var layerId = target.data('layer');
    var layer = layers[layerId];
    var visibility = layer.getVisible();

    layer.setVisible(!visibility);

    $(event.target).toggleClass('btn-active');
  });

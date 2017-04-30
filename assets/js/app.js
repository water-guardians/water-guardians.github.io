  var layer1 = new ol.layer.Vector({
    title: "Patzcuaro's hidrolycal basin",
    source: new ol.source.Vector({
     url: '../../data/patzcuaro_a.json',
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
     url: '../../data/dam/World.json',
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

  var cloudsLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      url: "//map1{a-c}.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2013-06-16",
      layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
      format: "image/jpeg",
      matrixSet: "EPSG4326_250m",
      tileGrid: new ol.tilegrid.WMTS({
          origin: [-180, 90],
          resolutions: [
              0.5625,
              0.28125,
              0.140625,
              0.0703125,
              0.03515625,
              0.017578125,
              0.0087890625,
              0.00439453125,
              0.002197265625
          ],
          matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          tileSize: 512
        })
    })
  });

  var layers = {
    michoacan: layer3,
    clouds: cloudsLayer,
    patzcuaro: layer1,
    presas: layer2,
  };

  var mapLayers = [];

  mapLayers.push(new ol.layer.Tile({
    source: new ol.source.OSM()
  }));

  for (var prop in layers) {
    layers[prop].setVisible(false);
    mapLayers.push(layers[prop]);
  }

  // Map Initialization
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

  /*
    Event listener to show/hide the layers
  */
  $('.btn-layer').click(function(event) {
    var target = $(event.target);

    var layerId = target.data('layer');
    var layer = layers[layerId];
    var visibility = layer.getVisible();

    layer.setVisible(!visibility);

    $(event.target).toggleClass('btn-active');
  });

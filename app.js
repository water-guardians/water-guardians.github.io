  var layer1 = new ol.layer.Vector({
    title: 'Layer 1',
    source: new ol.source.Vector({
     url: 'morelia3.json',
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
    title: 'Layer 2',
    source: new ol.source.Vector({
     url: 'data2.json',
     format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
     image: new ol.style.Circle({
       radius: 10,
       fill: new ol.style.Fill({color: 'red'})
     })
    })
  });

  var layer3 = new ol.layer.Vector({
    title: 'Layer 3',
    source: new ol.source.Vector({
     url: 'regiones_michoacan.json',
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

  var layers = [
    layer1,
    layer2,
    layer3
  ];

  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      layers[0],
      layers[1],
      layers[2] 
    ],
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),
    view: new ol.View({
      center: ol.proj.fromLonLat([-101.18, 19.70]),
      zoom: 7 
    })
  });

  $('.btn-layer').click(function(event) {
    var layerIndex = $(event.target).data('layer');
    var layer = layers[layerIndex];
    var layerVisibility = layer.getVisible();

    layer.setVisible(!layerVisibility);

    var btnText = '';

    if(layerVisibility) {
      btnText = 'Mostrar '
    }
    else {
      btnText = 'Ocultar ';
    }

    btnText += layer.get('title');

    $(event.target).html(btnText);
    $(event.target).toggleClass('btn-active');
  });

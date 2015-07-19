var AGILE_MAP = { initLat: 28.4962, initLng: 77.536, initZoom: 7,
                  marker:{ icon: "http://google-maps-icons.googlecode.com/files/car.png"},
                  polyline: {
                    strokeColor: '#0B0B61',
                    strokeOpacity: 0.6,
                    strokeWeight: 3
                  }
                }

var DATA_INTERVAL_TIME = 60000 //60 seconds

//API_URLS
var BASE_URL = "http://localhost/connect_to_hub/data/";
var ALERTS_DATA_URL = BASE_URL +'alerts.json';
var DASHBOARD_DATA_URL = BASE_URL +'data.json';
var SINGLE_DEVICE_DATA_URL = BASE_URL +'singleDevice.json';
var SINGLE_DEVICE_HISTORY_DATA_URL = BASE_URL +'singleDeviceHistory.json';

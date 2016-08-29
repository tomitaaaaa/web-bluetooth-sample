var $btn_scan = document.getElementById('scan_device'),
    $console = document.getElementById('console');

$btn_scan.addEventListener('click', function(){
  navigator.bluetooth.requestDevice({
    filters:[{
      services: [
        'link_loss',
        'immediate_alert',
        'tx_power'
      ]
    }]
  })
    .then(device =>{
    return device.gatt.connect();
  })
    .then(server =>{
    return Promise.all([
      server.getPrimaryService('link_loss'),
      server.getPrimaryService('immediate_alert'),
      server.getPrimaryService('tx_power')
    ]);
  })
    .then(services =>{
    return Promise.all([
      services[0].getCharacteristic('alert_level'),
      services[1].getCharacteristic('alert_level'),
      services[2].getCharacteristic('tx_power_level')
    ]);
  })
    .then(characteristics =>{
  })
    .catch(error =>{
    console.log(error);
  });
});
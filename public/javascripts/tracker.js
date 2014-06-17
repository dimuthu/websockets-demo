jQuery(document).ready(function($) {
  var socket = io.connect('http://localhost:3000');

  var pointer = $('#pointer');
  var elem_instance_type = $('#instance_type');
  var instance_type = elem_instance_type.val();

  elem_instance_type.on('change', function(e){
    instance_type = $(this).val();
    bindSocketEvent(instance_type);
  });

  var lazyMouseTrack = _.debounce(sendMouseTrackingData, 5);

  function bindSocketEvent(instance_type){
    if(instance_type === 'tracker'){
      $(window).off('mousemove').on('mousemove', lazyMouseTrack);
      socket.off('write_coordianates');
      pointer.hide();
    }else{
      pointer.show();
      $(window).off('mousemove');
      socket.on('write_coordianates', function (data) {
        pointer.css('left', data.x);
        pointer.css('top', data.y);
      });
    }
  }

  function sendMouseTrackingData(event){
    var coordianates = { 'x': event.pageX, 'y': event.pageY };
    socket.emit('write_coordianates', coordianates);
  }

  bindSocketEvent(instance_type);

});

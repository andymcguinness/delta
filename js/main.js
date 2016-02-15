$(document).ready(function() {
  // Set up our opentip styles
  Opentip.styles.myTag = {
    extends: 'dark',
    ajax: false,
    showOn: 'mouseover',
    target: true,
    tipJoint: 'bottom',
    group: 'tags',
    background: '#8A817C',
    borderColor: '#8A817C'
  };

  // Set up our opentips
  $('.hover').each( function() {
    new Opentip( $(this), $(this).data('content'), { style: 'myTag' } );
  });
  $('.tooltip').each( function() {
    new Opentip( $(this), $(this).data('content'), { style: 'myTag' } );
  });
});

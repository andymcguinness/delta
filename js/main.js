$(document).ready(function() {

  // *** TOOLTIPS ***
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

  // *** MODALS ***
  // Modal styles
  $('.modal-trigger').on('click', function(e) {
    var modal = $(this).data('modal');

    e.preventDefault();

    $('#' + modal).fadeIn(300).addClass('active');
  });
  $('.modal__close').on('click', function(e) {
    e.preventDefault();

    $(this).parents('.modal').removeClass('active').fadeOut(300);
  });

  // *** FORMS ***
  $('.form--contact').on('submit', function(e) {
    var name = $(this).find('#name').val(),
        email = $(this).find('#_replyto').val(),
        subject = $(this).find('#_subject').val(),
        message = $(this).find('#message').val(),
        data = {
          name: name,
          _replyto: email,
          _subject: subject,
          message: message 
        },
        url = 'http://formspree.io/nxnrqzwx';

    e.preventDefault();

    $(this).parents('.modal__content').siblings('.modal__loading').fadeIn(300);

    $.ajax({
      url: url,
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(data) {
        if (data.success == 'email sent') {
          $('.modal__loading:visible').fadeOut(300).siblings('.modal__content').fadeOut(300).siblings('.modal__success').fadeIn(300);
        }
      },
      error: function (data) {
        $('.modal__loading:visible').fadeOut(300);
        console.log(data);
      }
    });
  });
});


$(function(){
  
  var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
  let last_message_id = $('.message:last').data("message-id");
  
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  
  .done(function(messages) {
    $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight}, 'fast'); 
    let insertHTML = '';
    messages.forEach(function (message) {
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
    })
  })
  .fail(function() {
    alert('error1');
  });
 };
}; 
setInterval(reloadMessages, 7000);
  
  function buildHTML(message){
    let image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    let html = `<div class=message data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}　
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div> `
    $('.messages').append(html);
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault()

  let formData = new FormData(this); 
  let url = $(this).attr('action')
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    buildHTML(data);
    $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
});


});

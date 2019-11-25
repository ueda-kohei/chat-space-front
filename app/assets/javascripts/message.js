$(function(){

  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    let html = `<div class=message>
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
    //console.log("ok")
    // console.logを用いてイベント発火しているか確認
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
    // $('.messages').append(html);
    $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
});
});

$(document).ready(function(){

  var windowHeight = $(window).height();

  /* Navigation */
  $('.nav li a').on('click', function(event){
    var link = $(event.target);
    var appName = $(link).attr('data-app');

    $('.nav li a').removeClass('active');
    $(link).addClass('active');

    $('.app').css('display', 'none');
    $('#' + appName).css('display', 'block');
  });

  /* Markdown Editor */
  (function() {
    var input = $('#md-editor .input');
    var output = $('#md-editor .output');

    input.height(windowHeight * .75);
    output.height(windowHeight * .75);

    input.on('keyup', function() {
      output.html(marked(input.val()));
    });
    input.trigger('keyup');
  })();

  /* JSON Tools */
  (function() {
    var ioTextarea = $('#json-tools textarea');
    var errorSpan = $('#json-tools .error');

    ioTextarea.height(windowHeight * .6);

    $('#json-tools .btn').on('click', function() {
      errorSpan.html('');
    });

    $('#json-tools .btn.make-pretty').on('click', function(){
      try {
        ioTextarea.val(
          JSON.stringify(
            JSON.parse(ioTextarea.val()),
            null,
            2
          )
        );
      }
      catch(exception) {
        errorSpan.html(exception.message);
      }
    });
    $('#json-tools .btn.minify').on('click', function(){
      try {
        ioTextarea.val(
          JSON.stringify(JSON.parse(
            JSON.minify(ioTextarea.val())
          ))
        );
      }
      catch(exception){
        msgSpan.html(exception.message);
      }
    });
  })();

  /* Regex Tools */
  (function(){
    var resultElement = $('#regex-tools .result');
    var inputElement = $('#regex-tools .input');
    var reElement = $('#regex-tools .regex');
    var flagElement = $('#regex-tools .flags');

    resultElement.height(windowHeight * .15);
    inputElement.height(windowHeight * .15);

    $('#regex-tools .run').on('keyup', function(event){
      var input = inputElement.val();
      var reTxt = reElement.val();
      var flagsTxt = flagElement.val();
      try {
        var re = new RegExp(reTxt, flagsTxt);
      }
      catch(err){
        return;
      }
      var result = re.exec(input);
      if(result != null){
        resultElement.val(result.toString());
      }
      else {
        resultElement.val('');
      }
    });
  })();

  /* Base64 Tools */
  (function(){
   var ioTextarea = $('#base64-tools textarea');
   var errorSpan = $('#base64-tools .error');

   ioTextarea.height(windowHeight * .6);

   $('#base64-tools .btn').on('click', function() {
     errorSpan.html('');
   });
   $('#base64-tools .btn.encode').on('click', function(){
     var input = ioTextarea.val();
     try {
       var output = Base64.encode(input);
       ioTextarea.val(output);
     }
     catch(exception) {
       errorSpan.html(exception.message);
     }
   });
   $('#base64-tools .btn.decode').on('click', function(){
     var input = ioTextarea.val();
     try {
       var output = Base64.decode(input);
       ioTextarea.val(output);
     }
     catch(exception) {
       errorSpan.html(exception.message);
     }
   });
  })();

});

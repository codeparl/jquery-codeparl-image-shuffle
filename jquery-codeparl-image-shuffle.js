
(function($){
    var namespace = "jquery-codeparl-image-shuffle";

    function shuffle(array) {
        var index = array.length,  randomIndex;
        // While there remain elements to shuffle...
        while (index !== 0 ) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * index);
          index--;
          // And swap it with the current element.
          [array[index], array[randomIndex]] = [
            array[randomIndex], array[index]];
        }
        return array;
      }

    function  shuffleImages($images){
        var images  = [];
        $images.each(function(){
           var src =  $(this).attr('src');
           images.push(src);
        });
     var shuffled =   shuffle(images);
     $images.each(function(e,i){
        $(this).closest('figure').hide();
      $(this).attr('src', shuffled[e]);
      $(this).closest('figure')
      .addClass('animated jackInTheBox')
      .show(function(){
          $(this).removeClass('jackInTheBox');
      });

    
     });
     
    }

    var methods  =  {
        init: function(options){

            options =  $.extend({}, $.fn.codeparlImageShuffle.settings, options) ; 


            var imagesPane  =  $("<div>");
            imagesPane
            .addClass('row justify-content-center p-5')
            .html(this.html())
            .find('figure')
            .addClass('col-md-4');

            this.html(imagesPane);

            var shuffleButton  =  $("<button>");
            shuffleButton
            .addClass('btn btn-lg btn-secondary')
            .text("Shuffle Images")
            .prependTo(this).on('click.'+namespace, function(){
               shuffleImages(imagesPane.find('img')) ;
            });


            return this;
        }
    };

    $.fn.codeparlImageShuffle =  function(options){

        if(methods[options]){
            return methods[options].apply(this,Array.prototype.slice.call(arguments,1));
        }else if($.type(options) == "object" || !options){
            return methods.init.apply(this, arguments);
        }else{
            $.error('The method ' + options + " does not exist on " + namespace);
        }

    };

    //define the settings 
    $.fn.codeparlImageShuffle.settings = {

    };


})(jQuery);
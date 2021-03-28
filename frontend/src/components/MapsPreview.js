'use straict';
(function(){
    var offsetHeight = $(window).height() - 300;
    var mapFooter = false;
    var urlMap = "https://goo.gl/maps/UcyiNGPTZdgyFUXD8";
    mapActivate();
    $(window).scroll(function(event) {
        offsetHeight = $(window).height() - 300;
        mapActivate ();
    });
    function mapActivate (){
        if(!mapFooter){
            if($(document).scrollTop() > offsetHeight){
                $("#map").append('<iframe src="'+ urlMap +'"style="width: 100%; height: 100%;" frameborder="0"></iframe>');
                mapFooter = true;
            }
        }
    }

    var mapTop = false;
    mapTopFunc();
    $(document).on('resize', function() {
        mapTopFunc();
    });
    function mapTopFunc(){
        $(".header-map").hover(function() {
            if(!mapTop){
                $(".map-header").append('<iframe src="'+ urlMap +'"style="width: 100%;height: 100%;z-index:300;" frameborder="0"></iframe>').addClass('active');
                mapTop = true;
            }else{
                $(".map-header").addClass('active');
            }
        }, function() {
            $(".map-header").removeClass('active');
        });
    }
}());


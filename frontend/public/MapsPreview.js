'use straict';
(function(){
    var offsetHeight = $(window).height() - 300;
    var mapFooter = false;
    var urlMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.7154452451973!2d30.893946815718397!3d50.353212579461974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4e8f5c13f8fd1%3A0x4e2d116d89bf77e4!2z0JHQvtGA0LjRgdC_0L7Qu9GMINCQ0Y3RgNC-0L_QvtGA0YI!5e0!3m2!1sru!2sua!4v1613862966830!5m2!1sru!2sua";
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


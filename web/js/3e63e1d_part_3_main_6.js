(function($) {
    $(document).ready(function() {
        var page = document.location.pathname.replace(/\//g,'');
        if (page === '') {
            page = 'home';
        }
        $('#navigation').find('li').each(function(index, element){
            if (element.id == 'nav_' + page) {
                $(element).attr('id','active');
            }
        });
    });
})(jQuery);

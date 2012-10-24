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
        $("#ask_form").submit(function(){
            var data = {
                name: $("#input-ask-name").val(),
                email: $("#input-ask-email").val(),
                question: $("#input-ask-question").val()
            };
            $.ajax({
                url: '/ask',
                type: 'POST',
                data: data,
                dataType: 'json',
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("error! ", jqXHR, textStatus, errorThrown);
                },
                success: function(data, textStatus, jqXHR) {
                    console.log("success! ", data, textStatus, jqXHR);
                    $("#ask_form").html('<div id="658244634280571966-msg" style="">Thank you. Your information has been submitted.</div>');
                }
            });
            return false;
        });
        $("#ask_submit").click(function(){
            $("#ask_form").submit();
        });
    });
})(jQuery);

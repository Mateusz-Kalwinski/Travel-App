$(function () {


    $(":mobile-pagecontainer").on("pagecontainerbeforetransition", function (event, ui) {
        $("#header").prependTo(ui.toPage);
        //$("#footer").appendTo(ui.toPage);
    });




    $(document).on("pagebeforeshow", "#adminpage", function () {


        $('#header-text').html('Admin ');
        $('#header-text').append('<a href="#notifications" class="ui-btn ui-btn-active ui-corner-all">12</a>');

    });


    $(document).on("pagebeforeshow", "#loginpage", function () {

        $('#header-text').html('Sign in');

    });


    $(document).on("pagebeforeshow", "#homepage", function () {

        $('#header-text').html('Objects list');

    });



    $(document).on('focus click', '#inset-autocomplete-input',  function(e){
       $('#citysearchresults').removeClass('ui-screen-hidden');
       $('#inset-autocomplete-input').val('');
    });


    $(document).on("click", "#citysearchresults li", function () {
        var text = $(this).text();
        $('#inset-autocomplete-input').val(text);
        $('#citysearchresults').addClass('ui-screen-hidden');
    });


});

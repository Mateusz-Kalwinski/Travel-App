$(function () {



    App.GetObjectsForMainPage();
    App.GetCities();


    $(":mobile-pagecontainer").on("pagecontainerbeforetransition", function (event, ui) {
        $("#header").prependTo(ui.toPage);
        //$("#footer").appendTo(ui.toPage);
    });



    if (App.IsLoggedIn())
    {
        $('#loginhref').html('Logout');
        $('#loginhref').attr('href','#');
        $('#loginhref').addClass('logout');


        App.NotificationInterval =  setInterval(App.GetNotifications, 3000);

    }
    else
    {
        $('#loginhref').html('Login');
        $('#loginhref').attr('href','#loginpage');
        $('#loginhref').removeClass('logout');
    }



    $(document).on('click','.logout',function(){

        localStorage.removeItem('loginData');
        $('#loginhref').html('Login');
        $('#loginhref').attr('href','#loginpage');
        $('#loginhref').removeClass('logout');
        clearInterval(App.NotificationInterval);

    });



    $('#submit-login').on('click', function () {

        var email = $("[name=email]").val();
        var password = $("[name=password]").val();

        App.Login(email,password);

    });




    $(document).on("pagebeforeshow", "#adminpage", function () {


        if (!App.IsLoggedIn())
        {
            $(':mobile-pagecontainer').pagecontainer('change', '#loginpage');

            $('#loginhref').html('Login');
            $('#loginhref').attr('href','#loginpage');
            $('#loginhref').removeClass('logout');

            return;
        }

        App.GetUserReservations();
        $('#header-text').html('Admin ');

        /* Lecture 68 */
        if(App.NotificationCount > 0)
        {
            $('#header-text').append('<a href="#notifications" class="ui-btn ui-btn-active ui-corner-all notification-count">'+App.NotificationCount+'</a>');
        }

    });


    $(document).on("pagebeforeshow", "#loginpage", function () {

        $('#header-text').html('Sign in');

    });


    $(document).on("pagebeforeshow", "#homepage", function () {

        App.GetObjectsForMainPage();
        App.GetCities();

        $('#header-text').html('Objects list');

    });



    $(document).on("pagebeforeshow", "#objectdetails", function () {

        App.GetObjectDetails(sessionStorage.getItem('object_id'));

    });




    $(document).on("pagebeforeshow", "#room", function () {

        App.GetRoomDetails(sessionStorage.getItem('room_id'));

    });



    $(document).on("click", "#adminhref", function () {

        if(App.NotificationCount > 0)
        {
            App.GetUserReservations();
            $('#header-text').html();
            $('#header-text').html('Admin ');
            $('#header-text').append('<a href="#notifications" class="ui-btn ui-btn-active ui-corner-all notification-count">'+App.NotificationCount+'</a>');
        }

    });



    $('#submit-search-rooms').on('click', function () {

        var city = $("[name=city]").val();
        var dayin = $("[name=checkin]").val();
        var dayout = $("[name=checkout]").val();
        var room_size = $("[name=room_size]").val();

        App.SearchRooms(city,dayin,dayout,room_size);

    });




    $('#submit-reservation').on('click', function () {

        if(!App.IsLoggedIn())
        {
            alert('You are not logged in!');
            return;
        }


        var day_in = $("[name=day_in]").val();
        var day_out = $("[name=day_out]").val();

        App.MakeReservation(day_in,day_out);

    });




    $(document).on('click','.confirmReservation',function(){

        App.ConfirmReservation($(this).attr('data-id'));

    });



    $(document).on('click','.deleteReservation',function(){

        App.DeleteReservation($(this).attr('data-id'));

    });


    $(document).on('click','.notification_data',function(){

        $(this).hide();
        App.NotificationCount--;
        $('.notification-count').html( App.NotificationCount );
        App.SetReadNotifications($(this).attr('data-id'));

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

var App = {


    BaseUrl:  'http://192.168.0.2/enjoythetrip-en.NETPROGS.PL/public/',
    ImageUrl:  '',
    NotificationInterval:  null,
    NotificationCount: 0,
    UserRole: null,


    Login: function(email,password) {

        Ajax.go('POST', 'login',{email: email, password: password},'SuccessLogin',null, 'CompleteLogin','ErrorLogin');

    },


    SuccessLogin: function(response) {

        App.UserRole = response.role.name;
        var loginData = {authToken: response.token, timestamp: Math.floor(Date.now() / 1000)};
        localStorage.setItem("loginData", JSON.stringify(loginData));

        $('#loginhref').html('Logout');
        $('#loginhref').attr('href','#');
        $('#loginhref').addClass('logout');

        App.NotificationInterval =  setInterval(App.GetNotifications, 3000);


    },


    ErrorLogin: function() {

        alert('Incorrect data or no internet connection');
    },


    CompleteLogin: function() {

        $(':mobile-pagecontainer').pagecontainer('change', '#adminpage');

    },


    IsLoggedIn: function() {

        var status = JSON.parse(localStorage.getItem("loginData"));

        if(status)
        {
            var now = Math.floor(Date.now() / 1000);
            if( (now - status.timestamp) > 3600) return false;
            else
                return true;
        }
        else
            return false;

    },


    GetAuthToken: function() {

        var token = JSON.parse(localStorage.getItem("loginData"));

        if(token)
            return token.authToken;
        else
            return false;

    },



    GetNotifications: function() {

        Ajax.go('GET','admin/getNotifications',null,'SuccessGetNotifications');

    },



    SuccessGetNotifications: function(response) {


        if(response.length > 0)
        {
            App.NotificationCount = response.length;
            $('#notifications ul').html('');
            $("#notifications ul").append( Html.Notifications(response) );
            App.Alert();
        }

    },



    Alert: function() {

        if(window.cordova)
            navigator.notification.beep(1);

    },



    GetUserReservations: function() {

        Ajax.go('GET','admin',null,'SuccessGetUserReservations');

    },



    SuccessGetUserReservations: function(response) {


        $('#user-reservations > ul').html('');

        $("#user-reservations > ul").append(Html.ObjectsWithReservations(response.objects));

        $("#user-reservations > ul").listview("refresh");


    },



    GetObjectsForMainPage: function() {

        Ajax.go('GET','',null,'SuccessGetObjectsForMainPage');

    },



    SuccessGetObjectsForMainPage: function(response) {

        $('#objectsForMainPage > ul').html('');

        $("#objectsForMainPage > ul").append( Html.ObjectsForMainPage(response.objects) );

        $("#objectsForMainPage > ul").listview("refresh");

    },



    GetObjectDetails: function(object_id) {

        Ajax.go('GET','object/'+object_id,null,'SuccessGetObjectDetails',null,'CompleteGetObjectDetails');

    },



    SuccessGetObjectDetails: function(response) {

        $('#objectdata').html('');
        $("#objectdata").append( Html.ObjectDetails(response.object) );

    },



    CompleteGetObjectDetails: function() {

        $("#objectdata ul").listview().listview("refresh");

    },



    GetRoomDetails: function(room_id) {

        Ajax.go('GET','room/'+room_id,null,'SuccessGetRoomDetails');

    },



    SuccessGetRoomDetails: function(response) {

        $('#roomdata > ul').html('');
        $("#roomdata > ul").append( Html.RoomDetails(response.room) );
        $("#roomdata > ul").listview("refresh");
    },



    GetCities: function() {

        Ajax.go('GET','cities',null,'SuccessGetCities');

    },



    SuccessGetCities: function(response) {

        $('#citysearchresults').html('');
        $("#citysearchresults").append( Html.CitiesForSearching(response) );
        $("#citysearchresults").listview("refresh");

    },



    SearchRooms: function(city,dayin,dayout,room_size) {

        Ajax.go('POST','roomsearch',{city:city,check_in:dayin,check_out:dayout,room_size:room_size},'SuccessSearchRooms',null,'CompleteSearchRooms');

    },



    SuccessSearchRooms: function(response) {

        $('#objectsForMainPage').html('');
        $("#objectsForMainPage").append( Html.SearchResults(response.city) );

    },



    CompleteSearchRooms: function() {

        $("#objectsForMainPage ul").listview().listview("refresh");

    },



    DeleteReservation: function(id) {

        Ajax.go('GET','admin/deleteReservation/'+id,null,null,null,'CompleteDeleteReservation');

    },



    CompleteDeleteReservation: function() {

        App.GetUserReservations();

    },



    ConfirmReservation: function(id) {

        Ajax.go('GET','admin/confirmReservation/'+id,null,null,null,'CompleteConfirmReservation');

    },




    CompleteConfirmReservation: function() {

        App.GetUserReservations();

    },



    SetReadNotifications: function(id) {

        Ajax.go('POST','admin/setReadNotifications',{id:id});


    },



    MakeReservation: function(day_in,day_out) {


        var room_id = sessionStorage.getItem('room_id');
        var city_id = sessionStorage.getItem('city_id');

        Ajax.go('POST','makeReservation/'+room_id+'/'+city_id,{checkin:day_in,checkout:day_out},'SuccessMakeReservation');

    },



    SuccessMakeReservation: function(response) {

        if(response.reservation === false)
            alert('Date taken. Try another one.');
        else
            alert('The reservation has been made.');

    }


};

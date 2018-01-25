function start() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '1002901312050-3g6hi8ipn5ipe7b5h691f8ldl2fncpl6.apps.googleusercontent.com',
            scope:'profile'
        });
    });
}
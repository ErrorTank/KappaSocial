window.fbAsyncInit = function() {
    FB.init({
        appId      : '1956967277904275',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
    });

    FB.AppEvents.logPageView();

};

(function(d, s, id){
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
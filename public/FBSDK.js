const FBdata = {
  email: String,
  FBId: String,
  name: String,
  FBImage: String
};

window.fbAsyncInit = () => {
  FB.init({
    appId: "1366604616846064",
    cookie: true,
    xfbml: true,
    version: "v4.0"
  });
  FB.AppEvents.logPageView()
};

((d, s, id) => {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s)
  js.id = id
  js.src = "https://connect.facebook.net/en_US/sdk.js"
  fjs.parentNode.insertBefore(js, fjs)
})(document, "script", "facebook-jssdk")


const checkLoginState = () => {

};






const ShareGamePage = () => {
  FB.ui({
      method: 'share',
      href: 'https://minnan0328.github.io/FBSDKTest/public/',
      hashtag: '#volvo',
  }, function (response) {
      console.l0g(response)
  })
}

var GameContent = null
const ShareGameContent = () => {
  FB.getLoginStatus((response) => {
    if (response.status === 'not_authorized' || response.status === 'unknown') {
        FB.login((response) => {
          console.l0g(response)
          response.status === 'connected' && getFBAPI()
        }, {
          scope: "public_profile,email",
          auth_type: "rerequest"
        })
    }
    if (response.status === 'connected') {
      getFBAPI()
    }
  })
}
const getFBAPI = () => {
  FB.api("/me", 'GET', {
    fields: "id,name,email,picture"
  }, (response) => {
      if (response) {
        FBdata.email = response.email
        FBdata.FBId = response.id
        FBdata.name = response.name
        Share()
      } else {
        console.log(response)
      }
    }
  )
}
const Share = () => {
  FB.ui({
      method: 'feed',
      display: 'iframe',
      link: 'https://minnan0328.github.io/FBSDKTest/public/',
      hashtag: '#volvo',
  }, function (response) {
      if (response && !response.error_message){
          console.log(response)
      }else{
          console.log(response.error)
      }
  });

}

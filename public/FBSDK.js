var FBData = {
  FacebookEmail: String,
  FacebookId: String,
  FacebookName: String
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


const ShareGamePage = () => {
  FB.ui({
      app_id: '1366604616846064',
      method: 'share',
      // display: 'iframe',
      href: 'https://minnan0328.github.io/FBSDKTest/public/',
      hashtag: '#volvo',
  }, function (response) {
      console.log(response)
  })
}

const ShareGameContent = () => {
  FB.getLoginStatus((response) => {
    if (response.status === 'not_authorized' || response.status === 'unknown') {
        FB.login((response) => {
          console.log(response)
          response.status === 'connected' && Share()
        }, {
          scope: "public_profile,email",
          auth_type: "rerequest"
        })
    // }
    // if (response.status === 'connected') {
    //   getFBAPI()
    }
  })
}
const getFBAPI = () => {
  FB.api("/me", 'GET', {
    fields: "id,name,email,picture"
  }, (response) => {
      if (response) {        
        FBData.FacebookEmail = response.email
        FBData.FacebookId = response.id
        FBData.FacebookName = response.name
        Share()
      } else {
        console.log(response)
      }
    }
  )
}
const Share = () => {
  FB.ui({
      app_id: '1366604616846064',
      method: 'share',
      // display: 'iframe',
      href: 'https://minnan0328.github.io/FBSDKTest/public/',
      hashtag: '#volvo',
  }, function (response) {
      if (response && !response.error_message){
        console.log(escape("成功"))
        console.log(escape("Jason Tsai"))
        let payload = {
          FacebookEmail:FBData.FacebookEmail,
          FacebookId: FBData.FacebookId,
          FacebookName: escape(FBData.FacebookName),
          result: "success"
        }
          gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
      }else{
        if (response.error_message){
          let payload = {
            FacebookEmail: null,
            FacebookId: null,
            FacebookName: null,
            result: "lose"
          }
          gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
        }
      }
  });

}


/*

    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta property="fb:app_id" content="1366604616846064" />
    <meta property="og:url" content="https://minnan0328.github.io/FBSDKTest/public/" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="volvo test description">
    <meta property="og:title" content="volvo test title">
    <meta property="og:image"
      content="https://exfast.me/wp-content/uploads/2019/04/1554182762-cddf42691119d44059a16a4095047a33-1140x600.jpg">
 */
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
    version: "v5.0",
    status: true
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

function getLoginStatus(type) {
  FB.getLoginStatus(function (response) {
    console.log(response)
    if (response.status === 'connected') {
      getFBAPI(type)
    } else {
      FB.login(function (response) {
        console.log(response);
        if (response.status === 'connected') {
          getFBAPI(type)
        }
      });

    }
  });
}

function getFBAPI(type) {
  FB.api("/me", 'GET', {
    fields: "id,name,email,picture"
  }, (response) => {
    if (response) {
      FBData.FacebookEmail = response.email
      FBData.FacebookId = response.id
      FBData.FacebookName = response.name
      switch (type) {
        case 'sendUserFBData':
          sendUserFBData()
          break
        case 'ShareGameContent':
          SendShareGameContent()
          break
      }
      console.log(FBData);
    } else {
      console.log(response)
    }
  })
}

function sendUserFBData() {
  getLoginStatus('sendUserFBData')
}

function ShareGameContent() {
  getLoginStatus('ShareGameContent')
}

function sendFBDataForUnity() {
  let payload = {
    FacebookEmail: FBData.FacebookEmail,
    FacebookId: FBData.FacebookId,
    FacebookName: escape(FBData.FacebookName),
    result: "success"
  };
  // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
}

function SendShareGameContent() {
  FB.ui({
    app_id: "1366604616846064",
    method: "share",
    display: "iframe",
    redirect_uri: 'https://minnan0328.github.io/FBSDKTest/public/',
    href: "https://minnan0328.github.io/Volvo-Game/",
    hashtag: "#volvo"
  }, function (response) {
    if (response && !response.error_message) {
      let payload = {
        FacebookEmail: FBData.FacebookEmail,
        FacebookId: FBData.FacebookId,
        FacebookName: escape(FBData.FacebookName),
        result: "success"
      };
      // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
      console.log('success', payload);
    } else {
      if (response.error_message) {
        let payload = {
          FacebookEmail: null,
          FacebookId: null,
          FacebookName: null,
          result: "lose"
        }
        // gameInstance.SendMessage(
        //   "Root",
        //   "FromHtml_obj",
        //   JSON.stringify(payload)
        // );
        console.log('error_message', payload);
      }
    }
  })
}
function ShareGameContentNoData() {
  FB.ui({
    app_id: "1366604616846064",
    method: "share",
    display: "iframe",
    redirect_uri: 'https://minnan0328.github.io/FBSDKTest/public/',
    href: "https://minnan0328.github.io/Volvo-Game/",
    hashtag: "#volvo"
  }, function (response) {

  })
}


function FBLogin(){
  FB.login(function (response) {
    console.log(response);
    if (response.status === 'connected') {
      getFBAPI(type)
    }
  });
}

function FBLogout() {
  FB.logout(function (response) {
    console.log(response)
  })
};

function clickShare() {
  FB.ui({
    app_id: '1366604616846064',
    method: 'share',
    display: 'iframe',
    redirect_uri: 'https://minnan0328.github.io/FBSDKTest/public/',
    href: 'https://minnan0328.github.io/Volvo-Game/',
    hashtag: '#volvo',
  }, function (response) {
    console.log(response)
  })
  console.log('JS:Share Game Page')
}
// const ShareGamePage = () => {
//   FB.ui({
//     app_id: '1366604616846064',
//     method: 'share',
//     display: 'iframe',
//     redirect_uri: 'https://minnan0328.github.io/Volvo-Game/',
//     href: 'https://minnan0328.github.io/Volvo-Game/',
//     hashtag: '#volvo',
//   }, function (response) {
//     console.log(response)
//   })
//   console.log('JS:Share Game Page')
// }
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
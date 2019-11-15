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
      switch (type) {
        case 'sendUserFBData':
          getFBAPI(type)
          // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
          break
        case 'ShareGameContent':
          SendShareGameContent(type)
          // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
          break
      }
    } else {
      FB.login(function (response) {
        console.log(response);
        if (response.status === 'connected') {
          switch (type) {
            case 'sendUserFBData':
              getFBAPI(type)
              break
            case 'ShareGameContent':
              SendShareGameContent(type)
              break
            default:
              return
          }
        }else{
          document.getElementById('State').innerText = '登入失敗'
        }
      });

    }
  });
}

function getFBAPI(type) {
  FB.api("/me", 'GET', {
    fields: "id,name,email,picture"
  }, (response) => {
    console.log(response, type)
    if (response) {
      // FBData.FacebookEmail = response.email
      // FBData.FacebookId = response.id
      // FBData.FacebookName = response.name
      switch (type) {
        case 'sendUserFBData':
          // let payload = {
          //   FacebookEmail: response.email,
          //   FacebookId: response.id,
          //   FacebookName: response.name,
          //   result: "success"
          // };
          document.getElementById('State').innerText = '登入成功'
          document.getElementById('DataState').innerText = '取得資料成功'
          document.getElementById('ShareState').innerText = null
          document.getElementById('FBId').innerText = response.id
          document.getElementById('FBName').innerText = response.name
          // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
          break
        case 'ShareGameContent':
          // let payload = {
          //   FacebookEmail: response.email,
          //   FacebookId: response.id,
          //   FacebookName: response.name,
          //   result: "success"
          // };
          console.log(response)
          document.getElementById('ShareState').innerText = '分享成功'
          document.getElementById('DataState').innerText = '取得資料成功'
          document.getElementById('FBId').innerText = response.id
          document.getElementById('FBName').innerText = response.name
          // gameInstance.SendMessage("Root", "FromHtml_obj", JSON.stringify(payload))
          break
      }
      console.log(FBData);
    } else {
      document.getElementById('DataState').innerText = '取得資料失敗'
      document.getElementById('FBId').innerText = response.id
      document.getElementById('FBName').innerText = response.name
    }
  })
}

function sendUserFBData() {
  getLoginStatus('sendUserFBData')
}

function ShareGameContent() {
  getLoginStatus('ShareGameContent')
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
    if (response.error_code === 4201) {
      document.getElementById('ShareState').innerText = '分享失敗'
      document.getElementById('State').innerText = null
      document.getElementById('FBId').innerText = null
      document.getElementById('DataState').innerText = null
      document.getElementById('FBName').innerText = null
    }else{
      document.getElementById('ShareState').innerText = '分享成功'
      getFBAPI('ShareGameContent')
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
    console.log(response)
    document.getElementById('ShareState').innerText = '分享成功'
    if (response.error_code === 4201){
      document.getElementById('ShareState').innerText = '分享失敗'
    }
  })
}


function FBLogin(){
  FB.login(function (response) {
    console.log(response);
    if (response.status === 'connected') {
      console.log(response)
      document.getElementById('State').innerText = `登入成功 ${response.status}`
      document.getElementById('FBId').innerText = response.authResponse.userID
      document.getElementById('ShareState').innerText = null
      document.getElementById('DataState').innerText = null
      document.getElementById('FBName').innerText = null
    }else{
      document.getElementById('State').innerText = `登入失敗 ${response.status}`
      document.getElementById('ShareState').innerText = null
      document.getElementById('DataState').innerText = null
      document.getElementById('FBId').innerText = null
      document.getElementById('FBName').innerText = null
    }
  });
}

function FBLogout() {
  FB.logout(function (response) {
    document.getElementById('State').innerText = `登出成功 ${response.status}`
    document.getElementById('ShareState').innerText = null
    document.getElementById('DataState').innerText = null
    document.getElementById('FBId').innerText = null
    document.getElementById('FBName').innerText = null
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
    document.getElementById('State').innerText = null
    document.getElementById('ShareState').innerText = '分享成功'
    document.getElementById('DataState').innerText = null
    document.getElementById('FBId').innerText = null
    document.getElementById('FBName').innerText = null
    if (response.error_code === 4201) {
      document.getElementById('State').innerText = null
      document.getElementById('ShareState').innerText = '分享失敗'
      document.getElementById('DataState').innerText = null
      document.getElementById('FBId').innerText = null
      document.getElementById('FBName').innerText = null
    }
  })
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
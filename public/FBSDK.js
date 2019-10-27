const FBdata = {
  email: String,
  FBId: String,
  name: String,
  FBImage: String
};

window.fbAsyncInit = () => {
  FB.init({
    appId: "727493857721260",
    cookie: true,
    xfbml: true,
    version: "v2.8"
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
  FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        getFBAPI()
      }
      if (response.status === 'unknown'){
          login()
      }
  })
};


const login = () => {
  FB.login((response) => {
      console.log(response)
      response.status === 'connected' && getFBAPI()
      response.status === 'not_authorized' && console.log(response.status)
    },
    {
        scope: "public_profile,email",
        auth_type: "rerequest"
    })
};

const getFBAPI = (authResponse) => {
  FB.api("/me", 'GET', {
      fields: "id,name,email,picture"
    },(response) => {
      FBdata.email = response.email
      FBdata.FBId = response.id
      FBdata.name = response.name
      FBdata.FBImage = response.picture.data.url
      console.log(FBdata)
      console.log(response)
      Share()
    }
  )
};

const ShareGamePage = () => {
FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
        object: 'https://www.mxp.tw/5347/',
    })
}, function (response) {
    console.log('遊戲頁面分享', response)
});
}

var GameContent = null
///未完成分享內容****************************
const ShareGameContent = (item) => {
    GameContent = item
    checkLoginState()
}
const Share = (item) => {
    FB.ui({
        app_id: '727493857721260',
        // display: 'iframe',
        method: 'feed',
        link: 'http://psquare.io/volvo/volvo_asm/index.html',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Goat_01.jpg/270px-Goat_01.jpg',
        name: 'A Title for Feed Dialog!',
        caption: 'Some Caption for the URL',
        description: 'A description for the URL which is to be displayed'
    }, function (response) {
        console.log('遊戲頁面內容', response)
    });
}
const logout = () => {
  FB.logout((response) => {
    console.log(response)
  })
};

// import axios from 'axios'
const FBdata = {
  email: String,
  FBId: String,
  name: String,
  FBImage: String
};

window.fbAsyncInit = () => {
  FB.init({
    appId: "419957605369378",
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
  FB.getLoginStatus((response) => {
      console.log(response.status)
      if (response.status === 'not_authorized') {
        login()
      }
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
    response.status === 'connected' && getFBAPI()
    },{
        scope: "public_profile,email",
        auth_type: "rerequest"
    })
};

const getFBAPI = () => {
  FB.api("/me", 'GET', {
      fields: "id,name,email,picture"
    },(response) => {
        console.log(response)
        if (response){
            FBdata.email = response.email
            FBdata.FBId = response.id
            FBdata.name = response.name
          //   FBdata.FBImage = response.picture.data.url
            document.getElementById('message').innerHTML = '登入成功'
            document.getElementById('FBId').innerText = response.id
            document.getElementById('name').innerText = response.name
            document.getElementById('email').innerText = response.email
            console.log(FBdata)
            console.log(response)
            Share()
        }else{
            document.getElementById('message').innerHTML = '登入失敗'
        }
    }
  )
};

const ShareGamePage = () => {
FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
        object: 'https://minnan0328.github.io/FBSDKTest/public/',
    })
}, function (response) {
    console.log('遊戲頁面分享', response)
});
}

var GameContent = null
const ShareGameContent = (item) => {
    GameContent = item
    checkLoginState()
}
const Share = (item) => {
    FB.ui({
        method: 'feed',
        display: 'iframe',
        link: 'https://minnan0328.github.io/FBSDKTest/public/',
        picture: 'https://vignette.wikia.nocookie.net/pttpedia/images/7/70/%E6%AD%A3%E8%A6%96%E5%9C%96.jpg/revision/latest?cb=20180705155039&path-prefix=zh',
        caption: 'Some Caption for the URL',
        title: 'volvo_asm',
        description: 'A description for the URL which is to be displayed',
        message: 'volvo',
        hashtag: '#volvo,#volvo',
        obile_iframe:true
    }, function (response) {
        if (response && !response.error_message){
            console.log(response)
        }else{
            console.log(response.error)
        }
    });
}

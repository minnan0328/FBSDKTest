// import axios from 'axios'
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
let mataimg = 'https://exfast.me/wp-content/uploads/2019/04/1554182762-cddf42691119d44059a16a4095047a33-1140x600.jpg'
const checkLoginState = () => {
  FB.getLoginStatus((response) => {
      console.log(response.status)
          var metaList = document.getElementsByTagName("meta");
          for (var i = 0; i < metaList.length; i++) {
              if (metaList[i].getAttribute("property") == "og:image") {
                  metaList[i].content = "https://exfast.me/wp-content/uploads/2019/04/1554182762-cddf42691119d44059a16a4095047a33-1140x600.jpg";
                  console.log(metaList[i].content)
              }
          }
          console.log(metaList)
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
    var metaList = document.getElementsByTagName("meta");
    for (var i = 0; i < metaList.length; i++) {
        if (metaList[i].getAttribute("property") == "og:image") {
            if (metaList[i].content === mataimg) {
                FB.ui({
                    method: 'feed',
                    display: 'iframe',
                    link: 'https://minnan0328.github.io/FBSDKTest/public/',
                    caption: 'eeeeeeeeeeeee',
                    // picture: 'https://exfast.me/wp-content/uploads/2019/04/1554182762-cddf42691119d44059a16a4095047a33-1140x600.jpg',
                    // title: 'aaaaaaaa',
                    // description: 'ssssssssssss',
                    // message: 'volvo',
                    hashtag: '#volvo,#volvo',
                    // obile_iframe: true
                }, function (response) {
                    if (response && !response.error_message){
                        console.log(response)
                    }else{
                        console.log(response.error)
                    }
                });
            }
        }
    }
}

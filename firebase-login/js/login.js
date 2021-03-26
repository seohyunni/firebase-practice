var firebaseEmailAuth;

  var firebaseConfig = {
    apiKey: "your api key",
    authDomain: "your auth domain.firebaseapp.com",
    databaseURL: "https://your database url.firebaseio.com",
    projectId: "your project id",
    storageBucket: "your storage bucket.appspot.com",
    messagingSenderId: "your messaging sender id",
    appId: "your app id",
    measurementId: "your measurement id"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

firebaseEmailAuth = firebase.auth();


//login
$(document).ready(function(){
  $(document).on('click','.login-btn',function(){
      var email = $('#email').val();
      var password = $('#pwd').val();
    
      firebaseEmailAuth.signInWithEmailAndPassword(email, password)
          .then(function(firebaseUser) {
            // loginSuccess(firebaseUser);
            // alert("로그인 성공");
            getToken();
          }).catch(function(error) {
            console.log(error.message)
            alert("아이디 또는 비밀번호를 확인해 주세요.");
      });
  });
});

$(document).ready(function(){
  $(document).on('click','#logoutmenu',function(){      
      firebaseEmailAuth.signOut().then(function() {
          window.location.href = "index.html"
          alert("로그아웃 성공");
          }).catch(function(error) {
          if(error){
             console.log(error.message)
             alert("로그아웃 실패");
          }
      });
  });
});

function getToken(){
  firebase.auth().currentUser.getIdToken(true)
    .then(function(idToken){
      alert("user id token : "+idToken);
    }).catch(function(error){
      console.log(error.message)
    })
}

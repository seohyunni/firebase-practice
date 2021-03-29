var firebaseConfig = {
    apiKey: "your API KEY",
    authDomain: "your authDomain",
    databaseURL: "your databaseURL",
    projectId: "your project Id",
    storageBucket: "your storageBucket",
    messagingSenderId: "your messgaingSenderId",
    appId: "your appId",
    measurementId: "your measurementId"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const msgScreen = document.getElementById("messages"); //the <ul> that displays all the <li> msgs
  const msgForm = document.getElementById("messageForm"); //the input form
  const msgInput = document.getElementById("msg-input"); //the input element to write messages
  const msgBtn = document.getElementById("msg-btn"); //the Send button

  const db = firebase.database();
  const msgRef = db.ref("/msgs");

  let name="";
  function init(){
      name = prompt("채팅을 보낼 때 표시될 이름을 입력하세요.");
      msgRef.on('child_added',updateMsgs);
  }

  msgForm.addEventListener('submit',sendMessage);

  function sendMessage(e){
      e.preventDefault();
      const text = msgInput.value;

      if(!text.trim()){ //채팅창에 입력한 내용 없을 때
          return alert("채팅을 입력해 주세요.");
      }

      const msg = {
          name: name,
          text: text,
      };

      msgRef.push(msg);
      msgInput.value = "";
  }

  const updateMsgs = data =>{
      const {name, text} = data.val() // get name, text
        console.log("updateMsgs")
      const msg = `<li class="${name == name ? "msg my": "msg"}"><span class = "msg-span">
      <i class = "name">${name}: </i>${text}
      </span>
    </li>`
      //채팅 입력 시 화면에 보이게 하는 역할, 추후 타인과 상호 채팅 기능 추가 예정

      msgScreen.innerHTML += msg;

      //auto scroll to bottom
      document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
  }


  document.addEventListener('DOMContentLoaded',init);
  //DOMContentLoaded : HTML 페이지가 렌더링 되는 즉시 init 함수 실행

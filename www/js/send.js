// This is a JavaScript file

$(function(){
     $('#send').click(function(){     //変換ボタンをクリックで発生
    
          $.ajax({ //ajaxによる非同期通信発生
               type: "POST", //POST送信でデータを受け渡す
               url: "http://ajis-shikoku.co.jp/test/send.php", //send.phpにデータを送る
               data: {rosta:$('#rosta').val(), pass:$('#pass').val()}, //id:seirekiに入力された文字列     
               success: function(hoge) //接続が成功
                    {
                       
    				 //データ取得
						if(hoge==1) {
						
						target = document.getElementById("output");
            　　　　　　target.innerHTML = "再度入力してください。";
						alert("パスワードが間違っています。");

						
						}else{
						
				
						target = document.getElementById("output");
            　　　　　　target.innerHTML = hoge;　　　　　　　　　　　　
						
						}
						
                    },         
               error: function(XMLHttpRequest,textStatus,errorThrown) //接続が失敗
                    {
                         alert('エラーです！'); //エラーを表示
                    }
          });
          return false;    
     });
     
          $('#sendlogin').click(function(){     //変換ボタンをクリックで発生

    					alert("パスワードが間違っています。");

     });
});

function sendlogin() {    //変換ボタンをクリックで発生
    
          $.ajax({ //ajaxによる非同期通信発生
               type: "POST", //POST送信でデータを受け渡す
               url: "http://ajis-shikoku.co.jp/test/send.php", //send.phpにデータを送る
               data: {rosta:$('#rosta').val(), pass:$('#pass').val()}, //id:seirekiに入力された文字列     
               success: function(hoge) //接続が成功
                    {
                       
                	 //データ取得
						if(hoge==1) {
						
						target = document.getElementById("output");
            　　　    　　　target.innerHTML = "再度入力してください。";
						alert("パスワードが間違っています。");

						
						}else{
						
				
						target = document.getElementById("output");
            　　　　    　　target.innerHTML = hoge;　　　　　　　　　　　　
						alert("ログイン成功");
						}
						
                    },         
               error: function(XMLHttpRequest,textStatus,errorThrown) //接続が失敗
                    {
                         alert('エラーです！'); //エラーを表示
                    }
          });
          return false;    
     };


function send() {    //変換ボタンをクリックで発生
    
          $.ajax({ //ajaxによる非同期通信発生
               type: "POST", //POST送信でデータを受け渡す
               url: "http://ajis-shikoku.co.jp/test/send.php", //send.phpにデータを送る
               data: {rosta:$('#rosta').val(), pass:$('#pass').val()}, //id:seirekiに入力された文字列     
               success: function(hoge) //接続が成功
                    {
                       
            		 //データ取得
						if(hoge==1) {
						
						target = document.getElementById("output");
            　　　　　　target.innerHTML = "再度入力してください。";
						alert("パスワードが間違っています。");

						
						}else{
						
				
						target = document.getElementById("output");
            　　　　　　target.innerHTML = hoge;　　　　　　　　　　　　
						
						}
						
                    },         
               error: function(XMLHttpRequest,textStatus,errorThrown) //接続が失敗
                    {
                         alert('エラーです！'); //エラーを表示
                    }
          });
          return false;    
     };


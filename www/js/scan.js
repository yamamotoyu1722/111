// This is a JavaScript file


  var db;
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
  var jan = [];
  var bumon = [];

  if (indexedDB) {
    // データベースを削除したい場合はコメントを外します。
    //indexedDB.deleteDatabase("mydb");
    var openRequest = indexedDB.open("mydb", 1.0);
     
    openRequest.onupgradeneeded = function(event) {
      // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
      db = event.target.result;
      var store = db.createObjectStore("mystore", { keyPath: "mykey", autoIncrement: true});
      
    }
    
    				     
     /////画面オープン時動作
				    openRequest.onsuccess = function(event) {
				          db = event.target.result;
						 
				////////////////実行結果表示画面////////////////////////////////////////////////////////////////////		  
						    var result = document.getElementById("result");
						    result.innerHTML = "";
						     
						    var transaction = db.transaction(["mystore"], "readwrite");
						    var store = transaction.objectStore("mystore");
						    var request = store.count();
						     
						    request.onsuccess = function (event) {
						      result.innerHTML = event.target.result + "件" + "<br/>";
				
						    }
						     
						    var transaction = db.transaction(["mystore"], "readwrite");
						    var store = transaction.objectStore("mystore");
						    var request = store.openCursor();

						     
						    request.onsuccess = function (event) {
						     
						      if(event.target.result == null) {
						        return;
						      }
				
						      var cursor = event.target.result;
							  

						      var data = cursor.value;
							  

						          result.innerHTML += "【ID："  + cursor.key +  "  】【</td><td>JAN：" + data.myvalue  + " </td><td> 】【部門：" + data.bumon  + "</td><td> 】【時間：" +  data.time  + "】<br>";
								　jan.push(data.myvalue);
								  bumon.push(data.bumon);
								  if(jan == null){
								  }else{								  
								  botan.innerHTML = "<br><form method='post' action='sql.php' name='form1' onSubmit='return check()'><input type = 'hidden' name ='jan' value = "+jan+"><input type = 'hidden' name ='bumon' value = "+bumon+"><input name='Submit1' style='height: 50px; width: 250px' type='submit' value='結果送信'></form>";
		                          }
								              
						      cursor.continue();
								
                 
						    }
							  
							  //テキストボックスクリア
							 // document.getElementById("newvalue").value = "";
							  document.getElementById("newbumon").value ="";
							  //コード入力枠にフォーカス
			 　　　　　　　　 document.getElementById("newvalue").select();
　　　　　　///////////////////////////////////////////////////////////////////////////////////////////////////

				        }
  } else {
    window.alert("このブラウザではIndexed DataBase API は使えません。");
  }
  

//////////////登録///////////////////////////////////
  function setValue(event) {
  //コードがあるか確認
  if (document.getElementById("newvalue").value == ""){
   window.alert("コードを入力してください");
    //コード入力枠にフォーカス
	document.getElementById("newvalue").select();
   return;
  }
    //部門があるか確認
  if (document.getElementById("newbumon").value == ""){
   window.alert("部門を入力してください");
    //部門入力枠にフォーカス
	document.getElementById("newbumon").foucas();
   return;
  }	
	
	//データを挿入
    var value = document.getElementById("newvalue").value;
	var bumon = Number(document.getElementById("newbumon").value);
	
	//今日の日付データを変数hidukeに格納
	var hiduke=new Date(); 
	//年・月を取得する
	var year = hiduke.getFullYear();
	var month = hiduke.getMonth()+1;
	var day = hiduke.getDate();
	//時・分・秒を取得する
	var hour = hiduke.getHours();
	var minute = hiduke.getMinutes();
	var second = hiduke.getSeconds();
	var time = (year+"年"+month+"月"+day+"日"+ hour+"時"+minute+"分"+second+"秒");
 
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
	
    
    var request = store.put({ myvalue: value,  bumon: bumon, time: time,});
	
	jan = [];
    bumon = [];
	
	var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.count();
     
	 
    request.onsuccess = function (event) {

      result.innerHTML = event.target.result + "件" + "<br/>";
	  document.getElementById("newbumon").value ="";
      document.getElementById("newvalue").value = "";
    }
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.openCursor();
     

    request.onsuccess = function (event) {
     
      if(event.target.result == null) {
        return;
      }
       
      var cursor = event.target.result;
	  
          var data = cursor.value;
						          result.innerHTML += "【ID："  + cursor.key +  "  】【</td><td>JAN：" + data.myvalue  + " </td><td> 】【部門：" + data.bumon  + "</td><td> 】【時間：" +  data.time  + "】<br>";
								  jan.push(data.myvalue);
                                  bumon.push(data.bumon);
								  if(jan == null){
								  }else{								  
								  botan.innerHTML = "<br><form method='post' action='sql.php' name='form1' onSubmit='return check()'><input type = 'hidden' name ='jan' value = "+jan+"><input type = 'hidden' name ='bumon' value = "+bumon+"><input name='Submit1' style='height: 50px; width: 250px' type='submit' value='結果送信'></form>";
		                          }


      cursor.continue();
	  
    }
                              //テキストボックスクリア
							  document.getElementById("newvalue").value = "";
							  document.getElementById("newbumon").value ="";
							  //コード入力枠にフォーカス
			 　　　　　　　　 document.getElementById("newvalue").select();
							  


  }
   
   

   

//////////////////削除//////////////////////////////////////////////////////////////
  function deleteValue(event) {
  
    if (document.getElementById("deletekey").value == ""){
   window.alert("削除IDを入力してください");
    //コード入力枠にフォーカス
	document.getElementById("deletekey").select();
   return;
  }
  
    var key = Number(document.getElementById("deletekey").value);
    var result = document.getElementById("result");
     
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");

    var request = store.delete(key);
	
   
    request.onsuccess = function (event) {
    result.innerHTML = "ID：" + key + "　を削除しました。<br/>";
  
    }
	
	jan = [];
    bumon = [];
	
	var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.count();
     
	 
    request.onsuccess = function (event) {

      result.innerHTML = event.target.result + "件" + "<br/>";
	  document.getElementById("newbumon").value ="";
      document.getElementById("newvalue").value = "";
    }
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.openCursor();
     

    request.onsuccess = function (event) {
     
      if(event.target.result == null) {
        return;
      }
       
      var cursor = event.target.result;
	  
          var data = cursor.value;
						          result.innerHTML += "【ID："  + cursor.key +  "  】【</td><td>JAN：" + data.myvalue  + " </td><td> 】【部門：" + data.bumon  + "</td><td> 】【時間：" +  data.time  + "】<br>";
								  jan.push(data.myvalue);
                                  bumon.push(data.bumon);
								  if(jan == null){
								  }else{								  
								  botan.innerHTML = "<br><form method='post' action='http://ajis-shikoku.co.jp/MDS/sql.php' name='form1' onSubmit='return check()'><input type = 'hidden' name ='jan' value = "+jan+"><input type = 'hidden' name ='bumon' value = "+bumon+"><input name='Submit1' style='height: 50px; width: 250px' type='submit' value='結果送信'></form>";
		                          }

      cursor.continue();
	  
    }
                              //テキストボックスクリア
							  document.getElementById("newvalue").value = "";
							  document.getElementById("newbumon").value ="";
							  document.getElementById("deletekey").value ="";
							  //コード入力枠にフォーカス
			 　　　　　　　　 document.getElementById("newvalue").select();
							 
  }
  
//////////全件削除////////////////////////////////////////////////////
  function deleteAll(event) {
            
			 myRet = confirm("全てのデータを削除します。よろしいですか？");
   　　　　  if ( myRet == true ){
			 
    　　     　　　　		  myRet2 = confirm("本当によろしいですか？");
   　　　　                   if ( myRet2 == true ){
		    
										    var result = document.getElementById("result");
										    result.innerHTML = "";
										     
										    var transaction = db.transaction(["mystore"], "readwrite");
										    var store = transaction.objectStore("mystore");
										    var request = store.clear();
										     
										    request.onsuccess = function (event) {
										      result.innerHTML = "クリアしました。";
											  
												    var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
												     // データベースを削除したい場合はコメントを外します。
												    indexedDB.deleteDatabase("mydb");
													//リフレッシュ
													setTimeout("location.reload()",1000*2);
						　　　　 　　　　　　　　　 }
								 }else{
       　　　　  　　　　　　　　alert("全削除を取りやめました"); 
								 }
	　　　　　　　　　 }else{
       　　　　  alert("全削除を取りやめました");
    　　　　　 }
  }


///////////////////バーコード判定//////////////////////////////////////////////////////////////////////
function cd_check() {
			//コード取得
			s = document.getElementById("newvalue").value;
			
			if (s == "") return;
			
			//短縮タイプの場合
			if (s.length == 8) s = "00000" + s;
			else if (s.length == 7) s = "00000" + s;
			else if (s.length == 12) s = "0" + s;
		
			//処理分岐
			if (s.length == 13) set = 1;
			else if (s.length == 12) set = 2;
			else set = 0;
			
			if (set > 0) {
						//C/D取得
						cd = s.substr(s.length-1,1);
						//初期値
						m = 0;
						t1 = 0;
						t2 = 0;
						//桁毎の加算処理
						for (i=0;i<12;i++) {
							if (m == 0) {
								//奇数桁６つを加算
								t1 = t1 + parseInt(s.substr(i,1));
								m = 1;
							} else {
								//偶数桁６つを加算
								t2 = t2 + parseInt(s.substr(i,1));
								m = 0;
							}
						}
						//奇数桁と偶数桁の３倍値を加算
						m = t1 + t2 * 3;
						//mを文字列化
						s = "" + m;
						//加算値の１桁目を10から引く
						m = 10 - parseInt(s.substr(s.length-1,1));
						if (m == 10) {m = 0;}
						
						//表示
						if (set == 1) {
							if (cd == m){ 
							document.form1.newbumon.focus();
							}else{ alert("入力されたコードが正しくありません。再度入力してください。");
							document.getElementById("newvalue").select();
							}
						} else {
							alert("入力されたコードが正しくありません。再度入力してください。");
							document.getElementById("newvalue").select();		
						}
		
			} else {
				//表示
				alert("コードの桁数が正しくありません。再度入力してください。");
				document.getElementById("newvalue").select();	}
		}


///////////結果送信確認ダイアログ///////////////////////////////////////////////////
function check(){
<!-- 

var isOnline = navigator.onLine;

if (navigator.onLine === true) {

			if(window.confirm('サーバーに送信してよろしいですか？')){ 
		
				return true; // 「OK」時は送信を実行
		
			}
			else{ // 「キャンセル」時の処理
		
				window.alert('キャンセルされました'); 
				return false; // 送信を中止
		
			}

} else if (navigator.onLine === false) {
  alert("電波の状態が悪いです。電波の良い所に移動してください。");
  return false; // 送信を中止
} else {
  alert("電波の状態が悪いです。電波の良い所に移動してください");
  return false; // 送信を中止
}




 };
 


        function scanBarcode() {
            window.plugins.barcodeScanner.scan( function(result) {
                    alert("読み取ったバーコード\n" +
                              "コード: " + result.text + "\n" +
                              "タイプ: " + result.format + "\n" +
                              "Cancelled: " + result.cancelled);
                              
                              document.getElementById("newvalue").textContent=result.text;
                }, function(error) {
                    alert("Scanning failed: " + error);
                }
            );

        };

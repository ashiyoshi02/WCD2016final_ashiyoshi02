//GK5300 石井好香

window.onload=load_songle; //画像読み込み完了時のイベントハンドラ設定
window.onSongleWidgetReady=ready; //songleWidgetの準備ができた際のイベントハンドラ設定
function load_songle(){ //load_songleのイベントハンドラ
  var songleWidgetElement= //SongleWidget要素を作成
    SongleWidgetAPI.createSongleWidgetElement({ //SongleWidget要素を
      api:"songle-widget-api-example", //API属性に任意の文字列を設定
      url:"www.youtube.com/watch?v=5IOVkstxkdE"}); //楽曲のURL
  document.body.appendChild(songleWidgetElement); //作成したSongleWidget要素をbodyタグ内に追加
} //画像読み込み完了時のイベントハンドラおわり

function ready(apiKey,songleWidget){ //ready時のイベントハンドラ
  console.log("Songle widget is ready."); //コンソールに表示
  songleWidget.on("chordPlay",function(event){ //コード変更時のイベント
    console.log(event.chord.name); //コード名を出力
      if(event.chord.name==="G"){//Gコード時のif
        draw_cg();//draw_cgの内容が発生
      }; //ifおわり
  songleWidget.play(); //再生開始
  });//コード変更のイベントハンドラおわり
  songleWidget.on("beatPlay",function(event){ //ビート変更時のイベント
    //ここから拍が打たれた際の動作を記述
    if(event.beat.position===1){ //1拍目の動作
      console.log("1st beat"); //コンソールに表示
    }else if (event.beat.position===2) { //2拍目の動作
      console.log("2nd beat"); //コンソールに表示
      document.body.className="cyan"; //bodyタグのclassをcyanに変更
    }else if (event.beat.position===3) { //3拍目の動作
      console.log("3rd beat"); //コンソールに表示
    }else if (event.beat.position===4) { //4拍目の動作
      console.log("4th beat"); //コンソールに表示
      document.body.className="lime"; //bodyタグのclassをlimeに戻す
    } //else ifおわり
  }); //ビート変更のイベントおわり
  songleWidget.on("chorusEnter",function(){ //サビに入った際のイベント
    console.log("chorus now"); //コンソールに表示
    changeUpdataColor(); //changeUpdataColorの内容が発生
  }); //イベントおわり
  songleWidget.on("chorusLeave",function(){ //サビが終わった際のイベント
    console.log("chorus done"); //コンソールに表示
    changeUpdataColor(); //changeUpdataColorの内容が発生
  }); //イベントおわり
} //readyのイベントハンドラおわり

// window.onload=draw_cg; //draw_cgのイベントハンドラ設定
function draw_cg(){ //draw_cg(関数)のイベントハンドラ
  var scene=new THREE.Scene(); //シーン作成
var fov=80; //画角比
var aspect = window.innerWidth / window.innerHeight; //画面のアスペクト比
var near=10; //カメラが捉える範囲(近方)
var far = 500; //カメラが捉える範囲(遠方)
var camera=new THREE.PerspectiveCamera(fov,aspect,near,far); //カメラ設定
camera.position.set(0,0,30); //カメラの配置位置
console.log(camera); //カメラ名の出力

var cubeGeometry=new THREE.CubeGeometry(3,3,3); //立方体のサイズ設定
var cubeMaterial=new THREE.MeshPhongMaterial({color:0xFFFFFF}); //立方体の色設定
var cube=new THREE.Mesh(cubeGeometry,cubeMaterial); //メッシュキューブの作成
cube.position.set(0,0,20); //球体の座標設定
cube.rotation.set(Math.PI/6,Math.PI/6,0); //立方体の回転
scene.add(cube); //シーンに立方体を追加

var cubeGeometry=new THREE.CubeGeometry(3,3,3); //立方体のサイズ設定
var cubeMaterial=new THREE.MeshPhongMaterial({color:0xFFFFFF}); //立方体の色設定
var cube=new THREE.Mesh(cubeGeometry,cubeMaterial); //メッシュキューブの作成
cube.position.set(0,0,-20); //立方体の座標設定
cube.rotation.set(Math.PI/-6,Math.PI/-6,0); //立方体の回転
scene.add(cube); //シーンに立方体を追加

var CylinderGeometry=new THREE.CylinderGeometry(5,5,10,100); //筒のサイズ設定
var CylinderMaterial=new THREE.MeshPhongMaterial({color:0xFFFFFF}); //筒の色設定
var Cylinder=new THREE.Mesh(CylinderGeometry,CylinderMaterial); //メッシュの作成
Cylinder.position.set(0,0,0); //筒の座標設定
scene.add(Cylinder); //シーンに筒を追加

var light=new THREE.DirectionalLight(0xda70d6); //ライトの設定
light.position.set(0,30,30); //ライトの位置設定
scene.add(light); //シーンにライトを追加


var axes=new THREE.AxisHelper(10); //長さ10の軸を作成
scene.add(axes); //軸をシーンに追加

var renderer=new THREE.WebGLRenderer(); //レンダラーの作成
renderer.setClearColor(new THREE.Color(0xFFFFFF)); //背景色の設定
renderer.setSize(window.innerWidth,window.innerHeight); //サイズ設定
document.body.appendChild(renderer.domElement); //レンダラーのDOM要素をbodyタグ内の子要素として追加
renderer.render(scene,camera); //シーンのレンダリング

var trckblCtrls=new THREE.TrackballControls(camera); //シーンを作成
trckblCtrls.rotateSpeed=1.0; //回転スピードを設定
trckblCtrls.zoomSpeed=1.0; //ズーム速度の設定
trckblCtrls.panSpeed=1.0; //移動速度の設定
var clock=new THREE.Clock(); //時計を作成

function animate(){ //animateのイベントハンドラ
  cube.rotation.y=cube.rotation.y + Math.PI/180; //時間の取得

var delta=clock.getDelta(); //作成、取得する
trckblCtrls.update(delta); //カメラの差分を更新

  renderer.render(scene,camera); //シーンのレンダリングをする
  requestAnimationFrame(animate); //animate関数の実行

} //animateのイベントハンドラおわり
animate(); //animateの内容
function changeUpdataColor(){ //色変更のイベントハンドラ
  var cubeMaterial=new THREE.MeshPhongMaterial({color:0xadff2f}); //立方体の色の変更
} //色変更のイベントハンドラおわり
} //draw_cg(関数)のイベントハンドラおわり

var scene = new THREE.Scene();
var camera;
var video = document.createElement("video");
var videoUrl = "";
var controls;
var renderer = new THREE.WebGLRenderer();

video.muted = true;
video.setAttribute("webkit-playsinline", true);
video.setAttribute("playsinline", true);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var sound1Loaded = {loaded: false};
var sound2Loaded = {loaded: false};
var sound3Loaded = {loaded: false};
var sound4Loaded = {loaded: false};
var videoLoaded  = {loaded: false};


var sound1, sound2, sound3, sound4;

var loadedElements = [sound1Loaded, sound2Loaded, sound3Loaded, sound4Loaded, videoLoaded]

function checkforAssetsLoaded(){
  if(loadedElements.every((asset)=> {
      return asset.loaded === true;
  })){
    console.log('should play audio now');
    console.log('should also play video');
    sound1.play();
    sound2.play();
    sound3.play();
    sound4.play();
    video.play();
  }/* else {
    console.log('no sound yet');
  }*/
}

// Client Type Check if mobile set camera to move with Phone deviceorientation.
// else if desktop use click and drag to control camera.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // is mobile..
  //mobile camera perspective
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );
  //camera position for phone view
  camera.position.set(0, 0, 75);
  videoUrl = "/assets/JW_mobile.mp4";
  //Phone Device Orientation Controller
  controls = new DeviceOrientationController(camera, renderer.domElement);
  controls.connect();
} else {
  // Use Desktop settings....
  //Desktop camera perspective
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //camera position for Desktop view
  camera.position.z = 300;
  videoUrl = "/assets/JW_desktop.mp4";
  controls = new THREE.OrbitControls(camera);
}

//controls (ORBIT CONTROL) to disable zoom
controls.enableZoom = false;

//*****************************************************************************//
//        Start Screen Button EventListener to fix Chrome update               //
//*****************************************************************************//
var checkboxStart = document.querySelector("input[name=checkboxStart]");
checkboxStart.addEventListener("change", function() {
  if (this.checked) {
    document.querySelector(".bkg").style.display = "none";

    //***********************************************//
    //     Loading all 4 mp3 files to AudioLoader    //
    //***********************************************//
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add(listener);

    // create the PositionalAudio object (passing in the listener)
    sound1 = new THREE.PositionalAudio(listener);
    sound2 = new THREE.PositionalAudio(listener);
    sound3 = new THREE.PositionalAudio(listener);
    sound4 = new THREE.PositionalAudio(listener);

    // load a sound and set it as the PositionalAudio object's buffer
    var audioLoader = new THREE.AudioLoader();
    // Jurassic Park mp3 Loaded
    audioLoader.load(
      "/assets/music/jurassic.mp3",
      function(buffer) {
        sound1.setBuffer(buffer);
        sound1.setRefDistance(20);
        sound1.setLoop(true);
        sound1Loaded.loaded = true;
        checkforAssetsLoaded();
        // sound1.play();
      }, // onProgress callback
      function(xhr) {
        var percentLoaded = xhr.loaded / xhr.total * 100;

        console.log("sound1Loaded... " + percentLoaded);
        if (percentLoaded === 100) {

          
          
        }
      },
      // onError callback
      function(err) {
        console.log("An error happened");
      }
    );
    // Harry Potter mp3 Loaded
    audioLoader.load(
      "/assets/music/hp.mp3",
      function(buffer) {
        sound2.setBuffer(buffer);
        sound2.setRefDistance(20);
        sound2.setLoop(true);
        sound2Loaded.loaded = true;
        checkforAssetsLoaded();
        // sound2.play();
      }, // onProgress callback
      function(xhr) {
        var percentLoaded = xhr.loaded / xhr.total * 100;
          console.log("sound2Loaded... " + percentLoaded);
        if (percentLoaded === 100) {

        }
      },
      // onError callback
      function(err) {
        console.log("An error happened");
      }
    );
    // Jaws & Superman mp3 Loaded
    audioLoader.load(
      "/assets/music/jaws.mp3",
      function(buffer) {
        sound3.setBuffer(buffer);
        sound3.setRefDistance(20);
        sound3.setLoop(true);
        sound3Loaded.loaded = true;
        checkforAssetsLoaded();
        // sound3.play();
      }, // onProgress callback
      function(xhr) {
        var percentLoaded = xhr.loaded / xhr.total * 100;
          console.log("sound3Loaded... " + percentLoaded);
        if (percentLoaded === 100) {

        }
      },
      // onError callback
      function(err) {
        console.log("An error happened");
      }
    );
    // Star Wars mp3 Loaded
    audioLoader.load(
      "/assets/music/sw.mp3",
      function(buffer) {
        sound4.setBuffer(buffer);
        sound4.setRefDistance(20);
        sound4.setLoop(true);
        sound4Loaded.loaded = true;
        checkforAssetsLoaded();
        // sound4.play();
      }, // onProgress callback
      function(xhr) {
        var percentLoaded = xhr.loaded / xhr.total * 100;
          console.log("sound4Loaded... " + percentLoaded);
        if (percentLoaded === 100) {

        }
      },
      // onError callback
      function(err) {
        console.log("An error happened");
      }
    );

    // This will function create a loop that causes the renderer to draw the scene every time the screen is refreshed
    function animate() {
      requestAnimationFrame(animate);
      // Convert to degrees
      var vector = camera.getWorldDirection();
      var theta = Math.atan2(vector.x, vector.z);
      var deg = Math.ceil(theta * 57.29 + 180);

      // Audio functions per themeSong to play when in degree Range.
      jurrasicPark(deg, sound1);
      harryPotter(deg, sound2);
      jaws(deg, sound3);
      starWars(deg, sound4);

      controls.update();
      renderer.render(scene, camera);
    }

    init();
    animate(camera);

    //*******************************************//
    //           Play All Tracks                 //
    //*******************************************//
    function playTracks(sound1, sound2, sound3, sound4) {
      sound1.play();
      sound2.play();
      sound3.play();
      sound4.play();
    }

    //*******************************************//
    //           Pause All Tracks                //
    //*******************************************//
    function pauseTracks(sound1, sound2, sound3, sound4) {
      sound1.pause();
      sound2.pause();
      sound3.pause();
      sound4.pause();
    }

    //*******************************************//
    //           Toggle Sound On/Off  Buttons    //
    //*******************************************//
    var checkboxSound = document.querySelector("input[name=checkboxSound]");
    checkboxSound.style.cursor = 'pointer';
    checkboxSound.style.display = 'none';
    checkboxSound.addEventListener("change", function() {
      if (this.checked) {
        // Checkbox is checked..
        document.querySelector(".soundbtn__icon").src =
          "./assets/imgs/muteOff.png";
        pauseTracks(sound1, sound2, sound3, sound4);
      } else {
        document.querySelector(".soundbtn__icon").src =
          "./assets/imgs/muteOn.png";
        playTracks(sound1, sound2, sound3, sound4);
      }
    });

    //*******************************************//
    //          Toggle Play / Pause Buttons      //
    //*******************************************//
    var checkboxPlay = document.querySelector("input[name=checkboxPlay]");
    checkboxPlay.style.cursor = 'pointer';
    checkboxPlay.addEventListener("change", function() {
      if (this.checked) {
        // Checkbox is checked..
        document.querySelector(".playbtn__icon").src = "./assets/imgs/play.png";
        video.pause();
        pauseTracks(sound1, sound2, sound3, sound4);
      } else {
        document.querySelector(".playbtn__icon").src =
          "./assets/imgs/pause.png";
        video.play();
        playTracks(sound1, sound2, sound3, sound4);
      }
    });
  } else {
  }
});

//**************************//
//      Init function       //
//**************************//
function init() {
  video.width = window.innerWidth;
  video.height = window.innerHeight;
  video.loop = true;
  video.muted = true;
  video.src = videoUrl;
  video.setAttribute("webkit-playsinline", "webkit-playsinline");

  // video.addEventListener('progress', function() {
  //   console.log('loading')
  // });

  video.addEventListener("canplaythrough", function() {
    console.log('can play video')
    videoLoaded.loaded = true;
    checkforAssetsLoaded();
  }, false);
  

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  var material = new THREE.MeshBasicMaterial({ map: texture });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.y = -Math.PI / 2;
  scene.add(mesh);
}

//*******************************************//
//         Updates Viewport on Resize        //
//*******************************************//
window.addEventListener("resize", function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//******************************************************************************//
//    Sets correct volume & plays correct song when in range for each theme     //
//******************************************************************************//
function jurrasicPark(deg, sound1) {
  // 5 degree overlap on each side to allow fading of sound between songs.
  // camera range to set volume levels of current theme song.
  if (deg <= 50 || deg >= 310) {
    var x = deg <= 50 ? (x = deg) : (x = 360 - deg); // right camera movement from jurrasicPark outputs negative degrees.
    //var vol = 1 - x / 50; // where x is current degrees. At every movement left or right, volume is decreased to this ratio.
    var vol = 10 - x / 50 * 10; // At every movement left or right, volume is decreased to this ratio.
    // console.log(vol);
    deg === 360 ? sound1.setVolume(10) : sound1.setVolume(vol); // 360 degrees is the center of current theme therefore volume is at max where max is (1)
  } else sound1.setVolume(0); // when not in range mute the theme song.
}

function harryPotter(deg, sound2) {
  // 5 degree overlap on each side to allow fading of sound between songs.
  // camera range to set volume levels of current theme song.
  if (deg <= 140 && deg >= 40) {
    var vol = 10 - Math.abs(90 - deg) / 50 * 10; // At every movement left or right, volume is decreased to this ratio.
    // console.log(vol);
    deg === 90 ? sound2.setVolume(10) : sound2.setVolume(vol); // 90 degrees is the center of Harry Potter theme therefore volume is at max where max is (1)
  } else sound2.setVolume(0); // when not in range mute the theme song.
}

function jaws(deg, sound3) {
  // 5 degree overlap on each side to allow fading of sound between songs.
  // camera range to set volume levels of current theme song.
  if (deg <= 230 && deg >= 130) {
    var vol = 10 - Math.abs(180 - deg) / 50 * 10; // At every movement left or right, volume is decreased to this ratio.
    deg === 180 ? sound3.setVolume(10) : sound3.setVolume(vol); // 180 degrees is the center of Jaws theme therefore volume is at max where max is (1)
  } else sound3.setVolume(0); // when not in range mute the theme song.
}

function starWars(deg, sound4) {
  // 5 degree overlap on each side to allow fading of sound between songs.
  // camera range to set volume levels of current theme song.
  if (deg <= 320 && deg >= 220) {
    var vol = Math.abs(10 - Math.abs(270 - deg) / 50 * 10); // At every movement left or right, volume is decreased to this ratio.
    deg === 270 ? sound4.setVolume(10) : sound4.setVolume(vol); // 270 degrees is the center of Jaws theme therefore volume is at max where max is (1)
  } else sound4.setVolume(0); // when not in range mute the theme song.
}

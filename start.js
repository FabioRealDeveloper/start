  const videoList = document.querySelectorAll("video")
  // mute all videos
   videoList.forEach(video => {
     video.muted = true;
   })

window.onload = function() {
  $(document).ready(function() {
    
    var url = window.location.href;
    if (url.indexOf('Y291') > -1) {
      var parts = url.split('?');
      var lastSegment = parts.pop();
      var decodeString = atob(lastSegment);
      var regenerateurl = url.replace(lastSegment, decodeString);
      document.getElementById('decodeurl').value = regenerateurl;
      var url_string = document.getElementById('decodeurl').value;
      var decodeurl = new URL(url_string);  
      var course = decodeurl.searchParams.get("course");
      document.getElementById('course').value = course; 
      var userid = decodeurl.searchParams.get("userid");
      document.getElementById('userid').value = userid;
      var quizid = decodeurl.searchParams.get("quizid");
      document.getElementById('quizid').value = quizid;
      var timer = decodeurl.searchParams.get("timer");
      document.getElementById('timer').setAttribute("value", timer);
      var points = decodeurl.searchParams.get("points");
      document.getElementById('points').value = points;
      var refer = decodeurl.searchParams.get("refer");  
      document.getElementById('refer').value = refer;

      $.ajax({
        url : ""+quizid +".txt", // deve essere modificato inserendo id quiz successivo a quello effettuato (id.txt)
        dataType: "text",
        success : function (data) {
          $(".wrapper").html(data);
        }
      }); 
    }
    else if (url.indexOf('course') > -1) {
      document.getElementById('decodeurl').value = url;
      var url_string = document.getElementById('decodeurl').value;
      var decodeurl = new URL(url_string);   
      var course = decodeurl.searchParams.get("course");
      document.getElementById('course').value = course; 
      var userid = decodeurl.searchParams.get("userid");
      document.getElementById('userid').value = userid;
      var quizid = decodeurl.searchParams.get("quizid");
      document.getElementById('quizid').value = quizid;
      var timer = decodeurl.searchParams.get("timer");
      document.getElementById('timer').setAttribute("value", timer);
      var points = decodeurl.searchParams.get("points");
      document.getElementById('points').value = points;
      var refer = decodeurl.searchParams.get("refer");
      document.getElementById('refer').value = refer;

      $.ajax({
        url : ""+quizid +".txt", // deve essere modificato inserendo id quiz successivo a quello effettuato (id.txt)
        dataType: "text",
        success : function (data) {
          $(".wrapper").html(data);
        }
      }); 
    }
    else {
      document.getElementById('course').value = "1-RISORSE_DIGITALI"; 
      document.getElementById('userid').value = "test";
      document.getElementById('quizid').value = "intro";
      document.getElementById('timer').setAttribute("value", "0");
      var timer = document.getElementById('timer').value;
      document.getElementById('refer').value = "http://aisicani.it/local/smistamento/gestione.php";

      $.ajax({
        url : "intro.txt",
        dataType: "text",
        success : function (data) {
          $(".wrapper").html(data);
        }
      }); 
    }
 

    var Clock = {
      totalSeconds: parseInt(timer), //recuperare da db i secondi trascorsi <?php echo $timer ?>
      start: function () {
        if (!this.interval) {
            var self = this;
            function pad(val) { return val > 9 ? val : "0" + val; }
            this.interval = setInterval(function () {
              self.totalSeconds += 1;
    
              $("#timer").val(pad(parseInt(self.totalSeconds)));
    
            }, 1000);
        }
      },
    
      pause: function () {
        clearInterval(this.interval);
        delete this.interval;
      },
    
      resume: function () {
        this.start();
      }
    };
    
    Clock.start();
  
  });
};

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

screen.orientation.addEventListener("change", (event) => {
  wakeLockEnabled = true;
});

PleaseRotateOptions = {
  startOnPageLoad: true,
  forcePortrait: false,
  message: "Ruotare Dispositivo",
  subMessage: "(in posizione orizzontale)",
  allowClickBypass: false,
  onlyMobile: false,
  zIndex: 999999999999999
};

function exitredirect() {
  var modal = document.getElementById("myModal");
  var annulla = document.getElementById("annulla");
  var confermo = document.getElementById("confermo");
  var span = document.getElementsByClassName("close")[0];
  
  modal.style.display = "block";

  annulla.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  confermo.onclick = function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    document.getElementById('refer').value = document.getElementById('refer').value.replace(/\s*http\s*/g, 'https');   
    document.getElementById('refer').value = document.getElementById('refer').value.replace(/\s*local\/smistamento\/gestione.php\s*/g, 'my');
    var refer = document.getElementById('refer').value;
    window.location.href = refer;
  }
};

var video = document.getElementsByTagName("video");
function resetgame() {
    video.currentTime = 0;
    $('.speech').fadeOut('10');
    $('.subtitle').fadeOut('10');
    $('.speech').each(function(){
      $(this).removeClass('zoomoutright');
      $(this).removeClass('zoomoutleft');
      $(this).removeClass('zoominright');
      $(this).removeClass('zoominleft');
    });
}
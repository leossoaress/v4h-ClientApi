v4h_api = new V4H();

$(document).ready(function() {

  // Fazendo o login no sistema v4h
	v4h_api.login('usuario', 'senha').then(() => {
    console.log('Login realizado com sucesso.')
  });

});

// Funcão executada quando o botão de iniciar uma conferência é clicado
function startVideoConf() {

  sessionId = document.getElementById('sessionId').value;

  // Requisitar uma conferência
	v4h_api.requestConference(sessionId).then(function (sessionId) {
    
    // Desabilitar o botão para iniciar a conferência
    document.getElementById("insert-container").style.display = 'none';

    //Iniciar uma conferência
    v4h_api.startConference(sessionId, document.querySelector('#meet'), '75%', '75%', 'João Silva', 'https://picsum.photos/200').then(function() {

      runSpeechRecognition();

      document.getElementById("output").style.display = 'block';

      v4h_api.jApi.executeCommand("toggleAudio");

      v4h_api.jApi.executeCommand("link", `https://v4h.cloud`);

    }).catch(function() {
    
      alert('Problema na criação da sessão: sessão indisponível. ');
      
      document.getElementById("insert-container").style.display = 'block';
    
    });
    
    // Registar um callback para ser executado na saída da conferência
    v4h_api.registerEndedListener(conferenceEnded);

  }).catch(function (err) {
    
    joinVideoConf();

  });

}

// Funcão executada quando o botão de juntar-se a uma conferência é clicado
function joinVideoConf() {

  document.getElementById("insert-container").style.display = 'none';

  sessionId = document.getElementById('sessionId').value;

  //Iniciar uma conferência
  v4h_api.joinConference(sessionId, document.querySelector('#meet'), '75%', '75%', 'José Silva', 'https://picsum.photos/200').catch(function() {
    
    runSpeechRecognition();

    document.getElementById("output").style.display = 'block';

    alert('Problema ao entrar na sessão: sessão indisponível. ');
    
    document.getElementById("insert-container").style.display = 'block';
  
  });
    
  // Registar um callback para ser executado na saída da conferência
  v4h_api.registerEndedListener(conferenceEnded);
  
}


// Funcão executada quando o botão de desligar fora da conferência é clicado
function stopVideoConf() {

  // Encerrar o iframe
	v4h_api.jApi.dispose();
  
}

// Função executada quando o botão de desligar dentro da conferência é clicado
function conferenceEnded(mySessionId) {
  
  document.getElementById("insert-container").style.display = 'block';

  document.getElementById("output").style.display = 'none';

}

function runSpeechRecognition() {

  // get output div reference
  var output = document.getElementById("output");

  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = true;
  recognition.continuous = true;
  
  // This runs when the speech recognition service starts
  recognition.onsoundstart = function() {
    console.log('ON SOUND START');
    recognition.start();
  };
  
  recognition.onspeechend = function() {
    console.log('ON SPEACH END');
    //recognition.stop();
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function(event) {
    var testes = Object.values(event.results);

    testes.map((phrase) => {
      output.innerHTML = "<b>Transccription:</b> " + phrase[0].transcript + "<br/> <b>Confidence:</b> " + phrase[0].confidence*100+"%";
      console.log(phrase);
    })

  };

    // start recognition
    recognition.start();
}
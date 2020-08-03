v4h_api = new V4H();

$(document).ready(function() {

  // Fazendo o login no sistema v4h
	v4h_api.login('usuario', 'senha').then(() => {
    console.log('Login realizado com sucesso.')
  });

  // Desabilitar o botão para encerrar a conferência
  document.getElementById("stopConference").disabled = true;

  // Desabilitar o botão para encerrar a conferência
  document.getElementById("joinConference").disabled = true;

});

// Funcão executada quando o botão de iniciar uma conferência é clicado
function startVideoConf() {

  // Desabilitar o botão para iniciar a conferência
  document.getElementById("startConference").disabled = true;

  // Desabilitar o botão para iniciar a conferência
  document.getElementById("joinConference").disabled = true;

  // Habilitar o botão para encerrar a conferência
  document.getElementById("stopConference").disabled = false;

  sessionId = document.getElementById('sessionId').value;

  // Requisitar uma conferência
	v4h_api.requestConference(sessionId).then(function (sessionId) {

    //Iniciar uma conferência
    v4h_api.startConference(sessionId, document.querySelector('#meet'), '100%', '100%', 'Nome Sobrenome', 'https://picsum.photos/200');
    
    // Registar um callback para ser executado na saída da conferência
    v4h_api.registerEndedListener(conferenceEnded);
  });
  
}

// Funcão executada quando o botão de juntar-se a uma conferência é clicado
function joinVideoConf() {

  // Desabilitar o botão para iniciar a conferência
  document.getElementById("startConference").disabled = true;

  // Desabilitar o botão para iniciar a conferência
  document.getElementById("joinConference").disabled = true;
  
  // Habilitar o botão para encerrar a conferência
  document.getElementById("stopConference").disabled = false;

  sessionId = document.getElementById('sessionId').value;

  //Iniciar uma conferência
  v4h_api.joinConference(sessionId, document.querySelector('#meet'), '100%', '100%', 'Nome Sobrenome', 'https://picsum.photos/200');
    
  // Registar um callback para ser executado na saída da conferência
  v4h_api.registerEndedListener(conferenceEnded);
  
}


// Funcão executada quando o botão de desligar fora da conferência é clicado
function stopVideoConf() {

  // Desabilitar o botão para iniciar a conferência
  document.getElementById("startConference").disabled = false;

  // Habilitar o botão para encerrar a conferência
  document.getElementById("stopConference").disabled = true;

  // Encerrar o iframe
	v4h_api.jApi.dispose();
  
}

// Função executada quando o botão de desligar dentro da conferência é clicado
function conferenceEnded(mySessionId) {
  
  // Habilitar o botão para iniciar a conferência
  document.getElementById("startConference").disabled = true;

  // Desabilitar o botão para encerrar a conferência
  document.getElementById("startConference").disabled = true;

}

function validateJoin() {

  if(document.getElementById("sessionId").value.length > 0) {
    
    // Habilitar o botão para juntar-se a conferência
    document.getElementById("joinConference").disabled = false;
  
  } else {

    // Desabilitar o botão para juntar-se a conferência
    document.getElementById("joinConference").disabled = true;

  }

}
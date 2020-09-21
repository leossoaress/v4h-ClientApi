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
    v4h_api.startConference(sessionId, document.querySelector('#meet'), '75%', '75%', 'Nome Sobrenome', 'https://picsum.photos/200');
    
    // Registar um callback para ser executado na saída da conferência
    v4h_api.registerEndedListener(conferenceEnded);

  }).catch(function (err) {
    
    // alert('Problema na criação da sessão: sessão já existe. ');
    
    joinVideoConf();

  });
  
}

// Funcão executada quando o botão de juntar-se a uma conferência é clicado
function joinVideoConf() {

  sessionId = document.getElementById('sessionId').value;

  //Iniciar uma conferência
  v4h_api.joinConference(sessionId, document.querySelector('#meet'), '100%', '100%', 'Nome Sobrenome', 'https://picsum.photos/200').catch(function() {
    alert('Problema na criação da sessão: sessão indisponível. ');
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

}
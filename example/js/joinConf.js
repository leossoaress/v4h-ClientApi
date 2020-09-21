v4h_api = new V4H();

$(document).ready(function() {

  // Fazendo o login no sistema v4h
	v4h_api.login('usuario', 'senha').then(() => {
    console.log('Login realizado com sucesso.')
  });

  console.log(window.location);

  //joinVideoConf();

});


// Funcão executada quando o botão de juntar-se a uma conferência é clicado
function joinVideoConf() {

  sessionId = document.getElementById('sessionId').value;

  //Iniciar uma conferência
  v4h_api.joinConference(sessionId, document.querySelector('#meet'), '75%', '75%', 'Nome Sobrenome', 'https://picsum.photos/200');
    
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
  
 console.log('ACABOU');

}
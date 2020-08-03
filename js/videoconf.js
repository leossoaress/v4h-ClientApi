
v4h_api = new V4H();

const audit_url_base = 'http://localhost:8444';

$(document).ready(function() {
	v4h_api.login('usuario', 'senha');	// Troca usuário e senha pelo token v4h_api.token
	// v4h_api.loginWithToken(v4h_api.token['access']);		// Efetua login com o token
	// v4h_api.refreshToken(v4h_api.token['refresh']);		// Renova o token de acesso
});

function startVideoConf() {
	document.getElementById("confButton").innerHTML = "";
	console.log("Chamando resquestConference()");
	v4h_api.requestConference().then(function (sessionId) {
		v4h_api.startConference(sessionId, document.querySelector('#meet')) //, 854, 480, 'Joao', 'http://servidor.com/avatar/joao');
		v4h_api.registerEndedListener(conferenceEnded);
	});
}

function getConfUrl() {
	v4h_api.getGuestUrl(v4h_api.sessionId, 'Jose', 'http://servidor.com/avatar/joao').then(function (data) {
		console.log('conference url is ' + data['url'])
		document.getElementById("url").innerHTML = "<a href=" + '"' + data['url'] + '"' + ">Click to Open Link</a>"
	});
}

function conferenceEnded(mySessionId) {
    document.getElementById("confButton").innerHTML =
		"<button type='button' onclick='startVideoConf()'>Iniciar Chamada de Vídeo</button>";
	let last_conferences = document.getElementById("last_conferences");
	last_conferences.innerHTML = last_conferences.innerHTML + "<a href='#' onclick='getStorageUrl(" + '"' + mySessionId + '"' + ")'> " + Date().toString() + "</a><br />";
}

function getStorageUrl(sessionId) { 
	fetch(audit_url_base + '/get-url/' + mySessionId, {method: 'GET'}).then(function (response) {
		return response.text().then(function (url) {
			url = url.replace(/['"]+/g, '');
			console.log('playing conference ' + mySessionId + ' from url ' + url);
			document.getElementById("confButton").innerHTML = '';
			document.getElementById("meet").innerHTML = "<video id='playback' width='320' height='240' controls> ";

			let conf = document.getElementById('playback');
			let source = document.createElement('source');
			source.setAttribute('src', url);
			conf.appendChild(source);
			conf.load();
			conf.play();
		});
	});
}

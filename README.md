# V4H Client API - Example

Methods details of client API.

## ``v4h.login(username, password)``: 

Method used to login into the rest api, this method needs an username and a password to make the authentication. Once authentiaction process is fineshed, the client will recieve an access token and refresh token.

Input parameters:
  - username (string):
  - password (string):

Response:
  - acess Token
  - refresh token

## ``vh4.loginWithToken(acessToken)``:

Method used to login into the rest api with the access token. This method return an ok message.

Input parameters:
  - refresh token

Response:
  - ok

## ``v4h.refreshToken(refreshToken)``:

Method used to renew your access token using the refresh token, because the access token expires 5 minutes after it has created.

Input parameters:
  - refreshToken

Response:
  - access token

## ``v4h.requestConference( [optional] sessionId)``:

Method used to request a conference, this function doesn't need any arguments and the method return conference session id.

Input parameters:
  - none

Response:
  - sessionId

## ``v4h.startConference(sessionID, html_parentNode, width, height, name, avatar_url)``:

Method used to start the conference using the session id to identify the conference. This function needs a html_parentNode to put v4h video conference into the client web page. 

Input parameters:
  - sessionId
  - html_pa*__*rentNode
  - width
  - heigth
  - name
  - avatar_url

Response:
  - ok

## ``v4h.joinConference(sessionId, html_parentNode, width, height, name, avatar_url)``:

Method used to join the video conference using the session id to identify the conference. This function also needs a html_parentNode to put v4h video conference into the client web page. 

Input parameters:
  - sessioniId 
  - html_parentNode
  - width
  - heigth
  - name
  - avatar_url

Response:
  - ok 

## ``v4h.registerEndedListener(callback)``:

Method used to register a callback function to execute when the video conference is over.

Input parameters:
  - func callback

Response:
  - ok 

## ``v4h.getConference(sessionId)``:

Method used to get conference details using the session id, this method returns sessionId, owner, created, endend, state, urlStorage, hash, hashType, DLTId, DLTType.    

Input parameters:
  - sessionId

Response:
  - conference details (Json)

## ``v4h.getGuestUrl(sessionId, name, avatar_url)``:

Method used to get conference url link with token.

Input parameters:
  - sessionId
  - name
  - avatar_url

Response (Json):
  - jwt
  - url


# Jitsi Meet API

You are allowed to use all methods of Jitsi Meet API using the object ``v4h_api.jApi``, you can find all you need in this [link](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe).
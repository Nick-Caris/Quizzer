messageTeams = function (req, message) {
  req.websocketServer.clients.forEach((client) => {
    if (client.session.team && req.session.roomCode === client.session.roomCode)
      client.send(JSON.stringify({'type': message, 'roomCode': req.session.roomCode}))
  })
};

messageTeamsQuestion = function (req, message, questionId) {
  req.websocketServer.clients.forEach((client) => {
    console.log('message',message,'questionId',questionId, 'roomCode', req.session.roomCode, 'and', client.session.roomCode);
    if (client.session.team && req.session.roomCode === client.session.roomCode)
      client.send(JSON.stringify({
        'type': message,
        'roomCode': req.session.roomCode,
        'questionId': questionId,
        'teamName': client.session.team
      }))
  })
};

messageMaster = function (req, message) {
  req.websocketServer.clients.forEach((client) => {
    console.log('message:', message, ' This message is to master');
    if (client.session.master && req.session.roomCode === client.session.roomCode)
      client.send(JSON.stringify({'type': message}))
  })
};

messageTeam = function (req, message, name) {
  req.websocketServer.clients.forEach((client) => {
    console.log('name: ', name, 'message: ', message, 'ClientName', client.session.team);
    if (client.session.team && req.session.roomCode === client.session.roomCode && client.session.team === name)
      client.send(JSON.stringify({'type': message, 'roomCode': req.session.roomCode}))
  })
};

messageDashboard = function (req, message) {
  req.websocketServer.clients.forEach((client) => {
    console.log('message: ', message, 'To Dashboard');
    if (client.session.dashboard && req.session.roomCode === client.session.roomCode)
      client.send(JSON.stringify({'type': message}))
  })
};

messageDashboardQuestionId = function (req, message, questionId) {
  req.websocketServer.clients.forEach((client) => {
    console.log('message: ', message, 'To Dashboard');
    if (client.session.dashboard && req.session.roomCode === client.session.roomCode)
      client.send(JSON.stringify({'type': message, 'questionId': questionId}))
  })
};

module.exports = {messageTeam, messageTeams, messageMaster, messageTeamsQuestion, messageDashboard, messageDashboardQuestionId};

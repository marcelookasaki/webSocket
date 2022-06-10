const WebSocketServer = require("ws")
const wss = new WebSocketServer.Server({ port: 8080 })
console.log('Servidor WS está rodando na porta 8080')

var clientes = new Array;

// Ciclo de vida de conexões do cliente servidor
wss.on('connection', (ws) => {
  clientes.push(ws)
  console.log('conexao foi estabelecida')
  ws.on('message', data => {
    console.log(`Ecoa que o cliente  enviou: ${data}`)
    // Verifica a resposta de acordo com a pergunta
    /* 
    1 - Pergunta 1
    */
    switch (data.toString()[0]) {
      case '1':
        resposta = 'Resposta 1'
        break
      case '2':
        resposta = 'Resposta  2'
        break
      case '3':
        resposta = 'Resposta  3'
        break
      case '4':
        resposta = 'Resposta  4'
        break
      case '5':
        resposta = 'Resposta  5'
        break
      default:
        console.log('Pergunta inválida')
    }
    // Broadcasting
    for (c in clientes) {
      clientes[c].send('Eco:' + data)
      clientes[c].send('Resposta:' + resposta)
    }
  })
  ws.on('close', () => {
    console.log('Conexão encerrada pelo cliente')
  })
}) 

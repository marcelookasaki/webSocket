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
    // Broadcasting
    for (c in clientes) {
      clientes[c].send('Eco:' + data)
    }
  })
  ws.on('close', () => {
    console.log('Conexão encerrada pelo cliente')
  })
}) 

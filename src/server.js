import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { Database } from './database.js'
import { json } from './middleware/json.js'

const database = new Database()

const server = http.createServer(async(req, res) => {
  
  const { method, url, headers } = req

  await json(req, res)
  
  // console.log( method, url)
  // console.log( headers )
  // console.log( body )

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    const user = {
      id: randomUUID(),
      name: name,
      email: email
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
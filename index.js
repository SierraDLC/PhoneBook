const express = require('express')
const code = express()

code.use(express.json())

let persons = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
      },
      { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
      },
      { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
      },
      { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
      }
]
    code.get('/', (request, response) => {
     response.send('<h1>Hello World!</h1>')
  })
  
  code.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  code.get('/info', (request, response) => {
    let entries = persons.length;
    
    response.send(`Phonebook has info for ${entries} people <br /><br /> ${new Date()}`);
})
  
  code.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
 
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

    code.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  
})

 code.post('/api/persons', (request, response) => {
   
    const randoId = Math.floor(Math.random() * 7555556);
   
    const create= request.body;
   
    create.id = randoId;
   
    let createName = create.name;
   
    let whoopsName = persons.find(person => person.name === createName);
   
    let whoopsNum = persons.find(person => person.number === randoId.number);
  
    
    if (whoopsName) {
      return response.status(400).json({ 
        error:" name is not available"  
      })
    }
  
    if (whoopsNum) {
      return response.status(400).json({ 
        error: "number is not available" 
      })
    }

 })


const PORT = 3003
  code.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


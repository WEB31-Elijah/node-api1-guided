// import express from 'express'; // ES6 modules
const express = require('express')
const shortid = require('shortid')
const server = express()

// middleware
server.use(express.json())

let hubs = [
  {
    id: 1,
    name: 'web 30 node intro',
    lessonId: 1,
    cohort: 'web 30',
  },
  {
    id: 2,
    name: 'web 30 java intro',
    lessonId: 101,
    cohort: 'web 30',
  },
]

let lessons = [
  {
    id: shortid.generate(),
    name: 'Intro to Node',
  },
  {
    id: shortid.generate(),
    name: 'Node: Day 2',
  },
]

server.get('/', (req, res) => {
  res.send('<h1>Hello WEB 31</h1>')
})

server.get('/api/hubs', (req, res) => {
  res.json(hubs)
})

server.get('/api/lessons', (req, res) => {
  res.json(lessons)
})

server.post('/api/hubs', (req, res) => {
  // request body (user input)
  const newHub = req.body // needs express.json() middleware to work

  // generate a new id
  newHub.id = shortid.generate()

  // push to hubs db
  hubs.push(newHub)

  // print new data
  res.json(newHub)
})

server.post('/api/lessons', (req, res) => {
  // request body (user input)
  const newLesson = req.body // needs express.json() middleware to work

  // generate a new id
  newLesson.id = shortid.generate()

  // push to hubs db
  lessons.push(newLesson)

  // print new data
  res.json(newLesson)
})

server.delete('/api/hubs/:id', (req, res) => {
  const id = req.params.id
  const deleted = hubs.find(h => h.id === id)

  hubs = hubs.filter(h => h.id !== id)

  res.json(deleted)
})

server.put('/api/hubs/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body

  let found = hubs.find(h => h.id === id)

  if (found) {
    // found a hub
    Object.assign(found, changes)
    res.status(200).json(found)
  } else {
    // did not find a hub with that id
    res.status(404).json({ message: 'Hub not found' })
  }
})

const PORT = 8000 // we visit http://localhost:8000/ to see the API

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})

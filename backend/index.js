const express = require('express')
const mongoose = require('mongoose')
const cron = require('node-cron')
const { syncDB } = require('./tasks/sync-db');

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://nico:password@mongodb:27017/miapp?authSource=admin')


app.get('/', async (_req, res) => {
  console.log('listando...')
  const animales = await Animal.find();
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'true', estado: 'Feliz' })
  return res.send('todo')
})
cron.schedule('1-59/5 * * * * *', syncDB );

app.listen(3000, () => console.log('proceso...'))

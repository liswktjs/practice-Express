//@ts-check

const express = require('express')

const app = express()

const PORT = 5000

app.use('/', (req, res) => {
  res.send('Hello express')
})
app.listen(PORT, () => {
  console.log('The express server is working')
})

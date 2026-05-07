const express = require('express')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(' AI Code Review Backend is Running!');
});





app.use('/ai', aiRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))


module.exports = app; 
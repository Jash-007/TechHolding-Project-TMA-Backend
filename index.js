const express = require('express')
const app=  express();
app.use(express.json());
const port = 8000
app.use('/api/dev', require('./Routes/developer'));
app.use('/api/task', require('./Routes/tasks'));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
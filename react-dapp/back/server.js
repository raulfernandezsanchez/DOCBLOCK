import express from 'express'
import { generateUploadURL } from './s3.js'

const app = express()

app.use(express.static('client'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))
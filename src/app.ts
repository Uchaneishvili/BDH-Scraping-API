import express from 'express'
import { Logger } from './util/Logger'

const app = express()
const PORT = 3001
app.use(express.json())

app.listen(PORT, () => {
  Logger.info(`Server started on port ${PORT} ✅`)
})

export default app

//@ts-check

const express = require('express')

const userRouter = express.Router()

const app = express()
app.use(express.json())

const PORT = 5000

const USERS = {
  15: {
    nickname: 'foo',
  },
}

userRouter.get('/', (req, res) => {
  res.send('User List')
})
userRouter.param('id', (req, res, next, value) => {
  console.log(value)
  //@ts-ignore
  req.user = USERS[value]
  next()
})
userRouter.get('/:id', (req, res) => {
  res.send('User info width ID')
})

userRouter.post('/:id/nickname', (req, res) => {
  //reg.body {"nickname" : "bar"}
  //@ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log('The express server is working')
})

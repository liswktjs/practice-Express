//@ts-check

const express = require('express')
const { nextTick } = require('process')
const { runInNewContext } = require('vm')

const userRouter = express.Router()

const app = express()
app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'ho',
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
  const reMimeType = req.accepts(['json', 'html'])
  if (reMimeType === 'json') {
    //@ts-ignore
    res.send(req.user)
  } else if (reMimeType === 'html') {
    res.render('user-profile', {
      nickname: req.user.nickname,
    })
  }
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

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello Pug',
  })
})

app.listen(PORT, () => {
  console.log('The express server is working')
})

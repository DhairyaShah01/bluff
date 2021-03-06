/* eslint-disable camelcase */
const express = require('express')
const router = new express.Router()
const { googleLoginUrl, getAccessTokenFromCode, getUserData } = require('./googleAuthHelpers')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/auth/google', async (req, res) => {
  await res.redirect(googleLoginUrl)
})

router.get('/auth/google/redirect', async (req, res) => {
  try {
    const code = req.query.code
    const { access_token, refresh_token } = await getAccessTokenFromCode(code)
    const data = await getUserData(access_token)
    const user = await User.findOne({ email: data.email })

    // if user does not exist, create a new one or login an existing user
    if (!user) {
      const user = new User({
        email: data.email,
        name: data.name,
        oauth_tokens: {
          access_token: access_token,
          refresh_token: refresh_token
        }
      })

      try {
        await user.save()
        const token = await user.generateAuthToken()

        res.cookie('jwt', token)
        res.redirect('/')
      } catch (error) {
        res.status(400).send(error.message)
      }
    } else {
      user.oauth_tokens = { access_token: access_token, refresh_token: refresh_token }
      try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('jwt', token)
        res.redirect('/')
      } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
      }
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/auth/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router

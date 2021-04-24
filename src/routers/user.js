const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const {sendWelcome , sendCancel} = require('../emails/accounts')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try{
        const token = await user.generateauthtoken()

        await user.save()
        sendWelcome(user.email,user.name)
        res.status(201).send({user, token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        console.log(user)
        const token = await user.generateauthtoken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.get('/users/me', auth ,  async (req, res) => {
   res.send(req.user)
})

router.delete('/users/me', async (req, res) => {
    try{
        sendCancel(req.user.email,req.user.name)
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


router.patch('/users/me', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
 
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()


        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


// router.post('/users/login', async (req, res) => {
//     try{
//         const user = await User.findByCredentials(req.body.email,req.body.password)
//         const token = await user.generateauthtoken()
//         res.send({user,token})
//     }catch(e){
//         res.status(400).send(e)
//         console.log(e)
//     }
// })

router.post('/users/logout', auth , async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token != req.token
        } )
        await req.user.save()

        res.send('user loggged out')
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth , async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }


})


module.exports = router

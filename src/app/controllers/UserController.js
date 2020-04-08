const User = require('../models/User')

class UserController {
    /**
     *  GET /
     */
    async index(req, res) {
        const users = await User.find({})
        .populate('avatar')
        .select('-password');

        return res.json(users)
    }

    /**
     *  GET /:id
     */
    async show(req, res) {
        const user = 
        await User.findById(req.params.id)
        .populate('avatar')
        .select('-password');;

        if(!user) {
            return res.json({error: 'Usuário não encontrado'})
        }

        return res.json(user)
    }

    /**
     *  POST / 
     */
    async store(req, res) {
        const user = await User.create(req.body)

        return res.json({user: user.getJson()})
    }

    /**
     *  PUT /:id 
     */    
    async update(req, res) {
        const {name, email, password, role} = req.body

        const user = await User.findById(req.params.id)

        if(!user) {
            return res.json({error: 'Não existe este usuário'})
        }

        if(email && email !== user.email) {
            const userExists = await user.find({email})

            if(userExists) {
                return res.json({error: 'Email já existe'})
            }

            user.email = email;
        }

        if(name) user.name = name;
        if(password) user.password = password;
        if(role) user.role = role;

        return res.json({user: user.getJson()})
    }

    /**
     *  DELETE /:id 
     */  
    async destroy(req, res) {
        const user = await User.findById(req.params.id)

        if(!user) {
            return res.json({error: 'Usuário não encontrado'})
        }

        await user.remove()

        return res.json({deleted:true})
    }

}

module.exports = new UserController()
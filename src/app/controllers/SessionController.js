const User = require('../models/User')

class SessionController {
    /**
     * POST /
     */
    async store(req, res) {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.json({error: 'Usuário não encontrado'})
        }

        if(!(user.checkPassword(password))) {
            return res.json({error: 'Dados Inválidos'})
        }

        return res.json(user.getAuthJson())
    }
}

module.exports = new SessionController()
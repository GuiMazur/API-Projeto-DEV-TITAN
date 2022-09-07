const fs = require('fs')
const bcrypt = require('bcryptjs')

module.exports = {
    Store: (req, res) => {
        try {if (!fs.readFileSync('databases/users.json', 'utf8')) fs.writeFileSync('databases/users.json', '[]')} // if empty database, write '[]' to it
        catch(e){fs.writeFileSync('databases/users.json', '[]')} // if database doesn't exist, create a new database writing '[]' to it

        try{
            const salt = bcrypt.genSaltSync(10)
            const dbList = JSON.parse(fs.readFileSync('databases/users.json'))
            if (dbList.find(o => o.email == req.body.email)) throw 'este email já foi registrado'
            const newjson = {
                id: dbList.length > 0 ? dbList[dbList.length - 1]["id"] + 1 : 1,
                name: req.body.name,
                lastname: req.body.lastname,
                password: bcrypt.hashSync(req.body.password, salt),
                email: req.body.email,
                cep: req.body.cep.replace('.', '').replace('-', ''),
                cpf: req.body.cpf.replace('.', '').replace('-', ''),
                admin: req.body.admin,
                cart: []
            }
            dbList.push(newjson)
            fs.writeFileSync('databases/users.json', JSON.stringify(dbList))
            res.status(200).send(newjson)
        }catch(e){res.status(500).send(`Erro, conta não criada: ${e}`)}
    },

    Login: (req, res) => {
        try {
            const dbList = JSON.parse(fs.readFileSync('databases/users.json')); 
            const testValues = req.body
            const userInfos = dbList.find((object) => (object.email == testValues.email));

            if (!userInfos) throw 'Email não cadastrado'
            if (!bcrypt.compareSync(testValues.password, userInfos.password)) throw 'Senha incorreta'
            res.status(200).send(userInfos)
        }
        catch(e){res.status(500).send(`Erro: ${e}`)};    
    }
}
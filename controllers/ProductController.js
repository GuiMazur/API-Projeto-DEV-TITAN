const fs = require('fs')

module.exports = {
    Store: (req, res) => {
        try {if (!fs.readFileSync('databases/products.json', 'utf8')) fs.writeFileSync('databases/products.json', '[]')} // if empty database, write '[]' to it
        catch(e){fs.writeFileSync('databases/products.json', '[]')} // if database doesn't exist, create a new database writing '[]' to it

        try{
            const dbList = JSON.parse(fs.readFileSync('databases/products.json'))
            const newjson = {
                id: dbList.length > 0 ? dbList[dbList.length - 1]["id"] + 1 : 1,
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price
            }
            dbList.push(newjson)
            fs.writeFileSync('databases/products.json', JSON.stringify(dbList))
            res.status(200).send('Produto cadastrado com sucesso')
        } catch(e){res.status(500).send(`Erro, produto não criado: ${e}`)}
    },

    Index: (req, res) => {
        try{
            const dbList = JSON.parse(fs.readFileSync('databases/products.json'))
            res.status(200).send(dbList)
        } catch(e){res.status(500).send(`Erro: ${e}`)}
    },

    Show: (req, res) => {
        try{
            const dbList = JSON.parse(fs.readFileSync('databases/products.json'))
            const product = dbList.find(o => o.id == req.params.id)
            if (product) {
                res.status(200).send(product)
            } else throw 'Produto não encontrado'
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    },

    Update: (req, res) => {
        try{
            const dbList = JSON.parse(fs.readFileSync('databases/products.json'))
            const idx = dbList.findIndex(o => o.id == req.params.id)
            if (idx > -1) {
                dbList[idx] = {
                    ...dbList[idx],
                    name: req.body.name,
                    image: req.body.image,
                    description: req.body.description,
                    stock: req.body.stock,
                    price: req.body.price
                }
                fs.writeFileSync('databases/products.json', JSON.stringify(dbList))
                res.status(200).send('Produto alterado com sucesso')
            } else throw 'Produto não encontrado'
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    },

    Delete: (req, res) => {
        try{
            const dbList = JSON.parse(fs.readFileSync('databases/products.json'))
            const idx = dbList.findIndex(o => o.id == req.params.id)
            if (idx > -1) {
                dbList.splice(idx, 1)
                fs.writeFileSync('databases/products.json', JSON.stringify(dbList))
                res.status(200).send('Produto deletado com sucesso')
            } else throw 'Produto não encontrado'
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    }
}
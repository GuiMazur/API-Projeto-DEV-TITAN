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
        }catch(e){res.status(500).send(`Erro, produto não criado: ${e}`)}
    },
}
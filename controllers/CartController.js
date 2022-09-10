const fs = require('fs')

// { id: 1, quantity: 5}

module.exports = {
    Store: (req, res) => {
        try{
            const product = req.body
            const userList = JSON.parse(fs.readFileSync('databases/users.json'))
            const userIdx = userList.findIndex(o => o.id == req.params.id)
            const user = userList[userIdx]
            const produtoJaAdicionado = user.cart.find(o => o.id == product.id)

            if(product.quantity <= 0) throw 'impossível comprar esta quantidade de produto'

            if(produtoJaAdicionado){
                const productIdx = user.cart.indexOf(produtoJaAdicionado)
                user.cart[productIdx] = {
                    ...produtoJaAdicionado, 
                    quantity: produtoJaAdicionado.quantity+product.quantity
                }                
            } else{user.cart.push(product)}

            userList[userIdx] = user            
            fs.writeFileSync('databases/users.json', JSON.stringify(userList))
            res.status(200).send('Produto adicionado ao carrinho')
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    },

    Index: (req, res) => {
        try{
            const productList = JSON.parse(fs.readFileSync('databases/products.json'))
            const userList = JSON.parse(fs.readFileSync('databases/users.json'))
            const user = userList.find(o => o.id == req.params.id)

            cart = user.cart.map((productInCart) => {
                product = productList.find(product => product.id == productInCart.id)
                return {...product, quantity: productInCart.quantity}
            })
            res.status(200).send(cart)
        } catch(e){res.status(500).send(`Erro: ${e}`)}
    },

    Delete: (req, res) => {
        try{
            const productList = JSON.parse(fs.readFileSync('databases/products.json'))
            const userList = JSON.parse(fs.readFileSync('databases/users.json'))
            const userIdx = userList.findIndex(o => o.id == req.params.user_id)
            const user = userList[userIdx]
            const productIdx = user.cart.findIndex(o => o.id == req.params.product_id)
            if (productIdx > -1) {
                user.cart.splice(productIdx, 1)
                userList[userIdx] = user            
                fs.writeFileSync('databases/users.json', JSON.stringify(userList))

                cart = user.cart.map((productInCart) => {
                    product = productList.find(product => product.id == productInCart.id)
                    return {...product, quantity: productInCart.quantity}
                })

                res.status(200).send(cart)
            } else throw 'Produto não encontrado'
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    },

    Buy: (req, res) => {
        try{
            const productList = JSON.parse(fs.readFileSync('databases/products.json'))
            const userList = JSON.parse(fs.readFileSync('databases/users.json'))
            const userIdx = userList.findIndex(o => o.id == req.params.id)
            const user = userList[userIdx]
            var semEstoque = 0

            for (var i of user.cart){
                const productIdx = productList.findIndex(p => p.id == i.id)
                if (productIdx == -1) {continue}
                const product = productList[productIdx]
                if (product.stock < i.quantity) {
                    productList[productIdx] = {...product, stock: 0}
                    semEstoque += 1
                }
                else {productList[productIdx] = {...product, stock: product.stock - i.quantity}}
            }

            user.cart = []

            userList[userIdx] = user

            fs.writeFileSync('databases/users.json', JSON.stringify(userList))
            fs.writeFileSync('databases/products.json', JSON.stringify(productList))
            res.status(200).send(!semEstoque ? 'Parabéns, sua compra foi efetuada com sucesso' : `Sua compra foi efetuada, porém ${semEstoque} de seus produtos possuía menos estoque do que desejado. A quantidade disponível foi comprada.`)            
        } catch(e) {res.status(500).send(`Erro: ${e}`)}
    }
}
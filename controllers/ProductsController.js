const Products = require('../models/Products');
const excludeColumns = ['id', 'createdAt', 'updatedAt', 'UUID'];

module.exports = class productsController {
    static async create(req, res) {
        console.log(req.body);
        const { name, price, quantity, description } = req.body;
        if (!name) {
            return res
                .status(422)
                .json({ message: 'O campo nome é obrigatório.' });
        }
        if (!price) {
            return res
                .status(422)
                .json({ message: 'O campo preço é obrigatório.' });
        }

        if (description && description.length < 80) {
            return res.status(422).json({
                message: 'A descrição deve ter no mínimo 80 caracteres.',
            });
        }

        const productsExists = await Products.findOne({ where: { name } });
        if (productsExists) {
            return res.status(422).json({ message: 'Produto já cadastrado.' });
        }

        try {
            const newProduct = await Products.create({
                name: name,
                price: price,
                quantity: quantity,
                description: description,
            });
            res.status(201).json({
                message: 'Produto cadastrado com sucesso!',
                newProduct,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async consultAll(req, res) {
        const produtos = await Products
            .findAll
            //     {
            //     attributes: {
            //         exclude: excludeColumns,
            //     },
            // }
            ();
        res.status(200).json({ produtos });
    }

    static async consultProduct(req, res) {
        const { name } = req.body;
        if (name) {
            const resultado = await Products.findOne({
                where: { name },
                attributes: { exclude: excludeColumns },
            });
            res.status(200).json({ resultado });
        } else {
            res.status(422).json({
                message: 'O Campo nome é obrigatório para a consulta.',
            });
        }
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price, quantity, description } = req.body;

        if (!name) {
            return res
                .status(422)
                .json({ message: 'O campo nome é obrigatório.' });
        }
        if (!price) {
            return res
                .status(422)
                .json({ message: 'O campo preço é obrigatório.' });
        }

        if (description && description.length < 80) {
            return res.status(422).json({
                message: 'A descrição deve ter no mínimo 80 caracteres.',
            });
        }

        const produtoID = await Products.findByPk(id);
        if (!produtoID) {
            return res.status(404).json({ message: 'Produto não cadastrado.' });
        }

        try {
            await Products.update(
                {
                    name,
                    price,
                    quantity,
                    description,
                },
                { where: { id } },
            );
            res.status(200).json({
                message: 'Produto alterado com sucesso!',
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteProduct(req, res) {
        const uuid = req.params.uuid;
        const verifyProduct = Products.findOne({ where: { UUID: uuid } });

        if (!verifyProduct) {
            return res.status(404).json({ message: 'Produto não existe.' });
        }

        try {
            await Products.destroy({ where: { UUID: uuid } });
            return res.status(200);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: 'Erro na conexão com o servidor.' });
        }
    }
};

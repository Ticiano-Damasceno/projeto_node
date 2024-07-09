const express = require('express');
const conn = require('./db');
const productsRouter = require('./routes/ProductRoute');
const Products = require('./models/Products');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor OK' });
});

app.use('/products', productsRouter);

conn.sync()
    .then(() => app.listen(3000))
    .catch((err) => console.error(err));

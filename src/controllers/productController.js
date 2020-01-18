const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, '../data/productos.json'); 

const pathFotoProductos = '/images/tatamientos/';
//**** Helpers ****//


function traerProductos () {
    let productFileContent = fs.readFileSync(pathProductos, 'utf-8');
    let productArray;
    if (productFileContent == '') {
        productArray = [];
    }else{
        productArray = JSON.parse(productFileContent);
    };
    return productArray;
};

function generarId () {
    let productos = traerProductos();
    if (productos.lenght == 0) {
        return 1;
    }
    let lastProduct = productos.pop();
    return lastProduct.id + 1;
};

function agregarProducto (datoProducto) {
    let productos = traerProductos();
    productos.push(datoProducto);
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, ''));
};

function guardarProductos (productos) {
   
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, ''));
};

const detalleProductos = traerProductos();

const productController = {
    list: (req, res) => {
        res.render('productList', {detalleProducto: detalleProductos});
    },
    detailId: (req, res) => {
        let id = req.params.idProduct;
        res.render('productDetail', {detalleProducto: detalleProductos[id]});
    },
    productCart: (req, res) => {
		res.render('productCart');
    },
    productAdd: (req, res) => {
        res.render('productAddTEST');
    },
    productSave: (req, res) => {
        //req.body.precio = Number(req.body.precio);
        
        req.body = {
            id: generarId(),
            foto: (pathFotoProductos + req.file.filename),
            ...req.body,
        }
        let productoNuevo = req.body;
        agregarProducto(productoNuevo);
        
        //res.json(productoNuevo)
        res.redirect('/products/productList');
    },
    editList: (req, res) => {
        res.render('productEditList',{detalleProducto: detalleProductos});
    },
    editProduct: (req, res) => {
        let id = req.params.idProduct;
        let producto = detalleProductos.filter( producto => { return producto.id == id});
        /*
        res.render('productEdit', {producto: producto});
        */
        res.json(producto);
    },
    updateProduct: (req, res) => {
        let arrayProductos = detalleProductos;
        
        req.body = {
            foto: req.file.filename,
            ...req.body,
        };
        let productoEditado = req.body;
        let posiciónAEditar = arrayProductos.findIndex( producto => { producto.id == productoEditado.id});
        
        arrayProductos[posiciónAEditar] = productoEditado;

        guardarProductos(arrayProductos);

        /*
        res.redirect('/products/productList');
        */
       res.json(productoEditado);
    },
    deleteProduct: (req, res) => {
        let id = req.params.idProduct;
        let arrayProductos = detalleProductos.filter( producto => {return producto.id != id});
        guardarProductos(arrayProductos);
        return res.redirect('/products/productList');
    }
};

module.exports = productController
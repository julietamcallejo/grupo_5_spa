const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, '../data/productos.json'); 
const pathPublic = path.join(__dirname, '../../public/');

const FotosProductos = '/images/tatamientos/';
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
        res.render('productAdd');
    },
    productSave: (req, res) => {
        //req.body.precio = Number(req.body.precio);
        
        req.body = {
            id: generarId(),
            foto: (FotosProductos + req.file.filename),
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
        let producto = detalleProductos.find( producto => { return producto.id == id});
        
        res.render('ProductEditTEST',{producto: producto});
        
        //res.json(producto);
    },
    updateProduct: (req, res) => {
        let arrayProductos = detalleProductos;
        let idProduct = Number(req.params.idProduct);
        
        req.body = {
            id: idProduct,
            foto: (FotosProductos + req.file.filename),
            ...req.body,
        };
        
        let productoEditado = req.body;
        let posiciónAEditar = arrayProductos.findIndex( producto => producto.id == idProduct);
        
        arrayProductos[posiciónAEditar] = productoEditado;

        guardarProductos(arrayProductos);

        
        res.redirect('/products/productList');
        
        //res.json(arrayProductos);
    },
    deleteProduct: (req, res) => {
        let id = req.params.idProduct;
        let arrayProductos = detalleProductos.filter( producto => {return producto.id != id});
        guardarProductos(arrayProductos);
        
        //Borrado de la imagen
        let fotoABorrar = detalleProductos.find( producto => { return producto.id == id}).foto;
        let pathFotoABorrar = pathPublic + fotoABorrar;
        fs.unlinkSync(pathFotoABorrar);

        return res.redirect('/products/productList');
        //res.send(pathFotoABorrar);
    }
};

module.exports = productController;
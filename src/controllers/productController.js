const fs = require('fs');
const path = require('path');


//Variable que contiene los productos
let detalleProductos = [
    {
        id: 0,
        foto: "/images/tatamientos/02-relajante.jpeg",
        nombre: "Relajante",
        descripción: "Combo de nuestros servicios: Masaje Cuello, hombros y cabeza, Masaje de Aromaterapia y Tratamiento corporal de Maderoterapia.",
        precio: "Precio: $2.800,-",
        dia: "Lunes 02/12/2019",
        hora: "16:00 - 18:00 hs.",
        fotoProfesional: "/images/user-2.svg",
        nombreProfesional: "Luciana García"

    },
    {
        id: 1,
        foto: "/images/tatamientos/01-de-pies-a-cabeza.jpg",
        nombre: "De pies a cabeza",
        descripción: "Combo de nuestros servicios: Masaje Cuello, hombros y espalda, Tratamiento facial Piel Sensible y Tratamiento corporal de Drenaje Linfático.",
        precio: "Precio: $2.800,-",
        dia: "Lunes 02/12/2019",
        hora: "16:00 - 18:00 hs.",
        fotoProfesional: "/images/user-2.svg",
        nombreProfesional: "Luciana García"

    },
    {
        id: 2,
        foto: "/images/tatamientos/03-anti-age.jpeg",
        nombre: "Anti-age",
        descripción: "Combo de nuestros servicios: Masaje de Piedras Calientes, Tratamiento facial Anti Age, Tratamiento corporal de Drenaje Linfático.",
        precio: "Precio: $3.000,-",
        dia: "Lunes 02/12/2019",
        hora: "16:00 - 18:00 hs.",
        fotoProfesional: "/images/user-2.svg",
        nombreProfesional: "Luciana García"

    },
    {
        id: 3,
        foto: "/images/tatamientos/04-aromaterapia.jpeg",
        nombre: "Aromaterapia",
        descripción: "En nuestro spa, un masajista licenciado personalizará su masaje de aromaterapia con aceites vegetales altamente concentrados, llamados aceites esenciales, agregados al aceite o loción de masaje. Este masaje es particularmente adecuado para quienes sufran de estrés o quieran mejorar las condiciones anímicas. Cada aceite esencial tiene diferentes propiedades curativas.",
        precio: "Precio: $2.000,-",
        dia: "Martes 03/12/2019",
        hora: "17:00 - 19:00 hs.",
        fotoProfesional: "/images/user-2.svg",
        nombreProfesional: "Luciana García"

    },



];


// ************ Function to Read an HTML File ************

function readHTML (fileName) {
    let filePath = path.join(__dirname, `/../views/${fileName}.html`);
    let htmlFile = fs.readFileSync(filePath, 'utf-8');
    return htmlFile;
}

const productController = {
    list: (req, res) => {
        res.render('productList');
    },

    detailId: (req, res) => {
        
        let id = req.params.idProduct;
        res.render('productDetail', {detalleProducto: detalleProductos[id]});
    },
};

module.exports = productController
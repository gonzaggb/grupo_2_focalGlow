const fs = require('fs')
const path= require('path')

/* const productosJson = JSON.parse(fs.readFileSync(__dirname + '/product.json', 'utf-8')) */




module.exports={
    filename: path.resolve(__dirname + '/product.json'),

    readFile() {
        // Leer nuestra informacion
        const productPath = this.filename;
        const productosJson = fs.readFileSync(productPath, 'utf-8');
        // Parsear la informacion
        return JSON.parse(productosJson);
    },

     writeFile(newData) {
        // Pasar la data a json
        const dataJson = JSON.stringify(newData, null, 2);
        // Escribir el archivo
        fs.writeFileSync(this.filename, dataJson);
    },
    generateId() {
        const product = this.readFile();
        const lastProduct = product.pop();
        return lastProduct.id + 1;
    },
    
    findAll() {
        return this.readFile()
    
    },
    findByPk(id) {
        const products = this.readFile();
        // Filtrar por el ID
        const productFound = products.find(product => product.id == id);
        // Devolvemos el planeta
        return productFound;
    },
    create (product) {
        product.id = this.generateId();

        // Leer el archivo
        const products = this.readFile();   
        // Agregar nuestro planeta al array de planetas
        product.material == '' ? product.material = [] : '';
        product.optica == undefined ? product.optica = [] : '';
        product.potencia == '' ? product.potencia = [] : '';
        product.cct == undefined ? product.cct = [] : '';
        product.dim == undefined ? product.dim = [] : '';
        product.file == '' ? product.file = [] : '';
        const productsUpdated = [...products, product ];
        // Volver a escribir el archivo con el nuevo array de planetas
        this.writeFile(productsUpdated);
        return product;
    },
    delete (id){
        const products = this.readFile();//traer el array de productos
        const newProducts = products.filter(idProduct => idProduct.id != id) //busca el producto a borrar
        /* const productDelete = products.splice(productFound,1) */ //borra el producto
        this.writeFile(newProducts)//desvuelve el array de productos sin el elemento borrado 
    },
    update (body ,id){
        const products = this.readFile();
        const productEdit = products.map(product =>{
         if(product.id == id){
             product ={
                 id: product.id,
                 ...body
             }
         } return product 
        });
        this.writeFile(productEdit)



    },
    
        
        
        
    
    
   

}

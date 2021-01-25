import {data} from "./products.js";

const productosObj = data.products;

let sectionImg = document.getElementById("products");
let divContainer = document.getElementsByClassName("cartProductsContainer")[0];
let spanPrice = document.getElementById("totalPrice");
let productosAnadidos = [];

productosObj.forEach(producto => {mostrarProductos(producto)}); 

function mostrarProductos(producto){
    let div = crearNodo("div", "", ["productCard"], []);
    let imagen = crearNodo("img", "", [], [{name: "src", value: "../img/" + producto.image}]);
    let name = crearNodo("h3", producto.name, [], []);
    let description = crearNodo("p", producto.description, [], []);
    let price = crearNodo("h3", producto.price + "€", [], []);
    let button = crearNodo("button", "COMPRAR", [], []);
    button.addEventListener('click', () => {anadirCarrito(producto.code, div)});
    div.appendChild(imagen);
    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(button);
    sectionImg.appendChild(div);
}

function anadirCarrito(code, divProductoMain){
    let producto = productosObj.find(producto => producto.code == code);
    productosAnadidos.push(producto);
    let div = crearNodo("div", "", ["productCart"], [{name: "id", value: producto.code}]);
    borrarNodo(divProductoMain, sectionImg);
    let imagen = crearNodo("img", "", [], [{name: "src", value: "../img/" + producto.image}]);
    let info = crearNodo("div", "", ["productCartInfo"], []);
    let name = crearNodo("h3", producto.name, [], []);
    let price = crearNodo("p", producto.price + "€", [], []);
    let button = crearNodo("button", "BORRAR", [], []);
    button.addEventListener('click', () => {borrarCarrito(div, producto)});
    div.appendChild(imagen);
    div.appendChild(info);
    info.appendChild(name);
    info.appendChild(price);
    div.appendChild(button);
    divContainer.appendChild(div);
    if(localStorage.getItem("products") == null){
        localStorage.setItem("products", JSON.stringify({favoritos: []}));
    }
    anadirLocalStorage(producto);
    mostrarTotal(productosAnadidos);
}

function anadirLocalStorage(producto){   //localStorage
    let productsObj =JSON.parse(localStorage.getItem("products"));
    productsObj.favoritos.push(producto.code);
    localStorage.setItem("products", JSON.stringify(productsObj));
}

function eliminarLocalStorage(productoBorrar){
    let productsObj =JSON.parse(localStorage.getItem("products"));
    productsObj.favoritos = productsObj.favoritos.filter(code => code != productoBorrar.code);
    localStorage.setItem("products", JSON.stringify(productsObj));
}

function mostrarTotal(productosAnadidos){
    let suma = 0;
    productosAnadidos.forEach(producto => {
        suma += producto.price;
    });
    spanPrice.innerHTML = `${suma}€`;
}

function borrarCarrito(divMini, producto){
    borrarNodo(divMini, divContainer);
    mostrarProductos(producto);
    eliminarLocalStorage(producto);
    let productsObj =JSON.parse(localStorage.getItem("products"));
    productosAnadidos = productosAnadidos.filter(producto => producto.code == productsObj.favoritos);
    mostrarTotal(productosAnadidos)
}

function borrarNodo(div, container) {
    let divProducto = container
    divProducto.removeChild(div);

}

function crearNodo(tipo, texto, clases, atributos) {     //función CREAR NODO
    let nodo = document.createElement(tipo);
    if (texto != "" && texto != null) {
        nodo.appendChild(document.createTextNode(texto));
    }
    if (clases.length > 0) {
        clases.forEach(clase => nodo.classList.add(clase));
    }
    if (atributos.length > 0) {
        atributos.forEach(atributo => nodo.setAttribute(atributo.name, atributo.value));
    }
    return nodo;
}
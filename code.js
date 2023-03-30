////////// ELEMENTOS HTML ////////////////////

// Icono del carrito
const iconCart = document.querySelector('.icon-cart');

// Div contenedor de productos en carrito y total
const containerCartProducts = document.querySelector('.container-cart-products')

// Contador de productos 
const contadorProductos = document.querySelector('#contador-productos');

// Div contenedor de productos agregados al carrito
const rowProduct = document.querySelector('.row-product');

// Total a pagar 
const totalPagar = document.querySelector('.total-pagar');

//Div contenedor de productos de la tienda
const containerItems = document.querySelector('.container-items');

// Formulario de Pagos

const formularioPagos = document.querySelector('.formulario-pagos');


////////////////////////// VARIABLES ///////////////////////////////

// Carrito ARRAY
let carrito = JSON.parse(localStorage.getItem('carritoLocal')) || [];

///////////////// FUNCIONES //////////////////////

/* Funcion para guardar en LocalStorage */
const guardarLocal = () => {
    localStorage.setItem('carritoLocal', JSON.stringify(carrito));
}


/* Funcion para ocultar o mostrar el carrito */

iconCart.addEventListener('click', () => {
    if (containerCartProducts.style.display === 'none') {
        containerCartProducts.style.display = 'block';
    }
    else {
        containerCartProducts.style.display = 'none';
    }
});

/* Funcion para agregar productos al carrito ARRAY */

containerItems.addEventListener('click', (e) =>{
    if (e.target.classList.contains('btn-add-cart')) {
        const articulo = {
            cantidad: 1,
            nombre: e.target.parentNode.querySelector('h2').innerText,
            precio: e.target.parentNode.querySelector('p').innerText
        }

        const repetido = carrito.some(producto => producto.nombre === articulo.nombre);

        if (repetido) {
            const aumentado = carrito.map(producto => {
                if (producto.nombre === articulo.nombre) {
                    producto.cantidad++;
                    return producto
                }
                else {
                    return producto
                }
            })
            carrito = [...aumentado];
        }
        else {
            carrito = [...carrito, articulo];
        }
        console.log(carrito)
    }
    renderizarCarrito();
    guardarLocal();
    Toastify({
        text: "Producto agregado",
        duration: 1500,
        position: 'center'
    }).showToast();
});

/* Funcion para renderizar el carrito Array */

const renderizarCarrito = () => {
    let totalAPagar = 0;
    let totalCantidadProductos = 0;

    rowProduct.innerHTML = "";

    carrito.forEach(producto => {
        const articulo = document.createElement('div');
        articulo.classList.add('cart-product');
        articulo.innerHTML = `
        <div class="cart-info-product">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <span class="titulo-producto-carrito">${producto.nombre}</span>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <i class="fa-solid fa-xmark icon-close"></i>
        `
        totalAPagar = totalAPagar + (producto.cantidad * producto.precio.slice(1));
        totalCantidadProductos = totalCantidadProductos + producto.cantidad;
        rowProduct.append(articulo);
    })
    contadorProductos.innerHTML = totalCantidadProductos;
    totalPagar.innerHTML = `$${totalAPagar}`;

    const noProductsText = document.querySelector('.no-products-text');
    const textTotal = document.querySelector('.text-total')

    if (carrito.length > 0) {
        totalPagar.style.display = 'block';
        textTotal.style.display = 'block';
        noProductsText.style.display = 'none';
        formularioPagos.style.display = 'block';
        formularioPagos.style.position = 'relative';
    }
    else {
        totalPagar.style.display = 'none';
        textTotal.style.display = 'none';
        noProductsText.style.display = 'block';
        formularioPagos.style.display = 'none';
        formularioPagos.style.position = 'absolute';
        formularioPagos.style.top = 0;
    }

};

/* Funcion eliminar productos del carrito */ 

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        
        const nombre = e.target.parentNode.querySelector('.titulo-producto-carrito').innerText;
        
        carrito = carrito.filter(producto => producto.nombre !== nombre);

        guardarLocal();
        renderizarCarrito();
    }
})

/* API - FETCH - POKEMON */

let randomPhrase = Math.floor(Math.random() * 4)
let frase = "";
let randomPokemon = Math.floor(Math.random() * 100)

switch(randomPhrase) {
    case 0:
        frase = '"Una taza nueva al mes que bueno es"';
        break;
    case 1:
        frase = '"Una taza nueva al año no hace daño"';
        break;
    case 2:
        frase = '"Una taza nueva al día te da alegria"';
        break;
    case 3:
        frase = '"Una taza nueva a la semana te quita la desgana"';
}

const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}/`;

fetch(url)
.then(response => response.json())
.then(data => {

    let bannerPokemon = document.querySelector('.pokemones');

    bannerPokemon.innerHTML = `
    <img src="${data.sprites.front_default}"/>
    <div class="datos-pokemon" >
        <h2>${data.name.toUpperCase()}</h2>
        <p class="frase-del-dia" >${frase}</p>
    </div>
    `
} )

/* Funcion para concretar la compra al presionar "pagar" en el formulario */

formularioPagos.addEventListener('submit', () => {
    carrito = [];
    guardarLocal();
    renderizarCarrito();
    alert('¡Compra exitosa!');
})

renderizarCarrito();

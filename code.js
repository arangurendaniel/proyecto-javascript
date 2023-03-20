/* variables globales */

// El icono del carrito de compras
const btnCart = document.querySelector('.icon-cart')

// Cada uno de los items dentro del carrito de compra
const rowProduct = document.querySelector('.row-product')

// El total a pagar, se muestra dentro de la tarjeta del carrito de compras (.container-cart-products)
const valorTotal = document.querySelector('.total-pagar');

// El contador que muestra el numero de items dentro del carrito
const countProducts = document.querySelector('#contador-productos'); 

// Este div contiene las diferentes tarjetas con los productos de la pagina
const productsList = document.querySelector('.container-items')

// Variable que contendrá o el arreglo de objetos del localStorage o un arreglo vacío
let allProducts = JSON.parse(localStorage.getItem("carrito")) || [];



/* Funciones del proyecto */

// Funcion para mostrar o esconder el carrito 
btnCart.addEventListener('click', () => {
    let containerCartProdcuts = document.querySelector('.container-cart-products')

    if (containerCartProdcuts.style.display === 'none') {
        containerCartProdcuts.style.display = 'block';
    } 
    else {
        containerCartProdcuts.style.display = 'none';
    }
} )

// Funcion para guardar el contenido del arreglo en el localStorage
const saveLocal = () => {
    localStorage.setItem("carrito" , JSON.stringify(allProducts));
};


// Funcion para agregar un producto al carrito a traves del boton "Añadir al carrito"
productsList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentNode

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').innerText,
            price: product.querySelector('p').innerText,

        }
/* Si el producto que se intenta agregar, ya se encuentra en el carrito, simplemente se aumenta la cantidad por 1, en caso contrario se agrega al carrito */

        const exists = allProducts.some(product => product.title === infoProduct.title)

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                }
                else {
                    return product
                }
            })
            allProducts = [...products]
        }
        else {
            allProducts = [...allProducts, infoProduct];
        }
    }
    showHTML();
    saveLocal();
})

/*Funcion que cuando se hace click en la "X" para eliminar un producto, lo elimina del arreglo, renderiza el carrito con el nuevo arreglo y lo sube al localStorage*/

rowProduct.addEventListener('click', e => {
    if(e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').innerText;

        allProducts = allProducts.filter( 
            product => product.title !== title)
    
            console.log(allProducts)
    };
    showHTML();
    saveLocal();
})

/* Funcion para mostrar al lado del icono del carrito de compra el numero de articulos en el carrito y subir el resultado al localStorage */
const allProductsCounter = () => {
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        totalOfProducts = totalOfProducts + product.quantity;
        localStorage.setItem("contadorDeProductos", JSON.stringify(totalOfProducts));

        countProducts.innerText = JSON.parse(localStorage.getItem("contadorDeProductos")) || 0;
    })
};

// Funcion para renderizar el arreglo y mostarlo en el carrito

const showHTML = () => {

    rowProduct.innerHTML = "";
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')
        containerProduct.innerHTML = 
        `
        <div class="cart-info-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <span class="titulo-producto-carrito">${product.title}</span>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <i class="fa-solid fa-xmark icon-close"></i>
        `
        rowProduct.append(containerProduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    })
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
    allProductsCounter();
}

showHTML();
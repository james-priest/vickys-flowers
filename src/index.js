import 'normalize.css';
import './styles.css';
import '@babel/polyfill';

/* CODE NOTES for Vicky's Flowers
 * Responsive menu button toggles a css class that triggers the 
 *  display or hiding of the responsive nav menu. 
 * Although jQuery simplifies drag and drop and offers cross-browser support, 
 *  HTML5 introduced this feature as part of the standard, so vanilla JS & DOM
 *  is used to reduce the footprint while still targeting older browsers.
 * The drop zone is defined as the entire cart container for better
 *  usability.
 * Babel polyfill is used for ES2015/ES2017 syntax not supported by IE.
 */ 

// Responsive Nav toggle
const toggleResponsiveNav = e => {
  e.preventDefault();
  const body = document.querySelector('body');
  if(body.className.split(' ').includes('responsive')) {
    body.classList.remove('responsive');
  } else {
    body.classList.add('responsive');
  }
};

// Drag and drop methods
const dragStart = e => {
  document.getElementById('cart').classList.add('dropzone');
  e.target.classList.add('dragging');
  const cost = e.target.getAttribute('data-product-cost');
  const quantityId = e.target.getAttribute('data-quantity-id');
  const quantity = document.getElementById(quantityId).value;
  const productData = {
    cost,
    quantity
  };
  e.dataTransfer.setData('text', JSON.stringify(productData));
};
const dragEnd = e => {
  document.getElementById('cart').classList.remove('dropzone');
  e.target.classList.remove('dragging');
};
const drop = e => {
  e.preventDefault();
  const productData = e.dataTransfer.getData('text');
  
  updateCart(JSON.parse(productData));
  setProductQuantities();
};
const allowDrop = e => {
  e.preventDefault();
};


// Randomize product quantities
const setProductQuantities = () => {
  const quantityControls = [...document.querySelectorAll('.product-select')];

  quantityControls.forEach(select => {
    const randomNum = Math.floor(Math.random() * 20) + 1; // random int 1-20
    select.value=randomNum;
  });
};

// Update Cart - Total and Quantity
const updateCart = ({ cost, quantity }) => {
  const cartTotalNode = document.getElementById('cart-total');
  const cartQtyNode = document.getElementById('cart-qty');

  cartTotalNode.innerText = (Number(cartTotalNode.innerText) + (cost * quantity)).toFixed(2);
  cartQtyNode.innerText = Number(cartQtyNode.innerText) + Number(quantity);
};

// Add Event Listeners
const init = () => {
  const menuIcon = document.querySelector('.menu-icon a');
  menuIcon.addEventListener('click', toggleResponsiveNav);
  
  const dropZone = document.querySelector('.cart-container');
  const products = [...document.querySelectorAll('.product-image')];

  products.forEach(product => {
    product.addEventListener('dragstart', dragStart);
    product.addEventListener('dragend', dragEnd);
  });
  
  dropZone.addEventListener('dragenter', allowDrop);
  dropZone.addEventListener('dragover', allowDrop);
  dropZone.addEventListener('drop', drop);

  setProductQuantities();
};

window.onload = init();
import 'normalize.css';
import './styles.css';
import '@babel/polyfill';

/* CODE NOTES for Vicky's Flowers
 * Responsive menu uses a toggle function to apply or remove a class
 *  that triggers css to display or hide the nav. 
 * jQuery simplifies drag and drop but since HTML5 introduced this as 
 *  part of the standard, vanilla JS & DOM is used to reduce footprint.
 * The drop zone is defined as the entire cart container for better
 *  usability.
 */ 

const toggleResponsiveNav = e => {
  e.preventDefault();
  const body = document.querySelector('body');
  if(body.className.split(' ').includes('responsive')) {
    body.classList.remove('responsive');
  } else {
    body.classList.add('responsive');
  }
};

const allowDrop = e => {
  e.preventDefault();
};

const dragStart = e => {
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
  console.log('dragEnd');
};

const drop = e => {
  e.preventDefault();
  const productData = e.dataTransfer.getData('text');
  console.log('productData', JSON.parse(productData));
  updateCart(JSON.parse(productData));
  setProductQuantities();
};

const setProductQuantities = () => {
  const quantityControls = [...document.querySelectorAll('.product-select')];

  quantityControls.forEach(select => {
    const randomNum = Math.floor(Math.random() * 20) + 1; // random int 1-20
    select.value=randomNum;
  });
};

const updateCart = ({ cost, quantity }) => {
  const cartTotalNode = document.getElementById('cart-total');
  const cartQtyNode = document.getElementById('cart-qty');

  console.log('cost', cost);
  console.log('quantity', quantity);
  console.log('cartTotalNode.innerText', cartTotalNode.innerText);
  cartTotalNode.innerText = (Number(cartTotalNode.innerText) + (cost * quantity)).toFixed(2);
  cartQtyNode.innerText = Number(cartQtyNode.innerText) + Number(quantity);
};

const init = () => {
  // Add Event Listeners
  const menuIcon = document.querySelector('.menu-icon a');
  menuIcon.addEventListener('click', toggleResponsiveNav);
  
  const dropZone = document.querySelector('.cart-container');
  const products = [...document.querySelectorAll('.product-image')];

  products.forEach(product => {
    product.addEventListener('dragstart', dragStart);
    // product.addEventListener('dragend', dragEnd);
  });
  


  dropZone.addEventListener('dragenter', allowDrop);
  dropZone.addEventListener('dragover', allowDrop);
  dropZone.addEventListener('drop', drop);

  setProductQuantities();
};

window.onload = init();
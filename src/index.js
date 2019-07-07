import 'normalize.css';
import './styles.css';

const toggleResponsiveNav = e => {
  e.preventDefault(); // prevent navigation  
  const body = document.querySelector('body');
  if(body.className.split(' ').includes('responsive')) {
    body.classList.remove('responsive');
    // console.log('remove responsive');
  } else {
    body.classList.add('responsive');
    // console.log('add responsive');
  }
};


const a = document.querySelector('.menu-icon a');
a.addEventListener('click', toggleResponsiveNav);
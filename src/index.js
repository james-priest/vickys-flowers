import 'normalize.css';
import './styles.css';

// document.getElementById('app').innerHTML = `
// <h1>Please Hire me!<br>I code good!😜😝</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
// document.getElementById('app').innerHTML = '<h1>Please Hire me!<br>I code good!😜😝</h1>';

// toggle .responsive class to show/hide menu
const toggle = e => {
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
// function toggle(e) {
//   e.preventDefault();
//   const nav = document.querySelector('body');
//   if(nav.className.split(' ').includes('responsive')) {
//     nav.classList.remove('responsive');
//     // console.log('remove responsive');
//   } else {
//     nav.classList.add('responsive');
//     // console.log('add responsive');
//   }
// }

const a = document.querySelector('.menu-icon a');
a.addEventListener('click', toggle);
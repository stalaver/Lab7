// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        //let postNum = 1;
        newPost.entry = entry;
        //newPost.onclick = function () {
        //  setState({name: 'Entry', post: postNum})
        //}
        //postNum += 1;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

window.addEventListener('popstate', (event) =>{
  history.back();
});

let settings_img = document.querySelector('img');
settings_img.addEventListener('click', () =>{
  setState({name: "Settings"});
});

let home = document.querySelector('');
home.addEventListener('click', () => {
  setState({name: "Home"});
})


// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      
      let postNum = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.onclick = function () {
         setState({name: 'Entry', post: postNum, entry: entry});
        }
        postNum = postNum + 1;
        document.querySelector('main').appendChild(newPost);
      });
    });
    setState({name: 'Home'});
});

//this.shadowroot.queryselector('journal-entry')[0];

window.addEventListener('popstate', (event) =>{
  if (event.state == null) {
    setState({name: "Home"});
  }
  else {
    setState(event.state.name);
  }
  //history.back();
});

let settings_img = document.querySelector('img');
settings_img.addEventListener('click', () =>{
  setState({name: "Settings"});
});

let home = document.querySelector('');
home.addEventListener('click', () => {
  setState({name: "Home"});
});


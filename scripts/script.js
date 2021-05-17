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
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

window.addEventListener('popstate', () =>{
  if (history.state == null) {
    setState({name: "Home"}, true);
  }
  else {
    setState(history.state, true);
  }
});

let settings_img = document.querySelector('img');
settings_img.addEventListener('click', () =>{
  setState({name: "Settings"}, false);
});

document.getElementsByTagName("h1")[0].addEventListener('click', () => {
  router.setState({name: "Home"}, false);
});

document.addEventListener('click', function(event) {
  let count = 0;
  if (event.target.tagName == "JOURNAL-ENTRY") {
    let entries = document.getElementsByTagName("JOURNAL-ENTRY");
    for (let i = 0; i < entries.length; i++) {
      if (entries[i] == event.target) {
        count = i + 1;
      }
    }
    setState(count, false);
  }
});

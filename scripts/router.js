//router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, back) {
  if (state.name == "Settings") {
    if (!back) {
      history.pushState(state, '', '/#settings');
    }
    document.getElementsByTagName('body')[0].className = 'settings';
    document.getElementsByTagName('h1')[0].innerHTML = state.name;
  }
  else if (state.name == "Home") {
    if (!back) {
      history.pushState(state, '', "/");
    }
    document.getElementsByTagName('body')[0].className = '';
    document.getElementsByTagName('h1')[0].innerHTML = 'Journal Entries';
  }
  else {
    if (!back) {
      history.pushState(state, '', '/#entry' + state); 
    }
    document.body.className = 'single-entry'; 
    document.getElementsByTagName('h1')[0].innerHTML = 'Entry ' + state; 
    document.getElementsByTagName('entry-page')[0].remove();
    let newEntry = document.createElement('entry-page');
    document.body.appendChild(newEntry);
    let curEntry = document.getElementsByTagName('journal-entry')[state - 1].entry;
    document.getElementsByTagName('entry-page')[0].entry = curEntry;
  }
}

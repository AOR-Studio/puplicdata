
// Record the starting content of your index page
const initialContent = document.getElementById('content').innerHTML;

// Save this as the very first entry in the history
window.history.replaceState({ isHome: true }, '', 'index.html');


function loadContent( fileName) {  
  fetch(fileName)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      // Tell the browser: "We just moved to a new state"
      window.history.pushState({ isHome: false, file: fileName }, '', fileName);
    })
    .catch(error => console.error('Error loading page:', error));
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.isHome) {
    // User went back to the start: Restore original index content
    document.getElementById('content').innerHTML = initialContent;
  } else if (event.state && event.state.file) {
    // User went back/forward to a specific page: Re-fetch it
    // Using a secondary function to avoid double-pushing history
    fetch(event.state.file)
      .then(r => r.text())
      .then(html => document.getElementById('content').innerHTML = html);
  }
});
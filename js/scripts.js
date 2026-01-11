function loadContent(fileName) {
  fetch(fileName)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => console.error('Error loading page:', error));
}
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.createElement('form');
    form.setAttribute('id', 'search-form');
    form.innerHTML = `
        <input type="text" id="search-query" placeholder="Search...">
        <button type="submit">Search</button>
    `;

    document.body.insertBefore(form, document.body.firstChild);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('search-query').value;
        if (query) {
            window.location.href = `http://127.0.0.1:5000/search-results?q=${encodeURIComponent(query)}`;
        }
    });
});

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const ENDPOINT = 'https://mac-torrent-download.net/';

function showLoaderForSearchButton() {
    $("#searchButton")
        .attr('disabled', true)
        .html(LOADING_SPINNER);
}

function hideLoaderForSearchButton() {
    $("#searchButton")
        .attr('disabled', false)
        .html('Search');
}
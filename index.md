---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: index
include_script: "./js/home.js"
---
<h1 class="text-center">Easy mac-torrent-download</h1>
<form id="searchForm">
    <div class="form-group">
        <label for="searchText">Search torrent</label>
        <input type="text" class="form-control" id="searchText" aria-describedby="searchTextHelp" autofocus="autofocus">
        <small id="searchTextHelp" class="form-text text-muted">Search the torrent here.</small>
    </div>
    <button type="submit" class="btn btn-primary" id="searchButton" disabled>Search</button>
</form>

<br/>
<table class="table">
    <thead>
        <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
</table>
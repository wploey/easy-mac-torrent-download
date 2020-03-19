---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: index
title: Find Password
before_script: https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
include_script: "./js/findPassword.js"
---
<h1 class="text-center">Find Password | Easy mac-torrent-download</h1>
<form id="findPasswordForm">
    <div class="form-group">
        <label for="passwordUrl">Add the password URL</label>
        <input type="text" class="form-control" id="passwordUrl" aria-describedby="passwordUrlHelp" autofocus="autofocus" required="required" placeholder="https://mac-torrent-download.net/pw.php?...">
        <small id="passwordUrlHelp" class="form-text text-muted">Search password here.</small>
    </div>
    <button type="submit" class="btn btn-primary" id="searchButton">Search</button>
    <br/><br/>
    <div class="alert alert-danger" role="alert" id="error-alert" style="display:none">
        Error getting the password from the given URL.
    </div>
</form>

<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Password</span>
  </div>
  <input type="text" class="form-control" id="password" readonly>
  <div class="input-group-append" id="button-addon">
    <button class="btn btn-outline-secondary" type="button" id="copy-button" data-clipboard-target="#password">Copy</button>
  </div>
</div>
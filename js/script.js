const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const ENDPOINT = 'https://mac-torrent-download.net/';
const LOADING_SPINNER = '<span class="spinner-border spinner-border-sm"></span> Loading...';

$(function() {

    let $tableBody = $("#tableBody");
    let newSearch = false;

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

    function showLoaderForLoadMoreButton() {
        $(".load-more")
            .attr('disabled', true)
            .html(LOADING_SPINNER);
    }

    function removeLoaderForLoadMoreButton() {
        $(".load-more")
            .first()
            .parents("tr")
            .remove();
    }

    function download(href, $button) {
        console.log('You should download this one:', href);
        $button
            .attr('disabled', true)
            .html(LOADING_SPINNER);

        $.get( CORS_ANYWHERE + href, function(data){
            let $data = $(data);
            let $th = $data.find("#postcontent > div.mv_box > div.mv_box_in > table > tbody > tr > th:contains('Hash')");
            let hash = $th.next().text();
            let magnetUrl = 'magnet:?xt=urn:btih:' + hash;
            console.log('The magnet url is: ' + magnetUrl);
            window.location.href = magnetUrl;
            $button
                .attr('disabled', false)
                .html('Download');
        });
    }

    function loadMoreElements(url) {
        if (newSearch) {
            showLoaderForSearchButton();
        } else {
            showLoaderForLoadMoreButton();
        }

        // Search for torrents in the given page
        $.get( CORS_ANYWHERE + url, function(data){
            // console.log('Response:', data);
            let $data = $(data);
            let elements = $data.find('.kanren.kanren-itiran dl');
            //console.log('Elements are the following:', elements);
            elements.each(function(index) {
                let $this = $(this);
                let $a = $this.find('a');
                let href = $a.attr('href');
                let image = $a.find('img').attr('src');
                let $newposts = $this.find('section span.newposts');
                let hasNewPosts = false;
                if ($newposts.length !== 0) {
                    hasNewPosts = true;
                }
                let date = $this.find("dd p").text();
                let $link = $this.find("dd a");
                let name = $link.text();
                //console.log(href, name, image, date, hasNewPosts);

                let $tr = $('<tr>')
                    .append($('<td>')
                    .append($('<img>')
                        .attr('src', image)
                        .attr('width', 80)
                        .attr('height', 80)
                    )
                );

                let linkHtml = name;
                if (hasNewPosts) {
                    linkHtml = '<span class="badge badge-danger">New!</span> ' + linkHtml;
                }

                $tableBody
                    .append($tr
                        .append($('<td>')
                            .append($('<a>')
                                .attr('href', href)
                                .html(linkHtml)
                            )
                        )
                        .append($('<td>')
                            .text(date)
                        )
                        .append($('<td>')
                            .append($('<button>')
                                .attr('type', 'button')
                                .addClass('btn btn-primary')
                                .on('click', function() {
                                    download(href, $(this));
                                })
                                .text('Download')
                            )
                        )
                    );
            });

            // Add a button to load more elements here
            let nextPageUrl = $data.find('#contentInner > div > article div.st-pagelink a.next.page-numbers')
                .attr('href');
            console.log('Next page url:', nextPageUrl);

            if (nextPageUrl) {
                $tableBody
                    .append($('<tr>')
                        .append($('<td colspan="4">')
                            .attr('align', 'center')
                            .append($('<button>')
                                .attr('type', 'button')
                                .addClass('btn btn-primary load-more')
                                .text('Load more')
                                .on('click', function() {
                                    newSearch = false;
                                    loadMoreElements(nextPageUrl);
                                })
                            )
                        )
                    );
            }

            if (newSearch) {
                hideLoaderForSearchButton();
            } else {
                removeLoaderForLoadMoreButton();
            }
        });
    }

    // Form submit handler
    $("#searchForm").submit(function( event ) {
        newSearch = true;
        event.preventDefault();
        console.log( "Handler for .submit() called." );
        showLoaderForSearchButton();

        // Hide the table resultsì
        $tableBody.empty();

        let searchText = $("#searchText").val();
        let parameters = { "s": searchText };
        let encodedParameters = $.param(parameters);

        loadMoreElements(ENDPOINT + '?' + encodedParameters);
    });

    // Trigger the submit button
    $("#searchForm").submit();
});
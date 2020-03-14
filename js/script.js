var CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
var ENDPOINT = 'https://mac-torrent-download.net/';

$(function() {

    function showLoader() {
        $("#searchButton")
            .attr('disabled', true)
            .html('<span class="spinner-border spinner-border-sm"></span> Loading...');
    }

    function hideLoader() {
        $("#searchButton")
            .attr('disabled', false)
            .html('Search');
    }

    // Form submit handler
    $("#searchForm").submit(function( event ) {
        event.preventDefault();
        console.log( "Handler for .submit() called." );
        showLoader();

        // Hide the table results
        let $tableResults = $("#tableResults");
        $tableResults.empty();

        let searchText = $("#searchText").val();

        // Search for torrents in the given page
        $.get( CORS_ANYWHERE + ENDPOINT, { "s": searchText }, function(data){
            // console.log('Response:', data);
            let elements = $(data).find('.kanren.kanren-itiran dl');
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
                console.log(href, name, image, date, hasNewPosts);
                // "<span class="badge badge-danger">Danger</span>"

                let $tr = $('<tr>')
                    .append($('<td>')
                    .append($('<img>')
                        .attr('src', image)
                    )
                );

                let linkHtml = name;
                if (hasNewPosts) {
                    linkHtml = '<span class="badge badge-danger">New!</span> ' + linkHtml;
                }

                $tableResults
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
                    );
                
                // TODO Add a button to load more elements here

                hideLoader();
            });
        });
    });
});
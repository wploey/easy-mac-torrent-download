const LOADING_SPINNER = '<span class="spinner-border spinner-border-sm"></span> Loading...';

$(function() {

    new ClipboardJS('#copy-button');

    function showErrorAlert() {
        $("#error-alert").show();
    }

    function loadPassword(passwordUrl) {
        console.log('URL from which retrieving the password:', passwordUrl);

        $.get( CORS_ANYWHERE + passwordUrl, function(data){
            newUrl = data.matches("atob\('(.*)'\)");

            // TODO Find the element in the first group

            // TODO Decode it using atob

            // TODO Access to the new URL

            // TODO Find the string like this 'alert-danger','value','bWFjLXRvcnJlbnQtZG93bmxvYWQubmV0X25xMQ=='];(function(

            // TODO Decode it using atob

            // TODO Print the password
            let $data = $(data);
            let $passwd = $data.find("#passwd");
            let $password = $("#password");

            let clazz = 'is-invalid';
            if ($passwd.length > 0) {
                clazz = 'is-valid';
                let password = $passwd.val();

                if (password) {
                    console.log('The password is: ' + password);
                    $password.val(password);
                } else {
                    clazz = 'is-invalid';
                    showErrorAlert();
                }
            } else {
                showErrorAlert();
            }

            $password.addClass(clazz);
            hideLoaderForSearchButton();
        }).fail(function(error) {
            console.log('Error retrieving the password');
            showErrorAlert();
            hideLoaderForSearchButton();
        });
    }

    // Form submit handler
    $("#findPasswordForm").submit(function( event ) {
        event.preventDefault();
        console.log( "Handler for .submit() called." );
        $("#error-alert").hide();
        $("#password")
            .removeClass('is-valid is-invalid')
            .val('');
        showLoaderForSearchButton();

        let passwordUrl = $("#passwordUrl").val();
        loadPassword(passwordUrl);
    });
});
/*jslint browser: true, sloppy: true, todo: true, devel: true, white: true */
/*global $, DOMParser, ActiveXObject, jQuery */

/*!
	jQuery HTML validation plugin
	(c) 2013 Parker Morse - http://pjmorse.github.io
*/

(function ( $ ) {
    // Helper functions
    var validation = function ( text ) {
        var xmlDoc, parser;
        if ( window.DOMParser ) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(text,"text/xml");
        } else { // Internet Explorer
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(text);
        }
        return xmlDoc;
    };

    // TODO: Wrap input in a <div></div> to ensure one container
    // TODO: Replace previous errors when updating #errors
    // TODO: What if there are no errors?
    // TODO: Parameterize errors container
    $.fn.validateHtml = function () {
        return this.filter('textarea').each( function () {
            var errors = validation( $( this ).val() );
            $('#errors').append( errors.children );
        });
    };
} ( jQuery ));
/*jslint browser: true, sloppy: true, todo: true, devel: true, white: true */
/*global $, DOMParser, ActiveXObject, jQuery */

/*!
	jQuery HTML validation plugin
	(c) 2013 Parker Morse for Concord Consortium - http://concord.org
*/

(function ( $ ) {
    var defaults = {
        errorDiv: '#errors'
    },

    // Helper functions
    validation = function ( text ) {
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

    $.fn.validateHtml = function () {
        return $( this ).each( function () {
            var errors = validation( '<div>' + $( this ).val() + '</div>' );
            if ($(errors).find('parsererror').length > 0) {
                // TODO: Customize this
                $(defaults.errorDiv).html( '<p style="padding: 3px; background-color: #ffcccc; border: 1px solid #ff0000; font-weight: bold; color: #bb3333;">There were parse errors in the HTML; please correct them before saving.</p>');
                $(defaults.errorDiv).append( '<div class="error-detail" style="display: none;"></div>');
                $(defaults.errorDiv + ' .error-detail').append( errors.children );
            } else {
                $(defaults.errorDiv).html('');
            }
        });
    };
} ( jQuery ));

$(document).ready(function () {
    $('textarea.validate-html').on('change', $(this).validateHtml);
});
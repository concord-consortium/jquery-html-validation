/*jslint browser: true, sloppy: true, todo: true, devel: true, white: true, nomen: true */
/*global $, DOMParser, ActiveXObject, jQuery */

/*!
	jQuery HTML validation plugin
	(c) 2013 Parker Morse for Concord Consortium - http://concord.org
*/


// Some patterns from https://github.com/jquery-boilerplate/jquery-boilerplate/
(function ( $, window ) { // document, undefined
	// Create the defaults once
	var pluginName = "validateHtml",
		defaults = {
            errorDiv: '#errors'
        };

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
        init: function () {
            return $( this ).each( function () {
                // FIXME: what's the element we're working on at this point?
                var errors = this.validation( '<div>' + $( this.element ).val() + '</div>' );
                if ($(errors).find('parsererror').length > 0) {
                    // TODO: Customize this
                    $(this.settings.errorDiv).html( '<p style="padding: 3px; background-color: #ffcccc; border: 1px solid #ff0000; font-weight: bold; color: #bb3333;">There were parse errors in the HTML; please correct them before saving.</p>');
                    $(this.settings.errorDiv).append( '<div class="error-detail" style="display: none;"></div>');
                    // This doesn't work in Firefox (24.0 tested) and Safari (6.1 tested) - nothing is appended
                    $(this.settings.errorDiv + ' .error-detail').append( errors.children );
                } else {
                    $(this.settings.errorDiv).html('');
                }
            });
        },
        // Helper functions
		validation: function (text) {
            var xmlDoc, parser;
            if ( window.DOMParser ) {
                // See https://developer.mozilla.org/en-US/docs/Web/API/DOMParser for more about the DOMParser object.
                // The XML format is most widely supported across browsers (IE 9+).
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(text,"text/xml");
                // If this is Chrome, we could try "text/html" for a more lenient parse.
            } else { // Internet Explorer
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(text);
            }
            return xmlDoc;
		}
	};

    $.fn[ pluginName ] = function ( options ) {
		return $( this ).each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			} else {
			    $.data( this, "plugin_" + pluginName ).init();
			}
		});
    };
} ( jQuery, window ));

$(document).ready(function () {
    // How do we keep this default behavior and still let the user hand in parameters ({ errorDiv: }) ?
    $('textarea.validate-html').on( 'change', $(this).validateHtml() );
});
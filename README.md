jQuery.html-validation
======================

*A jQuery plugin to validate HTML input*

This is a pretty simple idea: figure out if user input in a `textarea` form field is valid HTML before allowing it to go to the server.

How to use it
-------------

To validate the contents of a `<textarea>` tag whenever the `onchange` event is triggered, add a classname of "validate-html" to the textarea: `<textarea class="validate-html"></textarea>`.

If you provide an empty div near your HTML-accepting textarea, with the ID `#errors` (e.g. `<div id="errors"></div>`), the plugin will add an error message to that div if the HTML in the textarea has parse errors. It will also add an undisplayed div containing the error output of the parser.

How it works
------------

Under the hood, all this does is collect the contents of the `<textarea>` tag, wrap them in a single `<div></div>` for ease of parsing, and then try to use the browser's `DOMParser` object to build a DOM with that markup. (If your browser doesn't provide a `DOMParser` object, like IE<9, it tries to use a `Microsoft.XMLDOM` ActiveX object instead.) The plugin checks the returned object, and if it contains error messages, it puts those in the error container for the user. This is why the actual error messages are hidden by default; the parser's errors only make sense to people who are used to seeing them, and most end users will only find them confusing.
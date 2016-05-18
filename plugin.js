
CKEDITOR.plugins.add( 'codestyle', {
	// jscs:disable maximumLineLength
	lang: 'en,en-au,en-ca,en-gb,', // %REMOVE_LINE_CORE%
	// jscs:enable maximumLineLength
	icons: 'code', // %REMOVE_LINE_CORE%
	hidpi: false, // %REMOVE_LINE_CORE%
	init: function( editor ) {
		var order = 0;
		// All buttons use the same code to register. So, to avoid
		// duplications, let's use this tool function.
		var addButtonCommand = function( buttonName, buttonLabel, commandName, styleDefiniton ) {
				// Disable the command if no definition is configured.
				if ( !styleDefiniton )
					return;

				var style = new CKEDITOR.style( styleDefiniton ),
					forms = contentForms[ commandName ];

				// Put the style as the most important form.
				forms.unshift( style );

				// Listen to contextual style activation.
				editor.attachStyleStateChange( style, function( state ) {
					!editor.readOnly && editor.getCommand( commandName ).setState( state );
				} );

				// Create the command that can be used to apply the style.
				editor.addCommand( commandName, new CKEDITOR.styleCommand( style, {
					contentForms: forms
				} ) );

				// Register the button, if the button plugin is loaded.
				if ( editor.ui.addButton ) {
					editor.ui.addButton( buttonName, {
						label: buttonLabel,
						command: commandName,
						toolbar: 'basicstyles,' + ( order += 10 )
					} );
				}
			};

		var contentForms = {
				code: [
                    [ 'code' ]
				],
	        },
			config = editor.config,
			lang = editor.lang.codestyle;

		addButtonCommand( 'Code', lang.bold, 'code', config.coreStyles_code );
    }
} );

// Basic Inline Styles.

/**
 * The style definition that applies the **code** style to the text.
 *
 * Read more in the [documentation](#!/guide/dev_codestyle)
 * and see the [SDK sample](http://sdk.ckeditor.com/samples/codestyle.html).
 *
 *		config.coreStyles_bold = { element: 'code', overrides: 'pre' };
 *
 *		config.coreStyles_bold = {
 *			element: 'code',
 *			attributes: { 'class': 'language-php' }
 *		};
 *
 * @cfg
 * @member CKEDITOR.config
 */
CKEDITOR.config.coreStyles_code = {
    element: 'code',
    attributes: { 'class': 'language-php' }
};

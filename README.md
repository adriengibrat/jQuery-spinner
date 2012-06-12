jQuery-spinner
==============

Generate spinner using UTF8 html entities loop.

Demo: http://adriengibrat.github.com/jQuery-spinner

Usages examples:

$( '#content' )
	// Append spinner to element with spinner method
	.spinner()
	// Once content loaded, spinner is 'overwrited'
	.load( 'page.html' )
	// Add spinner 'manually'
	.prepend( $.spinner() )
	// Get spinner
	.find( '.spinner' )
	// Stop spinner
	.spinner( false )
	// Restart spinner
	.spinner( true );
// Automatically append spinner to body on every ajax call
$.spinner.ajax();
// Remove automatic spinner on ajax call
$.spinner.ajax( false );

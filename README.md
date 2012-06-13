jQuery-spinner
==============

Generate spinner using UTF8 html entities loop.

Demo: http://adriengibrat.github.com/jQuery-spinner

Usages examples:
```
$( '#content' )
	// Append custom spinner to element with spinner method
	.spinner( 2, 'dotspin' )
	// Once content loaded, spinner is 'overwrited'
	.load( 'page.html' )
	// Add default spinner 'manually'
	.prepend( $.spinner(  ) )
	// Get spinner with special selector
	.find( ':spinner' )
	// Stop spinner
	.spinner( false )
	// Restart spinner
	.spinner( true );
// Automatically append custom spinner to body on every ajax call
$.spinner.ajax( 1, 'dots' );
// Remove automatic spinner on ajax call
$.spinner.ajax( false );

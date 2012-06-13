/**
 * jQuery spinner v1.0.0
 * 
 * Author: Adrien Gibrat <adrien.gibrat@gmail.com>
 * 
 * Generate spinner using UTF8 html entities loop.
 * 
 * @todo: try to find a font/way to display all utf8 char in f**k'in IE
 * 
 * Usage exemples:
$( '#content' )
	// Append spinner to element with spinner method
	.spinner()
	// Once content loaded, spinner is 'overwrited'
	.load( 'page.html' )
	// Add custom spinner 'manually'
	.prepend( $.spinner( 2, 'dotspin' ) )
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
 */
// Better minification & namespace allow user to change plugin name easilly
( function ( $, namespace ) {
	// Generate spinner using UTF8 characters loop
	$[ namespace ] = $.extend( function( speed, frames, element ){
		// New spinner state
		var data = {
				frames  : $[ namespace ].style[ frames ] || frames || $[ namespace ].style[ 'circle' ]
				, speed : speed
				//, index : 0
			};
		// Set spinner state (data)
		element = $( element || '<b>' ).data( namespace, data );
		// Init new spinner if not already done (check className)
		! element.hasClass( namespace ) && element.addClass( namespace )
			// Allow simple rotation
			.bind( 'frame.' + namespace, function ( event, index ) {
				element
					.removeClass( namespace + '-frame' + data.index )
					.html( '&#' + data.frames[ data.index = index % data.frames.length || 0 ] + ';' )
					.addClass( namespace + '-frame' + data.index );
			} )
			// Start loop & set element state (data + className)
			.bind( 'loop.' + namespace, function ( event, speed, frames ) {
				element.trigger( 'stop' );
				data.speed  = speed  || data.speed;
				data.frames = frames || data.frames;
				element.addClass( namespace + '-speed' + data.speed )
				data.interval = setInterval( 
					function () { element.trigger( 'frame', data.index + 1 ); }
					, 1e3 / data.frames.length / ( data.speed || 1 )
				);
			} )
			// Stop loop & clean element state (data + className)
			.bind( 'stop.' + namespace, function () {
				clearInterval( data.interval );
				delete data.interval;
				element.removeClass( namespace + '-speed' + data.speed );
			} )
		// Rock & roll, baby!
		return element.trigger( 'loop' );
	} , {
		// Store various frames styles (utf8 codepoints to avoid encoding problems)
		style : {
			// What font in IE can display all utf8 chars: ◒◑◓◐◴◷◶◵◰◳◲◱▥▨▤▧◤◥◢◣◸◹◿◺⋮⋰⋯⋱⠁⠈⠐⠠⢀⡀⠄⠂⠐⠠⠄⠂⡀⡄⡆⡇⡏⡟⡿⣿⢿⢻⢹⢸⢰⢠⢀⡆⠇⠋⠙⠸⢰⣠⣄⡆⠖⠲⢰⣠⣄⊶⊷⠆⠒⠰⠤◻◼◇◆▹▸✧✦☆★⚐⚑❣➢➣◮◭◨◧◪◩⇆⇄⇅⇵⟵⟷⟶⟷⟸⟺⟹⟺⇐⇖⇑⇗⇒⇘⇓⇙⇦⬁⇧⬀⇨⬂⇩⬃⬅⬉⬆⬈➡⬊⬇⬋✶✷✹✺✹✷⟕⟗⟖⟗✢✣✤✣✎✏✐✏✓✔✗✘▏▎▍▌▋▊▉█▉▊▌▍▎▁▂▃▄▅▆▇█▇▆▅▄▃▂
			circle     : [9682,9681,9683,9680] // ◒◑◓◐
			, circle2  : [9716,9719,9718,9717] // ◴◷◶◵
			, square   : [9712,9715,9714,9713] // ◰◳◲◱
			//, grid     : [9637,9640,9636,9639] // ▥▨▤▧
			//, triad    : [9700,9701,9698,9699] // ◤◥◢◣
			//, triad2   : [9720,9721,9727,9722] // ◸◹◿◺
			, dotline  : [8942,8944,8943,8945] // ⋮⋰⋯⋱
			, lines    : [119062,119064,119066,119064] //𝄖𝄘𝄚𝄘
			, dotspin  : [10256,10272,10244,10242] // ⠐⠠⠄⠂
			, dotspin2 : [10241,10248,10256,10272,10368,10304,10244,10242] // ⠁⠈⠐⠠⢀⡀⠄⠂
			, dotsnake : [10304,10308,10310,10311,10319,10335,10367,10495,10431,10427,10425,10424,10416,10400,10368] // ⡀⡄⡆⡇⡏⡟⡿⣿⢿⢻⢹⢸⢰⢠⢀
			, dots     : [10310,10262,10290,10416,10464,10436] // ⡆⠖⠲⢰⣠⣄
			, dots2    : [10310,10247,10251,10265,10296,10416,10464,10436] // ⡆⠇⠋⠙⠸⢰⣠⣄
			, balance  : [8886,8887]   // ⊶⊷
			//, dots3      : [10246,10258,10288,10276] // ⠆⠒⠰⠤
			//, squarebw   : [9723,9724]   // ◻◼
			//, losangebw  : [9671,9670]   // ◇◆
			//, trianglebw : [9657,9656]   // ▹▸
			//, polestarbw : [10023,10022] // ✧✦
			//, starbw     : [9734,9733]   // ☆★
			//, flagbw     : [9872,9873]   // ⚐⚑
			//, heartbw    : [10082,10083] // ❢❣
			//, dfarrow    : [10146,10147] // ➢➣
			//, dftriangle : [9710,9709]   // ◮◭
			//, dfsquare   : [9704,9703]   // ◨◧
			//, dfstrip    :  [9706,9705]   // ◪◩
			, arrowsh  : [8646,8644]   //⇆⇄
			, arrowsv  : [8645,8693]   // ⇅⇵
			//, arrow2w  : [10229,10231,10230,10231] // ⟵⟷⟶⟷
			//, arrow2w2 : [10232,10234,10233,10234] // ⟸⟺⟹⟺
			//, arrow    : [8656,8662,8657,8663,8658,8664,8659,8665] // ⇐⇖⇑⇗⇒⇘⇓⇙
			//, arrow2   : [8678,11009,8679,11008,8680,11010,8681,11011] // ⇦⬁⇧⬀⇨⬂⇩⬃
			//, arrow3   : [11013,11017,11014,11016,10145,11018,11015,11019] // ⬅⬉⬆⬈➡⬊⬇⬋
			//, branches : [10038,10039,10041,10042,10041,10039] // ✶✷✹✺✹✷
			//, join     : [10197,10199,10198,10199] // ⟕⟗⟖⟗
			//, blob     : [10018,10019,10020,10019] // ✢✣✤✣
			, pen      : [9998,9999,10000,9999] // ✎✏✐✏
			//, tick     : [10003,10004] // ✓✔
			//, cross    : [10007,10008] // ✗✘
			//, vbar     : [9615,9614,9613,9612,9611,9610,9609,9608,9609,9610,9612,9613,9614] //▏▎▍▌▋▊▉█▉▊▌▍▎
			//, hbar     : [9601,9602,9603,9604,9605,9606,9607,9608,9607,9606,9605,9604,9603,9602] // ▁▂▃▄▅▆▇█▇▆▅▄▃▂
		}
		// Automatically append spinner to body on every ajax request
		, ajax : function ( speed, frames ) {
			// Use unique spinner for ajax
			var element = this._ajax = this._ajax || this( speed, frames ).trigger( 'stop' ).addClass( namespace + '-ajax' );
			speed === false ? 
				// Unbind ajax spinner if first argument is false 
				$( document ).off( 'ajaxStart.' + namespace + ' ' + 'ajaxStop.' + namespace ) :
				// Ajax spinner binding
				$( document )
					// Append active spinner on ajax requests start
					.on( 'ajaxStart.' + namespace, function () {
						$( 'body' ).append( element.trigger( 'loop' ) );
					} )
					// Stop & remove spinner on ajax resquests end
					.on( 'ajaxStop.' + namespace, function () {
						element.trigger( 'stop' ).detach();
					} );
			// Allow user to curry the spinner
			return element;
		}
	} );
	// Append spinner to Dom or control it
	$.fn[ namespace ] = function ( speed, frames ) {
		return this.each( function () {
			var self = $( this );
			self.hasClass( namespace ) ?
				$.type( speed ) == 'boolean' ? 
					// Loop or stop existing spinner
					self.trigger( speed ? 'loop' : 'stop' ) :
					// Reset existing spinner
					self.trigger( 'loop', speed, frames ) :
				// Append new spinner
				self.append( $[ namespace ]( speed, frames ) );
		} );
	};
	// Add :spinner() selector, use boolean to filter spinning or not, use integer to filter by speed
	$.expr[':'].spinner = function ( element, index, match ) {
		var param  = match[ 3 ]
			, data = $.data( element, namespace );
		return ! data ? 
			false :
			! param ? 
				!! data :
				$.isNumeric( param ) ?
					data.speed == param :
					(/^true$/i).test( param ) == !! data.interval;
	}
} ) ( jQuery, 'spinner' );

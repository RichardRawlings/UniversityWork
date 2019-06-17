local composer = require( "composer" )

display.setStatusBar( display.HiddenStatusBar )

--Creates the Random Number Generator using the time
math.randomseed( os.time() )

--Audio Volume Control
audio.reserveChannels(0)
audio.setVolume( 0.2, { channel=0 } )

composer.gotoScene( "menu" )

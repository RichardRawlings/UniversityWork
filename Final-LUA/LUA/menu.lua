local composer = require( "composer" )
local scene = composer.newScene()



local musicTrack
local function StartGame()
	composer.gotoScene( "game", { time=1500, effect="slideDown" } )
end
local function CheckHighscores()
	composer.gotoScene( "highscores", { time=1500, effect="slideUp" } )
end




function scene:create(event)

	local sceneGroup = self.view

	--Initialises Background and centres the image on specified dimensions
	local background = display.newImageRect(sceneGroup, "background.png", 800, 1400 )
	background.x = display.contentCenterX
	background.y = display.contentCenterY

	--Uses and Positions the title image at the top of the menu 
	local title = display.newImageRect( sceneGroup, "title.png", 550, 95 )
	title.x = display.contentCenterX
	title.y = 220

	--Visuals for the Game & Highscores directors
	local playButton = display.newText( sceneGroup, "Play", display.contentCenterX, 660, native.systemFontBold, 90 )
	local highScoresButton = display.newText( sceneGroup, "High Scores", display.contentCenterX, 850, native.systemFontBold, 45 )
	
	--Moves the user to their selected areas of the program. Directing them either to the game itself or their highscores.
	playButton:addEventListener( "tap", StartGame )
	highScoresButton:addEventListener( "tap", CheckHighscores )

	--Simple looping music
	musicTrack = audio.loadStream( "audio/LoopingSound.wav" )
end


function scene:show( event )

	--This entire function serves to setup the scene, including the setup of music. The If Else ensures it plays at the correct time
	local sceneGroup = self.view
	local phase = event.phase


	if ( phase == "will" ) then

	elseif ( phase == "did" ) then
		audio.play( musicTrack, { channel=1, loops=-1 } )


	end
end


function scene:hide( event )

	--Same as last function except this works in the reverse. Manages closing the scene
	local sceneGroup = self.view
	local phase = event.phase

	if ( phase == "will" ) then

	elseif ( phase == "did" ) then
		audio.stop( 1 )


	end
end


function scene:destroy( event )

	local sceneGroup = self.view
	audio.dispose( musicTrack )

end


scene:addEventListener( "create", scene )
scene:addEventListener( "show", scene )
scene:addEventListener( "hide", scene )
scene:addEventListener( "destroy", scene )


return scene

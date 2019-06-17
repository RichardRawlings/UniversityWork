local composer = require( "composer" )
local scene = composer.newScene()
local json = require( "json" )
local scoresTable = {}
local filePath = system.pathForFile( "scores.json", system.DocumentsDirectory )
local musicTrack


-- The Highscores are recorded after each attempt, keeping track of the top 8
local function loadScores()

	--Opens and closes the file path
	local file = io.open( filePath, "r" )
	if file then
		local contents = file:read( "*a" )
		io.close( file )
		scoresTable = json.decode( contents )
	end

	if (scoresTable == nil or #scoresTable == 0) then
		scoresTable = { 0, 0, 0, 0, 0, 0, 0, 0,}
	end
end


local function saveScores()

	for i = #scoresTable, 9, -1 do
		table.remove( scoresTable, i )
	end

	local file = io.open( filePath, "w" )

	if file then
		file:write( json.encode( scoresTable ) )
		io.close( file )
	end
end


local function gotoMenu()
	composer.gotoScene( "menu", { time=1500, effect="slideUp" } )
end


-- -----------------------------------------------------------------------------------
-- Scene event functions
-- -----------------------------------------------------------------------------------

-- create()
function scene:create( event )

	local sceneGroup = self.view
	-- Code here runs when the scene is first created but has not yet appeared on screen

	-- Load the previous scores
	loadScores()

	-- Insert the saved score from the last game into the table
	table.insert( scoresTable, composer.getVariable( "finalScore" ) )
	composer.setVariable( "finalScore", 0 )

	-- Sort the table entries from highest to lowest
	local function compare( a, b )
		return a > b
	end
	table.sort( scoresTable, compare )

	-- Save the scores
	saveScores()

	local background = display.newImageRect( sceneGroup, "background.png", 800, 1400 )
	background.x = display.contentCenterX
	background.y = display.contentCenterY

	local highScoresHeader = display.newText( sceneGroup, "High Scores", display.contentCenterX, 100, native.systemFontBold, 60 )

	--Lists the 2nd to the 8th high score
	for i = 2, 8 do
		if ( scoresTable[i] ) then
			--Ensures that each high score is listed beneath one another by adding 62 Y axis positioning between them
			local yPos = 230 + ( i * 62 )
			--Simply lists through each score, adding 1) 2) 3) etc. to each score.
			local rankNum = display.newText( sceneGroup, i .. ")", display.contentCenterX-50, yPos, native.systemFont, 42)
			rankNum:setFillColor( 1 )
			rankNum.anchorX = 1

			local thisScore = display.newText( sceneGroup, scoresTable[i], display.contentCenterX-30, yPos, native.systemFont, 42 )
			thisScore.anchorX = 0
		end
	end

	--Ensures that the highest score is larger, and Bolder than the other high scores
	for i = 1, 1 do
		if ( scoresTable[i] ) then
			local yPos = 240

			local rankNum = display.newText( sceneGroup, i .. ")", display.contentCenterX-80, yPos, native.systemFontBold, 80)
			rankNum:setFillColor( 1 )
			rankNum.anchorX = 1

			local thisScore = display.newText( sceneGroup, scoresTable[i], display.contentCenterX-60, yPos, native.systemFontBold, 80 )
			thisScore.anchorX = 0
		end
	end
	--Button to return to the menu from the Highscore Page
	local menuButton = display.newText( sceneGroup, "Menu", display.contentCenterX, 880, native.systemFontBold, 50 )
	menuButton:setFillColor( 0.75, 0.78, 1 )
	menuButton:addEventListener( "tap", gotoMenu )

	musicTrack = audio.loadStream( "audio/HighscorePage.wav" )
end



function scene:show( event )

	local sceneGroup = self.view
	local phase = event.phase

	if ( phase == "will" ) then

	elseif ( phase == "did" ) then
		audio.play( musicTrack, { channel=1, loops=-1 } )
	end
end



function scene:hide( event )

	local sceneGroup = self.view
	local phase = event.phase

	if ( phase == "will" ) then

	elseif ( phase == "did" ) then
		audio.stop( 1 )
		composer.removeScene( "highscores" )
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

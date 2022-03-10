import Board from "./Board";
import GameControls from "./Game_controls";

function Game(props){

    /** @mode 
     * @white
     * @black
     */
    
    return <div className="container" id="game-layout">
            <GameControls/>
            <div id="board-container">
                <Board gameState={{...props}} />
            </div>
        </div>;
}

export default Game;
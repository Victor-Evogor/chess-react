import Game from "./Game";
import MainSubMenu from "./MainSubMenu";


function LoadSubMenu({action}){
    let gameState,gameSession;

    /* 
    Game State
    {
        Board: board string in 2d ,
        Mode: <pvp>|<pvc> ,
        White: <hu> | <ai> ,
        black: <hu> | <ai>,
        activePlayer: <hu> | <ai>
    }
    */

    function handleWatchInput(e){
        e.preventDefault();
        try{
            gameSession=JSON.parse(gameSession);
            if(!gameSession.initial) return;
            if(!gameSession.history) return;
            if(!window.game.validate_fen(gameSession.initial).valid){
                return;
            }
        }catch(error){
            return;
        }
        console.log(gameSession);

        window.setMenu(<Game position={gameSession.initial} watch={true} moves={gameSession.history}/>)
    }
    function handleLoadInput(e){

        e.preventDefault();
        try{
            gameState=JSON.parse(gameState);
            if(!gameState.position) {
                return;
            }
            if(!window.game.validate_fen(gameState.position).valid){
                return;
            }
        }catch(error){
            return;
        }

        window.setMenu(<Game {...gameState} />)
    }

    

    let actionMap={
        "new":
        <>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setSubMenu(<LoadSubMenu action={"singlePlayer"}/>)} >Single Player</div>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setMenu(<Game mode={"pvp"} white={"hu"} black={"hu"} position={"start"}/>)}>Two Player</div>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={toMainMenu}>Back To Main Menu</div>
        </>,

        "load":
        <>
        <form onSubmit={handleLoadInput} id="load-game">
        <input className="btn btn-large btn-primary p-3 fs-4 btn-block w-100 mb-4" type="submit" value={"Load Game"}/>
        <input placeholder="Paste Game Session String Here..." className="form-control fs-4" onChange={(e)=>{gameState=e.target.value}} id="game-state-input"/>
        </form>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={toMainMenu}>Back To Main Menu</div>
        </>,

        "watch":
        <>
        <form onSubmit={handleWatchInput} id="watch-game">
        <input className="btn btn-large btn-primary p-3 fs-4 btn-block w-100 mb-4" type="submit" value={"Watch Game"}/>
        {/*ref={input=>gameSession=input.value} */}
        <input placeholder="Paste Game Session String Here..." className="form-control fs-4" onChange={(e)=>{gameSession=e.target.value}} id="game-session-input"/>
        </form>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={toMainMenu}>Back To Main Menu</div>
        </>,

        "singlePlayer":
        <><div className="btn btn-large btn-default  fs-2 fw-bold text-light" >PLAY AS:</div>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setMenu(<Game mode={"pvc"} white={"hu"} black={"ai"} position={"start"}/>)}>White</div>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setMenu(<Game mode={"pvc"} white={"ai"} black={"hu"} position={"start"}/>)}>Black</div>
        <div className="btn btn-large btn-primary p-3 fs-4" onClick={toMainMenu}>Back To Main Menu</div>
        </>
    }

    return (
        <div className="main-sub-menu">
            {actionMap[action]}
        </div>
    );
}

function toMainMenu(){
    window.setSubMenu(<MainSubMenu/>);
}

export default LoadSubMenu;
import react from "react";
import Main from "./Main";


function Info ({text}){
    return  <div>{text}</div>
}

function copy(txt){
    let area = document.getElementById("txt");
    area.value=txt;
    area.focus();
    area.select();
    try {
        document.execCommand("copy");
    } catch (error) {
        console.log("Your Browser is bullshit");
    }    
}

class GameControls extends react.Component{


    unDo(){
        window.Board.setState({dialogBox:{visbility:false}});
        window.game.undo();
        window.board.setPosition(window.game.fen());
        window.updatePlayer(true);
    }

    restart(){
        window.game.reset();
        window.board.setPosition("start");
        window.updatePlayer();
        window.Board.setState({dialogBox:{visbility:false}});
    }

    saveGame(){


        let state=JSON.stringify({position:window.game.fen(),white:window.game.white,mode:window.game.mode});
        if(navigator.clipboard)
            navigator.clipboard.writeText(state);
        else
            copy(state);
        
        console.log(state);
        window.Board.setState({dialogBox:{visible:true,text:<Info text={"Game State Copied To ClipBoard"}/>}});
        setTimeout(()=>window.Board.setState({dialogBox:false}),2000);
    }

    

    saveSession(){
        const session={history:window.game.history(),initial:window.game.startingPosition}
        console.log(session);
        if(navigator.clipboard)
            navigator.clipboard.writeText(JSON.stringify(session));
        else
            copy(JSON.stringify(session));
        window.Board.setState({dialogBox:{visible:true,text:<Info text={"Game Session Copied To ClipBoard!"}/>}});
        setTimeout(()=>window.Board.setState({dialogBox:false}),2000);
    }

    render(){
        return <div id="game-controls" style={{
            display: "flex",
            justifyContent:"center"
        }}>
            <button className="btn btn-primary mx-1 my-1 btn-large " onClick={this.saveGame}>Save Game</button>
            <button className="btn btn-primary mx-1 my-1 btn-large " onClick={this.saveSession}>Save Session</button>
            <button onClick={()=>window.setMenu(<Main/>)} className=" btn-large btn btn-primary mx-1 my-1">Main Menu</button>
            <button className="btn btn-primary mx-1 my-1 btn-large " onClick={this.unDo}>Undo</button>
            <button className="btn btn-primary mx-1 my-1 btn-large " onClick={this.restart}>Restart</button>
        </div>
    }
}

export default GameControls;
import Chess from "chess.js";
import {Chessboard,COLOR,BORDER_TYPE,MARKER_TYPE,INPUT_EVENT_TYPE} from "cm-chessboard";
import "cm-chessboard/assets/styles/cm-chessboard.css";
import Promotion from "./Promotion";
import react from "react";
import DialogBox from "./DialogBox";
import {aiMove} from "js-chess-engine";

window.Chessboard = Chessboard;
window.chess = Chess;
window.aiMove=aiMove;


const game = new Chess();

window.game=game;

function EndDisplay({children}){
    return <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    }}>{children}</div>
}

class Board extends react.Component{
    
    constructor(props){
        super(props);
        this.state={dialogBox:{visible:false,text:<Promotion color={'w'}/>}};
        window.Board=this;
    }
    
    componentDidMount(){
        let {gameState} = this.props;
        console.log(gameState);
        let {white,position,mode,watch,moves} = gameState;
        let twoPlayer=(mode == "pvc")?false:true;
        let ai;
        if(!twoPlayer){
            ai = (white == "hu")?"b":"w";
        }
        let iniP="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        console.log(position);
        let counter;
        if(moves){
            counter=0;
        }
        updatePlayer=updatePlayer.bind(this);
        pawnPromotion=pawnPromotion.bind(this);


        game.load((position==="start")?iniP:position);
        game.startingPosition = (position === "start")?iniP:position;
        game.mode=mode;
        game.white=white;
        const foo = new Map([["hu",COLOR.white],["ai",COLOR.black]]);
        const config =  {
            position: game.fen(), // set as fen, "start" or "empty"
            orientation: foo.get(white), // white on bottom
            style: {
                cssClass: "default",
                showCoordinates: true, // show ranks and files
                borderType: BORDER_TYPE.frame, // thin: thin border, frame: wide border with coordinates in it, none: no border
                aspectRatio: 1, // height/width. Set to `undefined`, if you want to define it only in the css.
                moveFromMarker: MARKER_TYPE.frame, // the marker used to mark the start square
                moveToMarker: MARKER_TYPE.frame // the marker used to mark the square where the figure is moving to
            },
            responsive: true, // resizes the board based on element size
            animationDuration: 300, // pieces animation duration in milliseconds
            sprite: {
                url: "./images/chessboard-sprite-staunty.svg", // pieces and markers are stored as svg sprite
                size: 40, // the sprite size, defaults to 40x40px
                cache: true // cache the sprite inline, in the HTML
            }
        }
    

        const board = new Chessboard(document.getElementById("board"),config);
        window.board= board;

        function moveHandler(event){
            switch (event.type) {
                case INPUT_EVENT_TYPE.moveStart:
                    
                    // return `true`, if input is accepted/valid, `false` aborts the interaction, the piece will not move
                    return true;
                case INPUT_EVENT_TYPE.moveDone:

                    const valid = game.move(event.squareFrom+event.squareTo,{sloppy:true});
                    
                    // return true, if input is accepted/valid, `false` takes the move back
                    if(valid){
                        checkForCastle(valid.san);
                        if(valid.flags === 'e'){
                            enPassant(valid.to);
                        }
                        if(valid.flags ==="np" || valid.flags ==="cp"){
                            console.log("test correct")
                            pawnPromotion(valid);
                        }else{
                            if(twoPlayer)
                            updatePlayer();
                            else{

                                setTimeout(()=>{
                                    if(!gameEnded())
                                    computerPlay();
                                    updatePlayer();
                                },1100);
                            }
                        }
                        console.log(valid);

                        return true;
                    }
                    else 
                    return false;

                case INPUT_EVENT_TYPE.moveCanceled:
                    console.log(`moveCanceled`);
            }
        }

        
        if(!watch){
            if(white === "hu")
            updatePlayer();
            else{
                computerPlay();
                updatePlayer();
            }
        }else{
            setTimeout(watchMoves,1000);
        }

        function computerPlay() {
            board.disableMoveInput();
            let aiPlay = aiMove(game.fen());
            let arr= Object.keys(aiPlay).concat(Object.values(aiPlay));
            game.move(arr[0].toLowerCase()+arr[1].toLowerCase(),{sloppy:true});
            setTimeout(()=>{
                board.setPosition(game.fen());
            },300);
            console.log(arr);
        }

        function watchMoves(){
            game.move(moves[counter]);
            board.setPosition(game.fen());
            counter++;
            if(counter == moves.length){
                console.log(counter,"finished");
                return;
            }
            setTimeout(watchMoves,(Math.ceil(Math.random()*3)+1)*1000);
        }

        function gameEnded(){
            if(game.in_checkmate()){
                return {loser:game.turn(),type:"checkmate"};
            }
            if(game.in_stalemate()){
                return {type:"stalemate"};
            }
            if(game.in_threefold_repetition()){
                return {type:"tfr"};
            }
            if(game.insufficient_material()){
                return {type:"ism"}
            }
            return false;
        }

        console.log(gameEnded());


        window.updatePlayer = updatePlayer;

        function updatePlayer(undo=false){
            const p = game.turn();
            const bar = new Map([['b',COLOR.black],['w',COLOR.white]]);
            if(undo && mode == "pvc"){
                if(game.turn() == ai){
                    computerPlay();
                    updatePlayer();
                }
            }else
            board.enableMoveInput(moveHandler,bar.get(p));
            let end = gameEnded();
            if(end){
                board.disableMoveInput();
                let endR;
                switch (end.type) {
                    case "checkmate":
                        const winner=(end.loser=="b")?"White":"Black";
                        endR=<><h1>Checkmate!</h1><div>{winner} Wins</div></>
                        break;
                    case "stalemate":
                        endR=<><h1>StaleMate!</h1></>
                        break;
                    case "tfr":
                        endR=<><h1>Three fold repetition</h1><div>Draw due to three fold repetition</div></>
                        break;
                    default:
                        endR=<><h1>Draw!</h1><div>Draw due to insufficient material</div></>
                        break;
                }
                this.setState({dialogBox:{visible:true,text:<EndDisplay>{endR}</EndDisplay>}});
                
            }
        }

        function checkForCastle(san){
            if(san ==="O-O"){
                if(game.turn()==='b'){
                    board.movePiece("h1","f1");
                }else{
                    board.movePiece("h8","f8");
                }
            }else if(san ==="O-O-O"){
                if(game.turn()==='b'){
                    board.movePiece("a1","d1");
                }else{
                    board.movePiece("a8","d8");
                }
            }
            return;
        }

        function enPassant(to){
            if(game.turn()==='b'){
                let bar = to.split("");
                --bar[1];
                bar=bar.join("");
                board.setPiece(bar,null);
            }else{
                let bar = to.split("");
                ++bar[1];
                bar=bar.join("");
                board.setPiece(bar,null);
            }
        }

        function pawnPromotion({to,color}){
            this.setState({dialogBox:{visible:true,text:<Promotion revert={unSet} color={color}/>}});
            let gThis=this;
            board.disableMoveInput();
            
            function unSet(peice){
                let {color,type} = peice;
                gThis.setState({dialogBox:false});
                board.setPiece(to,color+type);
                game.put(peice,to);
                updatePlayer();
            }
        }
    }

    

    render(){
        return <><div id="board" ></div><DialogBox {...this.state.dialogBox}/></>
    }
}

export default Board;
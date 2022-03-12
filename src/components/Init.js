import piano1 from "../res/piano1.mp3";
import piano2 from "../res/piano2.mp3";
import piano3 from "../res/piano3.mp3";
import Main from "./Main";
import react from "react";


class Init extends react.Component{

  componentDidMount(){
    document.onkeydown = (key)=>{
      if(key.key =="Enter"){
        handleClick()
      }
    }
  }

  

  render(){
    return <div id="init" className="d-grid"><button onClick={handleClick} id="switch-btn" className="btn btn-large btn-primary p-3">Start Game</button></div>
  }
}

function handleClick(){
    window.setMenu(<Main/>);
    enterFullScreen();
    enterLandScape();
    startMusic();
}



async function enterFullScreen(){
    if(document.fullscreenEnabled){
      await document.body.requestFullscreen({ navigationUI: 'hide' }).catch((err)=>{
        if(err) console.log(err);
      });
    }
}

function enterLandScape() {
  if(window.screen && window.screen.orientation){
    if(window.screen.orientation.type == "portrait-primary" || window.screen.orientation.type == "portrait-secondary"){
      try{
        window.screen.orientation.lock("landscape");
      }catch(e){

      }
    }
  }else{
    if(window.innerWidth < 400)
    document.body.id="old-browser";
    console.log("You won't have the best experience because of your browser ")
  }
    
}

function startMusic() {
    let musicList=[piano1,piano2,piano3];
    let n=0;
    let music = new Audio(musicList[n]);
    music.load();
    music.play();
    music.onended=()=>{
        n++;
        music.src=[musicList[n%musicList.length]];
        music.load();
        music.play();
    }

    const keyCombinationsConfig=[
        [JSON.stringify([true,'F']),enterFullScreen],
        [JSON.stringify([true,'P']),toggleMusic],
       
    ];
    
      let keyCombinations = new Map(keyCombinationsConfig);
    
      document.onkeydown=(key)=>{
        let combo=JSON.stringify([key.shiftKey,key.key]);
        if(keyCombinations.has(combo)){
          keyCombinations.get(combo)();
        }
      }
    
    function toggleMusic() {
        if(music.paused){
            music.play();
        }else{
            music.pause();
        }
    }
}




export default Init;
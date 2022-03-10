import LoadSubMenu from "./LoadSubMenu";


function MainSubMenu() {
    return (
        <div className="main-sub-menu">
            <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setSubMenu(<LoadSubMenu action={"new"}/>)}>New Game</div>
            <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setSubMenu(<LoadSubMenu action={"load"}/>)}>Load Game</div>
            <div className="btn btn-large btn-primary p-3 fs-4" onClick={()=>window.setSubMenu(<LoadSubMenu action={"watch"}/>)}>Watch Game</div>
        </div>
    );
}



export default MainSubMenu;
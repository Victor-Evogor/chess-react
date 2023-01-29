import Init from "./Init";






function App(){
    let [activeMenu,setMenu]=window.useState(<Init/>);

    window.setMenu=setMenu;
    window.activeMenu=activeMenu;
    return (
        <>

        <div id="attribution">
        <p>This project was made by <a href="https://linktr.ee/victorevogor" target="_blank" rel="noreferrer">Victor Evogor</a></p>
        </div>
        
        <div id="background">
            <div className="container">
                {activeMenu}
            </div>
        </div>
        </>
    )
}

export default App;
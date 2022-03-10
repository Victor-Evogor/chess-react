import Init from "./Init";






function App(){
    let [activeMenu,setMenu]=window.useState(<Init/>);

    window.setMenu=setMenu;
    window.activeMenu=activeMenu;
    return (
        <div id="background">
            <div className="container">
                {activeMenu}
            </div>
        </div>);
}

export default App;
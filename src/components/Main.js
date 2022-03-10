import BigLeft from "./Big_Left";
import SubMenu from "./SubMenu";

function Main(){
    return (
        <div id="main" >
            <div id="main-sub">
                <div id="main-menu" className="row mt-3">
                    <div className="col-6">
                        <BigLeft/>
                    </div>
                    <div className="col-6">
                        <SubMenu/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
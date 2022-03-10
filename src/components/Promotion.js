import {Component} from "react"
import Peices from "./Peices";

class Promotion extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        
        return <div>
            <div>Select Peice</div>
            <Peices {...this.props}/>
        </div>
    }
}

export default Promotion
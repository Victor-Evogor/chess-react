import {Component} from "react";


class DialogBox extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return <div id="modal" style={{
            display: this.props.visible?"block":"none"
                 }} className={"bg-info p-3 fs-3 "}>
            <div>{this.props.text}</div>
        </div>
    }
}

export default DialogBox;
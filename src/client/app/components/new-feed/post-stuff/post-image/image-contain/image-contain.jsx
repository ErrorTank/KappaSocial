import React from "react";

export class ImgContain extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {url}=this.props;
        return(
            <div className="img-contain">
                <img src={url}/>
            </div>
        );
    }
}
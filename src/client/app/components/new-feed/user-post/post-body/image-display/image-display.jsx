import React from "react";

export class ImageDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {list}=this.props;
        let l=list.length;
        return(
            <div className="img-display row col-12">
                {list.map((src,i)=>(
                    <div className={`img-preview ${(l===1 || (i===2 && l===3)) ? "col-12 big-image" : "col-6 small-image"} p-0`}
                         key={i}
                    >
                        <img src={src}/>
                    </div>
                ))}
            </div>
        );
    }
}
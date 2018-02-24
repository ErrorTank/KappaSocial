import React from "react";

export class PostLoading extends React.Component{
    constructor(props){
        super(props);
    };
    componentDidMount(){
        for(let i=0;i<$(".circle-wrapper li").length;i++){
            setTimeout(()=>{
                $($(".circle-wrapper li")[i]).addClass("wave");
            },180*i);

        }
      console.log();
    };
    render(){
        return(
            <div className="post-loading">
                <ul className="circle-wrapper">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
}
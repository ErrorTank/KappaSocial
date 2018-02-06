import React from "react";
import ReactDOM from "react-dom";
export class ClickOutside extends React.Component {

    constructor(props) {
        super(props);


    }

    cancelClickOutside = null;

    componentWillUnmount(){
        if(this.cancelClickOutside) {
            this.cancelClickOutside();
            this.cancelClickOutside = null;
        }
    };

    componentDidMount() {
        this.cancelClickOutside = this.clickOutside();
    }

    clickOutside = () => {
        let clickFunc = (e) => {
            let elem = ReactDOM.findDOMNode(this);
            if(!elem || !elem.contains(e.target)) {
                this.props.onClickout();
            }
        };
        window.addEventListener('click', clickFunc);

        return () => {
            window.removeEventListener('click', clickFunc);
        };
    };

    render() {
        return React.Children.only(this.props.children);
    }
}
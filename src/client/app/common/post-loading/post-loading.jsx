import React from "react";

let timeout = [];

export class PostLoading extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        for (let i = 0; i < $(".circle-wrapper li").length; i++) {
            timeout[i] = setTimeout(() => {
                $($(".circle-wrapper li")[i]).addClass("wave");
            }, 180 * i);

        }
        console.log();
    };

    componentWillUnmount() {
        timeout.forEach((t) => clearTimeout(t));
    };

    render() {
        return (
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
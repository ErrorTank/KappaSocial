import React from "react";
import {TransitionGroup} from "react-transition-group";
import _ from "lodash";
import {Fade} from "../animation/fade";

export class ModalRegistry extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalList:[]
        };

        modals.openModal = (options) => {
            let modalOptions = {
                options,
                resolve: null
            };

            this.state.modalList.push(modalOptions);
            this.forceUpdate();
            let result = new Promise((resolve)=> {
                modalOptions.resolve = resolve;
            });
            return {
                dismiss: ()=> {
                    this.dismiss(modalOptions);
                },
                close: (result) => {
                    this.close(modalOptions, result);
                },
                result: result
            };
        };
    };

    dismiss(modal) {
        _.remove(this.state.modalList, modal);
        modal.resolve();
        this.forceUpdate();
    }

    close(modal, result) {
        _.remove(this.state.modalList, modal);
        modal.resolve(result);
        this.forceUpdate();
    }


    render(){
        const {modalList} = this.state;


        return (
            <TransitionGroup className="modal-list">
                { modalList.map((modal, i)=> (
                    <Fade key={i} timeout={300} className="modal-fade">
                        <Modal
                            isStack={modalList.length > 1}
                            className={modal.options.className}
                            content={modal.options.content}
                            onDismiss={() => this.dismiss(modal)}
                        />
                    </Fade>

                )) }
            </TransitionGroup>
        );
    }
}

export const modals={};
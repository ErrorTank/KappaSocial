import {playerApis} from "./player-apis";
import {customHistory} from "../../routes/caro-game-routes";

export let privateLoader = {
    init: () => new Promise((resolve) => {
        playerApis.authorizePlayer().then(()=>{
            resolve(() => {
                customHistory.push("/allroom")
            });
        },()=>{
            resolve(() => {
                customHistory.push("/login")
            });
        });
    })
};
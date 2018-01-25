"use strict";

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_validator2.default.isEmail("tank98@gmail.com"));
// const Template =()=>{
//   return (
//     <h1>Message from JSX through web pack</h1>
//   );
// }
// ReactDOM.render(<Template/> ,$("#container")[0]);
// import {add,square} from "./export.jsx"
//
// console.log("app.jsx are running");
// console.log(add(2,1));
// console.log(square(2));
// import anything,{drink as canDrink,adult as isAdult} from "./export.jsx";
//
//  console.log(canDrink(isAdult(21)));
// console.log(anything())
var template = _react2.default.createElement(
  "h1",
  null,
  "Message from JSX through web pack"
);
_reactDom2.default.render(template, $("#container")[0]);

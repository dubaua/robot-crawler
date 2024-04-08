(()=>{function i(i,e){document.querySelector(".field").querySelectorAll(".row").forEach((t,s)=>{t.querySelectorAll(".cell").forEach((t,r)=>{let o=i[s][r];-1===o?t.classList.add("wall"):1===o?t.classList.add("filled"):t.classList.remove("filled"),e&&e.xPosition===r&&e.yPosition===s&&(t.appendChild(e.node),e.isCrushed&&e.node.classList.add("crushed"))})})}let e=function(i,e,t,s){let r=[];for(let i=0;i<10;i++){r[i]=[];for(let e=0;e<15;e++){let t=0===e||14===e,s=0===i||9===i,o=4===e&&7!==i,h=t||s||o;r[i][e]=h?-1:0}}return r}(0,0,0,0),t=new class{constructor(i,e,t){this.field=i,this.xPosition=e,this.yPosition=t,this.isCrushed=!1,this.isFinished=!1,this.isForwardDirection=!1,this.isReachedBackwardBorder=!1,this.isReachedForwardBorder=!1,this.isSearchingWaySide=!1,this.node=document.createElement("div"),this.node.classList.add("robot")}determineMainDirection(){this.isTopCellFree||(this.isReachedBackwardBorder=!0,this.isForwardDirection=!0),this.isBottomCellFree||(this.isReachedForwardBorder=!0,this.isForwardDirection=!1),this.isReachedBackwardBorder&&this.isReachedForwardBorder&&this.determineSidewayDirection()}determineSidewayDirection(){this.isSearchingWaySide||(this.isReachedBackwardBorder=!1,this.isReachedForwardBorder=!1,this.isSearchingWaySide=!0,this.determineMainDirection())}resetDirection(){this.isSearchingWaySide=!1,this.isForwardDirection=!1,this.isReachedBackwardBorder=!1,this.isReachedForwardBorder=!1}move(){if(this.isSearchingWaySide&&this.isReachedForwardBorder&&this.isReachedBackwardBorder&&!this.isRightCellFree){console.log("Stuck or finished"),this.isFinished=!0;return}this.isSearchingWaySide&&this.isRightCellFree?this.moveRight():this.isBottomCellFree&&this.isForwardDirection?this.moveBottom():this.isTopCellFree&&!this.isForwardDirection&&this.moveTop()}next(){this.isFinished||(this.isSearchingWaySide||this.paintCell(),this.determineMainDirection(),this.move())}paintCell(){this.field[this.yPosition][this.xPosition]=1}moveLeft(){this.xPosition--,this.resetDirection()}moveRight(){this.xPosition++,this.resetDirection()}moveTop(){this.yPosition--}moveBottom(){this.yPosition++}get leftCell(){return this.field[this.yPosition][this.xPosition-1]}get rightCell(){return this.field[this.yPosition][this.xPosition+1]}get topCell(){return this.field[this.yPosition-1][this.xPosition]}get bottomCell(){return this.field[this.yPosition+1][this.xPosition]}get isLeftCellFree(){return -1!==this.leftCell}get isRightCellFree(){return -1!==this.rightCell}get isTopCellFree(){return -1!==this.topCell}get isBottomCellFree(){return -1!==this.bottomCell}checkIfCrushed(){-1===this.field[this.yPosition][this.xPosition]&&(this.isCrushed=!0)}}(e,1,1);!function(i){let e=document.body.querySelector("#app"),t=document.createElement("div");t.classList.add("field"),i.forEach(i=>{let e=document.createElement("div");e.classList.add("row"),i.forEach(i=>{let t=document.createElement("div");t.classList.add("cell"),e.appendChild(t)}),t.appendChild(e)}),e&&(e.innerHTML="",e.appendChild(t))}(e),i(e,t),function s(){t.next(),i(e,t),t.isFinished||setTimeout(s,100)}()})();
//# sourceMappingURL=index.js.map

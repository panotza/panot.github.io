document.onkeypress=getPrintableKey,document.onkeydown=getUniKey;const terminal=document.getElementById("terminal"),history=[];let curPos=0,lastLine=terminal.lastElementChild,i=0,latest=0;const blink=document.createElement("span");function getPrintableKey(t){"Enter"!==t.key&&(checkEditing(),history[i].splice(curPos,0,t.key),curPos++,updateScreen())}function checkEditing(){i!==latest&&(history[latest]=[...history[i]],i=latest)}function getUniKey(t){parseKey(t)}function updateScreen(){lastLine.innerHTML="",lastLine.appendChild(document.createTextNode(history[i].slice(0,curPos).join(""))),lastLine.appendChild(blink),lastLine.appendChild(document.createTextNode(history[i].slice(curPos,history[i].length).join(""))),terminal.scrollTop=terminal.scrollHeight}function parseKey(t){switch(t.key){case"Enter":const e=history[i].join("");i=i!==latest||0===history[i].length?latest:latest=history.length,history[i]=[],curPos=0,parseCommand(e);break;case"Backspace":if(0===curPos)return;checkEditing(),history[i].splice(curPos-1,1),curPos--;break;case"ArrowUp":if(t.preventDefault(),i<=0)return;curPos=history[--i].length;break;case"ArrowDown":if(t.preventDefault(),i>=history.length-1)break;curPos=history[++i].length;break;case"ArrowLeft":if(curPos<=0)return;curPos--;break;case"ArrowRight":if(curPos>=history[i].length)return;curPos++;break;default:return}updateScreen()}function parseCommand(t){const[e,...n]=t.split(" ");switch(e){case"help":help(...n);break;case"ls":ls(...n);break;case"cat":cat(...n);break;case"":println("");break;default:output(`Unknow command ${e}`)}}function println(t,e=!1){let n=e?document.createElement("div"):document.createElement("pre");n.innerHTML=t,terminal.appendChild(n),lastLine=n}function output(t){println(t,!0),println("")}function help(){output('\n    <div class="help">\n      <div>ls</div><div>list directory contents</div>\n      <div>cat</div><div>concatenate and print files</div>\n    </div>\n  ')}function cat(...t){switch(t[0]){case"profile":output("\n          Name: Panot Wongkhot<br>\n          Birth date: 19/10/1992<br>\n          Language: Javascript, Go<br>\n          Hobbie: Guitar, Song Composing<br>\n          Current job: Acoshift's subordinate\n        ");break;case"contact":output("panot.wongkhot@gmail.com");break;case"activities":output("\n          18/12/2017 - 16/3/2018 Codecamp TH #1 Graduated with All Homework Done<br>\n          25/3 - 8/4/ 2018 Front-End Bootcamp สวทน (React + Redux Instructor)<br>\n          07/7 - 22/7/ 2018 Codecamp TH #2 (React + Redux Instructor)<br>\n        ");break;default:output("file not found.")}}function ls(...t){output("profile contact activities")}blink.classList.add("blink"),history[i]=[],updateScreen();
document.onkeypress=getPrintableKey,document.onkeydown=getUniKey;const terminal=document.getElementById("terminal"),history=[];let curPos=0,lastLine=terminal.lastElementChild,i=0,latest=0;const blink=document.createElement("span");blink.classList.add("blink"),history[i]=[],updateScreen();function getPrintableKey(a){"Enter"===a.key||(checkEditing(),history[i].splice(curPos,0,a.key),curPos++,updateScreen())}function checkEditing(){i!==latest&&(history[latest]=[...history[i]],i=latest)}function getUniKey(a){parseKey(a)}function updateScreen(){lastLine.innerHTML="",lastLine.appendChild(document.createTextNode(history[i].slice(0,curPos).join(""))),lastLine.appendChild(blink),lastLine.appendChild(document.createTextNode(history[i].slice(curPos,history[i].length).join(""))),terminal.scrollTop=terminal.scrollHeight}function parseKey(a){switch(a.key){case"Enter":const b=history[i].join("");i=i!==latest||0===history[i].length?latest:latest=history.length,history[i]=[],curPos=0,parseCommand(b);break;case"Backspace":if(0===curPos)return;checkEditing(),history[i].splice(curPos-1,1),curPos--;break;case"ArrowUp":if(a.preventDefault(),0>=i)return;i--,curPos=history[i].length;break;case"ArrowDown":if(a.preventDefault(),i>=history.length-1)break;i++,curPos=history[i].length;break;case"ArrowLeft":if(0>=curPos)return;curPos--;break;case"ArrowRight":if(curPos>=history[i].length)return;curPos++;break;default:return;}updateScreen()}function parseCommand(a){const[b,...c]=a.split(" ");"help"===b?help(...c):"ls"===b?ls(...c):"cat"===b?cat(...c):""===b?println(""):output(`Unknow command ${b}`)}function println(a,b=!1){let c=b?document.createElement("div"):document.createElement("pre");c.innerHTML=a,terminal.appendChild(c),lastLine=c}function output(a){println(a,!0),println("")}function help(){output(`
    <div class="help">
      <div>ls</div><div>list directory contents</div>
      <div>cat</div><div>concatenate and print files</div>
    </div>
  `)}function cat(...a){switch(a[0]){case"profile":output(`
          Name: Panot Wongkhot<br>
          Birth date: 19/10/1992<br>
          Language: Javascript, Go<br>
          Hobbie: Guitar, Song Composing<br>
          Current job: Acoshift's subordinate
        `);break;case"contact":output("panot.wongkhot@gmail.com");break;case"activities":output(`
          18/12/2017 - 16/3/2018 Codecamp TH #1 Graduated with All Homework Done<br>
          25/3 - 8/4/ 2018 Front-End Bootcamp สวทน (React + Redux Instructor)<br>
          07/7 - 22/7/ 2018 Codecamp TH #2 (React + Redux Instructor)<br>
        `);break;default:output("file not found.");}}function ls(...a){output("profile contact activities projects")}
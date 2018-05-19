document.onkeypress=getPrintableKey,document.onkeydown=getUniKey;const terminal=document.getElementById("terminal"),history=[];let historyIndex=0,lastLine=terminal.lastElementChild,input="";function getPrintableKey(a){"Enter"===a.key||(input+=a.key,updateScreen())}function getUniKey(a){parseKey(a)}function updateScreen(){lastLine.innerHTML=input+"<span></span>",updateScroll()}function updateScroll(){terminal.scrollTop=terminal.scrollHeight}function parseKey(a){switch(a.key){case"Enter":input!==history[history.length-1]&&(historyIndex=history.push(input)-1);const b=input.split(" ");parseCmd(...b),input="";break;case"Backspace":input=input.slice(0,input.length-1);break;case"ArrowUp":if(a.preventDefault(),0===history.length)return;input=history[historyIndex--],0>historyIndex&&(historyIndex=0);break;case"ArrowDown":if(a.preventDefault(),0===history.length)return;historyIndex++,historyIndex>history.length-1?(historyIndex=history.length-1,input=""):input=history[historyIndex];break;default:}updateScreen()}function parseCmd(a,...b){"help"===a?help(...b):"ls"===a?ls(...b):"cat"===a?cat(...b):""===a?println(""):output(`Unknow command ${a}`)}function println(a,b=!1){lastLine.innerHTML=lastLine.innerHTML.replace("<span></span>","");let c=document.createElement("div");c.innerHTML=a,b&&(c.className="output"),terminal.appendChild(c),lastLine=c}function output(a){println(a,!0),println("")}function help(){output(`
  <div class="help">
    <div>ls</div><div>list directory contents</div>
    <div>cat</div><div>concatenate and print files</div>
  </div>
`)}function cat(...a){switch(a[0]){case"profile":output(`
          name: Panot Wongkhot
          birth date: 19/10/1992
          language: Javascript, Go
          Hobbie: Guitar, Song Composing
        `);break;case"contact":output("panot.wongkhot@gmail.com");break;case"activites":output(`
          18/12/2017 - 16/3/2018 Codecamp TH #1 Graduated with All Homework Done
          18/3 - 1/4/ 2018 Front-End Bootcamp สวทน (React + Redux Instructor)
        `);break;default:output("file not found.");}}function ls(...a){output("profile contact activities projects")}
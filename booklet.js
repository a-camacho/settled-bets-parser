javascript: void((function(){

// Get placard html

var iframeplacard = null;

if ( document.querySelector('.ta-tableContainer') ) {

  iframeplacard = document.querySelector('.ta-tableContainer');
  iframeplacard = iframeplacard.outerHTML;

}

// Get Bet365 html

var iframe = document.querySelector('#MembersHostFrame');
iframe = iframe.contentWindow.document;
iframe = iframe.querySelector('.historyV3Iframe');
iframe = iframe.contentWindow.document;
iframe = iframe.querySelector('.bet-confirmation-viewer');

var html = iframe.outerHTML;

var iframe2 = document.querySelector('#MembersHostFrame');
iframe2 = iframe2.contentWindow.document;
iframe2 = iframe2.querySelector('.historyV3Iframe');
iframe2 = iframe2.contentWindow.document;
iframe2 = iframe2.querySelector('.bet-breakdown-table');
var html2 = iframe2.outerHTML;

result = html + html2 + iframeplacard;

// Copy content in result

var node = document.createElement('textarea');
var selection = document.getSelection();

node.textContent = result;
document.body.appendChild(node);

selection.removeAllRanges();
node.select();
document.execCommand('copy');

selection.removeAllRanges();
document.body.removeChild(node);

console.log(result);
console.log("end");

window.open('https://labs.camacho.pt/bet-parser/', '_blank');

})());
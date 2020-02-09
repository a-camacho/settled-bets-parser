javascript: void((function(){

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

  result = html + html2;

  console.log(result);

})());
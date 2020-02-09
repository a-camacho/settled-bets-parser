
  function getPlacardBets( data ) {

    my_bets = [];

    columns = data.querySelectorAll(".ta-ScrollPane")[0].children[0].children;
    // bets = data.querySelectorAll(".ta-ScrollPane")[0].children[0].children[0].children;

    $.each(( columns ), function( index ) {

      column = columns[index].children;

      $.each(( column ), function( index2 ) {

        item = column[index2].children[0].innerText.replace(/&nbsp;/g, " ").replace(/&amp;/g, " & ");

        if ( index == 0 ) {
          eitem = {};
          my_bets.push(eitem);
        }

        my_bets[index2][index] = item;

      })    

    });

  my_bets.shift(); 
  return my_bets;

}

function getPlacardHTMLTable( data ) {

    html = "<table cellpadding='10' border='1'>";
    html = html + "<tr>";
    html = html + "<th>date</th>";
    html = html + "<th>time</th>";
    html = html + "<th>type</th>";
    html = html + "<th>stake</th>";
    html = html + "<th>odd</th>";
    html = html + "<th>status</th>";
    html = html + "<th>return</th>";
    html = html + "<th>matches</th>";
    html = html + "</tr>";

    my_bets.forEach(function (item, index) {

      console.log(item);

      html = html + "<tr>";
      html = html + "<td>" + item[0].substr(0, 8) + "</td>";
      html = html + "<td>" + item[0].substr(-6) + "</td>";

      if ( item[1] ) {
        html = html + "<td>" + item[1] + "</td>";
      } else {
        html = html + "<td></td>";
      }

      html = html + "<td>" + item[3].replace("€ ", "") + "</td>";

      if ( item[4] ) {
        html = html + "<td>" + item[4] + "</td>";
      } else {
        html = html + "<td></td>";
      }

      if ( item.status ) {
        html = html + "<td>" + item.status + "</td>";
      } else {
        html = html + "<td></td>";
      }

      html = html + "<td>" + item[5].replace("€ ", "") + "</td>";
      html = html + "<td>";

      html = html + "<td>" + item[2] + "</td>";

      html = html + "</td>";
      html = html + "</tr>";

    });

    html = html + "</table>";

  return html;
}
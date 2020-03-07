
  function removeLineBreaks( string ) {
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    return string;
  }

  function removeSpacesAtEnd( string ){
    string = string.replace(/\s*$/,'');
    return string;
  }

  function trimString( string ){
    string = $.trim(string);
    return string;
  }

  function getBetHTMLTable( my_bets ) {

    html = "<table cellpadding='10' border='1'>";
    html = html + "<tr>";
    html = html + "<th>date</th>";
    html = html + "<th>time</th>";
    html = html + "<th>teams (a)</th>";
    html = html + "<th>teams (b)</th>";
    html = html + "<th>bet type</th>";
    html = html + "<th>bet choices</th>";
    html = html + "<th>odd</th>";
    html = html + "<th>stake</th>";
    html = html + "<th>potential win</th>";
    html = html + "<th>win</th>";
    html = html + "<th>cash out</th>";
    html = html + "</tr>";

    my_bets.forEach(function (item, index) {

    html = html + "<tr>";
    
      html = html + "<td>" + item.date.replace(/\//g, '.') + "</td>";
      
      var newtime = item.time.split(":");
      html = html + "<td>" + newtime[0] + "h" + newtime[1] + "</td>";
	      
	  var aTeams = [];
	  var bTeams = [];
	  var betTypes = [];
	  var betChoices = [];

      $.each(( item.matches ), function(index, item) {
	      
	    var teams = item.matchdetail.split(" v ");
	      
	    aTeams.push(teams[0]); 
	    bTeams.push(teams[1]);
	    betTypes.push(item.bettype);
	    betChoices.push(item.bet);
	   
      });

	  var tmp = "";
	  html = html + "<td>";
	    if ( aTeams ) {
	      aTeams.forEach(element => tmp = tmp + element + " | ");
	      tmp = tmp.slice(0, -2);
	      html = html + tmp;
	    }
	  html = html + "</td>";
	  
	  tmp = "";
	  html = html + "<td>";
	    if ( bTeams ) {
	      bTeams.forEach(element => tmp = tmp + element + " | ");
	      tmp = tmp.slice(0, -2);
	      html = html + tmp;
	    }
	  html = html + "</td>";
	  
	  tmp = "";
	  html = html + "<td>";
	    if ( betTypes ) {
	      betTypes.forEach(element => tmp = tmp + element + " | ");
	      tmp = tmp.slice(0, -2);
	      html = html + tmp;
	    }
	  html = html + "</td>";
	  
	  tmp = "";
	  html = html + "<td>";
	    if ( betChoices ) {
	      betChoices.forEach(element => tmp = tmp + element + " | ");
	      tmp = tmp.slice(0, -2);
	      html = html + tmp;
	    }
	  html = html + "</td>";

      if ( item.odd ) {
        html = html + "<td>" + parseFloat(item.odd) + "</td>";
      } else {
        html = html + "<td></td>";
      }
      
      html = html + "<td>" + parseFloat(item.stake.split(" ")[0]) + "</td>";

      html = html + "<td>" + parseFloat(item.stake.split(" ")[0]) * parseFloat(item.odd) + "</td>";

      if ( item.status ) {
	    item.status = "Lost" ? "0" : "1";
        html = html + "<td>" + item.status + "</td>";
      } else {
        html = html + "<td></td>";
      }

      html = html + "<td>" + parseFloat(item.return.split(" ")[0]) + "</td>";
      
      html = html + "</tr>";

    });

    html = html + "</table>";

    return html;

  }

  function getBet365Bets( children ) {

  my_bets = [];

  $.each(( children ), function( index ) {

    object = children[index];
    childs = object.childElementCount;

      if ( childs == 2 ) {

        myBet = {};

        date = object.querySelectorAll(".bet-summary-detail-placement-date-date")[0].innerHTML;
        time = object.querySelectorAll(".bet-summary-detail-placement-date-time")[0].innerHTML;

        myBet.date = date;
        myBet.time = time;

        myMatches = [];
        matches = object.querySelectorAll(".bet-summary-detail-bet-selection");
        
        $.each(( matches ), function( index ) {

          bet = matches[index].children[0].children[0].children[0].innerText;
          odd = matches[index].children[1].innerText;

          currentMatch = {bet: bet, odd: odd};
          myMatches.push(currentMatch);

        });

      myBet.matches = myMatches;

      myStake = $.trim(object.querySelectorAll(".bet-summary-detail-amounts-multiples")[0].innerText);
      myReturn = object.querySelectorAll(".bet-summary-detail-amounts-return-value")[0].innerText;

      myBet.stake = myStake;
      myBet.return = myReturn;

      my_bets.push(myBet);

    }

  });

  return my_bets;

}

function getBet365DetailedBet( htmlBet, htmlTable ) {

  my_bets = [];

    myBet = {};

      myBet.date = htmlBet.querySelectorAll(".bet-confirmation-header-datetime")[0].innerText.substr(0, 10);
      myBet.time = htmlBet.querySelectorAll(".bet-confirmation-header-datetime")[0].innerText.substr(-8);

      myMatches = [];
      matches = htmlBet.querySelectorAll(".bet-confirmation-details")[0].children;

      $.each(( matches ), function( index, object ) {

        bet = object.querySelectorAll(".bet-confirmation-details-row-selectionname")[0].innerText;
        bet = removeLineBreaks(bet);
        
        odd = object.querySelectorAll(".bet-confirmation-details-row-odds")[0].innerText;
        odd = removeLineBreaks(trimString( odd ));

        event = object.querySelectorAll(".bet-confirmation-details-row-eventname")[0].innerText;
        event = removeLineBreaks(trimString( event ));

        matchdetail = event.slice(0, -11);
        matchdate = event.substring(event.length - 11);

        bettype = object.querySelectorAll(".bet-confirmation-details-row-plbtdescription")[0].innerText;
        bettype = removeLineBreaks(bettype);;

        betresult = object.querySelectorAll(".bet-confirmation-details-row-status")[0].innerText;
        betresult = removeLineBreaks(betresult);;

        currentMatch = {bet: bet, odd: odd, matchdetail:matchdetail, matchdate:matchdate, bettype:bettype, betresult:betresult};
        myMatches.push(currentMatch);

      });

      myBet.odd = htmlTable.querySelectorAll(".bet-breakdown-table-value")[2].innerText;
      myBet.odd = removeLineBreaks(trimString( myBet.odd ));

      myBet.stake = htmlTable.querySelectorAll(".bet-breakdown-table-value")[1].innerText;
      myBet.stake = removeLineBreaks(trimString( myBet.stake ));

      myBet.return = htmlTable.querySelectorAll(".bet-breakdown-table-value")[4].innerText;
      myBet.return = removeLineBreaks(trimString( myBet.return ));

      myBet.status = htmlTable.querySelectorAll(".bet-breakdown-table-value")[3].innerText;
      myBet.status = removeLineBreaks(trimString( myBet.status ));

      myBet.matches = myMatches;

      my_bets.push(myBet);

  return my_bets;

}
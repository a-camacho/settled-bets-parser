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
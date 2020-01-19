var players = [];

$(document).ready(function() {
  $("#score-board-section").hide();
});

function addPlayerInput() {
  var newPlayerInput = '<div class="form-group form-group-player"><label>Player name:</label><input type="text" class="form-control name-input"></div>';
  $("#player-info").append(newPlayerInput);
}

function removePlayerInput() {
  var newplayers = $(".form-group-player");
  var lastPlayer = newplayers[newplayers.length - 1];
  $(lastPlayer).remove();
}

function startGame() {
  initPlayers();
  $("#new-game-section").remove();
  $("#score-board-section").show();
  setScoreTableHead();
  initScoreTableBody();
  setPlayerScoreSelect();
}

function initPlayers() {
  var playerInputs = $(".form-group-player .name-input");

  for (var count = 0; count < playerInputs.length; count++) {
    var name = $(playerInputs[count]).val();
    players.push(getNewPlayer(name));
  }
}

function getNewPlayer(name) {
  var player = {
    name: name,
    numbers: {
      num15: 0,
      num16: 0,
      num17: 0,
      num18: 0,
      num19: 0,
      num20: 0,
      numBulls: 0,
    },
    score: function() {
      var score = 0;
      if (this.numbers.num15 > 3) {
        score += ((this.numbers.num15 - 3) * 15);
      }
      if (this.numbers.num16 > 3) {
        score += ((this.numbers.num16 - 3) * 16);
      }
      if (this.numbers.num17 > 3) {
        score += ((this.numbers.num17 - 3) * 17);
      }
      if (this.numbers.num18 > 3) {
        score += ((this.numbers.num18 - 3) * 18);
      }
      if (this.numbers.num19 > 3) {
        score += ((this.numbers.num19 - 3) * 19);
      }
      if (this.numbers.num20 > 3) {
        score += ((this.numbers.num20 - 3) * 20);
      }
      if (this.numbers.numBulls > 3) {
        score += ((this.numbers.numBulls - 3) * 25);
      }
      return score;
    }
  };

  return player;
}

function setScoreTableHead() {
  var html = '<tr><th>Number</th>';

  for (var count = 0; count < players.length; count++) {
    html = html + '<th>' + players[count].name + '</th>';
  }

  html += '</tr>';

  $("#score-table thead").append(html);
}

function initScoreTableBody() {
  var html = '';

  html += '<tr data-row="20"><th>20</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="19"><th>19</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="18"><th>18</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="17"><th>17</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="16"><th>16</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="15"><th>15</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="bulls"><th>Bulls</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '"></td>';
  }
  html += '</tr>';

  html += '<tr data-row="scores" class="scores"><th>Scores</th>';
  for (var count = 0; count < players.length; count++) {
    html += '<td data-player-id="' + count + '">0</td>';
  }
  html += '</tr>';

  $("#score-table tbody").append(html);
}

function getScorePic(number) {
  if (number == 1) {
    return '<img src="img/score-marks/1.png" class="score-pic">';
  } else if (number == 2) {
    return '<img src="img/score-marks/2.png" class="score-pic">';
  } else {
    return '<img src="img/score-marks/3.png" class="score-pic">';
  }
}

function setPlayerScoreSelect() {

  var html = '';

  for (var count = 0; count < players.length; count++) {
    html += '<option value="' + count + '">' + players[count].name + '</option>';
  }

  $("#player-score-select").append(html);
}

function addScore() {
  $('#add-score-modal').modal('hide');
  processThrows();
  updateScoreBoardMarks();
  updateScores();
}

function processThrows() {
  var playerID = parseInt($("#player-score-select").val());

  var throw1 = $("#dart1").val();
  var qty1 = parseInt($("#quantity1").val());
  processThrow(playerID, throw1, qty1);

  var throw2 = $("#dart2").val();
  var qty2 = parseInt($("#quantity2").val());
  processThrow(playerID, throw2, qty2);

  var throw3 = $("#dart3").val();
  var qty3 = parseInt($("#quantity3").val());
  processThrow(playerID, throw3, qty3);

}

function processThrow(playerID, number, quantity) {

  switch (number) {
    case "20":
      players[playerID].numbers.num20 += quantity;
      break;
    case "19":
      players[playerID].numbers.num19 += quantity;
      break;
    case "18":
      players[playerID].numbers.num18 += quantity;
      break;
    case "17":
      players[playerID].numbers.num17 += quantity;
      break;
    case "16":
      players[playerID].numbers.num16 += quantity;
      break;
    case "15":
      players[playerID].numbers.num15 += quantity;
      break;
    case "bulls":
      players[playerID].numbers.numBulls += quantity;
      break;
    default:
      break;
  }
}

function updateScoreBoardMarks() {

  for (var count = 0; count < players.length; count++) {
    // update row 20
    var row = "20";
    var column = count.toString();
    if (players[count].numbers.num20 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num20 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num20 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 19
    row = "19";
    var column = count.toString();
    if (players[count].numbers.num19 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num19 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num19 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 18
    row = "18";
    var column = count.toString();
    if (players[count].numbers.num18 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num18 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num18 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 17
    row = "17";
    var column = count.toString();
    if (players[count].numbers.num17 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num17 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num17 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 16
    row = "16";
    var column = count.toString();
    if (players[count].numbers.num16 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num16 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num16 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 15
    row = "15";
    var column = count.toString();
    if (players[count].numbers.num15 == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.num15 == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.num15 >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

    // update row 16
    row = "bulls";
    var column = count.toString();
    if (players[count].numbers.numBulls == 1) {
      setCellData(row, column, getScorePic(1));
    } else if (players[count].numbers.numBulls == 2) {
      setCellData(row, column, getScorePic(2));
    } else if (players[count].numbers.numBulls >= 3) {
      setCellData(row, column, getScorePic(3));
    } else {
      setCellData(row, column, '');
    }

  }

}

function setCellData(row, column, html) {
  var selector = "#score-table tr[data-row='" + row + "'] td[data-player-id='" + column + "']";
  var td = $(selector).html(html);
}

function updateScores() {

  var scoreCells = $("tr[data-row='scores'] td");
  for (var count = 0; count < players.length; count++) {
    $(scoreCells[count]).html(players[count].score());
  }
}

const setGame = () => {
  generateRandomCategoryNumber();
}

const max = 18418;

const generateRandomCategoryNumber = () => {
  let randomNum = Math.floor(Math.random() * max)
  console.log(randomNum)
  return randomNum
}

const createCategory = (data) => {
  return {
    title: data.title,
    clues: data.clues.slice(0, 5)
  }
}

angular
  .module("jeopardyApp", [])
  .controller("mainController", ["$scope", "$http", ($scope, $http) => {

    $scope.thisGameCategories = [];

    for (let i = 0; i < 5; i++) {
      $http({
        method: "GET",
        url: `http://jservice.io/api/category?id=${generateRandomCategoryNumber()}`
      }).then(response => {
        const cat = createCategory(response.data);
        $scope.thisGameCategories.push(cat);
        console.log({ cat })
      })
    }

    $scope.selectedQuestion = "";

    $scope.playcount = 0;

    $scope.getQuestion = (clue) => {
      console.log("button was pushed", clue)
      const output = document.querySelector(".questionDisplay")
      output.textContent = clue.question;
      $scope.hideMainBoard = true;
      $scope.showQuestion = true;
      $scope.showPlayerAnswer = true;
      $scope.selectedQuestion = clue;
      $scope.playcount++;
      console.log($scope.playcount);
    }


    $scope.currentPlayerTotal = 0;

    $scope.checkAnswer = () => {
      console.log($scope.selectedQuestion)
      //>>>>>>>>>need to address the special character issue Tirzah was talking about?
      if ($scope.selectedQuestion.answer === $scope.playerAnswer) {
        $scope.currentPlayerTotal += $scope.selectedQuestion.value
      } else {
        $scope.currentPlayerTotal -= $scope.selectedQuestion.value
      }
      $scope.hideMainBoard = false;
      $scope.showQuestion = false;
      $scope.selectedQuestion.answered = true;
      $scope.clearAnswer();

      //using 3 play counts for testing purposes, should be 25 total.
      if ($scope.playcount >= 3) {
        $scope.showResetButton = true;
        $scope.hideMainBoard = true;
        $scope.showPlayerAnswer = false;
      }
    }
    //play again? button appears to reset board and pull in 5 new categories
    $scope.clearAnswer = () => {
      $scope.playerAnswer = "";
    }

    $scope.resetGame = () => {
      // location.reload();
      $scope.thisGameCategories = [];
      // >>>>>>>>>can't get the current content to empty
      //------WHAT TO CALL?
      for (let i = 0; i < 5; i++) {
        $http({
          method: "GET",
          url: `http://jservice.io/api/category?id=${generateRandomCategoryNumber()}`
        }).then(response => {
          const cat = createCategory(response.data);
          $scope.thisGameCategories.push(cat);
          //>>>>>>>throwing error that this is not a function
          console.log({ cat })
          console.log (thisGameCategories)
        })
      }
    }
  }]);



document.addEventListener('DOMContentLoaded', setGame)
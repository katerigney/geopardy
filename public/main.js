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
      console.log($scope.playcount)
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


      //>>>>>>>>>player can no longer select questions containers they have already selected

      //game is played until no more containers are available
      //play again? button appears to reset board and pull in 5 new categories

      if ($scope.playcount >= 3) {
        $scope.hideResetButton = false;
        location.reload();
        //   mainBoard.empty();
        // >>>>>>>>>can't get the current content to empty
        //   generateRandomCategoryNumber();
      }
    }
  }]);



document.addEventListener('DOMContentLoaded', setGame)
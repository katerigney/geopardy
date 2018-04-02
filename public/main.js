//generate a random number that will be between 1 and 18418 for a category id
//, 5 times
const max = 18418;

const generateRandomCategoryNumber = () => {
 let randomNum = Math.floor(Math.random()* max)
 console.log(randomNum)
//  thisGameCategories.push(randomNum);
return randomNum
}

const createCategory = (data) => {
  return {
    title :data.title,
    clues: data.clues.slice(0,5)
  }
}


//use that random number to call a jeopardy category from the API
//, 5 times

// const BASE_URL = `http://jservice.io/api/category?id=${generateRandomCategoryNumber()}`;


angular
  .module("jeopardyApp", [])
  .controller("mainController",["$scope", "$http", ($scope, $http) => {

  $scope.thisGameCategories = [];

  for (let i = 0; i < 5; i++){
    $http({
      method: "GET",
      url: `http://jservice.io/api/category?id=${generateRandomCategoryNumber()}`
    }).then(response => {
      console.log(response);
      const cat = createCategory(response.data);
      $scope.thisGameCategories.push(cat);
      console.log({cat, all: $scope.thisGameCategories})
    })
  }


    //player selects a question
    //>>>>>>>>>board is hidden and selected question appears 
    
  $scope.selectedQuestion ="";

  $scope.getQuestion = (clue) => {
    console.log("button was pushed")
    $scope.showQuestion=true;
    $scope.selectedQuestion = clue;
  }
  
  $scope.currentPlayerTotal = 0;

     //player can input a answer
     //evaluate answer
        //if answer is correct and uses a question, player gets question value added to their total
        //if answer is correct and but they don't answer in a question, player gets question value subtracted from their total
        //if answer is wrong, player gets question value subtracted from their total

  $scope.checkAnswer = () => {
    console.log($scope.selectedQuestion)
    //>>>>>>>>>need to address the special character issue Tirzah was talking about?
    if ($scope.selectedQuestion.answer === $scope.playerAnswer) {
      $scope.currentPlayerTotal += $scope.selectedQuestion.value
  } else {
      $scope.currentPlayerTotal -= $scope.selectedQuestion.value
  }
  }


  }]);


  //player input functionality: 

  // board displays again
    // player can no longer select questions containers they have already selected

  //game is played until no more containers are available
    //play again? button appears to reset board and pull in 5 new categories


document.addEventListener('DOMContentLoaded', generateRandomCategoryNumber)
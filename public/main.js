//generate a random number that will be between 1 and 18418 for a category id
//, 5 times
const max = 18418;

const generateRandomCategoryNumber = () => {
 let randomNum = Math.floor(Math.random()* max)
 console.log(randomNum)
 return randomNum
}


//use that random number to call a jeopardy category from the API
//, 5 times
const BASE_URL = `http://jservice.io/api/category?id=${generateRandomCategoryNumber()}`;

angular
  .module("jeopardyApp", [])
  .controller("mainController",["$scope", "$http", ($scope, $http) => {
  // for (let i = 0; i < 5; i++){
    $http({
      method: "GET",
      url: BASE_URL
    }).then(response => {
      $scope.categoryTitle = response.data.title;
      $scope.category = response.data.clues;
      console.log(response.data);
      console.log($scope.category)
      console.log($scope.categoryTitle)
    })
  // }

  }]);







//display 5 categories in 5 columns of 5 rows in the DOM
  /// row one will be the name of the category
  //rows 2-5 will be the questionsvalue

  //player selects a question
    //board is hidden and selected question appears 

  //player input functionality: 
   //player can input a answer
     //evaluate answer
        //if answer is correct and uses a question, player gets question value added to their total
        //if answer is correct and but they don't answer in a question, player gets question value subtracted from their total
        //if answer is wrong, player gets question value subtracted from their total

  // board displays again
    // player can no longer select questions containers they have already selected

  //game is played until no more containers are available
    //play again? button appears to reset board and pull in 5 new categories


document.addEventListener('DOMContentLoaded', generateRandomCategoryNumber)


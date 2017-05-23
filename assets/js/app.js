$(document).ready(function(){
  
  $("#start").on('click', trivia.start);
  $('.options').on('click' , trivia.guessChecker)
  
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 15,
  questions: {
    q1: '1',
    q2: '2',
    q3: '3',
    q4: '4'
  },
  choices: {
    q1: [1, 2, 3, 4, 5],
    q2: [1, 2, 3, 4, 5],
    q3: [1, 2, 3, 4, 5],
    q4: [1, 2, 3, 4, 5]
  },
  answers: {
    q1: '1',
    q2: '2',
    q3: '3',
    q4: '4'
  },
  start: function(){
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    $('#timer').text(trivia.timer);
    
    $('#start').remove();
    
    $.each(Object.values(trivia.choices)[trivia.currentSet], function(index, key){
      $('#options').append($('<button class="options btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  guessChecker : function() {
    $('.options').remove();
    trivia.currentSet++;
    trivia.start();
    alert($(this).text());
  }

}
  
  
  

let startbtn= document.getElementById("startQuiz")
let timeDiv= document.getElementById("time")
let initialPage= document.getElementById("initialPage")
let quizDiv = document.getElementById("quizQuestions")
let ackdiv= document.getElementById("acknowledgement")
let quizTime= 50;
let score = 0

let quizQuestions = [{
    question: "question1", 
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"], 
    answer: "choice 4"
},{
    question: "question2", 
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"], 
    answer: "choice 1"
},{
    question: "question3", 
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"], 
    answer: "choice 3"
},{
    question: "question4", 
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"], 
    answer: "choice 2"
},{
    question: "question5", 
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"], 
    answer: "choice 3"
}]

let questionNumber = 0;
function startQuiz (){
    initialPage.innerHTML="";
    quizDiv.innerHTML=""
    let currentQuestion = quizQuestions [questionNumber]

    let questiondiv = document.createElement("div")
    questiondiv.innerHTML = currentQuestion.question;

    let choicediv= document.createElement("div")


    for (let i=0; i<currentQuestion.choices.length;i++){
        let choicebtn = document.createElement("button")
        choicebtn.innerHTML=currentQuestion.choices[i]
        choicebtn.addEventListener('click',event=>{
            console.log(event.target.innerHTML)
            let userChoice= event.target.innerHTML;
            let correctAnswer= currentQuestion.answer;
            if (userChoice===correctAnswer){
               ackdiv.innerHTML="";
               ackdiv.innerHTML="correct answer" 
               score = score + 10;
               timeDiv.innerHTML=score;
               document.getElementById('finalscore').innerHTML = score;
               questionNumber++;
               startQuiz()

            }else {
            ackdiv.innerHTML="";
            ackdiv.innerHTML="incorrect answer" 
            quizTime = quizTime - 10;
            timeDiv.innerHTML=quizTime;
            questionNumber++;
            startQuiz()

            }
        })
        choicediv.append(choicebtn)
    }
    quizDiv.append(questiondiv,choicediv)
}

function startTimer(){
    let setTime= setInterval(function(){
        quizTime=quizTime - 1;
        timeDiv.innerHTML=`Time Left : ${quizTime}`
        if (quizTime === 0){
            clearInterval(setTime)
        } else {
            timeDiv.innerHTML=`Time Left : ${quizTime}`
        }
       
    },1000)

}

 function init(){
    startTimer();
    startQuiz();
 }

startbtn.addEventListener("click",init)
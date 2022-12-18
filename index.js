let startbtn= document.getElementById("startQuiz")
let timeDiv= document.getElementById("time")
let quizTime= 10;

function startTimer(){
    let setTime= setInterval(function(){
        quizTime=quizTime - 1;
        if (quizTime === 0){
            clearInterval(setTime)
        } else {
            timeDiv.innerHTML=`Time Left : ${quizTime}`
        }
       
    },1000)

}

 function init(){
    startTimer();
 }

startbtn.addEventListener("click",init)
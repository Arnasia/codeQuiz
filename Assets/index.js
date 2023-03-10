let startbtn= document.getElementById("startQuiz")
let timeDiv= document.getElementById("time")
let initialPage= document.getElementById("initialPage")
let quizDiv = document.getElementById("quizQuestions")
let ackdiv = document.getElementById("acknowledgement")
let initialsPageEl = document.getElementById("initialsPage")
let finalPageEl = document.getElementById("finalPage")
let scoreEl = document.getElementById("score")
let overallScoreEl = document.getElementById("overallScore")
let submitInitialsBtn = document.getElementById("submit_initials")
let clearBtn= document.getElementById("clearHs")
let backBtn = document.getElementById("goBack")
let viewBtn = document.getElementById("highScores")
let hsDiv = document.getElementById("hsDisplay")



let quizTime= 50;
let score = 0

let quizQuestions = [{
    question: "JavaScript is a ____ -side programming language.", 
    choices: ["A.Client", "B.Server", "C.Both", "D.None"], 
    answer: "C.Both"
},{
    question: "How do you find the minimum of x and y using JavaScript?", 
    choices: ["A.min(x,y);", "B.Math.min(x,y)", "C.Math.min(xy)", "D.min(xy);"], 
    answer: "B.Math.min(x,y)"
},{
    question: "Which JavaScript label catches all the values, except for the ones specified?", 
    choices: ["A.catch", "B.label", "C.try", "D.default"], 
    answer: "D.default"
},{
    question: "How to write an IF statement in JavaScript?", 
    choices: ["A.if i=5", "B.if (i==5)", "C.if i=5 then", "D.if i==5 then"], 
    answer: "B.if (i==5)"
},{
    question: "Which event occurs when the user clicks on an HTML element?", 
    choices: ["A.onclick", "B.onmouseover", "C.onmouseclick", "D.onchange"], 
    answer: "A.onclick"
}]

scoreEl.style.display = "none";
ackdiv.style.display = "none";

function viewHs (event){
    event.preventDefault()
    initialPage.innerHTML="";
    quizDiv.innerHTML="";
    finalPage()
    
    

}


let questionNumber = 0;
function startQuiz (){
    initialPage.innerHTML="";
    quizDiv.innerHTML=""
    if (questionNumber < 5){
        let currentQuestion = quizQuestions [questionNumber]

    let questiondiv = document.createElement("div")
    questiondiv.setAttribute("id","question")
    questiondiv.innerHTML = currentQuestion.question;

    let choicediv= document.createElement("div")
    choicediv.setAttribute("id","choice")
    for (let i=0; i<currentQuestion.choices.length;i++){
        let choicebtn = document.createElement("button")
        choicebtn.innerHTML=currentQuestion.choices[i]
        choicebtn.addEventListener('click',event=>{            
            let userChoice = event.target.innerHTML;
            let correctAnswer = currentQuestion.answer;
            if (userChoice===correctAnswer){
               ackdiv.innerHTML="";
               ackdiv.innerHTML="Correct!"
               ackdiv.style.display="block"
               setTimeout(() => {
                ackdiv.innerHTML=""
                ackdiv.style.display = "none"
               },300) 
               score = score + 10;
               console.log(score)
               timeDiv.innerHTML=score;
               document.getElementById('finalscore').innerHTML = score;
               questionNumber++;
               startQuiz()

            }else {
            ackdiv.innerHTML="";
            ackdiv.innerHTML="Wrong!" 
            ackdiv.style.display="block"
            setTimeout(() => {
                ackdiv.innerHTML=""
                ackdiv.style.display = "none"
               },300) 
            quizTime = quizTime - 10;
            questionNumber++;
            startQuiz()

            }
        })
        choicediv.append(choicebtn)
    }
    quizDiv.append(questiondiv,choicediv)
} else {
    initialsPage ()
}
    }

    function initialsPage (){
        initialPage.innerHTML = "";
        quizDiv.innerHTML = "";
        ackdiv.innerHTML = "";
        initialsPageEl.style.display = "block";
        

        
        
        
        overallScoreEl.innerHTML = `${score} out of ${10*quizQuestions.length}`

        
    }

    submitInitialsBtn.addEventListener('click',function(event){
        event.preventDefault()
        let localStorageData= JSON.parse(localStorage.getItem('quiz_score'))
        let userInitialsEl= document.getElementById("user_initials")
        
        let quizDetails={
            initials:userInitialsEl.value,
            score: score 
        }

        if (localStorageData === null){
            localStorageData=[]
            localStorageData.push(quizDetails)
        } else {
            localStorageData.push(quizDetails)
        }
        
        

        localStorage.setItem('quiz_score',JSON.stringify(localStorageData))
        finalPage()
    })

    function finalPage (){
        initialsPageEl.style.display="none"
        finalPageEl.style.display="block";
        displayHighScore()
       
    } 
    function displayHighScore(){
        let localStorageData= JSON.parse(localStorage.getItem('quiz_score'))
        if (localStorageData != null){
            let table = document.createElement("table")
            let tableRow= document.createElement("tr")
            let th1= document.createElement("th")
            th1.innerHTML="Initials"
            let th2= document.createElement("th")
            th2.innerHTML="Score"
            tableRow.append(th1, th2)
            table.append(tableRow)

            for (let i = 0; i < localStorageData.length; i++){
                let tableRow= document.createElement("tr")
                let td1= document.createElement("td")
                td1.innerHTML=localStorageData[i].initials
                let td2= document.createElement("td")
                td2.innerHTML=localStorageData[i].score
                tableRow.append(td1, td2)
                table.append(tableRow)


            }
            document.getElementById('hsDisplay').append(table)
        }
        
    } 

function startTimer(){
    let setTime= setInterval(function(){
        if (quizTime >= 0){
            quizTime=quizTime - 1;
            timeDiv.innerHTML=`Time Left : ${quizTime}`
        } else {
            timeDiv.innerHTML=`Time Left : 0`
            clearInterval(setTime)
        }
       
    },1000)

}

    function clearAll () {
        hsDisplay.innerHTML=""
       localStorage.clear()
       
       
    }


 function init(){
    startTimer();
    startQuiz();

 }

 function reset () {
    window.location.reload();
}


startbtn.addEventListener("click",init)
clearBtn.addEventListener("click",clearAll)
backBtn.addEventListener("click",reset)
viewBtn.addEventListener("click",viewHs)



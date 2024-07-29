const checkboxes=document.querySelectorAll(".ellipse");
const progressValue=document.querySelector(".progress-value");
const  inputs=document.querySelectorAll(".task");
const error=document.querySelector(".error");
const images=document.querySelectorAll(".checkbox");

const allGoals= JSON.parse(localStorage.getItem("allGoals"))||{};

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;


checkboxes.forEach((checkbox)=>{

  checkbox.addEventListener("click",()=>{
    const allInputFilled=[...inputs].every((input)=>{
     return input.value
    });
    if(allInputFilled){
     checkbox.parentElement.classList.toggle("completed");
     const inputId= checkbox.nextElementSibling.id;
     allGoals[inputId].completed=!allGoals[inputId].completed;
     completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
     progressValue.style.width=`${completedGoalsCount/3*100}%`;
    //  if(progressValue.style.width=="100%"){
    //       console.log("hye");
    //  }
     localStorage.setItem("allGoals",JSON.stringify(allGoals));
    }else{
     error.classList.remove("hide");
    };
    inputs.forEach((input)=>{
     input.addEventListener("focus",()=>{
       error.classList.add("hide");
     });
    });
  });

  inputs.forEach((input)=>{
    input.value=allGoals[input.id].name;
    if(allGoals[input.id].completed){
      input.parentElement.classList.add("completed");
    };
    input.addEventListener("focus",()=>{
      error.classList.add("hide");
    });
    input.addEventListener('input',(e)=>{
      allGoals[input.id]={
        name:input.value,
        completed:false
      };
      localStorage.setItem("allGoals",JSON.stringify(allGoals));
    });
  });
 });
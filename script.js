const checkboxes=document.querySelectorAll(".ellipse");
const btn=document.querySelector(".btn")
const progressValue=document.querySelector(".progress-value");
const  inputs=document.querySelectorAll(".task");
const popup=document.querySelector(".popup");
const msg=document.querySelector(".para");
const error=document.querySelector(".error");
const allQuotes=[
  "Raise the bar by completing your goals!",
 "Well begun is half done!",
 "Just a step away, keep going!",
 "Hurrah,all goals are completed, Click on New Goals button ",
];
const allGoals= JSON.parse(localStorage.getItem("allGoals"))||{
  first:{
    name:"",
    completed:false,
  },
  second:{
    name:"",
    completed:false,
  },
  third:{
    name:"",
    completed:false,
  },
};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width=`${completedGoalsCount/3*100}%`;
progressValue.innerText=`${completedGoalsCount}/3 completed`;
msg.innerText=allQuotes[completedGoalsCount];

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
     progressValue.innerText=`${completedGoalsCount}/3 completed`;
     msg.innerText=allQuotes[completedGoalsCount];
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
      if(allGoals[input.id].completed){
        input.value=allGoals[input.id].name;
        return
      }
      allGoals[input.id]={
        name:input.value,
        completed:false
      };
      localStorage.setItem("allGoals",JSON.stringify(allGoals));
    });
  });
 });
 btn.addEventListener("click",()=>{
  localStorage.clear();
  window.location.reload();
 });


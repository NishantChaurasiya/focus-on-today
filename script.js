const checkboxes=document.querySelectorAll(".ellipse");
const progressValue=document.querySelector(".progress-value");
const  inputs=document.querySelectorAll(".task");
const error=document.querySelector(".error");
const images=document.querySelectorAll(".checkbox");

checkboxes.forEach((checkbox)=>{
 checkbox.addEventListener("click",()=>{
   const allInputFilled=[...inputs].every((input)=>{
    console.log(input.value);
    return input.value
   });
   if(allInputFilled){
    checkbox.parentElement.classList.add("completed")
   }else{
    error.classList.remove("hide");
   }
   inputs.forEach((input)=>{
    input.addEventListener("focus",()=>{
      error.classList.add("hide")
    })
   })
 });
});


document.getElementById("SpecialInstruction1").style.display="none"
document.getElementById("SpecialInstruction2").style.display="none"
document.getElementById("SpecialTask1").style.display="none"
document.getElementById("SpecialTask2").style.display="none"

document.getElementById("SpecialInstruction1AddStaff1").style.display="none"
document.getElementById("SpecialInstruction2AddStaff1").style.display="none"
document.getElementById("SpecialTask1AddStaff1").style.display="none"
document.getElementById("SpecialTask2AddStaff1").style.display="none"

document.getElementById("SpecialInstruction1AddStaff2").style.display="none"
document.getElementById("SpecialInstruction2AddStaff2").style.display="none"
document.getElementById("SpecialTask1AddStaff2").style.display="none"
document.getElementById("SpecialTask2AddStaff2").style.display="none"


document.getElementById("SpecialInstructionType").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialInstruction2").style.display="block";
    document.getElementById("SpecialInstruction1").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialInstruction1").style.display="block";
    document.getElementById("SpecialInstruction2").style.display="none";
  }
  else{
    document.getElementById("SpecialInstruction1").style.display="none";
    document.getElementById("SpecialInstruction2").style.display="none";
  }

});

document.getElementById("SpecialTaskType").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialTask1").style.display="block";
    document.getElementById("SpecialTask2").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialTask2").style.display="block";
    document.getElementById("SpecialTask1").style.display="none";
  }
  else{
    document.getElementById("SpecialTask1").style.display="none";
    document.getElementById("SpecialTask2").style.display="none";
  }

});


document.getElementById("SpecialInstructionTypeAddStaff1").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialInstruction2AddStaff1").style.display="block";
    document.getElementById("SpecialInstruction1AddStaff1").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialInstruction1AddStaff1").style.display="block";
    document.getElementById("SpecialInstruction2AddStaff1").style.display="none";
  }
  else{
    document.getElementById("SpecialInstruction1AddStaff1").style.display="none";
    document.getElementById("SpecialInstruction2AddStaff1").style.display="none";
  }

});


document.getElementById("SpecialTaskTypeAddStaff1").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialTask1AddStaff1").style.display="block";
    document.getElementById("SpecialTask2AddStaff1").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialTask2AddStaff1").style.display="block";
    document.getElementById("SpecialTask1AddStaff1").style.display="none";
  }
  else{
    document.getElementById("SpecialTask1AddStaff1").style.display="none";
    document.getElementById("SpecialTask2AddStaff1").style.display="none";
  }

});


document.getElementById("SpecialInstructionTypeAddStaff2").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialInstruction2AddStaff2").style.display="block";
    document.getElementById("SpecialInstruction1AddStaff2").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialInstruction1AddStaff2").style.display="block";
    document.getElementById("SpecialInstruction2AddStaff2").style.display="none";
  }
  else{
    document.getElementById("SpecialInstruction1AddStaff2").style.display="none";
    document.getElementById("SpecialInstruction2AddStaff2").style.display="none";
  }

});


document.getElementById("SpecialTaskTypeAddStaff2").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialTask1AddStaff2").style.display="block";
    document.getElementById("SpecialTask2AddStaff2").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialTask2AddStaff2").style.display="block";
    document.getElementById("SpecialTask1AddStaff2").style.display="none";
  }
  else{
    document.getElementById("SpecialTask1AddStaff2").style.display="none";
    document.getElementById("SpecialTask2AddStaff2").style.display="none";
  }

});





function displayNone(){
  document.querySelector(".StartTimeEndTime").style.display="none";
  document.querySelector(".StartDateEndDate").style.display="none";
  document.querySelector(".dateTime").style.display="none";
  document.querySelector(".startDate").style.display="none";  
  document.querySelector("#JobTypeOccurance").style.display="none";
document.querySelector("#Recurring").style.display="none";
document.querySelector("#manually").style.display="none";
}
  
displayNone()

document.getElementById("JobTypeSelect").addEventListener("change", function() {
 
  console.log( document.getElementById("JobTypeOccuranceType").selectedIndex)
  //document.getElementById("JobTypeOccuranceType").selectedIndex=1;
  displayNone()
  if(this.value=="Instant"){
    document.querySelector(".startDate").style.display="block";
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Ongoing"){
    document.querySelector(".startDate").style.display="block";  
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Temporary"){

    document.querySelector(".StartDateEndDate").style.display="flex";
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Permanent"){
    
    document.querySelector(".startDate").style.display="flex";
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
 
});


document.getElementById("JobTypeOccuranceType").addEventListener("change", function() {
  
  if(this.value=="Occurance"){
    document.querySelector("#Recurring").style.display="block";
    document.querySelector("#manually").style.display="none";
  }
  else if(this.value=="Manually"){
    document.querySelector("#Recurring").style.display="none";
    document.querySelector("#manually").style.display="block";
  }
  else{
    document.querySelector("#manually").style.display="none";
    document.querySelector("#Recurring").style.display="none";

  }

});


document.getElementById("sheduleType").addEventListener("change", function() {

  if(this.value=="Date and time"){
    document.getElementById("Typedateselection").style.display="block";

  }
  else if(this.value=="Instruction"){
    document.getElementById("SpecialTask2AddStaff2").style.display="block";
    document.getElementById("SpecialTask1AddStaff2").style.display="none";
  }
  else if(this.value=="Task"){
    document.getElementById("SpecialTask1AddStaff2").style.display="none";
    document.getElementById("SpecialTask2AddStaff2").style.display="none";
  }

});



document.getElementById("randomPickedDate").style.display="none";

document.getElementById("dateSelection").addEventListener("change", function() {

  if(this.value=="Single date and time"){
    document.getElementById("singleDate").style.display="block";

  }
  else if(this.value=="Multiple random pick"){
    document.getElementById("singleDate").style.display="none";
    document.getElementById("randomPickedDate").style.display="block";

  }
  else if(this.value=="Range selection"){
   
  }

});



/**
 * 
 * reference for multiple date selction which are random 
 * https://jsfiddle.net/azaret/25bqa6ho/   for source code
 * 
 * https://codepen.io/ranjith555/pen/OyKjjm for ui 
 */
$('.date').datepicker({
  multidate: true,
	format: 'dd-mm-yyyy'
});

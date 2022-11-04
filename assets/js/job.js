

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


/*new date and time sheduler */

/*for random date selection */

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
document.getElementById("rangePickedDate").style.display="none";

document.getElementById("dateSelection").addEventListener("change", function() {
  if(this.value=="Single date and time"){
    document.getElementById("singleDate").style.display="block";
    document.getElementById("randomPickedDate").style.display="none";
    document.getElementById("rangePickedDate").style.display="none";

  }
  else if(this.value=="Multiple random pick"){
    document.getElementById("singleDate").style.display="none";
    document.getElementById("randomPickedDate").style.display="block";
    document.getElementById("rangePickedDate").style.display="none";

  }
  else if(this.value=="Range selection"){
    document.getElementById("randomPickedDate").style.display="none";
    document.getElementById("singleDate").style.display="none";
    document.getElementById("rangePickedDate").style.display="block";

  }

});



/**
 * 
 * reference for multiple date selction which are random 
 * https://jsfiddle.net/azaret/25bqa6ho/   for source code
 * 
 * https://codepen.io/ranjith555/pen/OyKjjm for ui 
 */
let startEndDateForm=document.getElementById("startEndDateForm")
let startEndDateFormRange=document.getElementById("startEndDateFormRange")
let myShedule=document.getElementById("myShedule")
let myShedule2=document.getElementById("myShedule2")
let myShedule3=document.getElementById("myShedule3")


let MAX_TIMESTAMP = 8640000000000000;
 let date = new Date();

 startEndDateForm.addEventListener("submit",(e)=>{
  e.preventDefault()

 })

 myShedule.addEventListener("submit",(e)=>{
  e.preventDefault()
  let obj=[]
  let randomDateSelected=document.querySelectorAll(".randomDateSelected")
  let randomSTimeSelected=document.querySelectorAll(".randomSTimeSelected")
  let randomETimeSelected=document.querySelectorAll(".randomETimeSelected")
  

  for(let i=0;i<randomDateSelected.length;i++){
      obj.push({date:randomDateSelected[i].value,startTime:randomSTimeSelected[i].value,endTime:randomETimeSelected[i].value})
    if(i==randomDateSelected.length-1){
      console.log(obj)
    }
  }

 })

 myShedule2.addEventListener("submit",(e)=>{
  e.preventDefault()
  let obj=[]
  let randomDateSelected=document.querySelectorAll(".rangeDateSelected")
  let randomSTimeSelected=document.querySelectorAll(".rangeSTimeSelected")
  let randomETimeSelected=document.querySelectorAll(".rangeETimeSelected")

  for(let i=0;i<randomDateSelected.length;i++){
      obj.push({date:randomDateSelected[i].value,startTime:randomSTimeSelected[i].value,endTime:randomETimeSelected[i].value})
    if(i==randomDateSelected.length-1){
      console.log(obj)
    }
  }

 })
 
 myShedule3.addEventListener("submit",(e)=>{
  e.preventDefault()
  let obj=[]
  let mySingleDate=document.getElementById("mySingleDate")
  let mySingleStartTime=document.getElementById("mySingleStartTime")
  let mySingleEndTime=document.getElementById("mySingleEndTime")

  obj.push({date:mySingleDate,startTime:mySingleStartTime,endTime:mySingleEndTime})
  console.log(obj)
 })

 date.setDate(date.getDate())

 function datepickerFunc(val1){
  let date2 = new Date(val1);
  date2.setDate(date2.getDate())

  $('#randomDate').datepicker('destroy').datepicker({
    multidate: true,
    format: 'yyyy-mm-dd',
    title:"Select date randomly",
    todayHighlight:true,
    todayBtn:"linked",
    startDate: date,
    endDate:date2
  });
 }

 datepickerFunc(MAX_TIMESTAMP)


function apply(){
  let randomDate=document.getElementById("randomDate").value
  randomDate=randomDate.split(",")
  function sortByDate(a, b) {
    if (a < b) {
        return 1;
    }
    if (a > b) {
        return -1;
    }
    return 0;
  }
  const sorted = randomDate.sort(sortByDate);
  displayConfigTime(sorted.reverse())
}

function applyDateRange(){
  endDate=document.getElementById("endDate").value
  console.log(endDate)
  if(endDate){
    datepickerFunc(endDate)
  }
}


function displayConfigTime(val1){
   let DomObj=''
   let sTime=document.getElementById("startTimeRandom").value
   let eTime=document.getElementById("endTimeRandom").value


   for(let i=0;i<val1.length;i++){


    DomObj+=`<div class="col-12">
        <div class="form-group">
          <label>Date </label>
          <input class="form-control randomDateSelected" value=${val1[i]} type="date" required>
        </div>
        </div> 
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label>Start time</label>
            <input class="form-control randomSTimeSelected"  value=${sTime}  type="time" required >
          </div>
        </div> 
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label>End time</label>
            <input class="form-control randomETimeSelected"  value=${eTime}  type="time" required>
          </div>
        </div> `
        if(i==val1.length-1){
          if(val1!=''){
            $("#displaySelectedDateRandom").empty();
            $("#displaySelectedDateRandom").append(
              `${DomObj} `)
          }
         
        }
   }
  
}

/*for range date selection */




startEndDateFormRange.addEventListener("submit",(e)=>{
  e.preventDefault()
  let endDateRange=document.getElementById("endDateRange").value
  let startDateRange=document.getElementById("startDateRange").value
  


  /*THIS PART IS FOR FORMATTING  */
  let mydate1 = moment(startDateRange);
  let myDate2 = mydate1.format('MM-DD-YYYY');
  let mydate3 = moment(endDateRange);
  let myDate4 = mydate3.format('MM-DD-YYYY');

 // datepickerFunc2( "11/04/2022", "12/02/2022")
  datepickerFunc2( myDate2,myDate4)

 })

function datepickerFunc2(val1 ,val2){
  $(function() {
    $('input[name="daterange"]').daterangepicker(
      {
        "startDate":val1,
        "endDate":val2,
        "drops": "up"
    }
    );
  });
}


datepickerFunc2( "10/27/2022", "11/02/2022")


function applyRange(){
  let rangeDate=document.getElementById("dateRange").value
  console.log(rangeDate)
  if(rangeDate){
    function dateRange(startDate, endDate, steps = 1) {
      const dateArray = [];
      let currentDate = new Date(startDate);
    
      while (currentDate <= new Date(endDate)) {
        let date = moment(currentDate);
        let myDate = date.format('YYYY-MM-DD');
        dateArray.push(myDate);
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      
      }
    
      return dateArray;
    }
    let startDate=rangeDate.substring(0,10)
    let endStart=rangeDate.substring(13,23)
    const dates = dateRange(startDate,endStart);
    console.log(dates)
    displayConfigTime2(dates)
  }
}


function displayConfigTime2(val1){
  let DomObj=''
  let sTime=document.getElementById("startTimeRange").value
  let eTime=document.getElementById("endTimeRange").value


  for(let i=0;i<val1.length;i++){


   DomObj+=`<div class="col-12">
       <div class="form-group">
         <label>Date </label>
         <input class="form-control rangeDateSelected" value=${val1[i]} type="date" required>
       </div>
       </div> 
       <div class="col-12 col-sm-6">
         <div class="form-group">
           <label>Start time</label>
           <input class="form-control rangeSTimeSelected"  value=${sTime}  type="time" required >
         </div>
       </div> 
       <div class="col-12 col-sm-6">
         <div class="form-group">
           <label>End time</label>
           <input class="form-control rangeETimeSelected"  value=${eTime}  type="time" required>
         </div>
       </div> `
       if(i==val1.length-1){
         if(val1!=''){
           $("#displaySelectedDateRange").empty();
           $("#displaySelectedDateRange").append(
             `${DomObj} `)
         }
        
       }
  }
 
}

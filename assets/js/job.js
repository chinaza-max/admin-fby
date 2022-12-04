
$(document).ready(function() {

    setTimeout(() => {
     
    /*  $(`.logTableContentClass`).append(
        ` <tr>
        <td>2/20/22	</td>
        <td>9:00 AM	</td>
        <td>Clock In</td>
        <td>Clock out	 </td>
     </tr> <tr>
        <td>2/20/22	</td>
        <td>9:00 AM	</td>
        <td>Clock In</td>
        <td>Clock 	 </td>
     </tr>`)*/


    $('table.display').DataTable({
        select: true,
        dom: 'Bfrtip',
        scrollY: '50vh',
        buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5',
        'print'
        ],
        "columns": [
          { "data": "Date" },
          { "data": "Time" },
          { "data": "Activity" },
          { "data": "location" }
      ] 
    });


    let ROWDATA=   [{
      Date: "2/20/22",
      Time: "9:00 AM",
      Activity: "test",
      location: "test"
    }]
    




   
    // tables.table(1).row.add(ROWDATA).draw( false );
      

    }, 200);

    $('#logTableContent tbody').on("click",'td', function () {
       console.log("am a"); });

  

  
});

/*
function initializePayOff(){
  console.log("clear")
  totalHours=0
  amountPending=0
}
*/
/*
function calPayOff(val1, val2){
  document.getElementById("totalHours").innerHTML =val1
  document.getElementById("amountPending").innerHTML ="$"+val2
}
*/
/*new date and time sheduler */



/*for random date selection */

document.getElementById("addTask").style.display="none"
document.getElementById("addInstruction").style.display="none"


document.getElementById("sheduleType").addEventListener("change", function() {

  if(this.value=="Date and time"){
    document.getElementById("addInstruction").style.display="none";
    document.getElementById("addTask").style.display="none";
    document.getElementById("dateAndTime").style.display="block"

  }
  else if(this.value=="Instruction"){
    document.getElementById("addInstruction").style.display="block";
    document.getElementById("addTask").style.display="none";
    document.getElementById("dateAndTime").style.display="none"
  }
  else if(this.value=="Task"){
    document.getElementById("addInstruction").style.display="none";
    document.getElementById("addTask").style.display="block";
    document.getElementById("dateAndTime").style.display="none"
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


let formforGettingTask=document.getElementById("formforGettingTask")
let formforGettingInstructionInfo=document.getElementById("formforGettingInstructionInfo")
let startEndDateForm=document.getElementById("startEndDateForm")
let startEndDateFormRange=document.getElementById("startEndDateFormRange")
let myShedule=document.getElementById("myShedule")
let myShedule2=document.getElementById("myShedule2")
let myShedule3=document.getElementById("myShedule3")


//console.log(document.getElementById())


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

  let mySingleDate=document.getElementById("mySingleDate").value
  let mySingleStartTime=document.getElementById("mySingleStartTime").value
  let mySingleEndTime=document.getElementById("mySingleEndTime").value
  obj.push({date:mySingleDate,startTime:mySingleStartTime,endTime:mySingleEndTime})
 
  
 console.log(obj)
})

 date.setDate(date.getDate())

 function datepickerFunc(val1,val2=date){
  let date2 = new Date(val1);
  date2.setDate(date2.getDate())

  $('#randomDate').datepicker('destroy').datepicker({
    multidate: true,
    format: 'yyyy-mm-dd',
    title:"Select date randomly",
    todayHighlight:true,
    todayBtn:"linked",
    startDate: val2,
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
  displayConfigTime(sorted)
}

function applyDateRange(){
  endDate=document.getElementById("endDate").value
  startDate=document.getElementById("startDate").value

  if(endDate){
    datepickerFunc(endDate,startDate)
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


/*

initialize the date displayed for for range selection */

let dateNow= moment( Date.now());
let dateNowFormatted = dateNow.format('MM/DD/YYYY');
let dateAfter= moment(Date.now()).add(30,'days');
let dateAfterFormatted = dateAfter.format('MM/DD/YYYY');


datepickerFunc2( dateNowFormatted,dateAfterFormatted)

function applyRange(){
  let rangeDate=document.getElementById("dateRange").value
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




/*for intruction */





function datepickerInstructionFunc(val1,val2=date){
  let date2 = new Date(val1);
  date2.setDate(date2.getDate())

  $('#randomDateInstrution').datepicker('destroy').datepicker({
    multidate: true,
    format: 'yyyy-mm-dd',
    title:"Select date randomly for instruction",
    todayHighlight:true,
    todayBtn:"linked",
    startDate: val2,
    endDate:date2
  });
 }

 datepickerInstructionFunc(MAX_TIMESTAMP)



document.getElementById("applyJobDate").style.display="none"


document.getElementById("toggleInstructionDate").addEventListener("change", function() {

  if(this.value=="use job date"){
    document.getElementById("applyJobDate").style.display="block";
    document.getElementById("multipleDatePickerForInstruction").style.display="none";
  }
  else if(this.value=="new date"){
    document.getElementById("multipleDatePickerForInstruction").style.display="block";
    document.getElementById("applyJobDate").style.display="none";
  }

})


document.getElementById("instructionContainer").style.display="none"

document.getElementById("instructionType").addEventListener("change", function() {

  if(this.value=="Scan QR code"){
    document.getElementById("instructionContainer").style.display="block";
  }
  else if(this.value=="Perform security check"){
    document.getElementById("instructionContainer").style.display="block";

  }
  else{
    document.getElementById("instructionContainer").style.display="none";
  }

})



formforGettingInstructionInfo.addEventListener("submit",(e)=>{
  e.preventDefault()
  let randomDate=document.getElementById("randomDateInstrution").value
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

  displayConfigTimeInstruction(sorted.reverse())
  
 })


function displayConfigTimeInstruction(val1){
  let DomObj=''
  let instructionInfo=document.getElementById("instructionInfo").value
  let instructionType=document.getElementById("instructionType").value
  let instructionTime=document.getElementById("instructionTime").value

  console.log(instructionInfo)
  console.log(instructionType)
  console.log(instructionTime)

  for(let i=0;i<val1.length;i++){
   DomObj+=`

   <div class="col-md-12">
     <div class="form-group">
       <label>Info </label>
       <textarea class="form-control instructionInfo" rows="4"
           required>${instructionInfo}</textarea>
     </div>
   </div>

   <div class="col-md-6">
     <div class="form-group">
       <label>Instruction type</label>
       <input class="form-control instructionType" type="text" value="${instructionType}" readonly>
     </div>
   </div>

   <div class="col-md-6">
     <div class="form-group">
       <label>Time to perform instrution </label>
       <input class="form-control instructionTime" type="time" value=${instructionTime} required>
     </div>
   </div>

   <div class="col-12 col-sm-6">
     <div class="form-group">
       <label>Date</label>
       <input class="form-control instructionDate" value=${val1[i]}  type="date" required>
     </div>
   </div>
   <div class="alert alert-secondary" role="alert">
   </div>

   `
       if(i==val1.length-1){
         if(val1!=''){
           $("#mySheduleInstruction").empty();
           $("#mySheduleInstruction").append(
             `${DomObj} `)
         }
        
       }
  }
 
}

createInstruction.addEventListener("submit",(e)=>{
  e.preventDefault()
  let obj=[]
  let instructionInfo=document.querySelectorAll(".instructionInfo")
  let instructionType=document.querySelectorAll(".instructionType")
  let instructionTime=document.querySelectorAll(".instructionTime")
  let instructionDate=document.querySelectorAll(".instructionDate")


  for(let i=0;i<instructionInfo.length;i++){
      obj.push({info:instructionInfo[i].value,type:instructionType[i].value,time:instructionTime[i].value,date:instructionDate[i].value})
    if(i==instructionInfo.length-1){
      console.log(obj)
    }
  }

})




/*for Task */



function datepickerTaskFunc(val1,val2=date){
  let date2 = new Date(val1);
  date2.setDate(date2.getDate())

  $('#randomDateTask').datepicker('destroy').datepicker({
    multidate: true,
    format: 'yyyy-mm-dd',
    title:"Select date randomly for instruction",
    todayHighlight:true,
    todayBtn:"linked",
    startDate: val2,
    endDate:date2
  });
 }

 datepickerTaskFunc(MAX_TIMESTAMP)

document.getElementById("applyJobDateTask").style.display="none";
document.getElementById("toggleTaskDate").addEventListener("change", function() {

  if(this.value=="use job date"){
    document.getElementById("applyJobDateTask").style.display="block";
    document.getElementById("multipleDatePickerForTask").style.display="none";
  }
  else if(this.value=="new date"){
    document.getElementById("multipleDatePickerForTask").style.display="block";
    document.getElementById("applyJobDateTask").style.display="none";
  }

})



formforGettingTask.addEventListener("submit",(e)=>{
  e.preventDefault()
  let randomDate=document.getElementById("randomDateTask").value
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

  displayConfigTimeTask(sorted.reverse())
  
 })

 
function displayConfigTimeTask(val1){
  let DomObj=''
  let TaskInfo=document.getElementById("TaskInfo").value

  for(let i=0;i<val1.length;i++){
   DomObj+=`

   <div class="col-md-12">
     <div class="form-group">
       <label>Info </label>
       <textarea class="form-control taskInfo" rows="4"
           required>${TaskInfo}</textarea>
     </div>
   </div>

   
   <div class="col-12 col-sm-6">
     <div class="form-group">
       <label>Date</label>
       <input class="form-control taskDate" value=${val1[i]}  type="date" required>
     </div>
   </div>

   <div class="alert alert-secondary" role="alert">
   </div>

   `
       if(i==val1.length-1){
         if(val1!=''){
           $("#mySheduleTask").empty();
           $("#mySheduleTask").append(
             `${DomObj} `)
         }
        
       }
  }
 
}


let createTask=document.getElementById("createTask")
createTask.addEventListener("submit",(e)=>{
  e.preventDefault()

  let obj=[]
  let taskInfo=document.querySelectorAll(".taskInfo")
  let taskDate=document.querySelectorAll(".taskDate")

  for(let i=0;i<taskInfo.length;i++){
      obj.push({info:taskInfo[i].value,date:taskDate[i].value})
    if(i==taskInfo.length-1){
      console.log(obj)
    }
  }

})



/*partial sheduling with guard */

function addGuardDateShedule1(){
  let obj=[]
  let objGuard=[]
  let mySingleDate=document.getElementById("mySingleDate").value
  let mySingleStartTime=document.getElementById("mySingleStartTime").value
  let mySingleEndTime=document.getElementById("mySingleEndTime").value
  let addGuardDateShedule1V=document.getElementById("addGuardDateShedule1V")
  let myjobType=document.getElementById("myjobType").value
  obj.push({date:mySingleDate,startTime:mySingleStartTime,endTime:mySingleEndTime})
 
  for (let i=0;i<addGuardDateShedule1V.length;i++){
     if (addGuardDateShedule1V[i].selected)
     {
      objGuard.push(addGuardDateShedule1V[i].value);
     }
  }




  const dummy1={name:"chi",dateShedule:[{},{}],instructionShedule:[{},{}]
  ,taskShedule:[{},{}]}
 
  let test1JobU=JSON.parse(localStorage.getItem("job")||"[]")
  if(test1JobU.length==0){
      const arr=[]
      for(let i=0;i<objGuard.length;i++){
        arr.push({name:objGuard[i],dateShedule:obj,type:myjobType})
        if(i==objGuard.length-1){
          localStorage.setItem("job",JSON.stringify(arr))
        }     
      } 
  }
  else{
   let conter=objGuard.length
   for(let i=0;i<conter;i++){   
     let myGuard=objGuard[i];
     let conter2=test1JobU.length
     for(let j=0;j<conter2;j++){
      
      console.log(myGuard==test1JobU[j].name)
       if(myGuard==test1JobU[j].name){
       
         let myNewShedule=test1JobU[j].dateShedule?test1JobU[j].dateShedule.concat(obj):obj;
         
         let myPromise = new Promise(function(myResolve, myReject) {
           myResolve(arrangeDate(myNewShedule));
         });
         myPromise.then(
           function(value) {
              test1JobU[j].dateShedule=value
               localStorage.setItem("job",JSON.stringify(test1JobU))
             }
         )
         break
       }
       if(j==conter2-1){
         test1JobU.push({name:myGuard, dateShedule:obj})
         localStorage.setItem("job",JSON.stringify(test1JobU))
         
       }
 
     } 
    
   } 
 
 
  }
  console.log(objGuard)
  console.log(obj)
}

function addGuardDateShedule2(){
  let obj=[]
  let objGuard=[]

  let randomDateSelected=document.querySelectorAll(".randomDateSelected")
  let randomSTimeSelected=document.querySelectorAll(".randomSTimeSelected")
  let randomETimeSelected=document.querySelectorAll(".randomETimeSelected")
  let addGuardDateShedule2V=document.getElementById("addGuardDateShedule2V")
  let myjobType=document.getElementById("myjobType").value


  for(let i=0;i<randomDateSelected.length;i++){
      obj.push({date:randomDateSelected[i].value,startTime:randomSTimeSelected[i].value,endTime:randomETimeSelected[i].value})
    if(i==randomDateSelected.length-1){
      console.log(obj)
    }
  }

  for (let i=0;i<addGuardDateShedule2V.length;i++){
    if (addGuardDateShedule2V[i].selected)
    {
     objGuard.push(addGuardDateShedule2V[i].value);
    }
 }


 let test1JobU=JSON.parse(localStorage.getItem("job")||"[]")
 if(test1JobU.length==0){
    const arr=[]
      for(let i=0;i<objGuard.length;i++){
        arr.push({name:objGuard[i],dateShedule:obj,type:myjobType})
        if(i==objGuard.length-1){
          localStorage.setItem("job",JSON.stringify(arr))
        }     
      } 
 }
 else{
  let conter=objGuard.length
  for(let i=0;i<conter;i++){   
    let myGuard=objGuard[i];
    let conter2=test1JobU.length
    for(let j=0;j<conter2;j++){
     
      console.log(myGuard==test1JobU[j].name)
      if(myGuard==test1JobU[j].name){
      
        let myNewShedule=test1JobU[j].dateShedule?test1JobU[j].dateShedule.concat(obj):obj;
        
        let myPromise = new Promise(function(myResolve, myReject) {
          myResolve(arrangeDate(myNewShedule));
        });
        myPromise.then(
          function(value) {
             test1JobU[j].dateShedule=value
              localStorage.setItem("job",JSON.stringify(test1JobU))
            }
        )
        break
      }
      if(j==conter2-1){
        test1JobU.push({name:myGuard, dateShedule:obj})
        localStorage.setItem("job",JSON.stringify(test1JobU))
        
      }

    } 
   
  } 


 }

 console.log(objGuard)
 console.log(obj)

}

//localStorage.setItem("job",[])
console.log(JSON.parse(localStorage.getItem("job")||"[]"))

function addGuardDateShedule3(){
  let obj=[]
  let objGuard=[]
  let randomDateSelected=document.querySelectorAll(".rangeDateSelected")
  let randomSTimeSelected=document.querySelectorAll(".rangeSTimeSelected")
  let randomETimeSelected=document.querySelectorAll(".rangeETimeSelected")
  let addGuardDateShedule3V=document.getElementById("addGuardDateShedule3V")

  for(let i=0;i<randomDateSelected.length;i++){
      obj.push({date:randomDateSelected[i].value,startTime:randomSTimeSelected[i].value,endTime:randomETimeSelected[i].value})
    
      if(i==randomDateSelected.length-1){
        console.log(obj)
    }
  }

  for (let i=0;i<addGuardDateShedule3V.length;i++){
    if (addGuardDateShedule3V[i].selected)
    {
     objGuard.push(addGuardDateShedule3V[i].value);
    }
 }

 const dummy1={name:"chi",dateShedule:[{},{}],instructionShedule:[{},{}]
 ,taskShedule:[{},{}]}

 let test1JobU=JSON.parse(localStorage.getItem("job")||"[]")
 if(test1JobU.length==0){
    const arr=[]
      for(let i=0;i<objGuard.length;i++){
        arr.push({name:objGuard[i],dateShedule:obj})
        if(i==objGuard.length-1){
          localStorage.setItem("job",JSON.stringify(arr))
        }     
      } 
 }
 else{
  let conter=objGuard.length
  for(let i=0;i<conter;i++){   
    let myGuard=objGuard[i];
    let conter2=test1JobU.length
    for(let j=0;j<conter2;j++){
     
      console.log(myGuard==test1JobU[j].name)
      if(myGuard==test1JobU[j].name){
      
        let myNewShedule=test1JobU[j].dateShedule?test1JobU[j].dateShedule.concat(obj):obj;
        
        let myPromise = new Promise(function(myResolve, myReject) {
          myResolve(arrangeDate(myNewShedule));
        });
        myPromise.then(
          function(value) {
             test1JobU[j].dateShedule=value
              localStorage.setItem("job",JSON.stringify(test1JobU))
            }
        )
        break
      }
      if(j==conter2-1){
        test1JobU.push({name:myGuard, dateShedule:obj})
        localStorage.setItem("job",JSON.stringify(test1JobU))
        
      }

    } 
   
  } 


 }

 //console.log(objGuard)
 //console.log(obj)

}


function addGuardDateShedule4(){
  let obj=[]
  let objGuard=[]

  let instructionInfo=document.querySelectorAll(".instructionInfo")
  let instructionType=document.querySelectorAll(".instructionType")
  let instructionTime=document.querySelectorAll(".instructionTime")
  let instructionDate=document.querySelectorAll(".instructionDate")
  let addGuardDateShedule4V=document.getElementById("addGuardDateShedule4V")



  for(let i=0;i<instructionInfo.length;i++){
      obj.push({info:instructionInfo[i].value,type:instructionType[i].value,time:instructionTime[i].value,date:instructionDate[i].value})
    if(i==instructionInfo.length-1){
      console.log(obj)
    }
  }

  for (let i=0;i<addGuardDateShedule4V.length;i++){
    if (addGuardDateShedule4V[i].selected)
    {
     objGuard.push(addGuardDateShedule4V[i].value);
    }
 }

 const dummy1={name:"chi",dateShedule:[{},{}],instructionShedule:[{},{}]
 ,taskShedule:[{},{}]}

 let test1JobU=JSON.parse(localStorage.getItem("job")||"[]")
 if(test1JobU.length==0){
    const arr=[]
      for(let i=0;i<objGuard.length;i++){
        arr.push({name:objGuard[i],instructionShedule:obj})
        if(i==objGuard.length-1){
          localStorage.setItem("job",JSON.stringify(arr))
        }     
      } 
 }
 else{
  let conter=objGuard.length
  for(let i=0;i<conter;i++){   
    let myGuard=objGuard[i];
    let conter2=test1JobU.length
    for(let j=0;j<conter2;j++){
     
      console.log(myGuard==test1JobU[j].name)
      if(myGuard==test1JobU[j].name){
      
        let myNewShedule=test1JobU[j].instructionShedule?test1JobU[j].instructionShedule.concat(obj):obj;
        
        let myPromise = new Promise(function(myResolve, myReject) {
          myResolve(arrangeDate2(myNewShedule));
        });
        myPromise.then(
          function(value) {
             test1JobU[j].instructionShedule=value
              localStorage.setItem("job",JSON.stringify(test1JobU))
            }
        )
        break
      }
      if(j==conter2-1){
        test1JobU.push({name:myGuard, instructionShedule:obj})
        localStorage.setItem("job",JSON.stringify(test1JobU))
        
      }

    } 
   
  } 


 }
 console.log(objGuard)
 console.log(obj)
}






function addGuardDateShedule5(){
  
  let obj=[]
  let objGuard=[]

  let taskInfo=document.querySelectorAll(".taskInfo")
  let taskDate=document.querySelectorAll(".taskDate")
  let addGuardDateShedule5V=document.getElementById("addGuardDateShedule5V")


  for(let i=0;i<taskInfo.length;i++){
      obj.push({info:taskInfo[i].value,date:taskDate[i].value})
    if(i==taskInfo.length-1){
      console.log(obj)
    }
  }

  for (let i=0;i<addGuardDateShedule5V.length;i++){
    if (addGuardDateShedule5V[i].selected)
    {
     objGuard.push(addGuardDateShedule5V[i].value);
    }
 }

 const dummy1={name:"chi",dateShedule:[{},{}],instructionShedule:[{},{}]
 ,taskShedule:[{},{}]}
 let test1JobU=JSON.parse(localStorage.getItem("job")||"[]")
 if(test1JobU.length==0){
    const arr=[]
      for(let i=0;i<objGuard.length;i++){
        arr.push({name:objGuard[i],taskShedule:obj})
        if(i==objGuard.length-1){
          localStorage.setItem("job",JSON.stringify(arr))
        }     
      } 
 }
 else{
  let conter=objGuard.length
  for(let i=0;i<conter;i++){   
    let myGuard=objGuard[i];
    let conter2=test1JobU.length
    for(let j=0;j<conter2;j++){
     
      console.log(myGuard==test1JobU[j].name)
      if(myGuard==test1JobU[j].name){
      
        let myNewShedule=test1JobU[j].taskShedule?test1JobU[j].taskShedule.concat(obj):obj;
        
        let myPromise = new Promise(function(myResolve, myReject) {
          myResolve(arrangeDate3(myNewShedule));
        });
        myPromise.then(
          function(value) {
             test1JobU[j].taskShedule=value
              localStorage.setItem("job",JSON.stringify(test1JobU))
            }
        )
        break
      }
      if(j==conter2-1){
        test1JobU.push({name:myGuard, taskShedule:obj})
        localStorage.setItem("job",JSON.stringify(test1JobU))
        
      }

    } 
   
  } 

 }
}

function arrangeDate(val1){

  //console.log(val1)
  function sortByDate(a, b) {
   // console.log(a.date)

    if (a.date < b.date) {
        return 1;
    }
    if (a.date > b.date) {
        return -1;
    }
    return 0;
  }
  const sorted = val1.sort(sortByDate)
  //console.log(sorted)

  return  removeDateTimeDuplicate(sorted.reverse())
}


function arrangeDate2(val1){

  //console.log(val1)
  function sortByDate(a, b) {
   // console.log(a.date)

    if (a.date < b.date) {
        return 1;
    }
    if (a.date > b.date) {
        return -1;
    }
    return 0;
  }
  const sorted = val1.sort(sortByDate)
  //console.log(sorted)

  return  removeDateTimeDuplicate2(sorted.reverse())
}
function arrangeDate3(val1){

  //console.log(val1)
  function sortByDate(a, b) {
   // console.log(a.date)

    if (a.date < b.date) {
        return 1;
    }
    if (a.date > b.date) {
        return -1;
    }
    return 0;
  }
  const sorted = val1.sort(sortByDate)
  //console.log(sorted)

  return  removeDateTimeDuplicate3(sorted.reverse())
}

function removeDateTimeDuplicate(val1){
  let store={}
  
  val1=val1.filter(function (date, i, array) {

    if(!store[date.date]&&!store[date.startTime]&&!store[date.endTime]){
      store[date.date]=true
      store[date.startTime]=true
      store[date.endTime]=true
      return true
    }
    else if((!store[date.date]&&!store[date.startTime])||!store[date.endTime]){
      store[date.date]=true
      store[date.startTime]=true
      store[date.endTime]=true
      return true
  
    }
    else if(!store[date.date]||(!store[date.startTime]&&!store[date.endTime])){
      store[date.date]=true
      store[date.startTime]=true
      store[date.endTime]=true
      return true
    }
    else if(!store[date.startTime]||(!store[date.date]&&!store[date.endTime])){
      store[date.date]=true
      store[date.startTime]=true
      store[date.endTime]=true
      return true
    }
    else{
      return false
    }
 })
 return val1
 
}
function removeDateTimeDuplicate2(val1){
  let store={}
  
  val1=val1.filter(function (date, i, array) {
    console.log(date)
    if(!store[date.date]&&!store[date.time]){
      store[date.date]=true
      store[date.time]=true
      return true
    }
    else if((!store[date.date]||!store[date.time])){
      store[date.date]=true
      store[date.time]=true
      return true
  
    }

 
    else{
      return false
    }
 })
 return val1
 
}
function removeDateTimeDuplicate3(val1){
  let store={}
  
  val1=val1.filter(function (date, i, array) {
    if(!store[date.date]  ){
      store[date.date]=true
      return true
    } 
    else{
      return false
    }
 })
 return val1
 
}
/*
let duplicatesArray=[
  {date: '2022-10-31', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-01', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-01', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-02', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-02', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-03', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-03', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-04', startTime: '00:00', endTime: '23:59'},
  {date: '2022-11-04', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-04', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-04', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-05', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-05', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-05', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-05', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-06', startTime: '00:00', endTime: '23:59'}, 
  {date: '2022-11-06', startTime: '00:00', endTime: '23:59'} , 
  {date: '2022-11-07', startTime: '00:00', endTime: '23:59'}]
 console.log(removeDateTimeDuplicate(duplicatesArray))
*/

/*THIS PART HANDLES THE FILLINS OF JOB DETAILS */



console.log(JSON.parse(localStorage.getItem("job")||"[]"))




function viewDetailsContentDisplay(val1){
  let DomObj=''
  let table=''
  let instruction=''
  let task=''











  for(let i=0;i<val1.length;i++){
   DomObj+=`
   <p>
   <h4>${val1[i].name}</h4>
   <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${val1[i].name}dateTime"
     aria-expanded="false" aria-controls="${val1[i].name}dateTime">Dates and time</button>

     <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
     data-bs-target="#${val1[i].name}logs" aria-expanded="false" aria-controls="${val1[i].name}logs">view
     logs</button>

   <a class="btn btn-primary" data-bs-toggle="collapse" href="#${val1[i].name}multiCollapseExample1" role="button"
     aria-expanded="false" aria-controls="${val1[i].name}multiCollapseExample1">view instruction</a>

   <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
     data-bs-target="#${val1[i].name}multiCollapseExample2" aria-expanded="false" aria-controls="${val1[i].name}multiCollapseExample2">view
     task</button>

   <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".${val1[i].name}multi-collapse"
     aria-expanded="false" aria-controls="${val1[i].name}multiCollapseExample1 ${val1[i].name}multiCollapseExample2 ${val1[i].name}dateTime">View
     all
    </button>

    <button type="button" class="btn btn-primary">
    Report <span class="badge badge-light badge-inside ms-2">4</span>
    </button>
   </p>

   


   <div class="collapse ${val1[i].name}multi-collapse" id="${val1[i].name}logs">
   <div class="card card-body">

   <table id="logTable" class="display" style="width:100%;"    
   
   data-info="true"
   select="true">

       <thead>
           <tr>
              <th>Date</th>
              <th>Time</th>
              <th >Activity</th>
              <th>Location </th>
           </tr>
       </thead>

     
     <tbody id="logTableContent" class="logTableContentClass">
     <tr>
     <td>2/20/22	</td>
     <td>9:00 AM	</td>
     <td>Clock In</td>
     <td>Clock out	 </td>
  </tr>
     
     </tbody>
   </table>

   </div>
 </div>

   <div class="collapse ${val1[i].name}multi-collapse" id="${val1[i].name}dateTime">
     <div class="card card-body">

       <div class="table-responsive">       
         <table class="table table-bordered">
           <thead>
             <tr>
               <th scope="col">Date </th>     
               <th scope="col">Start time</th>
               <th scope="col">End time</th>
             </tr>
           </thead>
           <tbody id=${val1[i].name}tableSchedule>
             <tr>

               <td>2022/02/02</td>
               <td>8:00 AM</td>
               <td>3:00 PM</td>
             </tr>

             <tr>

               <td>2022/02/02</td>
               <td>8:00 AM</td>
               <td>3:00 PM</td>
             </tr>

             <tr>
               <td>2022/02/02</td>
               <td>8:00 AM</td>
               <td>3:00 PM</td>
             </tr>


            </tbody>
         </table>
       </div>
     </div>
   </div>


   <div class="row">
     <div class="col">
       <div class="collapse ${val1[i].name}multi-collapse" id="${val1[i].name}multiCollapseExample1">
         <div class="card card-body">

           <div class="v-timeline">
             <div class="line"></div>
             <div class="v-timeline">
               <div class="line"></div>
               <div class="timeline-box">
                 <div class="box-label">
                   <span class="badge badge-success">Instruction</span>
                 </div>

                 <div class="box-items" id="${val1[i].name}timelineInstruction">
                   

                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div class="col">
       <div class="collapse ${val1[i].name}multi-collapse" id="${val1[i].name}multiCollapseExample2">
         <div class="card card-body">
           <div class="v-timeline">
             <div class="line"></div>

             <div class="v-timeline">
               <div class="line"></div>
               <div class="timeline-box">
                 <div class="box-label">
                   <span class="badge badge-success">Task</span>
                 </div>

                 <div class="box-items"  id="${val1[i].name}timelineTask">
                
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   `
       if(i==val1.length-1){
         if(val1!=''){
           $("#viewDetailsContent").empty();
           $("#viewDetailsContent").append(
             `${DomObj} `)
             DomObj=''
         }
        
       }
  }




//this handles display of date and time schedule
  setTimeout(() => {
    for(let i=0;i<val1.length;i++){

      let count1=val1[i].dateShedule.length

      for(let j=0;j<count1;j++){

       // console.log(val1[i].dateShedule[j])

    

        table+=`
        <tr>
          <td>${val1[i].dateShedule[j].date}</td>
          <td>${val1[i].dateShedule[j].startTime}</td>
          <td>${val1[i].dateShedule[j].endTime}</td>
        </tr>
        `
        if(j==count1-1){
          if(val1!=''){
            $(`#${val1[i].name}tableSchedule`).empty();
            $(`#${val1[i].name}tableSchedule`).append(
              `${table} `)

              table=''
          } 
        }
      }
    }
  },100);



  //this handles display instruction schedule
  setTimeout(() => {
    for(let i=0;i<val1.length;i++){

      
      
      if(val1[i].instructionShedule){
        let count1=val1[i].instructionShedule.length
        console.log(val1[i].instructionShedule)

        for(let j=0;j<count1;j++){    

          console.log(val1[i].instructionShedule[j].type)

          if(val1[i].instructionShedule[j].type=="Perform security check"){
            instruction+=`
            <div class="item">
                <div class="icon-block">
                  <div class="item-icon icofont-street-view bg-warning"></div>
                </div>

                <div class="content-block">
                  <div class="item-header">
                    <h3 class="h5 item-title">perform security check</h3>
                    <div class="item-date"><span>Date: ${val1[i].instructionShedule[j].date} </span> ---<span> Time : ${val1[i].instructionShedule[j].time}</span></div>
                  </div>

                  <div class="item-desc">${val1[i].instructionShedule[j].info}</div>
                </div>
            </div>
            `
          }
          else if(val1[i].instructionShedule[j].type=="Scan QR code"){
            instruction+=`
            <div class="item">
              <div class="icon-block">
                <div class="item-icon icofont-search-document bg-warning"></div>
              </div>

                <div class="content-block">
                    <div class="item-header">
                      <h3 class="h5 item-title">scan QR code</h3>
                      <div class="item-date"><span>Date: ${val1[i].instructionShedule[j].date} </span> ---<span> Time : ${val1[i].instructionShedule[j].time}</span></div>
                    </div>
                    <div class="item-desc">${val1[i].instructionShedule[j].info}</div>
                </div>
            </div>
            `
          }
       
          if(j==count1-1){
            if(val1!=''){
              $(`#${val1[i].name}timelineInstruction`).empty();
              $(`#${val1[i].name}timelineInstruction`).append(
                `${instruction} `)

                instruction=''
            } 
          }
        }
      }
      else{
        continue;
      }
    }
  },100);


    //this handles display task schedule
    setTimeout(() => {
      for(let i=0;i<val1.length;i++){
  
        if(val1[i].taskShedule){
          let count1=val1[i].taskShedule.length
          console.log(val1[i].taskShedule)
  
          for(let j=0;j<count1;j++){    
  
            console.log(val1[i].taskShedule)
  
            task+=`
              <div class="item">
                  <div class="icon-block">
                    <div class="item-icon icofont-street-view bg-warning"></div>
                  </div>
  
                  <div class="content-block">
                    <div class="item-header">
                      <h3 class="h5 item-title">${val1[i].taskShedule[j].info}</h3>
                      <div class="item-date"><span>Date: ${val1[i].taskShedule[j].date} </span> </div>
                    </div>
  
                  </div>
              </div>
              `
         
            if(j==count1-1){
              if(val1!=''){
                $(`#${val1[i].name}timelineTask`).empty();
                $(`#${val1[i].name}timelineTask`).append(
                  `${task} `)
  
                  task=''
              } 
            }
          }
        }
        else{
          continue;
        }
      }
    },100);
  

}


viewDetailsContentDisplay(JSON.parse(localStorage.getItem("job")||"[]"))







//POPULATE  JOB CREATION FORM

//GETTING ALL THE CUSTOMERS
let myPaymentStatus,
 siteIdForJob,
 myJobType,
 myCstomer_id;

$.ajax({
  type: "get", url:`${domain}/api/v1/customer`,
  headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
  },

  success: function (data, text) {

      
      console.log(data.data)

      displayCustomer(data.data)
  },
  error: function (request, status, error) {

      console.log(request)
      analyzeError(request)
   
  }
});

function displayCustomer(val){
  let data=`<option value="">--Select--</option>`

  for(let i=0; i<val.length; i++){
          data+= `
          <option data-tokens=${val[i].id}>${val[i].full_name} (site=${val[i].sites.length} ) </option>
        `
      if(i==val.length-1){

          $('#viewCustomer').children().remove();
          $("#viewCustomer").append(data)
          $('.selectpicker').selectpicker('refresh')

      }
  }
}


function updatesite(){

  $('.selectpicker1').on("changed.bs.select", function() {
    let dataTypeAttribute = $('option:selected', this).attr("data-tokens");
    getSite(dataTypeAttribute)
  });

}


function getSite(val){
  console.log(val)
    $.ajax({
        type: "get", url:`${domain}/api/v1/customer/one?id=${val}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        success: function (data, text) {

            //myEmail=data.data[0].email
            console.log(data)
            myCstomer_id=data.data[0].id
            disPlaySite(data.data[0].sites)
        },
        error: function (request, status, error) {
            console.log(request)
            analyzeError(request)
        }
    });
}


function disPlaySite(val){
  let data=`<option value="">--Select--</option>`
  console.log(val)

  if(val.length==0){
    $('#viewSites').children().remove();
    $("#viewSites").append(data)
    $('.selectpicker2').selectpicker('refresh')
    $("#inputJobCost").val("")
    $("#inputGuardAmount").val("")
  }else{
    
        for(let i=0; i<val.length; i++){
          data+= `
          <option data-tokens=${val[i].id} client_charge=${val[i].client_charge} guard_charge=${val[i].guard_charge}>${val[i].site_name}</option>
          `
          if(i==val.length-1){
              $('#viewSites').children().remove();
              $("#viewSites").append(data)
              $('.selectpicker2').selectpicker('refresh')
          }
        }
  }


}

function updateMoney(){

  $('.selectpicker2').on("changed.bs.select", function() {
    console.log($('option:selected', this).attr("client_charge"))
    siteIdForJob=$('option:selected', this).attr("data-tokens")
    $("#inputJobCost").val($('option:selected', this).attr("client_charge"))
    $("#inputGuardAmount").val($('option:selected', this).attr("guard_charge"))
  });
}

function paymentStatus(){
  $('.selectpicker3').on("changed.bs.select", function() {
    myPaymentStatus = $('option:selected', this).attr("data-tokens");
   
  });
}

function jobType(){
  $('.selectpicker4').on("changed.bs.select", function() {
    myJobType = $('option:selected', this).attr("data-tokens");
   
  });
}




//POST JOB BEGIN HERE


let formAdminReg=document.getElementById("addJobs")




formAdminReg.addEventListener("submit",(e)=>{
  e.preventDefault()

  $("#signInButton").css("display","none")
  $("#loadingButton").css("display","block")

  const form = e.target;
  const formFields = form.elements,
  client_charge = formFields.inputJobCost.value,
  staff_charge=formFields.inputGuardAmount.value,
  description=formFields.description.value;

  $('select[name=status]').val("Available");
  $('.selectpicker').selectpicker('refresh')

  console.log(client_charge,  staff_charge ,  description , myCstomer_id,   siteIdForJob,   myJobType,   myPaymentStatus)

  

        $.ajax({
          type: "post", url:`${domain}/api/v1/job/`,
          data: {
            client_charge:client_charge,
            staff_charge:staff_charge ,
            description , 
            job_status:"ACTIVE",
            customer_id:myCstomer_id,
            site_id:siteIdForJob,
            job_type:myJobType,
            payment_status:myPaymentStatus
          },
          success: function (data, text) {

              console.log(data.message)
              showModal(data.message)
                
              limit=15
              offset=0
                
              getTableData(limit,offset)
              setTimeout(() => {
                      hideModal()
              }, 3000);

              $("#signInButton").css("display","block")
              $("#loadingButton").css("display","none")
             
          },
          error: function (request, status, error) {

              $("#signInButton").css("display","block")
              $("#loadingButton").css("display","none")
              console.log(request)
              console.log(status)
              console.log(error)
              console.log(request.responseJSON.status)

              analyzeError(request)
           
          }
        });

})



//THIS SECTION GET JOB AND DISPLAY THEM
let getTableData='',
 getTableData2='',
 getTableData3='',
  limit=15,
  offset=0,
  limit2=15,
  offset2=0,
  limit3=15,
  offset3=0,
  myJobStatus="ACTIVE",
  statusChangeIdForJob


//THIS HANDLES STYLING FOR PAGINATION FOR ACTIVE JOB



$(document).ready(function(){


  //FOR ACTIVE JOB
  getTableData=function ( limit,offset){

    $.ajax({
        type: "get", url:`${domain}/api/v1/job/allJobs?type=ACTIVE&limit=${limit}&offset=${offset}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
      
        success: function (data, text) {


            console.log(data.data)
            CreateTable(data.data)
            /*
            showModal("REGISTRATION SUCCESSFULL")
            setTimeout(() => {
                    hideModal()
            }, 3000);

            $("#signInButton").css("display","block")
            $("#loadingButton").css("display","none")

    */
        },
        error: function (request, status, error) {

            console.log(request)
            analyzeError(request)
         
        }
    });
  }
  getTableData(limit,offset)
  function CreateTable(val){
      let data=''
          
      if(val.length!=0){
        for(let i=0; i<val.length; i++){
          let convertedDate=moment( val[i].create).format("YYYY-MM-DD hh-mm-ss a")

            data+= `<tr>

            <td>
            ${offset+i+1}
          </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              ${convertedDate}
              </div>
            </td>
            <td>
            ${val[i].customer}

            </td>
            <td>
            ${val[i].site}

            </td>
            <td>
              <div class="text-muted text-nowrap">
            
              <span class="badge badge-success">  ${val[i].status}</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].client_charge}

              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].staff_payment}

              </div>
            </td>

          
            <td>
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                data-bs-target="#schedule">Add</button>
            </td>
            <td>
              <div class="actions">
              ${val[i].id}
                <a href="guard-in-job.html" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-dark btn-sm btn-square rounded-pill">
                <span class="btn-icon icofont-external-link"></span>
                </a>
                <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal"
                  data-bs-target="#edit"   onclick="updateJobStatusId(${val[i].id})">
                  <span class="btn-icon icofont-ui-edit"></span>
                </button>
                <button onclick="deleteJob(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill">
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
              </div>
            </td>
          </tr>`

            if(i==val.length-1){

                $('#mytable1').children().remove();
                $("#mytable1").append(data)
            }
        }
      }else{

        $('#mytable1').children().remove();
        $("#mytable1").append(`    <tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO active JOB
      </div>
        </td>
      </tr>`)
      }

       

  }







  //FOR PENDING JOB
  getTableData2=function ( limit,offset){

    $.ajax({
        type: "get", url:`${domain}/api/v1/job/allJobs?type=PENDING&limit=${limit}&offset=${offset}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
      
        success: function (data, text) {


            console.log(data.data)
            CreateTable2(data.data)
            /*
            showModal("REGISTRATION SUCCESSFULL")
            setTimeout(() => {
                    hideModal()
            }, 3000);

            $("#signInButton").css("display","block")
            $("#loadingButton").css("display","none")

    */
        },
        error: function (request, status, error) {

            console.log(request)
            analyzeError(request)
         
        }
    });
  }

  getTableData2(limit2,offset2)
  function CreateTable2(val){



      let data=''


      if(val.length!=0){
        for(let i=0; i<val.length; i++){
          let convertedDate=moment( val[i].create).format("YYYY-MM-DD hh-mm-ss a")

            data+= `<tr>

            <td>
            ${offset+i+1}
          </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              ${convertedDate}
              </div>
            </td>
            <td>
            ${val[i].customer}

            </td>
            <td>
            ${val[i].site}

            </td>
            <td>
              <div class="text-muted text-nowrap">
              
              <span class="badge badge-warning">${val[i].status}  </span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].client_charge}

              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].staff_payment}

              </div>
            </td>

            <td>
              <div class="actions">
                <a href="guard-in-job.html" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-dark btn-sm btn-square rounded-pill">
                <span class="btn-icon icofont-external-link"></span>
                </a>
                <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal"
                  data-bs-target="#edit2"   onclick="updateJobStatusId(${val[i].id})">
                  <span class="btn-icon icofont-ui-edit"></span>
                </button>
                <button onclick="deleteJob(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill">
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
              </div>
            </td>
          </tr>`

            if(i==val.length-1){

                $('#mytable2').children().remove();
                $("#mytable2").append(data)
            }
        }
      }
      else{
        $('#mytable2').children().remove();
        $("#mytable2").append(`
        
        <tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO PENDING JOB
      </div>
        </td>
      </tr>
        
        `)
      }

         

  }









  //FOR COMPLETED JOB

  getTableData3=function ( limit,offset){

    $.ajax({
        type: "get", url:`${domain}/api/v1/job/allJobs?type=COMPLETED&limit=${limit}&offset=${offset}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
      
        success: function (data, text) {


            console.log(data.data)
            CreateTable3(data.data)
            /*
            showModal("REGISTRATION SUCCESSFULL")
            setTimeout(() => {
                    hideModal()
            }, 3000);

            $("#signInButton").css("display","block")
            $("#loadingButton").css("display","none")

    */
        },
        error: function (request, status, error) {

            console.log(request)
            analyzeError(request)
         
        }
    });
  }

  getTableData3(limit3,offset3)
  function CreateTable3(val){



      let data=''


      if(val.length!=0){
        for(let i=0; i<val.length; i++){
          let convertedDate=moment( val[i].create).format("YYYY-MM-DD hh-mm-ss a")

            data+= `<tr>

            <td>
            ${offset+i+1}
          </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              ${convertedDate}
              </div>
            </td>
            <td>
            ${val[i].customer}

            </td>
            <td>
            ${val[i].site}

            </td>
            <td>
              <div class="text-muted text-nowrap">
             
              <span class="badge badge-info"> ${val[i].status}</span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].client_charge}

              </div>
            </td>
            <td>
              <div class="d-flex align-items-center nowrap text-primary">
              $${val[i].staff_payment}

              </div>
            </td>

            <td>
              <div class="actions">
                <a href="guard-in-job.html" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-dark btn-sm btn-square rounded-pill">
                <span class="btn-icon icofont-external-link"></span>
                </a>
                <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal"
                  data-bs-target="#edit3"   onclick="updateJobStatusId(${val[i].id})">
                  <span class="btn-icon icofont-ui-edit"></span>
                </button>
                <button onclick="deleteJob(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill">
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
              </div>
            </td>
          </tr>`

            if(i==val.length-1){

                $('#mytable3').children().remove();
                $("#mytable3").append(data)
            }
        }
      }
      else{
        $('#mytable3').children().remove();
        $("#mytable3").append(`
        
        <tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO COMPLETED JOB
      </div>
        </td>
      </tr>
        
        `)
      }

         

  }



})



//FOR ACTIVE JOB

function Previous(){
  if(offset==0){
      $("#Previous").addClass("disabled");
  }
  else{
      $("#Previous").removeClass("disabled");
      offset=offset-(limit+1)
      getTableData(limit,offset)
      $(".page-item").removeClass("active");
      $("#Previous").addClass("active");

  }
}

function Next(){
  offset=offset+limit+1
  getTableData(limit,offset)
  $(".page-item").removeClass("active");
  $("#Next").addClass("active");

}

function page(val){
  if(val==1){
      offset=0
      $(".page-item").removeClass("active");
      $("#page1").addClass("active");
  }
  else if(val==2){
      offset=16
      $(".page-item").removeClass("active");
      $("#page2").addClass("active");

  }
  else if(val==3){
      offset=32
      $(".page-item").removeClass("active");
      $("#page3").addClass("active");
  }
  

  
  getTableData(limit,offset)
}



//FOR PENDING JOB

function Previous2(){
  if(offset2==0){
      $("#Previous2").addClass("disabled");
  }
  else{
      $("#Previous2").removeClass("disabled");
      offset2=offset2-(limit2+1)
      getTableData2(limit2,offset2)
      $(".page-item2").removeClass("active");
      $("#Previous2").addClass("active");

  }
}

function Next2(){
  offset2=offset2+limit2+1
  getTableData(limit2,offset2)
  $(".page-item2").removeClass("active");
  $("#Next2").addClass("active");

}

function page2(val){
  if(val==1){
      offset2=0
      $(".page-item2").removeClass("active");
      $("#page12").addClass("active");
  }
  else if(val==2){
      offset2=16
      $(".page-item2 ").removeClass("active");
      $("#page22").addClass("active");

  }
  else if(val==3){
      offset2=32
      $(".page-item2 ").removeClass("active");
      $("#page32").addClass("active");
  }
  

  getTableData2(limit2,offset2)
}






//FOR COMPLETED JOB

function Previous3(){
  if(offset3==0){
      $("#Previous3").addClass("disabled");
  }
  else{
      $("#Previous3").removeClass("disabled");
      offset3=offset3-(limit3+1)
      getTableData2(limit3,offset3)
      $(".page-item3").removeClass("active");
      $("#Previous3").addClass("active");

  }
}

function Next3(){
  offset3=offset3+limit3+1
  getTableData(limit3,offset3)
  $(".page-item3").removeClass("active");
  $("#Next3").addClass("active");

}

function page3(val){
  if(val==1){
      offset3=0
      $(".page-item3").removeClass("active");
      $("#page13").addClass("active");
  }
  else if(val==2){
      offset2=16
      $(".page-item3 ").removeClass("active");
      $("#page23").addClass("active");

  }
  else if(val==3){
      offset2=32
      $(".page-item3 ").removeClass("active");
      $("#page33").addClass("active");
  }
  

  getTableData3(limit3,offset3)
}





//UPDATE JOB STATUS
function updateJobStatusId(val){
  statusChangeIdForJob=val
  console.log(statusChangeIdForJob)
}
function updateJobStatus(){
  $('.selectpickerStatusChange').on("changed.bs.select", function() {
    myJobStatus = $('option:selected', this).attr("data-tokens");
    console.log(myJobStatus)

  });
}
$("#loadingButton2").css("display","none")

function changeJobStatus(){


  $("#saveButton").css("display","none")
  $("#loadingButton2").css("display","block")
  
  $.ajax({
    type: "post", url:`${domain}/api/v1/job/updateJobStatus`,
    data: {
      job_id:statusChangeIdForJob,
      status_value:myJobStatus ,
      
    },
    success: function (data, text) {

        console.log(data.message)
        showModal(data.message)
      
          getTableData2(limit2,offset2)
          getTableData3(limit3,offset3)
          getTableData(limit,offset)
      

          
        getTableData(limit,offset)
        setTimeout(() => {
                hideModal()
        }, 3000);

        $("#saveButton").css("display","block")
        $("#loadingButton2").css("display","none")
       
    },
    error: function (request, status, error) {

        $("#saveButton").css("display","block")
        $("#loadingButton2").css("display","none")
        console.log(request)
        console.log(status)
        console.log(error)
        console.log(request.responseJSON.status)

        analyzeError(request)
     
    }
  });

}




function deleteJob(job_id){



  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {

    if (result.isConfirmed) {
      $.ajax({
        type: "post", url:`${domain}/api/v1/job/delete_job`,
        data: {
          job_id      
        },
        success: function (data, text) {
    
            console.log(data.message)
            showModal(data.message)
          
              getTableData2(limit2,offset2)
              getTableData(limit,offset)
              getTableData3(limit3,offset3)
          
  
            setTimeout(() => {
                    hideModal()
            }, 3000);
    
          
           
        },
        error: function (request, status, error) {
    
            console.log(request)
            console.log(status)
            console.log(error)
            console.log(request.responseJSON.status)
    
            analyzeError(request)
         
        }
      });
    }
  
  })



}
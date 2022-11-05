

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

localStorage.setItem("me",5)
let test1=localStorage.getItem("me")
test1
localStorage.setItem("me",10)
console.log(test1)
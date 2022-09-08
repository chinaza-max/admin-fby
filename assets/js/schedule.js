
let interval=1
let mySchedule=""
let activeTab='Daily'
let activeMonthlyRadio=1
let activeYearlyRadio=1
let schedule={
    repeat:"daily",
    interval
}
let weekdays=["sun","mon","Tue","Wen","Thu","Fri","Sat"]
let dayInterval=["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth",
            "Ninth","Tenth","Eleventh","Twelfth","Thirteenth","Fourteenth", "Fifteenth","Sixteenth","Seventeenth",
            "Eighteenth","Nineteenth","Twentieth","Twenty-first","Twenty-second","Twenty-third",
            "Twenty-fourth","Twenty-fifth","Twenty-sixth","Twenty-seventh","Twenty-eighth","Twenty-ninth","Thirtieth","Thirty-first",
            "Last","Penultimate","Third to last","Fourth to last","Fifth to last","Sixth to last","Seventh to last","Eighth to last", 
            "Ninth to last","Tenth to last","Eleventh to last","Twelfth to last","Thirteenth to last","Fourteenth to last","Fifteenth to last", 
            "Sixteenth to last","Seventeenth to last","Eighteenth to last","Nineteenth to last","Twentieth to last","Twenty-first to last",
            "Twenty-second to last","Twenty-third to last","Twenty-fourth to last","Twenty-fifth to last","Twenty-sixth to last",
            "Twenty-seventh to last","Twenty-eighth to last","Twenty-ninth to last","Thirtieth to last"]
let dayPosition=["First","Second","Third","Fourth","Last"]
let Months=["January","February","March","April","May","June","July","August","September","October","November","December"]

let input=document.querySelectorAll(".interval")
let checkBox=document.querySelectorAll(".checkBox")
let navLink=document.querySelectorAll(".nav-link")
let saveChangeButton=document.getElementById("saveData")

//monthly
let optionMonthly1=document.getElementById("monthly1")
let optionMonthly2=document.getElementById("monthly2")
let optionMonthly3=document.getElementById("monthly3")
//yearly
let optionYearly1=document.getElementById("yearly1")
let optionYearly2=document.getElementById("yearly2")
let optionYearly3=document.getElementById("yearly3")
let optionYearly4=document.getElementById("yearly4")
let optionYearly5=document.getElementById("yearly5")


//radio element 
let monthly2CheckRadio=document.getElementById("monthly2CheckRadio")
let monthly1CheckRadio=document.getElementById("monthly1CheckRadio")
let yearly2CheckRadio=document.getElementById("yearly2CheckRadio")
let yearly1CheckRadio=document.getElementById("yearly1CheckRadio")

//week seletion
let selectedWeekdaysW=[]
//monthly seletion
let monthlyweekdaysSelected="sun";
let monthlyDayIntervalSelected="First";
let monthlyDayPositionSelected="First";

//yearly seletion
let yearlyweekdaysSelected="sun";
let yearlyDayIntervalSelected="First";
let yearlyMonthSelected="January";
let yearlyDayPositionSelected="First";
let yearlyMonthSelected2="January";

function formatObj(val){
    if(val.repeat=="daily"){
        mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} day(s);`
    }
    else if(val.repeat=="weekly"){
        mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} week(s) on ${val.weekdays};`
    }
    else if(val.repeat=="monthly"){
       // console.log(activeMonthlyRadio)
        if(activeMonthlyRadio==1){
            mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} month(s) on the ${monthlyDayIntervalSelected};`
        
        }
        else{
            console.log("am  here")
            mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} month(s) on ${monthlyDayPositionSelected} 
            ${monthlyweekdaysSelected};`
        }
    
    }
    else if(val.repeat=="yearly"){
        
        if(activeYearlyRadio==1){
            mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} year(s) on the ${yearlyDayIntervalSelected}
            of ${yearlyMonthSelected} `
        
        }
        else{
            console.log("am  here")
            mySchedule=`Recurring ${val.repeat}; Repeat every ${val.interval} year(s) on ${yearlyDayPositionSelected} 
            ${yearlyweekdaysSelected} of ${yearlyMonthSelected2} ;`
        }

    }
    document.getElementById("scheduleData").innerHTML=mySchedule
}
formatObj(schedule)
document.getElementById("scheduleData").innerHTML=mySchedule


input.forEach((e)=>{
        e.addEventListener('change', (e) => {
            interval=e.target.value
            input.forEach((e)=>{
                e.value=interval
            })
        })  
    }  
)

checkBox.forEach((e)=>{
    e.addEventListener('click', (e) => {
        if(e.target.checked){
            selectedWeekdaysW.push(weekdays[e.target.value])
        }
        else{

            selectedWeekdaysW= selectedWeekdaysW.filter(remove);
            function remove(val) {
                return val != weekdays[e.target.value];
            }
        }
    })  
})

navLink.forEach((e)=>{
    e.addEventListener('click', (e) => {
        activeTab=e.target.innerHTML
    })  
})

saveChangeButton.addEventListener('click', (e) => {

    if(activeTab=="Daily"){
         daily()
    }
    else if(activeTab=="Weekly"){
      
        weekly()
    }
    else if(activeTab=="Monthly"){
        monthly()
    }
    else if(activeTab=="Yearly"){
        yearly()
    }
})




//this side handles all monthly selection
monthly1CheckRadio.addEventListener("click", (e) => {
    activeMonthlyRadio=1;
})
monthly2CheckRadio.addEventListener("click", (e) => {
    activeMonthlyRadio=0;
})

monthly1CheckRadio.checked=true;

optionMonthly1.addEventListener('change', (e) => {
    monthly1CheckRadio.checked=true
    let index=e.target.value;
    activeMonthlyRadio=1;
    if(index>0){
        monthlyweekdaysSelected=dayInterval[index-1]
    }
    else{
        monthlyweekdaysSelected=dayInterval[(index*-1)+30]
    }
})

optionMonthly2.addEventListener('change', (e) => {
    monthly2CheckRadio.checked=true
    let index=e.target.value;
    activeMonthlyRadio=0
    if(index>0){
        monthlyDayPositionSelected=dayPosition[index-1]
    }
    else{
      //  console.log(dayPosition[4])
        monthlyDayPositionSelected=dayPosition[4]
    }
})

optionMonthly3.addEventListener('change', (e) => {
    document.getElementById("monthly2CheckRadio").checked=true
    let index=e.target.value;
    activeMonthlyRadio=0
    console.log(weekdays[index-1])
    monthlyweekdaysSelected=weekdays[index-1]
})




//this side handles all yearly selection

yearly1CheckRadio.checked=true
yearly1CheckRadio.addEventListener("click", (e) => {
    activeYearlyRadio=1;
})
yearly2CheckRadio.addEventListener("click", (e) => {
    activeYearlyRadio=0;
})
optionYearly1.addEventListener('change', (e) => {
    yearly1CheckRadio.checked=true
    let index=e.target.value;
    activeYearlyRadio=1;
    if(index>0){
        monthlyweekdaysSelected=dayInterval[index-1]
         // console.log(monthlyweekdaysSelected)
    }
    else{
        monthlyweekdaysSelected=dayInterval[(index*-1)+30]
       // console.log(monthlyweekdaysSelected)
    }
})

optionYearly2.addEventListener('change', (e) => {
    yearly1CheckRadio.checked=true
    let index=e.target.value;
    activeYearlyRadio=1;
    yearlyMonthSelected=Months[index-1]
   // console.log(yearlyMonthSelected)
})
optionYearly3.addEventListener('change', (e) => {
    yearly2CheckRadio.checked=true
    let index=e.target.value;
    activeYearlyRadio=0;
    if(index>0){
        yearlyDayPositionSelected=dayPosition[index-1]
       // console.log(yearlyDayPositionSelected)
    }
    else{
        yearlyDayPositionSelected=dayPosition[4]
       // console.log(yearlyDayPositionSelected)
    }
})
optionYearly4.addEventListener('change', (e) => {
    yearly2CheckRadio.checked=true
    let index=e.target.value;
    activeYearlyRadio=0;
    yearlyweekdaysSelected=weekdays[index-1]
  //  console.log(yearlyweekdaysSelected)
})
optionYearly5.addEventListener('change', (e) => {
    yearly2CheckRadio.checked=true
    let index=e.target.value;
    activeYearlyRadio=0;
    yearlyMonthSelected2=Months[index-1]
 //   console.log(yearlyMonthSelected2)
})



function daily(){
    let schedule={
        repeat:"daily",
        interval
    }
    formatObj(schedule)
}

function weekly(){
    let schedule={
        repeat:"weekly",
        weekdays:selectedWeekdaysW.join(','),
        interval
    }
    formatObj(schedule)
}

function monthly(){

        let schedule={
            repeat:"monthly",
            interval
        }
        formatObj(schedule)

}

function yearly(){
    let schedule={
        repeat:"yearly",
        interval
    }
    formatObj(schedule)
}
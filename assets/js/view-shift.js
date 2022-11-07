var minDate, maxDate
var customerName='';
var Site='';
var staffName='';
var test="Software Engineer";

let totalHours=0
let amountPending=0


 
// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[0] );


        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        
        var customerNameVT = data[3];
        var SiteVT = data[4] ;
        var staffNameVT = data[1];
        

        if ((customerName ==='')&&(Site ==='' )&&(staffName==='')) {
            console.log("1")
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true;
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName==='')){
            console.log("2")

            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName==='')){
            console.log("3")
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName==='')){
            console.log("4")

            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName===staffNameVT)){
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName==='')&&(Site==='')&&(staffName===staffNameVT)){
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName===staffNameVT)){
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName===staffNameVT)){
            totalHours+=parseInt(data[11])
            amountPending+=parseInt(data[12].substring(1));
            calPayOff(totalHours ,amountPending)
            return true
        }
        
        calPayOff(totalHours ,amountPending)

        return false;
    }
);

 
$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
 
    // DataTables initialisation
    console.log("data")

    var table = $('#example').DataTable({
        select: true,
        dom: 'Bfrtip',
        buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5',
        'print'
       
        ],
        createdRow: function (row, data, index) {

            if (data["first-name"] == "Airi Satou") {
                $('td', row).css('background-color', 'green ');
            }
            else if(data["first-name"] == "coffe"){
                $('td', row).css('background-color','#828204');
            }
        }
    });

    table.row(0).select();


    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
      
        var column = table.column($(this).attr('data-column'));
        // Toggle the visibility
        column.visible(!column.visible());
    });
     
    setTimeout(() => {
        var column1 = table.column(0);
    column1.visible(!column1.visible());
    var column2 = table.column(2);
    column2.visible(!column2.visible());
    var column2 = table.column(3);
    column2.visible(!column2.visible());
    }, 1000);
    
   
    // Refilter the table
    $('#min, #max').on('change', function () {
        initializePayOff()
        table.draw();
    });
     // Refilter the table
    $('#staffName').on('change', function (e) {
        initializePayOff()
        staffName=this.value
        table.draw();

        
    });
    $('#Site').on('change', function (e) {
        initializePayOff()
        console.log(totalHours)

        Site=this.value
        table.draw();
    });
    $('#customerName').on('change', function (e) {
        initializePayOff()
        customerName=this.value
        table.draw();
    });
    
});


function initializePayOff(){
    console.log("clear")
    totalHours=0
    amountPending=0
}


function calPayOff(val1, val2){
    
   

    document.getElementById("totalHours").innerHTML =val1
    document.getElementById("amountPending").innerHTML ="$"+val2
}
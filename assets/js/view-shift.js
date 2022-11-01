var minDate, maxDate
var customerName='';
var Site='';
var staffName='';
var test="Software Engineer";

 
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
        
       // console.log("first:",customerName,"secon:",customerNameVT)
       // console.log(settings._select)
        if ((customerName ==='')&&(Site ==='' )&&
        (staffName==='' )
        ) {
            return true;
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName==='')){
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName==='')){
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName==='')){
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName===staffNameVT)){
            return true
        }
        else if((customerName==='')&&(Site==='')&&(staffName===staffNameVT)){
            return true
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName===staffNameVT)){
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName===staffNameVT)){
            return true
        }
        
            return false;
    }
);
/*

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        
        var customerNameVT = data[3];
        var SiteVT = data[4] ;
        var staffNameVT = data[1];
        
        console.log(customerName)
        if (( customerName=== customerNameVT  || customerName === undefined)||
        (Site === SiteVT || Site === undefined )||
        (staffName === staffNameVT  || staffName === undefined )
        ) {
            return true;
        }
        return false;
    }
);
*/
 
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
        'pdfHtml5'
        ],
        createdRow: function (row, data, index) {
            
            
            console.log(data["first-name"]);
            console.log(data["first-name"] == "Airi Satou");

            if (data["first-name"] == "Airi Satou") {
                $('td', row).css('background-color', 'green ');
                console.dir(row);

                $('tr', row).addClass('label-warning');
            }
        }
    });

    table.row(0).select();


    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
        // Get the column API object
        console.log($(this).attr('data-column'))
        var column = table.column($(this).attr('data-column'));
        // Toggle the visibility
        column.visible(!column.visible());
    });
     
    var column1 = table.column(0);
    column1.visible(!column1.visible());
    var column2 = table.column(2);
    column2.visible(!column2.visible());
    var column2 = table.column(3);
    column2.visible(!column2.visible());
   
    // Refilter the table
    $('#min, #max').on('change', function () {
        table.draw();
    });
     // Refilter the table
    $('#staffName').on('change', function (e) {
        staffName=this.value
        table.draw();

        
    });
    $('#Site').on('change', function (e) {
        Site=this.value
        table.draw();
    });
    $('#customerName').on('change', function (e) {
        customerName=this.value
        console.log(customerName)
        table.draw();
    });
    
});

/*
$(document).ready(function () {
    var table = $('#example').DataTable({
        destroy: true,
        select: {
            style: 'multi'
        }, 
       
    });

    
});


/*

$('#example tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        alert('You clicked on ' + data[0] + "'s row");
    });

$(document).ready(function () {
    $('#example td').each(function() {
        var cellText = $(this).html();    
         console.log(cellText)
        if(true){
         $(this).closest('tr').addClass("selected");
        }
    });
});
*/



/*||
            ( customerNameV === customerNameVT  || customerNameV === null)||
            (SiteV === SiteVT || SiteV === null )||
            (staffNameV === staffNameVT  || staffNameV === null ) */
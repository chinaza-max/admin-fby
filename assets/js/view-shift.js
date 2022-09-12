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
        
        console.log("first:",customerName,"secon:",customerNameVT)
      //  console.log(customerName,customerNameVT)
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
    var table = $('#example').DataTable();

     
   
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
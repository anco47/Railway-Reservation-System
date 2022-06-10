$(document).ready(function () {

    // adding serial number to the table    

    // Edit Train button working
    $("#myTable").on('click', '.editTrain', function () {
        // get current row
        var currentRow = $(this).closest("tr");
        console.log(currentRow.find('td:eq(1)').html());

        var id = currentRow.find('td:eq(1)').html();
        $(`<form action="/editTrain/${id}" method = "GET"></form>`).appendTo('body').submit();


    })

    // Delete Train Button working
    $("#myTable").on('click', '.deleteTrain', function () {
        // get the current row
        var currentRow = $(this).closest("tr");
        console.log(currentRow.find('td:eq(1)').html());

        var id = currentRow.find('td:eq(1)').html();
        $(`<form action="/deleteTrain/${id}" method = "POST"></form>`).appendTo('body').submit();

    });

    // See Passengers list
    $("#myTable").on('click', '.passenger', function () {
        // get the current row
        var currentRow = $(this).closest("tr");
        console.log(currentRow.find('td:eq(1)').html());

        var id = currentRow.find('td:eq(1)').html();
        $(`<form action="/passenger/${id}" method = "GET"></form>`).appendTo('body').submit();

    });

    var addSerialNumber = function () {
        $('table tr').each(function (index) {
            $(this).find('td:nth-child(1)').html(index++);
        });
    };

    addSerialNumber();

});
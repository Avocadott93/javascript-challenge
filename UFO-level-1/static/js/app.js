
// from data.js
var tableData = data;

// Make the table show
// select tbody
tbody = d3.select("tbody");
console.log("hello1");

// Loop through the table
function displayData(content) {
    tbody.text("")
    content.forEach(function (ufo_sighting) {
        new_tr = tbody.append("tr")
        Object.entries(ufo_sighting).forEach(function ([key, value]) {
            new_td = new_tr.append("td").text(value)
        })
    })
}

displayData(tableData);
// console.log("hello2");

// Select the button
var button = d3.select("#filter-btn");

// Create event handlers 

button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {
    console.log("runEnter begin");
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var input_date = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = input_date.property("value");

    console.log(inputValue);

    // Search for data, use Date.parse()to convert data from string to date

    var result = tableData.filter(row => row.datetime === inputValue);

    console.log(result);
    console.log(inputValue);
    

    // Append the filtered data back to the table cells
    // Use a if else loop to filter data

    d3.select('tbody').html("");
    (result.length > 0 ? result.forEach((single) => {

        var row = d3.select('tbody').append("tr");
        Object.entries(single).forEach(([key, value]) => { row.append("td").text(value) });

    }) :
        tableData.forEach((single) => {

            var row = d3.select('tbody').append("tr");
            Object.entries(single).forEach(([key, value]) => { row.append("td").text(value) });

        }))
};

var filterInputs = d3.selectAll('.form-control');

// Clears input fields and input object
function clearEntries() {
    filters = {};

    //Set every input field to empty
    filterInputs._groups[0].forEach(entry => {
        if (entry.value != 0) {
            d3.select('#' + entry.id).node().value = ""
        };
    });
};

// var clearButton = d3.select('#filter-btn');
// Clear button on click clears fields
// clearButton.on('click', function () {

    // Keeps page from refreshing completely, only want the table to refresh
    // d3.event.preventDefault();
    // Clear input fields
    // clearEntries()
// });
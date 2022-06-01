const api_url = "https://dujour.squiz.cloud/developer-challenge/data";

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);

}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
          <th>Industry</th>
          <th>Number of Employees</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data) {
        tab += `<tr> 
    <td>${r.id} </td>
    <td>${r.name}</td>
    <td>${r.country}</td> 
    <td>${r.industry}</td> 
    <td>${r.numberOfEmployees}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("clients").innerHTML = tab;

}


  function filterValues() {
    // Declare variables
    var  country_input, country_filter, industry_input, industry_filter, table, tr, country_td,industry_td, i, countryTxt, industryTxt;
    country_input = document.getElementById("country");
    country_filter = country_input.value.toUpperCase();
    industry_input = document.getElementById("industry");
    industry_filter = industry_input.value.toUpperCase();
    table = document.getElementById("clients");
    tr = table.getElementsByTagName("tr");
    countryTxt = "";
    industryTxt = "";
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        country_td = tr[i].getElementsByTagName("td")[2];
        industry_td = tr[i].getElementsByTagName("td")[3];
        if (country_td || industry_td) { 
        countryTxt = country_td.textContent || country_td.innerText;
        industryTxt = industry_td.textContent || industry_td.innerText;
        console.log(countryTxt);
        if ((countryTxt.toUpperCase().indexOf(country_filter) > -1) && (industryTxt.toUpperCase().indexOf(industry_filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      
    }
}
}

function sortTable(n, direction) {
    console.log('sort');
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("clients");
    switching = true;
    // Set the sorting direction to ascending:
    if(direction){
        dir = direction;
    }
    else{
        dir = "asc";
    }
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
 

//   async function callSort() {
//       await getapi();
//       sortTable(1,"asc") ;
//       sortTable(4,"asc") ;
//   }

  
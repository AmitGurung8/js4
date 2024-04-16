// Java Script Assignment - 4
// I made an Api for my favourite vide game Apex legends. Here if you input your username in any of the platform, it will display the entire users stats from season 0 to season 20.
// Also it displays every single bannerframe poster and legends stats the user has and equipped.

// This will get the reference to the output div element
const outputDiv = document.getElementById("output");

// Here I am initializing variables to store user input and reference to student-info div
var user = document.getElementById("user").value;
var platform = document.getElementById("platform").value;
const studentInfo = document.getElementById("student-info");

// I am adding event listener to the submit button
document.getElementById("amit").addEventListener("click", function() {
    // Getting here the latest user input when the button is clicked
    user = document.getElementById("user").value;
    platform = document.getElementById("platform").value;

    // I am displaying student information in the student-info div
    studentInfo.innerHTML = "Amit Gurung - 1232183";

    // Main Fetching data from the API based on user input from official apex legends game
    fetch(`https://api.mozambiquehe.re/bridge?auth=daf3acab7247107d17335f18448d4b86&player=${user}&platform=${platform}`)
    .then(response => response.json())
    .then(json => displayData(json)) // Call the displayData function with the JSON response
    .catch(error => console.error('Error fetching data:', error)); // Log any errors during the fetch operation
});

// Function to display data in the output div
function displayData(json) {
    outputDiv.innerHTML = ""; // Clear previous content in the output div
    console.log(json); // Log the JSON response

    // Loop through each key in the JSON object
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            if (value == "Player not found.") {
                // Display a message if the user is not found
                outputDiv.innerHTML = "User not found. Please enter another.";
                break;
            }
            // Create a table for the current key
            const table = document.createElement("table");
            const caption = document.createElement("caption");
            caption.textContent = key;
            table.appendChild(caption);

            // Loop through each sub-key and value pair
            for (const subKey in value) {
                if (value.hasOwnProperty(subKey)) {
                    const subValue = value[subKey];

                    // Create a row and cells for sub-key and value
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    cell1.textContent = subKey;

                    // Check if the value is an object
                    if (typeof subValue === "object") {
                        // If value is an object, recursively call displayData
                        const nestedTable = document.createElement("table");
                        displayDataInTable(subValue, nestedTable);
                        cell2.appendChild(nestedTable);
                    } else if (typeof subValue === "string" && subValue.match(/\.(jpeg|jpg|gif|png)$/i)) {
                        // If value is a string and an image URL
                        const img = document.createElement("img");
                        img.src = subValue;
                        img.alt = subKey;
                        cell2.appendChild(img);
                    } else {
                        // Otherwise, display text content
                        cell2.textContent = subValue;
                    }
                }
            }

            // This will append the table to the output div
            outputDiv.appendChild(table);
        }
    }
}

//This is the Function to recursively display data in nested tables
function displayDataInTable(data, table) {
    // Loop through each key in the object
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];

            // Create a row and cells for key and value
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key;

            // Check if the value is an object
            if (typeof value === "object") {
                // If value is an object, recursively call displayDataInTable
                const nestedTable = document.createElement("table");
                displayDataInTable(value, nestedTable);
                cell2.appendChild(nestedTable);
            } else if (typeof value === "string" && value.match(/\.(jpeg|jpg|gif|png)$/i)) {
                // If value is a string and an image URL
                const img = document.createElement("img");
                img.src = value;
                img.alt = key;
                cell2.appendChild(img);
            } else {
                // Otherwise, display text content
                cell2.textContent = value;
            }
        }
    }
}

//Certain object names need changing, such as text field IDs
//Had some trouble renaming these, but they will be changed in the near future

//Database Linked References, used for table data
var databaseLink1 = "Users/Drivers/";
var databaseLink2 = "Users/Customers/";
var databaseLink3 = "customerRequest/";
var databaseLink4 = "history/";

//Table 1 Columns
var tbl1Col1 = "ID";
var tbl1Col2 = "Car";
var tbl1Col3 = "Name";
var tbl1Col4 = "Phone";
var tbl1Col5 = "Service";
var tbl1ColN = 5;

//Table 2 Columns
var tbl2Col1 = "ID";
var tbl2Col2 = "Name";
var tbl2Col3 = "Phone";
var tbl2Col4 = "";
var tbl2Col5 = "";
var tbl2ColN = 3;

//Table 3 Columns
var tbl3Col1 = "Customer ID";
var tbl3Col2 = "Request ID";
var tbl3Col3 = "Location";
var tbl3Col4 = "Status";
var tbl3Col5 = "";
var tbl3ColN = 4;

//Table 4 Columns
var tbl4Col1 = "Customer ID";
var tbl4Col2 = "Distance (km)";
var tbl4Col3 = "Payment";
var tbl4Col4 = "Rating";
var tbl4Col5 = "Transacation ID";
var tbl4ColN = 5;

//Data Names
var dataName1 = "car";
var dataName2 = "name";
var dataName3 = "phone";
var dataName4 = "service";

var check = document.getElementById('check');
var sLat = document.getElementById('statLat');
var sLng = document.getElementById('statLng');


//Basic Map Coordinates 
var driverRef = firebase.database().ref("location/l/");

driverRef.once("value").then(function(snapshot) 
{
	var	latDriver = JSON.stringify(snapshot.child('0').val());
	var lngDriver = JSON.stringify(snapshot.child('1').val());

	//check.innerText = "{Lat: " + latDriver + ", " + " Lng: " + lngDriver + "}";
});

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

//Get firebase coords
firebase.database().ref('location/l/').on('value', function(snapshot) {
	s = snapshotToArray(snapshot);
	document.getElementById('start').value = s[0] + ", " + s[1];
});

//Text box labels
document.getElementById('txtboxlbl1').innerHTML = "ID: ";
document.getElementById('txtboxlbl2').innerHTML = "Car: ";
document.getElementById('txtboxlbl3').innerHTML = "Name: ";
document.getElementById('txtboxlbl4').innerHTML = "Phone: ";
document.getElementById('txtboxlbl5').innerHTML = "(Checked = Luxury) Service: ";

//Check if user is logged in
firebase.auth().onAuthStateChanged(function(user) 
{
	if (user) 
	{		
		//User is signed in
		document.getElementById("user_div").style.display = "block";
		document.getElementById("login_div").style.display = "none";

		var user = firebase.auth().currentUser;

		if(user != null)
		{
			var email_id = user.email;
			document.getElementById("user_para").innerHTML = "User : " + email_id;
		}

	} 
	else 
	{
		//No user is signed in
		document.getElementById("user_div").style.display = "none";
		document.getElementById("login_div").style.display = "block";
	}
});


//Login Method
function login()
{
	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) 
	{
		//Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Error : " + errorMessage);
	});
}


//Logout Method
function logout()
{
	firebase.auth().signOut();
}


//Intialise Database Table 1
var tbl1 = document.getElementById('vehicle_list');
var databaseRef = firebase.database().ref(databaseLink1);
var rowIndex = 1;

if(tbl1ColN == 3)
tbl1.innerHTML = 
"<tr>" + 
"<td>" + tbl1Col1 + "</td>" +
"<td>" + tbl1Col2 + "</td>" + 
"<td>" + tbl1Col3 + "</td>" +
"</tr>";

if(tbl1ColN == 4)
tbl1.innerHTML = 
"<tr>" + 
"<td>" + tbl1Col1 + "</td>" +
"<td>" + tbl1Col2 + "</td>" + 
"<td>" + tbl1Col3 + "</td>" +
"<td>" + tbl1Col4 + "</td>" + 
"</tr>";

if(tbl1ColN == 5)
tbl1.innerHTML = 
"<tr>" + 
"<td>" + tbl1Col1 + "</td>" +
"<td>" + tbl1Col2 + "</td>" + 
"<td>" + tbl1Col3 + "</td>" +
"<td>" + tbl1Col4 + "</td>" + 
"<td>" + tbl1Col5 + "</td>" + 
"</tr>";

databaseRef.once('value', function(snapshot)
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
   
		var row = tbl1.insertRow(rowIndex);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		if(tbl1ColN >= 3)
		var cell3 = row.insertCell(2);
		if(tbl1ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl1ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childKey));
		cell2.appendChild(document.createTextNode(childData.car));

		if(tbl1ColN >= 3)
		cell3.appendChild(document.createTextNode(childData.name));
		if(tbl1ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.phone));
		if(tbl1ColN >= 5)
		cell5.appendChild(document.createTextNode(childData.service));
   
		rowIndex = rowIndex + 1;
	});
});


//Refresh Database Table 1
function vehicleTbl()
{
	var tbl1 = document.getElementById('vehicle_list');
	var databaseRef = firebase.database().ref(databaseLink1);
	var rowIndex = 1;
	
	if(tbl1ColN == 3)
	tbl1.innerHTML = 
	"<tr>" + 
	"<td>" + tbl1Col1 + "</td>" +
	"<td>" + tbl1Col2 + "</td>" + 
	"<td>" + tbl1Col3 + "</td>" +
	"</tr>";
	
	if(tbl1ColN == 4)
	tbl1.innerHTML = 
	"<tr>" + 
	"<td>" + tbl1Col1 + "</td>" +
	"<td>" + tbl1Col2 + "</td>" + 
	"<td>" + tbl1Col3 + "</td>" +
	"<td>" + tbl1Col4 + "</td>" + 
	"</tr>";
	
	if(tbl1ColN == 5)
	tbl1.innerHTML = 
	"<tr>" + 
	"<td>" + tbl1Col1 + "</td>" +
	"<td>" + tbl1Col2 + "</td>" + 
	"<td>" + tbl1Col3 + "</td>" +
	"<td>" + tbl1Col4 + "</td>" + 
	"<td>" + tbl1Col5 + "</td>" + 
	"</tr>";
	
	databaseRef.once('value', function(snapshot)
	{
		snapshot.forEach(function(childSnapshot) 
		{
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val(); 
	   
			var row = tbl1.insertRow(rowIndex);
	   
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
	
			if(tbl1ColN >= 3)
			var cell3 = row.insertCell(2);
			if(tbl1ColN >= 4)
			var cell4 = row.insertCell(3);
			if(tbl1ColN >= 5)
			var cell5 = row.insertCell(4);
			
			cell1.appendChild(document.createTextNode(childKey));
			cell2.appendChild(document.createTextNode(childData.car));
	
			if(tbl1ColN >= 3)
			cell3.appendChild(document.createTextNode(childData.name));
			if(tbl1ColN >= 4)
			cell4.appendChild(document.createTextNode(childData.phone));
			if(tbl1ColN >= 5)
			cell5.appendChild(document.createTextNode(childData.service));
	   
			rowIndex = rowIndex + 1;		
		});
	});
}


//Intialise Database Table 2
var tbl2 = document.getElementById('user_list');
var databaseR = firebase.database().ref(databaseLink2);
var rowIn = 1;

if(tbl2ColN == 3)
tbl2.innerHTML = 
"<tr>" + 
"<td>" + tbl2Col1 + "</td>" +
"<td>" + tbl2Col2 + "</td>" + 
"<td>" + tbl2Col3 + "</td>" +
"</tr>";
	
if(tbl2ColN == 4)
tbl2.innerHTML = 
"<tr>" + 
"<td>" + tbl2Col1 + "</td>" +
"<td>" + tbl2Col2 + "</td>" + 
"<td>" + tbl2Col3 + "</td>" +
"<td>" + tbl2Col4 + "</td>" + 
"</tr>";
	
if(tbl2ColN == 5)
tbl2.innerHTML = 
"<tr>" + 
"<td>" + tbl2Col1 + "</td>" +
"<td>" + tbl2Col2 + "</td>" + 
"<td>" + tbl2Col3 + "</td>" +
"<td>" + tbl2Col4 + "</td>" + 
"<td>" + tbl2Col5 + "</td>" + 
"</tr>";
  
databaseR.once('value', function(snapshot) 
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
		
		var row = tbl2.insertRow(rowIn);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		if(tbl2ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl2ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childKey));
		cell2.appendChild(document.createTextNode(childData.name));
		cell3.appendChild(document.createTextNode(childData.phone));

		if(tbl2ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.password));
		if(tbl2ColN >= 5)
		cell5.appendChild(document.createTextNode(childData.password));		

		rowIn = rowIn + 1;
	});
});


//Refresh Table 2
function userTbl()
{
	var tbl2 = document.getElementById('user_list');
	var databaseR = firebase.database().ref(databaseLink2);
	var rowIn = 1;
	
	if(tbl2ColN == 3)
	tbl2.innerHTML = 
	"<tr>" + 
	"<td>" + tbl2Col1 + "</td>" +
	"<td>" + tbl2Col2 + "</td>" + 
	"<td>" + tbl2Col3 + "</td>" +
	"</tr>";
		
	if(tbl2ColN == 4)
	tbl2.innerHTML = 
	"<tr>" + 
	"<td>" + tbl2Col1 + "</td>" +
	"<td>" + tbl2Col2 + "</td>" + 
	"<td>" + tbl2Col3 + "</td>" +
	"<td>" + tbl2Col4 + "</td>" + 
	"</tr>";
		
	if(tbl2ColN == 5)
	tbl2.innerHTML = 
	"<tr>" + 
	"<td>" + tbl2Col1 + "</td>" +
	"<td>" + tbl2Col2 + "</td>" + 
	"<td>" + tbl2Col3 + "</td>" +
	"<td>" + tbl2Col4 + "</td>" + 
	"<td>" + tbl2Col5 + "</td>" + 
	"</tr>";
	  
	databaseR.once('value', function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot) 
		{
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val(); 
			
			var row = tbl2.insertRow(rowIn);
	   
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			
			if(tbl2ColN >= 4)
			var cell4 = row.insertCell(3);
			if(tbl2ColN >= 5)
			var cell5 = row.insertCell(4);

			cell1.appendChild(document.createTextNode(childKey));
			cell2.appendChild(document.createTextNode(childData.name));
			cell3.appendChild(document.createTextNode(childData.phone));
	
			if(tbl2ColN >= 4)
			cell4.appendChild(document.createTextNode(childData.password));
			if(tbl2ColN >= 5)
			cell5.appendChild(document.createTextNode(childData.password));		
	
			rowIn = rowIn + 1;
	});
});
}


//Intialise Database Table 3
var tbl3 = document.getElementById('booking_list');
var dataBR = firebase.database().ref(databaseLink3);
var rowI = 1;

if(tbl3ColN == 3)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"</tr>";
	
if(tbl3ColN == 4)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"<td>" + tbl3Col4 + "</td>" + 
"</tr>";
	
if(tbl3ColN == 5)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"<td>" + tbl3Col4 + "</td>" + 
"<td>" + tbl3Col5 + "</td>" + 
"</tr>";
  
dataBR.once('value', function(snapshot) 
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
		
		var row = tbl3.insertRow(rowI);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		if(tbl3ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl3ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childKey));
		cell2.appendChild(document.createTextNode(childData.g));
		cell3.appendChild(document.createTextNode(childData.l));

		if(tbl3ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.status));
		if(tbl3ColN >= 5)
		cell5.appendChild(document.createTextNode(childData.password));		

		rowI = rowI + 1;
	});
});


//Refresh Table 3
function booked()
{
var tbl3 = document.getElementById('booking_list');
var dataBR = firebase.database().ref(databaseLink3);
var rowI = 1;

if(tbl3ColN == 3)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"</tr>";
	
if(tbl3ColN == 4)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"<td>" + tbl3Col4 + "</td>" + 
"</tr>";
	
if(tbl3ColN == 5)
tbl3.innerHTML = 
"<tr>" + 
"<td>" + tbl3Col1 + "</td>" +
"<td>" + tbl3Col2 + "</td>" + 
"<td>" + tbl3Col3 + "</td>" +
"<td>" + tbl3Col4 + "</td>" + 
"<td>" + tbl3Col5 + "</td>" + 
"</tr>";
  
dataBR.once('value', function(snapshot) 
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
		
		var row = tbl3.insertRow(rowI);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		if(tbl3ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl3ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childKey));
		cell2.appendChild(document.createTextNode(childData.g));
		cell3.appendChild(document.createTextNode(childData.l));

		if(tbl3ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.status));
		if(tbl3ColN >= 5)
		cell5.appendChild(document.createTextNode(childData.password));		

		rowI = rowI + 1;
	});
});
}

//Intialise Database Table 4
//document.getElementById("tab6").style.display = "none";
document.getElementById("search_div2").style.display = "none";
var tbl4 = document.getElementById('history_list');
var dataB = firebase.database().ref(databaseLink4);
var rowInd = 1;

if(tbl4ColN == 3)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"</tr>";
	
if(tbl4ColN == 4)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"<td>" + tbl4Col4 + "</td>" + 
"</tr>";
	
if(tbl4ColN == 5)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"<td>" + tbl4Col4 + "</td>" + 
"<td>" + tbl4Col5 + "</td>" + 
"</tr>";
  
dataB.once('value', function(snapshot) 
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
		
		var row = tbl4.insertRow(rowInd);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		if(tbl4ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl4ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childData.customer));
		cell2.appendChild(document.createTextNode(parseFloat(childData.distance).toFixed(4)));
		cell3.appendChild(document.createTextNode(childData.customerPaid));

		if(tbl4ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.rating));
		if(tbl4ColN >= 5)
		cell5.appendChild(document.createTextNode(childKey));

		rowInd = rowInd + 1;
	});
});


//Refresh Table 4
function history()
{
document.getElementById("search_div2").style.display = "none";

var tbl4 = document.getElementById('history_list');
var dataB = firebase.database().ref(databaseLink4);
var rowInd = 1;

if(tbl4ColN == 3)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"</tr>";
	
if(tbl4ColN == 4)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"<td>" + tbl4Col4 + "</td>" + 
"</tr>";
	
if(tbl4ColN == 5)
tbl4.innerHTML = 
"<tr>" + 
"<td>" + tbl4Col1 + "</td>" +
"<td>" + tbl4Col2 + "</td>" + 
"<td>" + tbl4Col3 + "</td>" +
"<td>" + tbl4Col4 + "</td>" + 
"<td>" + tbl4Col5 + "</td>" + 
"</tr>";
  
dataB.once('value', function(snapshot) 
{
	snapshot.forEach(function(childSnapshot) 
	{
		var childKey = childSnapshot.key;
		var childData = childSnapshot.val(); 
		
		var row = tbl4.insertRow(rowInd);
   
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		if(tbl4ColN >= 4)
		var cell4 = row.insertCell(3);
		if(tbl4ColN >= 5)
		var cell5 = row.insertCell(4);
		
		cell1.appendChild(document.createTextNode(childData.customer));
		cell2.appendChild(document.createTextNode(parseFloat(childData.distance).toFixed(4)));
		cell3.appendChild(document.createTextNode(childData.customerPaid));

		if(tbl4ColN >= 4)
		cell4.appendChild(document.createTextNode(childData.rating));
		if(tbl4ColN >= 5)
		cell5.appendChild(document.createTextNode(childKey));

		rowInd = rowInd + 1;
	});
});
}

//Updates vehicle/driver database some object names will changed in the future
function update_user()
{
	var ID = document.getElementById('objectId').value;		//ID
	var D2 = document.getElementById('manufacture').value; 	//Name
	var D3 = document.getElementById('vehicle').value; 		//Car
	var D4 = document.getElementById('seats').value; 		//Phone
	var D5 = "Standard";
	
	if(document.getElementById('engaged').checked) D5 = "Luxury";

	var data = 
	{
		ID: ID,
		name: D2,
		car: D3,
		phone: D4,
		service: D5,
	}

	if(ID.length > 0)
	{
	var updates = {};
	updates[databaseLink1 + ID] = data;
	firebase.database().ref().update(updates);
	}
	vehicleTbl();
}
  

//Reloads Page
function reload_page()
{
	window.location.reload();
}


//Removes Search Result
function remove_result()
{
	document.getElementById("search_div").style.display = "none";
	document.getElementById("database_div").style.display = "block";
}


//Tab related events
function openCity(evt, cityName) 
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
	{
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) 
	{
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
	
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


//Deletes a vehicle/driver (Despite the name)
function delete_user()
{
	var ID = document.getElementById('objectId').value;
  
	if(ID.length > 0)
	{
		firebase.database().ref().child(databaseLink1 + ID).remove();
		vehicleTbl();
	}
}


//Searches for a users history
function search_history()
{
	document.getElementById("search_div2").style.display = "block";
	const dbRef = firebase.database().ref(databaseLink4);
	var customerID = document.getElementById('shID').value;
	
	if(document.getElementById('shID').value.length > 0)
		sID = dbRef.orderByChild('customer').equalTo(customerID);

	var dbRefUsers = firebase.database().ref(databaseLink2).child(customerID);
	var dbMore = dbRefUsers.child('name');
	firebase.database().ref(dbRefUsers).on('value', function(snapshot)
		{
			s = snapshotToArray(snapshot);
			document.getElementById('sUser').innerHTML = "Username: " + s[1];
		});
	
	//if(document.getElementById('rating').value.length > 0)
	//	sRating = dbRef.orderByChild('rating').equalTo(document.getElementById('rating').value);

	var tblSearch= document.getElementById('history_list');
	var databaseRefx = firebase.database().ref(databaseLink4);
	var rowI = 1;
	
	if(document.getElementById('shID').value.length > 0)
		databaseRefx = sID;

	//if(document.getElementById('rating').value.length > 0)
	//	databaseRefx = sRating;
	
	var searchL1 = document.getElementById('history_list');

	searchL1.innerHTML = "<tr>" + 
	"<td>" + tbl4Col1 + "</td>" + 
	"<td>" + tbl4Col2 + "</td>" + 
	"<td>" + tbl4Col3 + "</td>" + 
	"<td>" + tbl4Col4 + "</td>" + 
	"<td>" + tbl4Col5 + "</td>" + 
	"</tr>";
	
	databaseRefx.once('value', function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot)
		{
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val(); 
	   
			var row = tblSearch.insertRow(rowI);
	   
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			
			
			cell1.appendChild(document.createTextNode(childData.customer));
			cell2.appendChild(document.createTextNode(parseFloat(childData.distance).toFixed(4)));
			cell3.appendChild(document.createTextNode(childData.customerPaid));

			if(tbl4ColN >= 4)
				cell4.appendChild(document.createTextNode(childData.rating));
			if(tbl4ColN >= 5)
				cell5.appendChild(document.createTextNode(childKey));

			rowI = rowI + 1;
		});
	});
}


//Searches for a vechicle/driver
function search_user()
{
	document.getElementById("database_div").style.display = "none";
	document.getElementById("search_div").style.display = "block";
	
	const dbRef = firebase.database().ref(databaseLink1);
	if(document.getElementById('objectId').value.length > 0)
		sID = dbRef.orderByChild('ID').equalTo(document.getElementById('objectId').value);

	if(document.getElementById('vehicle').value.length> 0)
		sModel = dbRef.orderByChild(dataName1).equalTo(document.getElementById('vehicle').value);
	
	if(document.getElementById('manufacture').value.length > 0)
		sManufacture = dbRef.orderByChild(dataName2).equalTo(document.getElementById('manufacture').value);
	
	if(document.getElementById('seats').value > 0)
		sSeats = dbRef.orderByChild(dataName3).equalTo(document.getElementById('seats').value);

	if(document.getElementById('engaged').checked)
		sEngaged = dbRef.orderByChild(dataName4).equalTo("Luxury");
	
	
	const xlist = document.getElementById('list');

	var tblSearch= document.getElementById('search_list');
	var databaseRefx = firebase.database().ref(databaseLink1);
	var rowI = 1;
	
	if(document.getElementById('objectId').value.length > 0)
		databaseRefx = sID;

	if(document.getElementById('vehicle').value.length > 0)
		databaseRefx = sModel;

	if(document.getElementById('manufacture').value.length > 0)
		databaseRefx = sManufacture;

	if(document.getElementById('seats').value > 0)
		databaseRefx = sSeats;
	
	if(document.getElementById('engaged').checked)
		databaseRefx = sEngaged;
	
	var searchL1 = document.getElementById('search_list');

	searchL1.innerHTML = "<tr>" + 
	"<td>" + tbl1Col1 + "</td>" + 
	"<td>" + tbl1Col2 + "</td>" + 
	"<td>" + tbl1Col3 + "</td>" + 
	"<td>" + tbl1Col4 + "</td>" + 
	"<td>" + tbl1Col5 + "</td>" + 
	"</tr>";
	
	databaseRefx.once('value', function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot)
		{
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val(); 
	   
			var row = tblSearch.insertRow(rowI);
	   
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			
			cell1.appendChild(document.createTextNode(childKey));
			cell2.appendChild(document.createTextNode(childData.car));
			cell3.appendChild(document.createTextNode(childData.name));
			cell4.appendChild(document.createTextNode(childData.phone));
			cell5.appendChild(document.createTextNode(childData.service));
			
			rowI = rowI + 1;
		});
	});
}


function accept()
{
	var customerID = document.getElementById('custID').value;
	//var requested = document.getElementById('requestID').value;
	var dbRefBooks = firebase.database().ref(databaseLink3).child(customerID);
	dbRefBooks.update
	({
		"status" : "Accepted"
	})
	document.getElementById('booked').innerHTML = "Request Accepted";
	booked();
}


function reject()
{
	var customerID = document.getElementById('custID').value;
	//var requested = document.getElementById('requestID').value;
	var dbRefBooks = firebase.database().ref(databaseLink3).child(customerID);
	dbRefBooks.update
	({
		"status" : "Denied"
	})
	document.getElementById('booked').innerHTML = "Request Denied";
	booked();
}

function track()
{
	var customerID = document.getElementById('custID').value;
	var dbRefBooks = firebase.database().ref(databaseLink3).child(customerID);
	var dbMoreRef = dbRefBooks.child('l');
	firebase.database().ref(dbMoreRef).on('value', function(snapshot)
	{
		s = snapshotToArray(snapshot);
		document.getElementById('end').value = s[0] + ", " + s[1];
	});
	document.getElementById('booked').innerHTML = "Tracking Enabled";
}

function db_coordinates()
{
	const dbRef = firebase.database().ref();
	latitude = dbRef.child('latitude');
	longitude = dbRef.child('longitude');
	map.setCenter(new GLatLng(latitude,longitude));
	initialize();
}
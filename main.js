
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
function fetchIssues(){
	let issues 		= JSON.parse(localStorage.getItem('issues'));
	let issuesList  = document.getElementById('issuesList');

	issuesList.innerHTML = '';

	for (var i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var desc = issues[i].description;
	    var severity = issues[i].severity;
	    var assignedTo = issues[i].assignedTo;
	    var status = issues[i].status;

	    issuesList.innerHTML += '<div class="well">'+
	                              `<h6>Issue ID: ${id}</h6>`+
	                              `<p><span class="label label-info">${status}</span></p>`+
	                              `<h3>${desc}</h3>`+
	                              `<p><span class="glyphicon glyphicon-time"></span> ${severity} `+
	                              `<span class="glyphicon glyphicon-user"></span> ${assignedTo} </p>`+
	                              '<a href="javascript:void(0);" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
	                              '<a href="javascript:void(0);" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              	'</div>';
	}
}

function saveIssue(e){

	var id = chance.guid();
	var description = document.getElementById('issueDescInput').value;
	var severity  = document.getElementById('issueSeverityInput').value;
	var assignedTo = document.getElementById('issueAssignedToInput').value;
	var status = 'open';

	var issue = {
		id,
		description,
		severity,
		assignedTo,
		status
	}

	if(localStorage.getItem('issues') === null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();
	fetchIssues();

	e.preventDefault();
}

function setStatusClosed(issueId) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for(var i = 0; i < issues.length; i++) {
		if(issues[i].id === issueId) {
			issues[i].status = 'closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
}

function deleteIssue(issueId) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for(var i = 0; i < issues.length; i++) {
		if(issues[i].id === issueId) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
}

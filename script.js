// Search Section
async function searchIssue(){

const text = document.getElementById("searchInput").value;

showLoading(true);

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

const data = await res.json();

displayIssues(data.data);

showLoading(false);

}


const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

window.onload = fetchIssues;



// change tab color
function changeTab(btn){

let tabs = document.getElementsByClassName("tabBtn");

for(let i = 0; i < tabs.length; i++){

tabs[i].classList.remove("bg-pink-600");
tabs[i].classList.add("bg-gray-700");

}

btn.classList.remove("bg-gray-700");
btn.classList.add("bg-pink-600");

}



// All Issues
function loadIssues(btn){

if(btn){
changeTab(btn);
}

displayIssues(allIssues);

}



// Open Issues
function loadOpen(btn){

changeTab(btn);

let filtered = allIssues.filter(function(issue){
return issue.status === "open";
});

displayIssues(filtered);

}



// Closed Issues
function loadClosed(btn){

changeTab(btn);

let filtered = allIssues.filter(function(issue){
return issue.status === "closed";
});

displayIssues(filtered);

}



// LOAD ALL ISSUES (API)
async function fetchIssues(){

showLoading(true);

const res = await fetch(api);
const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

showLoading(false);

}



// Display Issues Section
function displayIssues(issues){

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;

issues.forEach(issue => {

const card = document.createElement("div");

let borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500";

card.className =
`bg-gray-800 p-5 rounded-xl border-t-4 ${borderColor} shadow-md cursor-pointer hover:scale-[1.02] transition`;

card.innerHTML = `

<div class="flex justify-between items-center mb-3">

<div class="flex items-center gap-2">

<div class="w-6 h-6 rounded-full flex items-center justify-center
${issue.status === "open"
? "bg-green-500/20 text-green-400"
: "bg-purple-500/20 text-purple-400"}">

${issue.status === "open" ? "●" : "✓"}

</div>

</div>

<span class="text-xs px-3 py-1 rounded-full
${issue.priority === "HIGH"
? "bg-red-500/20 text-red-400"
: issue.priority === "MEDIUM"
? "bg-yellow-500/20 text-yellow-400"
: "bg-gray-500/20 text-gray-300"}">

${issue.priority}

</span>

</div>


<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>


<p class="text-gray-400 text-xs mb-4">
${issue.description.substring(0,70)}...
</p>


<div class="flex gap-2 mb-4">

<span class="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
🐞 BUG
</span>

<span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
⚠ HELP WANTED
</span>

</div>


<div class="border-t border-gray-700 pt-3 text-xs text-gray-400">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

`;

card.onclick = () => openModal(issue);

container.appendChild(card);

});

}



// Modal Open
function openModal(issue){

document.getElementById("modal").classList.remove("hidden");
document.getElementById("modal").classList.add("flex");

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDesc").innerText = issue.description;
document.getElementById("modalStatus").innerText = issue.status;
document.getElementById("modalAuthor").innerText = issue.author;
document.getElementById("modalPriority").innerText = issue.priority;
document.getElementById("modalLabel").innerText = issue.label;
document.getElementById("modalDate").innerText = issue.createdAt;

}



// Close Modal
function closeModal(){

document.getElementById("modal").classList.add("hidden");

}



// Loading
function showLoading(state){

document.getElementById("loading")
.classList.toggle("hidden", !state);

}
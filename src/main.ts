interface Contest {
  id: number;
  contest: string;
  rank: number;
  solve: number;
  rating: number;
}
const contests: Contest[] = [];
import Chart from 'chart.js/auto';
const contestss:string[] = [];
const ratings:number[] = [];
const ranks:number[] = []
const solvings:number[] = []

const tableBody= document.getElementById("table-body");
if(tableBody){
 // console.log(tableBody);
  const trs=tableBody.querySelectorAll('tr');
 // console.log(trs);
  for(let i=0;i<trs.length;i++){
   // console.log(i," : ",trs[i]);
    const tds=trs[i].querySelectorAll('td');
        const contest: Contest = {
        id: parseInt(tds[0].innerText),
        contest: tds[1].innerHTML,
        rank: parseInt(tds[2].innerText),
        solve: parseInt(tds[3].innerText),
        rating:parseInt(tds[4].innerText),
      }
      
      contests.push(contest);
      contestss.push(contest.contest);
      ranks.push(contest.rank);
      solvings.push(contest.solve);
      ratings.push(contest.rating)
 
  }
}
// console.log(contests);

const dymanicTableBody = document.getElementById("dymanic-table-body");
if(dymanicTableBody){
  for(let i=0;i<contests.length;i++){
  const newRow =document.createElement('tr')
  newRow.innerHTML = `
  <td class="border border-slate-600 px-4 py-2">${contests[i].id}</td>
  <td class="border border-slate-600 px-4 py-2">${contests[i].contest}</td>
  <td class="border border-slate-600 px-4 py-2">${contests[i].rank}</td>
  <td class="border border-slate-600 px-4 py-2">${contests[i].solve}</td>
  <td class="border border-slate-600 px-4 py-2">${contests[i].rating}</td>
`;
  dymanicTableBody.appendChild(newRow);

  }
}

function refrestTheTable(){
  if(dymanicTableBody){
    dymanicTableBody.innerHTML="";
    for(let i=0;i<contests.length;i++){
    const newRow =document.createElement('tr')
    newRow.innerHTML = `
    <td class="border border-slate-600 px-4 py-2">${contests[i].id}</td>
    <td class="border border-slate-600 px-4 py-2">${contests[i].contest}</td>
    <td class="border border-slate-600 px-4 py-2">${contests[i].rank}</td>
    <td class="border border-slate-600 px-4 py-2">${contests[i].solve}</td>
    <td class="border border-slate-600 px-4 py-2">${contests[i].rating}</td>
  `;
    dymanicTableBody.appendChild(newRow);
  
    }
  }
}
const rantBtn=document.getElementById('rankBtn');
const solveBtn=document.getElementById('solveBtn');
const ratingBtn=document.getElementById('ratingBtn');
console.log(rantBtn,solveBtn,ratingBtn);


if(rantBtn){
   rantBtn?.addEventListener('click',()=>{
    console.log('click rant bnt');
    contests.sort((a, b) => a.rank - b.rank);
    refrestTheTable();
   })
}

if(solveBtn){
  solveBtn.addEventListener('click',()=>{
    console.log('click solve btn');
    contests.sort((a, b) => b.solve - a.solve );
    refrestTheTable();
  })
}

if(ratingBtn){
  ratingBtn.addEventListener('click',()=>{
    console.log('click rating btn')
    contests.sort((a, b) => b.rating - a.rating );
    refrestTheTable();
  })
}
///////bar chart start ////////////////////////
const bar_rantBtn=document.getElementById('bar_rankBtn');
const bar_solveBtn=document.getElementById('bar_solveBtn');
const bar_ratingBtn=document.getElementById('bar_ratingBtn');
console.log(rantBtn,solveBtn,ratingBtn);


const canvas = document.getElementById('myChart') as HTMLCanvasElement;
let myChart: Chart | null = null;

function makeBar(labName: string, dataPass: number[]) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Destroy existing chart if it exists
    if (myChart) {
      myChart.destroy();
    }
    
    // Create new chart
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: contestss,
        datasets: [{
          label: labName,
          data: dataPass,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color with some transparency
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Rating'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Contests'
            }
          }
        }
      }
    });
  }
}

if(bar_ratingBtn){
  bar_ratingBtn.addEventListener('click',()=>{
    console.log('click rating btn bar_')
    makeBar("Rating",ranks);
  })
}
if(bar_rantBtn){
  console.log('sda')
  bar_rantBtn?.addEventListener('click',()=>{
    console.log('click rant bar_bnt');
    makeBar("RANK",ranks);
   
   })
}

if(bar_solveBtn){
  bar_solveBtn.addEventListener('click',()=>{
    console.log('click solve bar_ btn');
    makeBar("Solve Problems",solvings);
  })
}


////////end/////////////////////////////


const exercises = [
  {name:'Dumbbell Row',group:'Back',equipment:'Dumbbells',difficulty:'Beginner',notes:'Brace one hand, pull elbow toward hip.'},
  {name:'Reverse Fly',group:'Back',equipment:'Dumbbells',difficulty:'Beginner',notes:'Light weight, squeeze shoulder blades.'},
  {name:'Dumbbell Pullover',group:'Back',equipment:'Dumbbell/bench',difficulty:'Intermediate',notes:'Control the stretch; keep ribs down.'},
  {name:'Lat Pulldown',group:'Back',equipment:'Cable machine',difficulty:'Beginner',notes:'Pull elbows down, not hands back.'},
  {name:'Seated Cable Row',group:'Back',equipment:'Cable machine',difficulty:'Beginner',notes:'Pause with shoulder blades squeezed.'},
  {name:'Dead Bug',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Keep low back gently pressed down.'},
  {name:'Plank',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Straight line from shoulders to ankles.'},
  {name:'Side Plank',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Stack hips and keep ribs lifted.'},
  {name:'Bird Dog',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Move slowly; avoid twisting.'},
  {name:'Pallof Press',group:'Core',equipment:'Cable/band',difficulty:'Intermediate',notes:'Anti-rotation core move.'},
  {name:'Dumbbell Shoulder Press',group:'Shoulders',equipment:'Dumbbells',difficulty:'Beginner',notes:'Press upward without arching low back.'},
  {name:'Lateral Raise',group:'Shoulders',equipment:'Dumbbells',difficulty:'Beginner',notes:'Use light weight; lead with elbows.'},
  {name:'Chest Press',group:'Chest',equipment:'Dumbbells/bench',difficulty:'Beginner',notes:'Lower with control.'},
  {name:'Goblet Squat',group:'Legs',equipment:'Dumbbell',difficulty:'Beginner',notes:'Sit between hips; keep chest tall.'},
  {name:'Romanian Deadlift',group:'Legs',equipment:'Dumbbells',difficulty:'Beginner',notes:'Hinge at hips; feel hamstrings.'},
  {name:'Hammer Curl',group:'Arms',equipment:'Dumbbells',difficulty:'Beginner',notes:'Keep elbows close.'},
  {name:'Overhead Triceps Extension',group:'Arms',equipment:'Dumbbell',difficulty:'Beginner',notes:'Keep elbows pointed forward.'}
];

let routines = JSON.parse(localStorage.getItem('routines') || '[]');
let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
let hikes = JSON.parse(localStorage.getItem('hikes') || '[]');
let selected = [];
let activePresetGroups = [];

const $ = id => document.getElementById(id);
const groups = ['All', ...new Set(exercises.map(e => e.group))];
const presetGroups = [...new Set(exercises.map(e => e.group))];

function today(){ return new Date().toISOString().slice(0,10); }
function save(){
  localStorage.setItem('routines',JSON.stringify(routines));
  localStorage.setItem('workouts',JSON.stringify(workouts));
  localStorage.setItem('hikes',JSON.stringify(hikes));
}
function esc(s){ return String(s || '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c])); }

function init(){
  if(!$('libraryList')) return;
  document.querySelectorAll('.tabs button').forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
  $('libraryFilter').innerHTML = groups.map(g => `<option>${g}</option>`).join('');
  $('routineFilter').innerHTML = groups.map(g => `<option>${g}</option>`).join('');
  renderRoutinePresets();
  $('libraryFilter').addEventListener('change', renderLibrary);
  $('routineFilter').addEventListener('change', renderRoutineExercises);
  $('saveRoutineBtn').addEventListener('click', saveRoutine);
  $('workoutRoutine').addEventListener('change', renderWorkoutExerciseInputs);
  $('saveWorkoutBtn').addEventListener('click', saveWorkout);
  $('saveHikeBtn').addEventListener('click', saveHike);
  $('clearAllBtn').addEventListener('click', clearAll);
  $('workoutDate').value = today();
  $('hikeDate').value = today();
  renderAll();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js?v=9').then(r => r.update()).catch(()=>{});
}

function showTab(id){
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === id));
  renderAll();
}


function renderRoutinePresets(){
  const el = $('routinePresets');
  if(!el) return;
  el.innerHTML = ['Custom', ...presetGroups].map(g => `<button class="preset ${activePresetGroups.includes(g) ? 'active' : ''}" type="button" data-preset="${esc(g)}">${esc(g)}</button>`).join('');
  document.querySelectorAll('[data-preset]').forEach(btn => btn.onclick = () => applyRoutinePreset(btn.dataset.preset));
}
function applyRoutinePreset(group){
  if(group === 'Custom'){
    selected = [];
    activePresetGroups = [];
    $('routineName').value = '';
    $('routineFilter').value = 'All';
    renderRoutinePresets();
    renderRoutineExercises();
    renderSelected();
    return;
  }

  if(activePresetGroups.includes(group)){
    activePresetGroups = activePresetGroups.filter(g => g !== group);
    const groupExerciseNames = exercises.filter(e => e.group === group).map(e => e.name);
    selected = selected.filter(name => !groupExerciseNames.includes(name));
  } else {
    activePresetGroups.push(group);
    exercises.filter(e => e.group === group).forEach(e => {
      if(!selected.includes(e.name)) selected.push(e.name);
    });
  }

  if(activePresetGroups.length){
    $('routineName').value = `${activePresetGroups.join(' + ')} day`;
    $('routineFilter').value = activePresetGroups[activePresetGroups.length - 1];
  } else {
    $('routineName').value = '';
    $('routineFilter').value = 'All';
  }
  renderRoutinePresets();
  renderRoutineExercises();
  renderSelected();
}

function filtered(which){ const val = $(which).value || 'All'; return val === 'All' ? exercises : exercises.filter(e => e.group === val); }

function exerciseCard(e, withAdd=false){
  return `<div class="card"><h3>${esc(e.name)}</h3><div class="meta">${esc(e.group)} • ${esc(e.equipment)} • ${esc(e.difficulty)}</div><p>${esc(e.notes)}</p>${withAdd ? `<button class="add" type="button" data-add="${esc(e.name)}">Add</button>` : ''}</div>`;
}

function renderLibrary(){ $('libraryList').innerHTML = filtered('libraryFilter').map(e => exerciseCard(e)).join(''); }
function renderRoutineExercises(){
  $('routineExerciseList').innerHTML = filtered('routineFilter').map(e => exerciseCard(e,true)).join('');
  document.querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => addExercise(btn.dataset.add));
}
function addExercise(name){ if(!selected.includes(name)) selected.push(name); renderSelected(); }
function removeSelected(name){ selected = selected.filter(x => x !== name); renderSelected(); }
function renderSelected(){
  $('selectedRoutine').innerHTML = selected.length ? selected.map(name => `<div class="row"><span>${esc(name)}</span><button class="small" type="button" data-remove="${esc(name)}">Remove</button></div>`).join('') : '<div class="empty">No exercises selected yet.</div>';
  document.querySelectorAll('[data-remove]').forEach(btn => btn.onclick = () => removeSelected(btn.dataset.remove));
}
function saveRoutine(){
  const name = $('routineName').value.trim();
  if(!name){ alert('Name the routine first.'); return; }
  if(!selected.length){ alert('Add at least one exercise.'); return; }
  routines.push({id:Date.now(), name, exercises:[...selected]});
  selected = []; activePresetGroups = []; $('routineName').value = ''; save(); renderAll(); showTab('routineLibrary'); alert('Routine saved to library.');
}
function renderSavedRoutines(){
  $('savedRoutines').innerHTML = routines.length ? routines.map(r => `<div class="card"><h3>${esc(r.name)}</h3><p>${r.exercises.map(esc).join('<br>')}</p><button class="small" type="button" data-delete-routine="${r.id}">Delete</button></div>`).join('') : '<div class="empty">No saved routines yet. Build one in the Build tab.</div>';
  document.querySelectorAll('[data-delete-routine]').forEach(btn => btn.onclick = () => { routines = routines.filter(r => String(r.id)!==String(btn.dataset.deleteRoutine)); save(); renderAll(); });
}
function renderWorkoutRoutineOptions(){
  const current = $('workoutRoutine').value;
  $('workoutRoutine').innerHTML = routines.length ? routines.map(r => `<option value="${r.id}">${esc(r.name)}</option>`).join('') : '<option value="">No routines saved yet</option>';
  if(current && routines.some(r => String(r.id) === String(current))) $('workoutRoutine').value = current;
  renderWorkoutExerciseInputs();
}
function renderWorkoutExerciseInputs(){
  const routine = routines.find(r => String(r.id) === String($('workoutRoutine').value));
  if(!routine){ $('workoutExerciseInputs').innerHTML = '<div class="empty">Save a routine first, then choose it here.</div>'; return; }
  $('workoutExerciseInputs').innerHTML = routine.exercises.map((name, index) => `
    <div class="card workout-entry" data-exercise="${esc(name)}">
      <h3>${esc(name)}</h3>
      <div class="log-grid">
        <label>Sets <input inputmode="numeric" type="number" min="0" step="1" data-field="sets" data-index="${index}" placeholder="3" /></label>
        <label>Reps <input inputmode="numeric" type="number" min="0" step="1" data-field="reps" data-index="${index}" placeholder="10" /></label>
        <label>Weight <input inputmode="decimal" data-field="weight" data-index="${index}" placeholder="15 lb" /></label>
      </div>
    </div>`).join('');
}
function saveWorkout(){
  const routine = routines.find(r => String(r.id) === String($('workoutRoutine').value));
  if(!routine){ alert('Save a routine first.'); return; }
  const entries = routine.exercises.map((name, index) => ({
    name,
    sets: document.querySelector(`[data-field="sets"][data-index="${index}"]`)?.value || '',
    reps: document.querySelector(`[data-field="reps"][data-index="${index}"]`)?.value || '',
    weight: document.querySelector(`[data-field="weight"][data-index="${index}"]`)?.value || ''
  }));
  workouts.unshift({date:$('workoutDate').value || today(), routine:routine.name, entries, notes:$('workoutNotes').value.trim()});
  $('workoutNotes').value=''; $('workoutDate').value=today(); save(); renderAll(); alert('Workout saved.');
}
function saveHike(){
  hikes.unshift({date:$('hikeDate').value || today(), trail:$('hikeTrail').value.trim(), distance:$('hikeDistance').value.trim(), time:$('hikeTime').value.trim(), steps:$('hikeSteps').value.trim(), difficulty:$('hikeDifficulty').value, notes:$('hikeNotes').value.trim()});
  ['hikeTrail','hikeDistance','hikeTime','hikeSteps','hikeNotes'].forEach(id => $(id).value=''); $('hikeDate').value=today(); save(); renderAll(); alert('Hike saved.');
}
function formatWorkoutEntries(w){
  const entries = w.entries || (w.exercises || []).map(name => ({name, sets:'', reps:'', weight:''}));
  return entries.map(e => `${esc(e.name)}${e.sets || e.reps || e.weight ? ` — ${esc(e.sets || '?')} sets × ${esc(e.reps || '?')} reps${e.weight ? ` @ ${esc(e.weight)}` : ''}` : ''}`).join('<br>');
}
function renderHistory(){
  $('workoutHistory').innerHTML = workouts.length ? workouts.map(w => `<div class="card"><h3>${esc(w.date)} — ${esc(w.routine)}</h3><p>${formatWorkoutEntries(w)}</p>${w.notes ? `<p>${esc(w.notes)}</p>` : ''}</div>`).join('') : '<div class="empty">No workouts logged yet.</div>';
  $('hikeHistory').innerHTML = hikes.length ? hikes.map(h => `<div class="card"><h3>${esc(h.date)} — ${esc(h.trail || 'Hike')}</h3><div class="meta">${esc(h.distance)} • ${esc(h.time)} • ${esc(h.steps)} steps • ${esc(h.difficulty)}</div><p>${esc(h.notes)}</p></div>`).join('') : '<div class="empty">No hikes logged yet.</div>';
}
function clearAll(){ if(confirm('Clear all routines, workouts, and hikes?')){ routines=[]; workouts=[]; hikes=[]; selected=[]; activePresetGroups=[]; save(); renderAll(); } }
function renderAll(){ renderLibrary(); renderRoutineExercises(); renderSelected(); renderSavedRoutines(); renderWorkoutRoutineOptions(); renderHistory(); }

document.addEventListener('DOMContentLoaded', init);

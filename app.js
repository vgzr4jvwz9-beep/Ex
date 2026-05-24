const exercises = [
  {name:'Dumbbell Row',group:'Back',equipment:'Dumbbells',difficulty:'Beginner',notes:'Brace one hand, pull elbow toward hip.',muscles:'Lats, mid-back, rear delts, biceps',steps:'Brace with one hand on a bench or sturdy surface. Let the dumbbell hang under your shoulder. Pull your elbow back toward your hip, pause, then lower with control.',visual:'row'},
  {name:'Reverse Fly',group:'Back',equipment:'Dumbbells',difficulty:'Beginner',notes:'Light weight, squeeze shoulder blades.',muscles:'Rear delts, upper back, rhomboids, traps',steps:'Hinge forward slightly with a soft bend in the knees. Let the dumbbells hang, then open your arms out to the sides like wings. Squeeze your shoulder blades and lower slowly.',visual:'fly'},
  {name:'Dumbbell Pullover',group:'Back',equipment:'Dumbbell/bench',difficulty:'Intermediate',notes:'Control the stretch; keep ribs down.',muscles:'Lats, chest, serratus, core stability',steps:'Lie on a bench or floor holding one dumbbell over your chest. Keep your ribs down and lower the weight behind your head until you feel a stretch. Pull it back over your chest with control.',visual:'pullover'},
  {name:'Lat Pulldown',group:'Back',equipment:'Cable machine',difficulty:'Beginner',notes:'Pull elbows down, not hands back.',muscles:'Lats, upper back, biceps',steps:'Sit tall and grip the bar wider than shoulder width. Pull your elbows down toward your ribs until the bar reaches upper chest height. Slowly return to the top.',visual:'pulldown'},
  {name:'Seated Cable Row',group:'Back',equipment:'Cable machine',difficulty:'Beginner',notes:'Pause with shoulder blades squeezed.',muscles:'Mid-back, lats, rhomboids, traps, biceps',steps:'Sit tall with your feet braced. Pull the handle toward your lower ribs, squeeze your shoulder blades, then let your arms extend without rounding your back.',visual:'row'},
  {name:'Dead Bug',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Keep low back gently pressed down.',muscles:'Deep core, abs, hip flexor control',steps:'Lie on your back with arms up and knees bent. Brace your core and slowly lower one arm and the opposite leg. Return and alternate sides without letting your low back arch.',visual:'core'},
  {name:'Plank',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Straight line from shoulders to ankles.',muscles:'Abs, deep core, shoulders, glutes',steps:'Set your elbows under your shoulders. Step your feet back and make a straight line from shoulders to ankles. Brace your stomach and glutes while holding steady.',visual:'plank'},
  {name:'Side Plank',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Stack hips and keep ribs lifted.',muscles:'Obliques, deep core, glutes, shoulder stabilizers',steps:'Lie on your side with elbow under shoulder. Stack your feet or stagger them, lift your hips, and keep your ribs and hips lifted. Hold, then switch sides.',visual:'sideplank'},
  {name:'Bird Dog',group:'Core',equipment:'None',difficulty:'Beginner',notes:'Move slowly; avoid twisting.',muscles:'Core stability, low back, glutes, shoulders',steps:'Start on hands and knees. Brace your core, extend one arm and the opposite leg, pause, then return. Keep hips level and switch sides.',visual:'birddog'},
  {name:'Pallof Press',group:'Core',equipment:'Cable/band',difficulty:'Intermediate',notes:'Anti-rotation core move.',muscles:'Obliques, deep core, abs, glutes',steps:'Stand sideways to a cable or band. Hold the handle at your chest, brace your core, and press straight out without letting your body twist. Bring it back in slowly.',visual:'press'},
  {name:'Dumbbell Shoulder Press',group:'Shoulders',equipment:'Dumbbells',difficulty:'Beginner',notes:'Press upward without arching low back.',muscles:'Shoulders, triceps, upper chest, core',steps:'Hold dumbbells at shoulder height. Brace your core and press them overhead until arms are almost straight. Lower back to shoulder height with control.',visual:'press'},
  {name:'Lateral Raise',group:'Shoulders',equipment:'Dumbbells',difficulty:'Beginner',notes:'Use light weight; lead with elbows.',muscles:'Side delts, upper traps',steps:'Stand tall with dumbbells at your sides. With a slight bend in your elbows, raise your arms out to the sides to shoulder height. Lower slowly.',visual:'fly'},
  {name:'Chest Press',group:'Chest',equipment:'Dumbbells/bench',difficulty:'Beginner',notes:'Lower with control.',muscles:'Chest, front shoulders, triceps',steps:'Lie on a bench or floor with dumbbells near your chest. Press the weights up over your chest, then lower until your upper arms are near the floor or bench level.',visual:'press'},
  {name:'Goblet Squat',group:'Legs',equipment:'Dumbbell',difficulty:'Beginner',notes:'Sit between hips; keep chest tall.',muscles:'Quads, glutes, hamstrings, core',steps:'Hold one dumbbell at your chest. Sit your hips down and back, keep your chest tall, then drive through your feet to stand.',visual:'squat'},
  {name:'Romanian Deadlift',group:'Legs',equipment:'Dumbbells',difficulty:'Beginner',notes:'Hinge at hips; feel hamstrings.',muscles:'Hamstrings, glutes, low back, core',steps:'Hold dumbbells in front of your thighs. Push your hips back while keeping your back flat. Lower until you feel your hamstrings stretch, then stand by squeezing your glutes.',visual:'hinge'},
  {name:'Hammer Curl',group:'Arms',equipment:'Dumbbells',difficulty:'Beginner',notes:'Keep elbows close.',muscles:'Biceps, brachialis, forearms',steps:'Hold dumbbells with palms facing each other. Keep elbows close to your sides, curl the weights up, squeeze briefly, then lower slowly.',visual:'curl'},
  {name:'Overhead Triceps Extension',group:'Arms',equipment:'Dumbbell',difficulty:'Beginner',notes:'Keep elbows pointed forward.',muscles:'Triceps, shoulders, core stability',steps:'Hold one dumbbell overhead with both hands. Keep elbows pointed forward, lower the weight behind your head, then extend your arms back up.',visual:'extension'}

  ,{name:'Child’s Pose',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Let your hips sink back and breathe into your back.',muscles:'Lower back, hips, shoulders, spine mobility',steps:'Start on hands and knees. Sit your hips back toward your heels, reach your arms forward, and relax your chest toward the floor. Breathe slowly and hold.'}
  ,{name:'Cat-Cow',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Move slowly with your breath.',muscles:'Spine mobility, core control, upper back',steps:'Start on hands and knees. Arch your back gently as you lift your chest, then round your spine and tuck your chin. Continue moving slowly between both positions.'}
  ,{name:'Downward Dog',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Bend knees if your hamstrings feel tight.',muscles:'Shoulders, calves, hamstrings, upper back',steps:'Start on hands and knees, tuck your toes, and lift your hips up and back. Press through your hands, keep your spine long, and pedal your heels if needed.'}
  ,{name:'Low Lunge',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Keep front knee stacked over ankle.',muscles:'Hip flexors, glutes, quads, core balance',steps:'Step one foot forward between your hands and lower the back knee. Keep your chest lifted and hips gently pressing forward. Switch sides.'}
  ,{name:'Warrior II',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Reach long through both arms and keep the front knee bent.',muscles:'Quads, glutes, hips, shoulders, core',steps:'Step your feet wide. Turn one foot out, bend that knee, and reach your arms in opposite directions. Keep your torso tall and gaze over the front hand.'}
  ,{name:'Tree Pose',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Use a wall or chair for balance if needed.',muscles:'Balance, calves, glutes, hips, core',steps:'Stand tall and shift weight into one foot. Place the other foot against your ankle, calf, or inner thigh. Bring hands together and hold steady, then switch sides.'}
  ,{name:'Cobra Pose',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Lift with your chest, not by jamming your low back.',muscles:'Chest, spine extensors, shoulders, abs stretch',steps:'Lie face down with hands under shoulders. Press lightly into your hands and lift your chest while keeping hips down. Lower slowly.'}
  ,{name:'Supine Twist',group:'Yoga',equipment:'None',difficulty:'Beginner',notes:'Keep shoulders relaxed toward the floor.',muscles:'Low back, obliques, glutes, spine mobility',steps:'Lie on your back and bring one knee across your body. Let your torso rotate gently while keeping shoulders relaxed. Hold, breathe, and switch sides.'}

];

let routines = JSON.parse(localStorage.getItem('routines') || '[]');
let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
let hikes = JSON.parse(localStorage.getItem('hikes') || '[]');
let savedTrailNames = JSON.parse(localStorage.getItem('savedTrailNames') || '[]');
const wvStateParks = [
  'Audra State Park','Babcock State Park','Beartown State Park','Beech Fork State Park','Berkeley Springs State Park','Blackwater Falls State Park','Blennerhassett Island Historical State Park','Bluestone State Park','Cabwaylingo State Forest','Cacapon Resort State Park','Camp Creek State Park and Forest','Canaan Valley Resort State Park','Carnifex Ferry Battlefield State Park','Cass Scenic Railroad State Park','Cathedral State Park','Cedar Creek State Park','Chief Logan State Park','Coopers Rock State Forest','Droop Mountain Battlefield State Park','Fairfax Stone State Park','Greenbrier River Trail','Hawks Nest State Park','Holly River State Park','Kanawha State Forest','Kumbrabow State Forest','Little Beaver State Park','Lost River State Park','Moncove Lake State Park','North Bend Rail Trail','North Bend State Park','Pipestem Resort State Park','Prickett’s Fort State Park','Seneca State Forest','Stonewall Resort State Park','Tomlinson Run State Park','Twin Falls Resort State Park','Tygart Lake State Park','Valley Falls State Park','Watoga State Park','Watters Smith Memorial State Park','Watoga State Park'
];
let savedHikeLocations = JSON.parse(localStorage.getItem('savedHikeLocations') || '[]');
savedHikeLocations = [...new Set([...wvStateParks, ...savedHikeLocations])];
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
  localStorage.setItem('savedTrailNames',JSON.stringify(savedTrailNames));
  localStorage.setItem('savedHikeLocations',JSON.stringify(savedHikeLocations));
}
function rememberHikeOptions(trail, location){
  if(trail && !savedTrailNames.includes(trail)) savedTrailNames.push(trail);
  if(location && !savedHikeLocations.includes(location)) savedHikeLocations.push(location);
  savedTrailNames.sort((a,b)=>a.localeCompare(b));
  savedHikeLocations.sort((a,b)=>a.localeCompare(b));
}
function renderHikeOptionLists(){
  if($('trailNameOptions')) $('trailNameOptions').innerHTML = savedTrailNames.map(x => `<option value="${esc(x)}"></option>`).join('');
  if($('hikeLocationOptions')) $('hikeLocationOptions').innerHTML = savedHikeLocations.map(x => `<option value="${esc(x)}"></option>`).join('');
}
function esc(s){ return String(s || '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c])); }

function init(){
  if(!$('libraryList')) return;
  document.querySelectorAll('.tabs button').forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
  if($('exerciseModalClose')) $('exerciseModalClose').addEventListener('click', closeExerciseDetail);
  if($('exerciseModal')) $('exerciseModal').addEventListener('click', e => { if(e.target.id === 'exerciseModal') closeExerciseDetail(); });
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
  renderHikeOptionLists();
  renderAll();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js?v=14').then(r => r.update()).catch(()=>{});
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
  return `<div class="card exercise-card" role="button" tabindex="0" data-detail="${esc(e.name)}">
    <h3>${esc(e.name)}</h3>
    <div class="meta">${esc(e.group)} • ${esc(e.equipment)} • ${esc(e.difficulty)}</div>
    <p>${esc(e.notes)}</p>
    <div class="card-action">Tap for form + muscles</div>
    ${withAdd ? `<button class="add" type="button" data-add="${esc(e.name)}">Add</button>` : ''}
  </div>`;
}

function wireExerciseDetails(container){
  container.querySelectorAll('[data-detail]').forEach(card => {
    card.addEventListener('click', () => openExerciseDetail(card.dataset.detail));
    card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') openExerciseDetail(card.dataset.detail); });
  });
}

function renderLibrary(){
  const list = $('libraryList');
  list.innerHTML = filtered('libraryFilter').map(e => exerciseCard(e)).join('');
  wireExerciseDetails(list);
}
function renderRoutineExercises(){
  const list = $('routineExerciseList');
  list.innerHTML = filtered('routineFilter').map(e => exerciseCard(e,true)).join('');
  wireExerciseDetails(list);
  list.querySelectorAll('[data-add]').forEach(btn => btn.onclick = (event) => { event.stopPropagation(); addExercise(btn.dataset.add); });
}

function exerciseVisual(type, small=false){
  const label = small ? '' : '<text x="50" y="94" text-anchor="middle" class="svg-label">movement guide</text>';
  const common = '<circle cx="50" cy="18" r="7" class="body"/><line x1="50" y1="25" x2="50" y2="55" class="body"/><line x1="50" y1="55" x2="38" y2="82" class="body"/><line x1="50" y1="55" x2="62" y2="82" class="body"/>';
  const arms = {
    row:'<line x1="50" y1="35" x2="24" y2="50" class="muscle"/><line x1="50" y1="35" x2="76" y2="50" class="body"/><path d="M24 50 L14 42" class="arrow"/><rect x="10" y="38" width="10" height="8" rx="2" class="weight"/>',
    fly:'<line x1="50" y1="35" x2="18" y2="34" class="muscle"/><line x1="50" y1="35" x2="82" y2="34" class="muscle"/><path d="M24 33 C18 26 18 20 24 16" class="arrow"/><path d="M76 33 C82 26 82 20 76 16" class="arrow"/>',
    pullover:'<line x1="50" y1="35" x2="50" y2="6" class="muscle"/><path d="M50 9 C34 10 28 22 31 35" class="arrow"/><rect x="43" y="1" width="14" height="7" rx="2" class="weight"/>',
    pulldown:'<line x1="26" y1="5" x2="74" y2="5" class="bar"/><line x1="50" y1="35" x2="26" y2="8" class="muscle"/><line x1="50" y1="35" x2="74" y2="8" class="muscle"/><path d="M26 12 L31 24" class="arrow"/><path d="M74 12 L69 24" class="arrow"/>',
    core:'<ellipse cx="50" cy="47" rx="17" ry="25" class="highlight"/><line x1="30" y1="24" x2="14" y2="10" class="muscle"/><line x1="70" y1="55" x2="86" y2="75" class="muscle"/>',
    plank:'<line x1="18" y1="54" x2="82" y2="54" class="muscle"/><circle cx="78" cy="47" r="6" class="body"/><line x1="73" y1="54" x2="52" y2="54" class="body"/><line x1="52" y1="54" x2="24" y2="69" class="body"/><line x1="73" y1="54" x2="84" y2="65" class="body"/>',
    sideplank:'<line x1="25" y1="65" x2="78" y2="42" class="muscle"/><circle cx="82" cy="38" r="6" class="body"/><line x1="30" y1="65" x2="18" y2="80" class="body"/><line x1="47" y1="56" x2="39" y2="80" class="body"/>',
    birddog:'<line x1="30" y1="52" x2="70" y2="52" class="body"/><circle cx="25" cy="48" r="6" class="body"/><line x1="42" y1="52" x2="20" y2="72" class="body"/><line x1="55" y1="52" x2="80" y2="72" class="body"/><line x1="38" y1="48" x2="18" y2="30" class="muscle"/><line x1="62" y1="55" x2="86" y2="36" class="muscle"/>',
    press:'<line x1="50" y1="35" x2="32" y2="18" class="muscle"/><line x1="50" y1="35" x2="68" y2="18" class="muscle"/><path d="M32 18 L30 6" class="arrow"/><path d="M68 18 L70 6" class="arrow"/><rect x="25" y="2" width="10" height="7" rx="2" class="weight"/><rect x="65" y="2" width="10" height="7" rx="2" class="weight"/>',
    squat:'<ellipse cx="50" cy="60" rx="20" ry="20" class="highlight"/><line x1="50" y1="35" x2="35" y2="58" class="muscle"/><line x1="50" y1="35" x2="65" y2="58" class="muscle"/><path d="M50 35 C44 46 44 55 50 65" class="arrow"/>',
    hinge:'<line x1="50" y1="25" x2="34" y2="50" class="body"/><line x1="34" y1="50" x2="42" y2="82" class="muscle"/><line x1="34" y1="50" x2="62" y2="82" class="muscle"/><path d="M50 25 C40 28 35 35 34 48" class="arrow"/>',
    curl:'<line x1="50" y1="35" x2="32" y2="52" class="muscle"/><line x1="50" y1="35" x2="68" y2="52" class="body"/><path d="M32 52 C26 41 27 34 34 28" class="arrow"/><rect x="24" y="50" width="10" height="8" rx="2" class="weight"/>',
    extension:'<line x1="50" y1="35" x2="42" y2="8" class="muscle"/><line x1="50" y1="35" x2="58" y2="8" class="muscle"/><path d="M42 12 C35 24 36 34 44 43" class="arrow"/><rect x="43" y="1" width="14" height="7" rx="2" class="weight"/>'
  };
  return `<svg class="exercise-svg ${small ? 'small' : ''}" viewBox="0 0 100 100" aria-hidden="true">${arms[type] || common}${!['plank','sideplank','birddog','hinge'].includes(type) ? common : ''}${label}</svg>`;
}

function openExerciseDetail(name){
  const e = exercises.find(x => x.name === name);
  if(!e || !$('exerciseModal')) return;
  $('exerciseModalBody').innerHTML = `
    <h2>${esc(e.name)}</h2>
    <div class="meta detail-meta">${esc(e.group)} • ${esc(e.equipment)} • ${esc(e.difficulty)}</div>
    <h3>How to do it</h3>
    <p>${esc(e.steps)}</p>
    <h3>Muscles worked</h3>
    <p>${esc(e.muscles)}</p>
    <h3>Form cue</h3>
    <p>${esc(e.notes)}</p>
  `;
  $('exerciseModal').classList.add('open');
  document.body.classList.add('modal-open');
}
function closeExerciseDetail(){
  if(!$('exerciseModal')) return;
  $('exerciseModal').classList.remove('open');
  document.body.classList.remove('modal-open');
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

function readImageAsDataUrl(file){
  return new Promise(resolve => {
    if(!file){ resolve(''); return; }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || '');
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

async function saveHike(){
  const photoFile = $('hikePhoto')?.files?.[0];
  const photo = await readImageAsDataUrl(photoFile);
  const trail = $('hikeTrail').value.trim();
  const location = $('hikeLocation').value.trim();
  rememberHikeOptions(trail, location);
  hikes.unshift({
    date:$('hikeDate').value || today(),
    trail,
    location,
    distance:$('hikeDistance').value.trim(),
    time:$('hikeTime').value.trim(),
    steps:$('hikeSteps').value.trim(),
    difficulty:$('hikeDifficulty').value,
    notes:$('hikeNotes').value.trim(),
    photo
  });
  ['hikeTrail','hikeLocation','hikeDistance','hikeTime','hikeSteps','hikeNotes'].forEach(id => { if($(id)) $(id).value=''; });
  if($('hikePhoto')) $('hikePhoto').value='';
  $('hikeDate').value=today(); save(); renderHikeOptionLists(); renderAll(); alert('Hike saved.');
}


function firstNumber(value){
  const match = String(value || '').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}
function distanceMiles(value){
  const text = String(value || '').toLowerCase();
  const n = firstNumber(text);
  if(!n) return 0;
  if(text.includes('km') || text.includes('kilometer')) return n * 0.621371;
  return n;
}
function timeMinutes(value){
  const text = String(value || '').toLowerCase();
  const hr = (text.match(/(\d+(?:\.\d+)?)\s*(?:hr|hour)/) || [0,0])[1];
  const min = (text.match(/(\d+(?:\.\d+)?)\s*(?:min|minute)/) || [0,0])[1];
  if(hr || min) return Number(hr || 0) * 60 + Number(min || 0);
  return firstNumber(text);
}
function formatMiles(n){ return n ? `${n.toFixed(n >= 10 ? 1 : 2)} mi` : '0 mi'; }
function formatMinutes(n){
  if(!n) return '0 min';
  const rounded = Math.round(n);
  return rounded >= 60 ? `${Math.floor(rounded/60)}h ${rounded%60}m` : `${rounded} min`;
}
function renderActivityStats(){
  const totalWorkoutSessions = workouts.length;
  const totalHikes = hikes.length;
  const totalMiles = hikes.reduce((sum,h) => sum + distanceMiles(h.distance), 0);
  const totalSteps = hikes.reduce((sum,h) => sum + firstNumber(h.steps), 0);
  const totalMinutes = hikes.reduce((sum,h) => sum + timeMinutes(h.time), 0);
  const exerciseSets = workouts.reduce((sum,w) => sum + ((w.entries || []).reduce((inner,e) => inner + firstNumber(e.sets), 0)), 0);
  const exerciseReps = workouts.reduce((sum,w) => sum + ((w.entries || []).reduce((inner,e) => inner + (firstNumber(e.sets) * firstNumber(e.reps)), 0)), 0);
  const topLocations = {};
  hikes.forEach(h => { const key = (h.location || '').trim(); if(key) topLocations[key] = (topLocations[key] || 0) + 1; });
  const favoriteLocation = Object.entries(topLocations).sort((a,b)=>b[1]-a[1])[0];
  const stats = [
    ['Workout sessions', totalWorkoutSessions],
    ['Total sets logged', exerciseSets],
    ['Total reps logged', exerciseReps],
    ['Hikes logged', totalHikes],
    ['Hiking distance', formatMiles(totalMiles)],
    ['Hiking time', formatMinutes(totalMinutes)],
    ['Hiking steps', totalSteps ? totalSteps.toLocaleString() : '0'],
    ['Top hike location', favoriteLocation ? `${esc(favoriteLocation[0])} (${favoriteLocation[1]})` : '—']
  ];
  if($('activityStats')) $('activityStats').innerHTML = stats.map(([label,value]) => `<div class="stat-card"><span>${label}</span><strong>${value}</strong></div>`).join('');
}

function formatWorkoutEntries(w){
  const entries = w.entries || (w.exercises || []).map(name => ({name, sets:'', reps:'', weight:''}));
  return entries.map(e => `${esc(e.name)}${e.sets || e.reps || e.weight ? ` — ${esc(e.sets || '?')} sets × ${esc(e.reps || '?')} reps${e.weight ? ` @ ${esc(e.weight)}` : ''}` : ''}`).join('<br>');
}
function renderHistory(){
  renderActivityStats();
  $('workoutHistory').innerHTML = workouts.length ? workouts.map(w => `<div class="card"><h3>${esc(w.date)} — ${esc(w.routine)}</h3><p>${formatWorkoutEntries(w)}</p>${w.notes ? `<p>${esc(w.notes)}</p>` : ''}</div>`).join('') : '<div class="empty">No workouts logged yet.</div>';
  $('hikeHistory').innerHTML = hikes.length ? hikes.map(h => `<div class="card hike-card"><h3>${esc(h.date)} — ${esc(h.trail || 'Hike')}</h3>${h.location ? `<div class="meta">${esc(h.location)}</div>` : ''}<div class="meta">${esc(h.distance)} • ${esc(h.time)} • ${esc(h.steps)} steps • ${esc(h.difficulty)}</div>${h.photo ? `<img class="trail-photo" src="${h.photo}" alt="Trail marker photo for ${esc(h.trail || 'hike')}" />` : ''}<p>${esc(h.notes)}</p></div>`).join('') : '<div class="empty">No hikes logged yet.</div>';
}
function clearAll(){ if(confirm('Clear all routines, workouts, and hikes?')){ routines=[]; workouts=[]; hikes=[]; selected=[]; activePresetGroups=[]; save(); renderAll(); } }
function renderAll(){ renderHikeOptionLists(); renderLibrary(); renderRoutineExercises(); renderSelected(); renderSavedRoutines(); renderWorkoutRoutineOptions(); renderHistory(); }

document.addEventListener('DOMContentLoaded', init);

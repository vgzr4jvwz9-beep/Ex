const exercises = [
  { name: "Dumbbell Row", muscles: ["Back", "Arms"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Brace one hand and pull elbow toward your hip." },
  { name: "Reverse Fly", muscles: ["Back", "Shoulders"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Use light weight and squeeze shoulder blades together." },
  { name: "Dumbbell Pullover", muscles: ["Back", "Chest"], equipment: "Dumbbells", difficulty: "Intermediate", cue: "Keep ribs down and move slowly through the shoulder." },
  { name: "Lat Pulldown", muscles: ["Back"], equipment: "Machine", difficulty: "Beginner", cue: "Pull bar toward upper chest, not behind the neck." },
  { name: "Seated Cable Row", muscles: ["Back", "Arms"], equipment: "Cable", difficulty: "Beginner", cue: "Tall chest, pull handles toward low ribs." },
  { name: "Assisted Pull-Up", muscles: ["Back", "Arms"], equipment: "Machine", difficulty: "Intermediate", cue: "Control the lowering and keep shoulders down." },
  { name: "Dead Bug", muscles: ["Core"], equipment: "Bodyweight", difficulty: "Beginner", cue: "Keep low back gently pressed down." },
  { name: "Plank", muscles: ["Core"], equipment: "Bodyweight", difficulty: "Beginner", cue: "Ribs down, glutes lightly squeezed, breathe." },
  { name: "Side Plank", muscles: ["Core"], equipment: "Bodyweight", difficulty: "Intermediate", cue: "Stack shoulders and hips; shorten hold if form slips." },
  { name: "Bird Dog", muscles: ["Core", "Back"], equipment: "Bodyweight", difficulty: "Beginner", cue: "Move slowly without twisting your hips." },
  { name: "Pallof Press", muscles: ["Core"], equipment: "Cable/Band", difficulty: "Beginner", cue: "Press straight out and resist rotation." },
  { name: "Cable Crunch", muscles: ["Core"], equipment: "Cable", difficulty: "Intermediate", cue: "Curl ribs toward hips, not just neck." },
  { name: "Dumbbell Bench Press", muscles: ["Chest", "Arms", "Shoulders"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Control the bottom and press up evenly." },
  { name: "Incline Dumbbell Press", muscles: ["Chest", "Shoulders", "Arms"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Set bench on a mild incline." },
  { name: "Chest Press Machine", muscles: ["Chest", "Arms"], equipment: "Machine", difficulty: "Beginner", cue: "Seat height so handles line up around mid-chest." },
  { name: "Shoulder Press", muscles: ["Shoulders", "Arms"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Press overhead without arching your back." },
  { name: "Lateral Raise", muscles: ["Shoulders"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Soft elbows, raise to about shoulder height." },
  { name: "Face Pull", muscles: ["Back", "Shoulders"], equipment: "Cable/Band", difficulty: "Beginner", cue: "Pull toward face with elbows high." },
  { name: "Biceps Curl", muscles: ["Arms"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Keep elbows close and avoid swinging." },
  { name: "Hammer Curl", muscles: ["Arms"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Neutral grip, slow lowering." },
  { name: "Triceps Pressdown", muscles: ["Arms"], equipment: "Cable", difficulty: "Beginner", cue: "Pin elbows by sides and extend fully." },
  { name: "Goblet Squat", muscles: ["Legs", "Glutes"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Hold weight at chest and sit between your knees." },
  { name: "Romanian Deadlift", muscles: ["Legs", "Glutes", "Back"], equipment: "Dumbbells", difficulty: "Intermediate", cue: "Hinge at hips and keep weights close to legs." },
  { name: "Step-Up", muscles: ["Legs", "Glutes", "Hiking Prep"], equipment: "Bodyweight/Dumbbells", difficulty: "Beginner", cue: "Drive through the full foot on the step." },
  { name: "Calf Raise", muscles: ["Legs", "Hiking Prep"], equipment: "Bodyweight/Dumbbells", difficulty: "Beginner", cue: "Pause at top and lower slowly." },
  { name: "Farmer Carry", muscles: ["Core", "Back", "Hiking Prep"], equipment: "Dumbbells", difficulty: "Beginner", cue: "Walk tall while holding heavy dumbbells." }
];
const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().slice(0, 10);
let selected = [];
const defaultStore = { routines: [], workouts: [], hikes: [] };
const loadStore = () => JSON.parse(localStorage.getItem("workoutHikeStoreV2") || JSON.stringify(defaultStore));
const saveStore = () => localStorage.setItem("workoutHikeStoreV2", JSON.stringify(store));
let store = loadStore();

function setTab(tabId) {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === tabId));
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAll();
}
function setupNavigation() {
  document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => setTab(btn.dataset.tab)));
  document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => setTab(btn.dataset.go)));
}
function uniqueValues(type) {
  if (type === "muscles") return [...new Set(exercises.flatMap(e => e.muscles))].sort();
  return [...new Set(exercises.map(e => e.equipment))].sort();
}
function fillFilters() {
  ["muscleFilter", "builderMuscleFilter"].forEach(id => uniqueValues("muscles").forEach(m => $(id).insertAdjacentHTML("beforeend", `<option value="${m}">${m}</option>`)));
  uniqueValues("equipment").forEach(eq => $("equipmentFilter").insertAdjacentHTML("beforeend", `<option value="${eq}">${eq}</option>`));
}
function matchesExercise(ex, query, muscle, equipment = "All") {
  const q = query.trim().toLowerCase();
  return (!q || [ex.name, ex.equipment, ex.difficulty, ex.cue, ...ex.muscles].join(" ").toLowerCase().includes(q)) &&
    (muscle === "All" || ex.muscles.includes(muscle)) && (equipment === "All" || ex.equipment === equipment);
}
function renderExerciseLibrary() {
  const list = $("exerciseList"); list.innerHTML = "";
  const filtered = exercises.filter(ex => matchesExercise(ex, $("exerciseSearch").value, $("muscleFilter").value, $("equipmentFilter").value));
  filtered.forEach(ex => {
    const node = document.importNode($("exerciseCardTemplate").content, true);
    node.querySelector("h3").textContent = ex.name;
    node.querySelector(".meta").textContent = `${ex.muscles.join(", ")} • ${ex.equipment} • ${ex.difficulty}`;
    node.querySelector(".cue").textContent = ex.cue;
    node.querySelector(".add-btn").addEventListener("click", () => { addSelected(ex.name); setTab("builder"); });
    list.appendChild(node);
  });
  if (!filtered.length) list.innerHTML = `<p class="empty">No exercises found.</p>`;
}
function renderBuilderList() {
  const list = $("builderExerciseList"); list.innerHTML = "";
  exercises.filter(ex => matchesExercise(ex, $("builderSearch").value, $("builderMuscleFilter").value)).forEach(ex => {
    const item = document.createElement("div"); item.className = "mini-item";
    item.innerHTML = `<div><strong>${ex.name}</strong><div class="small">${ex.muscles.join(", ")} • ${ex.equipment}</div></div>`;
    const btn = document.createElement("button"); btn.className = "secondary"; btn.textContent = "Add"; btn.addEventListener("click", () => addSelected(ex.name));
    item.appendChild(btn); list.appendChild(item);
  });
}
function addSelected(name) { if (!selected.find(e => e.name === name)) selected.push({ name, sets: 3, reps: 10, weight: "" }); renderSelected(); }
function renderSelected() {
  const box = $("selectedExercises"); box.classList.remove("empty"); box.innerHTML = "";
  if (!selected.length) { box.classList.add("empty"); box.textContent = "No exercises selected."; return; }
  selected.forEach((ex, idx) => {
    const div = document.createElement("div"); div.className = "selected-item";
    div.innerHTML = `<header><h4>${ex.name}</h4><button class="danger">Remove</button></header><div class="set-row"><label>Sets <input type="number" min="1" value="${ex.sets}"></label><label>Reps <input type="number" min="1" value="${ex.reps}"></label><label>Weight <input type="text" value="${ex.weight}" placeholder="optional"></label></div>`;
    const inputs = div.querySelectorAll("input");
    inputs[0].addEventListener("input", e => selected[idx].sets = Number(e.target.value));
    inputs[1].addEventListener("input", e => selected[idx].reps = Number(e.target.value));
    inputs[2].addEventListener("input", e => selected[idx].weight = e.target.value);
    div.querySelector("button").addEventListener("click", () => { selected.splice(idx, 1); renderSelected(); });
    box.appendChild(div);
  });
}
function saveRoutine() {
  const name = $("routineName").value.trim();
  if (!name || !selected.length) return alert("Add a routine name and at least one exercise.");
  store.routines.push({ id: crypto.randomUUID(), name, focus: $("routineFocus").value, exercises: structuredClone(selected), created: today() });
  selected = []; $("routineName").value = ""; saveStore(); renderAll(); alert("Routine saved.");
}
function renderWorkoutForm() {
  const select = $("workoutRoutine"); const current = select.value; select.innerHTML = "";
  if (!store.routines.length) { select.innerHTML = `<option value="">No routines yet</option>`; $("workoutExerciseInputs").innerHTML = `<p class="empty">Create a routine first.</p>`; return; }
  store.routines.forEach(r => select.insertAdjacentHTML("beforeend", `<option value="${r.id}">${r.name}</option>`));
  if (current && store.routines.some(r => r.id === current)) select.value = current;
  renderWorkoutInputs();
}
function renderWorkoutInputs() {
  const routine = store.routines.find(r => r.id === $("workoutRoutine").value) || store.routines[0];
  const box = $("workoutExerciseInputs"); box.innerHTML = ""; if (!routine) return;
  routine.exercises.forEach(ex => {
    const div = document.createElement("div"); div.className = "workout-exercise"; div.dataset.name = ex.name;
    div.innerHTML = `<strong>${ex.name}</strong><div class="set-row"><label>Sets done <input class="sets" type="number" min="0" value="${ex.sets}"></label><label>Reps <input class="reps" type="text" value="${ex.reps}"></label><label>Weight <input class="weight" type="text" value="${ex.weight || ""}" placeholder="optional"></label></div>`;
    box.appendChild(div);
  });
}
function saveWorkout() {
  const routine = store.routines.find(r => r.id === $("workoutRoutine").value) || store.routines[0];
  if (!routine) return alert("Create a routine before logging a workout.");
  const entries = [...document.querySelectorAll(".workout-exercise")].map(row => ({ name: row.dataset.name, sets: row.querySelector(".sets").value, reps: row.querySelector(".reps").value, weight: row.querySelector(".weight").value }));
  store.workouts.push({ id: crypto.randomUUID(), date: $("workoutDate").value || today(), routineName: routine.name, entries, notes: $("workoutNotes").value.trim() });
  $("workoutNotes").value = ""; saveStore(); renderAll(); alert("Workout saved.");
}
function saveHike() {
  store.hikes.push({ id: crypto.randomUUID(), date: $("hikeDate").value || today(), trail: $("hikeTrail").value.trim() || "Untitled hike", distance: Number($("hikeDistance").value || 0), minutes: Number($("hikeMinutes").value || 0), steps: Number($("hikeSteps").value || 0), difficulty: $("hikeDifficulty").value, notes: $("hikeNotes").value.trim() });
  ["hikeTrail", "hikeDistance", "hikeMinutes", "hikeSteps", "hikeNotes"].forEach(id => $(id).value = ""); saveStore(); renderAll(); alert("Hike saved.");
}
function deleteBy(type, id) { if (!confirm("Delete this item?")) return; store[type] = store[type].filter(item => item.id !== id); saveStore(); renderAll(); }
window.deleteBy = deleteBy;
function renderHistory() {
  $("routineHistory").innerHTML = store.routines.length ? "" : `<p class="empty">No routines yet.</p>`;
  store.routines.slice().reverse().forEach(r => $("routineHistory").insertAdjacentHTML("beforeend", `<div class="history-item"><header><h4>${r.name}</h4><button class="danger" onclick="deleteBy('routines','${r.id}')">Delete</button></header><p class="small">${r.focus} • ${r.created}</p><p>${r.exercises.map(e => `${e.name} (${e.sets}x${e.reps}${e.weight ? ` @ ${e.weight}` : ""})`).join("<br>")}</p></div>`));
  $("workoutHistory").innerHTML = store.workouts.length ? "" : `<p class="empty">No workouts yet.</p>`;
  store.workouts.slice().reverse().forEach(w => $("workoutHistory").insertAdjacentHTML("beforeend", `<div class="history-item"><header><h4>${w.routineName}</h4><button class="danger" onclick="deleteBy('workouts','${w.id}')">Delete</button></header><p class="small">${w.date}</p><p>${w.entries.map(e => `${e.name}: ${e.sets}x${e.reps}${e.weight ? ` @ ${e.weight}` : ""}`).join("<br>")}</p>${w.notes ? `<p><strong>Notes:</strong> ${w.notes}</p>` : ""}</div>`));
  $("hikeHistory").innerHTML = store.hikes.length ? "" : `<p class="empty">No hikes yet.</p>`;
  store.hikes.slice().reverse().forEach(h => $("hikeHistory").insertAdjacentHTML("beforeend", `<div class="history-item"><header><h4>${h.trail}</h4><button class="danger" onclick="deleteBy('hikes','${h.id}')">Delete</button></header><p class="small">${h.date} • ${h.difficulty}</p><p>${h.distance || 0} miles • ${h.minutes || 0} min • ${h.steps || 0} steps</p>${h.notes ? `<p><strong>Notes:</strong> ${h.notes}</p>` : ""}</div>`));
}
function renderDashboard() {
  $("routineCount").textContent = store.routines.length; $("workoutCount").textContent = store.workouts.length; $("hikeCount").textContent = store.hikes.length; $("hikeMiles").textContent = store.hikes.reduce((sum, h) => sum + Number(h.distance || 0), 0).toFixed(1);
  const activity = [...store.workouts.map(w => ({ date: w.date, text: `Workout: ${w.routineName}` })), ...store.hikes.map(h => ({ date: h.date, text: `Hike: ${h.trail} (${h.distance || 0} mi)` }))].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  $("latestActivity").innerHTML = activity.length ? activity.map(a => `<div class="history-item"><strong>${a.date}</strong><br>${a.text}</div>`).join("") : "No activity yet.";
}
function renderAll() { renderExerciseLibrary(); renderBuilderList(); renderSelected(); renderWorkoutForm(); renderHistory(); renderDashboard(); }
function exportData() {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `workout-hike-backup-${today()}.json`; a.click(); URL.revokeObjectURL(url);
}
function setupEvents() {
  ["exerciseSearch", "muscleFilter", "equipmentFilter", "builderSearch", "builderMuscleFilter"].forEach(id => $(id).addEventListener("input", renderAll));
  $("saveRoutine").addEventListener("click", saveRoutine); $("workoutRoutine").addEventListener("change", renderWorkoutInputs); $("saveWorkout").addEventListener("click", saveWorkout); $("saveHike").addEventListener("click", saveHike); $("exportData").addEventListener("click", exportData);
  document.querySelectorAll(".segment").forEach(btn => btn.addEventListener("click", () => { document.querySelectorAll(".segment").forEach(b => b.classList.remove("active")); document.querySelectorAll(".history-pane").forEach(p => p.classList.remove("active")); btn.classList.add("active"); $(btn.dataset.history).classList.add("active"); }));
  $("workoutDate").value = today(); $("hikeDate").value = today();
}
setupNavigation(); fillFilters(); setupEvents(); renderAll();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js").catch(() => {});

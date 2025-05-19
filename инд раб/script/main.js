import { renderTasks, setTasks, getFilteredTasks } from './ui.js';
import { loadTasks, saveTasks } from './storage.js';

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = loadTasks();
let currentFilter = 'all';

function updateAndRender() {
  saveTasks(tasks);
  renderTasks(getFilteredTasks(tasks, currentFilter, searchInput.value), tasks, updateAndRender);
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return alert('Введите текст задачи');
  tasks.push({ text, completed: false });
  taskInput.value = '';
  updateAndRender();
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

searchInput.addEventListener('input', updateAndRender);

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    updateAndRender();
  });
});

updateAndRender();

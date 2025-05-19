export function renderTasks(filteredTasks, allTasks, updateFn) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.addEventListener('click', () => {
      task.completed = !task.completed;
      updateFn();
    });

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => {
      const newText = prompt('Редактировать задачу:', task.text);
      if (newText !== null) {
        task.text = newText.trim();
        updateFn();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => {
      const indexInAll = allTasks.indexOf(task);
      allTasks.splice(indexInAll, 1);
      updateFn();
    };

    actions.append(editBtn, deleteBtn);
    li.append(span, actions);
    taskList.appendChild(li);
  });
}

export function getFilteredTasks(tasks, filter, search) {
  return tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).filter(task => task.text.toLowerCase().includes(search.toLowerCase()));
}

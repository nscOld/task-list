window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
  
	const saveTask = (taskEl) => {
	  const key = `task_${Date.now()}`;
	  const taskInputEl = taskEl.querySelector('.text');
	  const task = taskInputEl.value;
	  localStorage.setItem(key, task);
	  taskInputEl.dataset.key = key;
	}
  
	const loadTasks = () => {
	  for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.startsWith('task_')) {
		  const task = localStorage.getItem(key);
		  const taskEl = createTaskElement(task);
		  taskEl.querySelector('.text').dataset.key = key;
		  list_el.appendChild(taskEl);
		}
	  }
	}
  
	const createTaskElement = (task) => {
	  const taskEl = document.createElement('div');
	  taskEl.classList.add('task');
  
	  const taskContentEl = document.createElement('div');
	  taskContentEl.classList.add('content');
  
	  taskEl.appendChild(taskContentEl);
  
	  const taskInputEl = document.createElement('input');
	  taskInputEl.classList.add('text');
	  taskInputEl.type = 'text';
	  taskInputEl.value = task;
	  taskInputEl.setAttribute('readonly', 'readonly');
  
	  taskContentEl.appendChild(taskInputEl);
  
	  const taskActionsEl = document.createElement('div');
	  taskActionsEl.classList.add('actions');
  
	  const taskEditEl = document.createElement('button');
	  taskEditEl.classList.add('edit');
	  taskEditEl.innerText = 'Edit';
  
	  const taskDeleteEl = document.createElement('button');
	  taskDeleteEl.classList.add('delete');
	  taskDeleteEl.innerText = 'Delete';
  
	  taskActionsEl.appendChild(taskEditEl);
	  taskActionsEl.appendChild(taskDeleteEl);
  
	  taskEl.appendChild(taskActionsEl);
  
	  taskEditEl.addEventListener('click', (e) => {
		if (taskEditEl.innerText.toLowerCase() == "edit") {
		  taskEditEl.innerText = "Save";
		  taskInputEl.removeAttribute("readonly");
		  taskInputEl.focus();
		} else {
		  taskEditEl.innerText = "Edit";
		  taskInputEl.setAttribute("readonly", "readonly");
		  localStorage.setItem(taskInputEl.dataset.key, taskInputEl.value);
		}
	  });
	  taskDeleteEl.addEventListener('click', (e) => {
		list_el.removeChild(taskEl);
		localStorage.removeItem(taskInputEl.dataset.key);
	  });
  
	  return taskEl;
	}
	form.addEventListener('submit', (e) => {
	  e.preventDefault();
  
	  const task = input.value;
  
	  const taskEl = createTaskElement(task);
	  list_el.appendChild(taskEl);
  
	  input.value = '';
  
	  saveTask(taskEl);
	});
  
	loadTasks();
  });
  

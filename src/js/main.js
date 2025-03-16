import $ from 'jquery';

const toggle = $('#flexSwitchCheckDefault');
toggle.on('change', function () {
   if (toggle.prop('checked')) {
      $('html').attr('data-bs-theme', 'dark');
   } else {
      $('html').attr('data-bs-theme', 'light');
   }
});

const textField = $('#text-field');
const btnAdd = $('#btn-add');
const taskContainer = $('#task-list');
btnAdd.on('click', function () {
   const taskText = textField.val().trim();
   if (taskText !== '') {
      const uniqueId = 'flexCheckDefault-' + Date.now();

      const taskHTML = `
         <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${uniqueId}"/>
            <label class="form-check-label" for="${uniqueId}">${taskText}</label>
            <i class="bi bi-pencil-fill edit-task"></i>
            <i class="bi bi-trash delete-task"></i>
         </div>
      `;
      taskContainer.append(taskHTML);
      textField.val('');
      btnAdd.val('Add');
   } else{
      alert('Input field can not be empty');
   }
});

const checkedList = $('#checked-list');
taskContainer.on('change','.form-check-input', function () {
   if ($(this).prop('checked')) {
      const taskText = $(this).siblings('label').text();
      const uniqueId = 'checked-' + Date.now();

      const taskHTML = `
         <div class="form-check d-flex align-items-center gap-2">
            <input class="form-check-input" type="checkbox" value="" id="${uniqueId}" checked/>
            <label class="form-check-label" for="${uniqueId}">${taskText}</label>
            <i class="bi bi-trash delete-task"></i>
         </div>
      `;

      checkedList.append(taskHTML);
      $(this).closest('.form-check').remove();
   }

   if (taskContainer.children().length === 0) taskContainer.append('<p id="no-tasks-message" class="text-center">All Tasks Done</p>');
   if (checkedList.children().length !== 0) checkedList.children('p').remove();
});

checkedList.on('change','.form-check-input', function () {
   if (!$(this).prop('checked')) {
      const taskText = $(this).siblings('label').text();
      const uniqueId = $(this).siblings('flexCheckDefault-').text();

      const  taskHTML = `
      <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${uniqueId}"/>
            <label class="form-check-label" for="${uniqueId}">${taskText}</label>
            <i class="bi bi-pencil-fill edit-task"></i>
            <i class="bi bi-trash delete-task"></i>
         </div>
      `;
      taskContainer.append(taskHTML);
      $(this).closest('.form-check').remove();
   }
   if (taskContainer.children().length !== 0) taskContainer.children('p').remove();
   if (checkedList.children().length === 0) checkedList.append('<p id="no-tasks-message" class="text-center">Checked List Empty</p>');
});

$('body').on('click', '.bi-trash', function () {
   $(this).closest('.form-check').remove();

   if (checkedList.children().length === 0) checkedList.append('<p id="no-tasks-message" class="text-center">Checked List Empty</p>');
   if (taskContainer.children().length === 0) taskContainer.append('<p id="no-tasks-message" class="text-center">All Tasks Done</p>');
});

taskContainer.on('click','.bi-pencil-fill', function () {
   if (textField.val().trim().length === 0) {
      const text = $(this).siblings('label').text();
      textField.val(text);
      btnAdd.attr('value', 'Save');
      $(this).closest('.form-check').remove();
   } else{
      alert("Text field isn't empty. Clear it before editing a task.")
   }
});



// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
const ENTER_KEY = 13;
// var ESCAPE_KEY = 27;
const active = '0';
const in_progress = '1';
const completed = '2';


$( document ).ready(function() {
    TodoApp.bindEvents();
    TodoApp.getAllTasks();
});


var TodoApp = {
	bindEvents: function (e){
		$('#new-todo').on('keyup', this.createTask.bind(this));
	},
	createTask: function (e) {
		var $input = $(e.target);
		var taskDescription = $input.val().trim();

		if (e.which !== ENTER_KEY || !taskDescription) {
			return;
		}

		if(taskDescription != '')
		{
			var data ={
				description: taskDescription,
				status: active
			}
			$.ajax({
				url: './tasks',
				type: 'POST',
				dataType: 'json',
				data:  JSON.stringify(data),
				contentType: 'application/json; charset=utf-8',
				success: function (response) {
					TodoApp.getAllTasks();
				},
				error: function (e) {
		            console.log(e);
		        }
		    });
		}
	},
	updateTaskDescription: function (task_id) {
		var taskDescription = $('#description'+task_id).val().trim();

		if (window.event.keyCode !== ENTER_KEY || !taskDescription) {
			return;
		}

		if(taskDescription != '')
		{
			var data ={
				description: taskDescription
			}
			$.ajax({
				url: './tasks/'+task_id,
				type: 'PUT',
				dataType: 'json',
				data:  JSON.stringify(data),
				contentType: 'application/json; charset=utf-8',
				success: function (response) {
					TodoApp.getAllTasks();
				},
				error: function (e) {
		            console.log(e);
		        }
		    });
		}
	},
	drawTask: function(task){
		var template =
		`<div class='row'>
		  <div class='col-lg-6'>
		    <div class='input-group'>
		      <span class='input-group-addon'>
		        <input id='checkbox` + task.id + `' type='checkbox' aria-label='Checkbox for following text input'/>
		      </span>
		      <input id='description` + task.id + `' onkeyup="TodoApp.updateTaskDescription(` + task.id + `);" type='text' class='form-control' aria-label='Text input with checkbox' value='`+task.description+`'/>
		    </div>
		  </div>
		</div>`;
		return template
	},
	getAllTasks: function(){
		$.ajax({
			url: './tasks',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function (response) {
				$('#todos').html('');
				var todosTemplate = '';
				$.each(response.data, function(key,value){
					todosTemplate = todosTemplate + TodoApp.drawTask(value);
				});
				$('#todos').html(todosTemplate);
				$('#new-todo').val('');
				$('#new-todo').focus();
			},
			error: function (e) {
	            console.log(e);
	        }
	    });
	}
};
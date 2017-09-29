// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
const ENTER_KEY = 13;
// var ESCAPE_KEY = 27;
const ALL = 'All';
const ACTIVE = '0';
const IN_PROGRESS = '1';
const COMPLETED = '2';


$( document ).ready(function() {
    TodoApp.bindEvents();
    TodoApp.getAllTasks();
});

var taskTag = ALL;

var TodoApp = {
	bindEvents: function (e){
		$('#new-todo').on('keyup', this.createTask.bind(this));
	},
	updatTaskFilter: function(filter){
		taskTag = filter;
		$('.'+ACTIVE).removeClass('d-none');
		$('.'+IN_PROGRESS).removeClass('d-none');
		$('.'+COMPLETED).removeClass('d-none');
		if( taskTag != ALL ){
		  $('.'+ACTIVE).addClass('d-none');
		  $('.'+IN_PROGRESS).addClass('d-none');
		  $('.'+COMPLETED).addClass('d-none');
		  $('.'+taskTag).removeClass('d-none');
	    }
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
				status: ACTIVE
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
	deleteTask: function(task_id){
		$.ajax({
			url: './tasks/'+task_id,
			type: 'DELETE',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function (response) {
				TodoApp.getAllTasks();
			},
			error: function (e) {
	            console.log(e);
	        }
	    });
	},
	updateTaskStatus: function(task_id,status){
		var data ={
				status: status
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
	},
	drawTask: function(task){
		var statusDescription = '';
		var badgeClass = '';
		var rowClass = String(task.status);
		if( taskTag != ALL && taskTag != String(task.status) ){
			rowClass = 'd-none';
		}
		switch(String(task.status)) {
		    case ACTIVE:
		        statusDescription = 'Active';
		        badgeClass = 'success'
		        break;
		    case IN_PROGRESS:
		        statusDescription = 'In Progress';
		        badgeClass = 'warning'
		        break;
		    case  COMPLETED:
		      statusDescription = 'Completed  ';
		      badgeClass = 'danger'
		    default:
		        break;
		}
		var template =
		`<div class='row `+ rowClass + `'>
		  <div class='col-lg-12'>
		    <div class='input-group'>
		        <div class="btn-group">
		          <button type="button" class="btn btn-` + badgeClass + ` dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		            ` + statusDescription + `
		          </button>
		          <div class="dropdown-menu">
		            <button class="dropdown-item" onclick="TodoApp.updateTaskStatus(`+ task.id + ',' + ACTIVE +`);"> Active</button>
		            <button class="dropdown-item" onclick="TodoApp.updateTaskStatus(`+ task.id + ',' + IN_PROGRESS +`);">In Progress</button>
		            <button class="dropdown-item" onclick="TodoApp.updateTaskStatus(`+ task.id + ',' + COMPLETED +`);">Completed</button>
		          </div>
		        </div>
		      <input id='description` + task.id + `' onkeyup="TodoApp.updateTaskDescription(` + task.id + `);" type='text' class='form-control' aria-label='Text input with checkbox' value='`+task.description+`'/>
		      
		        <button type="button" class="btn btn-outline-danger" onclick="TodoApp.deleteTask(` + task.id + `)">X</button>
		      
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
				var countAll = 0;
				var countActive = 0;
				var countInProgress = 0;
				var countCompleted = 0;
				$.each(response.data, function(key,value){
					todosTemplate = todosTemplate + TodoApp.drawTask(value);
					countAll = countAll +1;
					if( value.status == ACTIVE ){
						countActive = countActive + 1;
					}
					else if( value.status == IN_PROGRESS ){
						countInProgress = countInProgress + 1;
					}
					else if( value.status == COMPLETED ){
						countCompleted = countCompleted + 1;
					}
				});
				$('#todos').html(todosTemplate);
				$('#remainingTasks').text(countActive + countInProgress);
				$('#allTasks').text(countAll);
				$('#activeTasks').text(countActive);
				$('#inprogressTasks').text(countInProgress);
				$('#completedTasks').text(countCompleted);
				$('#new-todo').val('');
				$('#new-todo').focus();
			},
			error: function (e) {
	            console.log(e);
	        }
	    });
	}
};
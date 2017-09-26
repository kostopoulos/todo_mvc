// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var ENTER_KEY = 13;
// var ESCAPE_KEY = 27;


$( document ).ready(function() {
    TodoApp.bindEvents();
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

		console.log(taskDescription);
	}
};
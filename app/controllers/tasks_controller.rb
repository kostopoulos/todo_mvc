class TasksController < ApplicationController
	def index
		tasks = Task.all
		render json: { data: tasks }, status: :ok
	end

	def show
		task = Task.find(params[:id]) rescue nil
		if task.blank?
			render json: { error: 'invalid task' }
		end


	end
end

class TasksController < ApplicationController
	def index
		tasks = Task.all
		render json: { data: tasks }, status: :ok
	end

	def show
		task = Task.find(params[:id]) rescue nil
		if task.blank?
			render json: { error: 'invalid task' }
		else
			render json: { data: task }, status: :ok
		end
	end

	def create
		begin
			validate_params
			task = Task.new
			task.description = params[:description]
			task.status = params[:status].to_i
			task.save!
			render json: { data: task }, status: :created
		rescue Exception => e
			render json: { error: e.message }, status: :ok
		end
	end

	def update
		begin
			validate_params
			task = Task.find params[:id]
			unless params[:description].blank?
				task.description = params[:description]
			end
			unless params[:status].blank?
				task.status = params[:status].to_i
			end
			task.save!
			render json: { data: task }, status: :ok
		rescue Exception => e
			render json: { error: e.message }, status: :ok
		end
	end

private

	def validate_params
		params.permit(:description, :status)
	end
end

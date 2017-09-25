class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :description
      t.integer :status, :default => 0 , :null => false
      t.timestamps
    end
  end
end

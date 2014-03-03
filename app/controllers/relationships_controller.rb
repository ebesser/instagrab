class RelationshipsController < ApplicationController

  def index
    @relationships = Relationship.all
    render json: @relationships  
  end

  def create
    puts relationship_params
    Relationship.create(relationship_params)
    render json: Relationship.all
  end


  private

    def relationship_params
      params.require(:relationship).permit(:follower_id, :followed_id)
    end

end
class RelationshipsController < ApplicationController

  def index
    @relationships = Relationship.all
    render json: @relationships  
  end

  def create
    # puts relationship_params
    Relationship.create(relationship_params)
    render json: Relationship.all
  end

  def delete_relationship
    puts relationship_params
    relationship = Relationship.where( 
      follower_id: relationship_params["follower_id"].to_i, 
      followed_id: relationship_params["followed_id"].to_i
    )
    relationship.delete_all
    render :json => relationship.to_json
  end


  private

    def relationship_params
      params.require(:relationship).permit(:follower_id, :followed_id)
    end

end
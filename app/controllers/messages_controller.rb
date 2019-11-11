class MessagesController < ApplicationController
  
def index
end

def new
  @messages = Messages.new
end

def create
  @messages = Messages.new(params[:messages])
  @messages.save
end

end
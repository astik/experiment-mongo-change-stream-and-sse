package io.github.astik.front;

public class NewMessageDto {
	private String newMessage;

	@Override
	public String toString() {
		return "MessageDto [newMessage=" + newMessage + "]";
	}

	public String getNewMessage() {
		return newMessage;
	}

	public void setNewMessage(String newMessage) {
		this.newMessage = newMessage;
	}
}

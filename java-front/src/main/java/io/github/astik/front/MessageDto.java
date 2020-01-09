package io.github.astik.front;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("myData")
public class MessageDto {
	@Id
	private String _id;
	private Date date;
	private String message;
	private String user;

	@Override
	public String toString() {
		return "MessageDto [_id=" + _id + ", date=" + date + ", message=" + message + ", user=" + user + "]";
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
}

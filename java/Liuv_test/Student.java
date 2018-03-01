package com.sinossc.stocktrade.bossweb.controller;

import java.io.Serializable;

/**
 * 学生类(数据库中t_student的映射类，属性与数据库对应)
 * @author Administrator
 *
 */
public class Student implements Serializable{

	private Long sid;  //主键标识，唯一不重复
	private String name; //名字
	private Integer age; //年龄
	/**
	 * @return the sid
	 */
	public Long getSid() {
		return sid;
	}
	/**
	 * @param sid the sid to set
	 */
	public void setSid(Long sid) {
		this.sid = sid;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the age
	 */
	public Integer getAge() {
		return age;
	}
	/**
	 * @param age the age to set
	 */
	public void setAge(Integer age) {
		this.age = age;
	}
	
	
}

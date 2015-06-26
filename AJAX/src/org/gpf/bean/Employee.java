package org.gpf.bean;
/**
 *
* @ClassName: Employee 
* @Description: 雇员实体类
* @author gaopengfei
* @date 2015-6-25 下午5:19:39 
*
 */
public class Employee {
	
	private int id;
	private String name;
	private String sex;
	private String job;
	
	public Employee() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", sex=" + sex
				+ ", job=" + job + "]";
	}
}

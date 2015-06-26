package org.gpf.dao;

import org.gpf.bean.Employee;

public interface IEmployeeDAO {

	public Employee queryEmployeeById(int id);
	
	public boolean insertEmployee(Employee employee);
}

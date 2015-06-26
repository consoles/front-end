package org.gpf.dao;

import java.io.IOException;

import org.apache.ibatis.session.SqlSession;
import org.gpf.bean.Employee;
import org.gpf.db.DBAccess;
/**
 * 
* @ClassName: EmployeeDAO 
* @Description: 和Employee表相关的操作 
* @author gaopengfei
* @date 2015-6-25 下午6:12:11 
*
 */
public class EmployeeDAO implements IEmployeeDAO{

	@Override
	public Employee queryEmployeeById(int id) {
		
		DBAccess access = new DBAccess();
		Employee employee = null;
		SqlSession session;
		try {
			session = access.getSqlSession();
			IEmployeeDAO dao = session.getMapper(IEmployeeDAO.class);
			employee = dao.queryEmployeeById(id);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return employee;
	}

	@Override
	public boolean insertEmployee(Employee employee) {
		
		boolean flag = false;
		DBAccess access = new DBAccess();
		SqlSession session;
		try {
			session = access.getSqlSession();
			IEmployeeDAO dao = session.getMapper(IEmployeeDAO.class);
			dao.insertEmployee(employee);
			session.commit();
			flag = true;
		} catch (IOException e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}


}

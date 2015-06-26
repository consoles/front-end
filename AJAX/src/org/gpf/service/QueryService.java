package org.gpf.service;

import org.gpf.bean.Employee;
import org.gpf.dao.EmployeeDAO;

/**
 * 
* @ClassName: QueryService 
* @Description: 查询员工的的业务功能 
* @author gaopengfei
* @date 2015-6-25 下午6:08:01 
*
 */
public class QueryService {

	public Employee queryEmployeeById(String id){
		
		int temp = 0;
		try{
			temp = Integer.valueOf(id);
		}catch (Exception e) {
			return null;
		}
		return new EmployeeDAO().queryEmployeeById(temp);
	}
}

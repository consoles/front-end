package org.gpf.service;

import org.gpf.bean.Employee;
import org.gpf.dao.EmployeeDAO;

/**
 * 
* @ClassName: CreateService 
* @Description: 维护员工的业务功能
* @author gaopengfei
* @date 2015-6-25 下午6:08:31 
*
 */
public class MaintainService {

	public boolean insertEmployee(String name,String sex,String job){
		Employee employee = new Employee();
		if (name != null && !"".equals(name.trim()) && sex!=null && !"".equals(sex.trim()) && job!=null && !"".equals(job.trim())){
			employee.setName(name);
			employee.setSex(sex);
			employee.setJob(job);
			return new EmployeeDAO().insertEmployee(employee);
		}else{
			return false;
		}
	}
}

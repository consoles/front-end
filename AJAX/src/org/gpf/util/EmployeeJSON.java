package org.gpf.util;

import org.gpf.bean.Employee;

/**
 * 
* @ClassName: EmployeeJSON 
* @Description: 将Employee实体属性转化为json字符串
* @author gaopengfei
* @date 2015-6-25 下午10:08:32 
*
 */
public class EmployeeJSON {

	/**
	 * 根据雇员实体返回相应的json字符串
	 * @param employee
	 * @return
	 */
	public static String emp2JSON(Employee employee){
		
		StringBuilder sb = new StringBuilder("{\"success\":true,\"msg\":\"找到员工，员工信息如下：员工id：" + employee.getId());
		sb.append("员工姓名：" + employee.getName() + ",员工性别：" + employee.getSex() + ",工作：" + employee.getJob() + "\"" + "}");
		
		return sb.toString();
	}
	
	/**
	 * 根据雇员实体和ajax发送的jsonp生成新的jsonp处理跨域请求
	 * @param jsonp
	 * @param employee
	 * @return
	 */
	public static String emp2JSONP(String jsonp, Employee employee) {
		
		StringBuilder sb = new StringBuilder(jsonp);
		sb.append("(");
		sb.append("{\"success\":true,\"msg\":\"找到员工，员工信息如下：员工id：" + employee.getId());
		sb.append("员工姓名：" + employee.getName() + ",员工性别：" + employee.getSex() + ",工作：" + employee.getJob() + "\"" + "}");
		sb.append(")");
		
		return sb.toString();
	}
}

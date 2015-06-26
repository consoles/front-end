package org.gpf.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.gpf.bean.Employee;
import org.gpf.service.MaintainService;
import org.gpf.service.QueryService;
import org.gpf.util.EmployeeJSON;
import org.gpf.util.IConstant;
/**
 * 
* @ClassName: ServiceServlet 
* @Description: 处理用户请求的Servlet，如果用户是get请求，则进行查询，如果是post请求则进行信息的插入
* @author gaopengfei
* @date 2015-6-25 下午6:02:04 
*
 */
@SuppressWarnings("serial")
public class EmployeeServlet extends HttpServlet {

	public EmployeeServlet() {
		super();
	}

	/**
	 * 用户以get方式提交请求则进行查询
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

//		response.setContentType("text/plain;charset=utf-8");
		response.setContentType("application/json;charset=utf-8");
		// 使用HTML5中的XHR2支持跨域的GET和POST请求
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		PrintWriter out = response.getWriter();
		
//		String jsonp = request.getParameter("callback");
		String id = request.getParameter("id");
		Employee employee = new QueryService().queryEmployeeById(id);
		if( employee == null)
			out.print(IConstant.EMP_NOT_EXIST);
		else
			out.print(EmployeeJSON.emp2JSON(employee));
//			out.print(EmployeeJSON.emp2JSONP(jsonp, employee));
//			out.print(employee);
		
		out.flush();
		out.close();
	}

	/**
	 * 以post方式进行提交则进行数据的插入
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

//		response.setContentType("text/plain;charset=utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		String name = request.getParameter("name");
		String sex = request.getParameter("sex");
		String job = request.getParameter("job");
		
		if(new MaintainService().insertEmployee(name, sex, job))
			out.print(IConstant.SAVE_EMP_SUCCESS);
		else
			out.print(IConstant.SAVE_EMP_ERROR);
		out.flush();
		out.close();
	}

}

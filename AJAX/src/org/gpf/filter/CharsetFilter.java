package org.gpf.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 
* @ClassName: CharsetFilter 
* @Description: 解决乱码
* @author gaopengfei
* @date 2015-6-25 下午4:52:20 
*
 */
public class CharsetFilter implements Filter{

	private String charset;
	
	@Override
	public void destroy() {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		if(charset == null)
			charset = "utf-8";
		request.setCharacterEncoding(charset);
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
		charset = filterConfig.getInitParameter("charset");
	}
	
}

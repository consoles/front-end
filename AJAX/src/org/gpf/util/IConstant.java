package org.gpf.util;
/**
 * 
* @ClassName: Constant 
* @Description: 全局ajax返回的json常量字符串
* @author gaopengfei
* @date 2015-6-25 下午10:00:51 
*
 */
public interface IConstant {

	public static final String EMP_NOT_EXIST = "{\"success\":false,\"msg\":\"雇员信息不存在!\"}";
	public static final String SAVE_EMP_ERROR = "{\"success\":false,\"msg\":\"雇员信息保存失败!\"}";
	public static final String SAVE_EMP_SUCCESS = "{\"success\":true,\"msg\":\"雇员信息保存成功!\"}";
}

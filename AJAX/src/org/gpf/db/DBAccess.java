package org.gpf.db;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * 
 * @ClassName: DBAccess
 * @Description: 数据库访问层
 * @author gaopengfei
 * @date 2015-6-25 下午5:11:52
 * 
 */
public class DBAccess {

	public SqlSession getSqlSession() throws IOException {
		
		// 通过配置文件获取数据库连接信息(路径从src的第一级子目录开始)
		Reader reader = Resources.getResourceAsReader("org/gpf/config/Configuration.xml");
		// 通过配置信息构建一个SqlSessionFactory
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
		// 通过SqlSessionFactory打开一个数据库会话
		SqlSession sqlSession = factory.openSession();

		return sqlSession;
	}
}

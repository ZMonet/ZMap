package cn.test;
import cn.zmonet.dao.UserDao;
import cn.zmonet.dao.impl.UserDaoImpl;
import cn.zmonet.entity.UserEntity;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * Created by kinthon on 17-3-31.
 */
public class Test {
    public static void main(String[] args)
    {
        ApplicationContext ac = new FileSystemXmlApplicationContext("web/WEB-INF/applicationContext.xml");
        UserDao userDao = (UserDaoImpl)ac.getBean("userDao");
        UserEntity user = new UserEntity();
        user.setUserName("kaka");
        user.setPassword("123456123");
        userDao.add(user);
    }
}

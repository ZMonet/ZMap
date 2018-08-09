package cn.zmonet.service.impl;

import cn.zmonet.dao.UserDao;
import cn.zmonet.entity.UserEntity;
import cn.zmonet.service.UserService;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class UserServiceImpl implements UserService {
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public boolean login(String username, String password) {
        boolean result=userDao.verify(username,password);
        return result;
    }

    @Override
    public boolean register(String username, String password) {
        UserEntity user=new UserEntity();
        user.setUserName(username);
        user.setPassword(password);
        boolean result=userDao.verify(username,password);
        if(result==false){
            userDao.add(user);
            return true;
        }
        else
        return false;
    }
}

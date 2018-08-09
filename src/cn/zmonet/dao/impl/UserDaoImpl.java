package cn.zmonet.dao.impl;

import cn.zmonet.entity.UserEntity;
import cn.zmonet.dao.UserDao;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.List;

public class UserDaoImpl extends HibernateDaoSupport implements UserDao {


    @Override
    public void add(UserEntity user) {
     this.getHibernateTemplate().save(user);
    }

    @Override
    public boolean verify(String username, String password) {
        String hql="from UserEntity where userName=?0 and password=?1";
        List<UserEntity> user=(List<UserEntity>) getHibernateTemplate().find(hql,username,password);
        return  user.isEmpty() ? false:true;
    }

}

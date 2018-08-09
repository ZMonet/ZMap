package cn.zmonet.dao;

import cn.zmonet.entity.UserEntity;

public interface UserDao {
    public void add(UserEntity user);

    public boolean verify(String username,String password);

}

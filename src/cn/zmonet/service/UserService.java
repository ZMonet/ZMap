package cn.zmonet.service;

public interface UserService {
    public boolean login(String username,String password);

    public boolean register(String username,String password);

}

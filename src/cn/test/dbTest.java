package cn.test;

import java.sql.*;

public class dbTest {
    public static void main(String[] args) {
        Connection con;
        String driver="com.mysql.cj.jdbc.Driver";
        String url="jdbc:mysql://localhost:3306/zmonet?useSSL=false&serverTimezone=Hongkong&characterEncoding=utf-8&autoReconnect=true";
        String user="root";
        String password="123456";
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(url, user, password);
            if (!con.isClosed()) {
                System.out.println("数据库连接成功");
            }
            Statement statement = con.createStatement();
            String sql = "select * from user;";
            ResultSet resultSet = statement.executeQuery(sql);
            String username;
            while (resultSet.next()) {
                username = resultSet.getString("username");
                System.out.println("姓名：" + username);
            }
            resultSet.close();
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("数据库驱动没有安装");

        } catch (SQLException e) {
            System.out.println("数据库连接失败");
        }
    }
}

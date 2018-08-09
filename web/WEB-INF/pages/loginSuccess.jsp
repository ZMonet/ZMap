<%--
  Created by IntelliJ IDEA.
  User: 23351
  Date: 2018/7/26
  Time: 17:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>login success page</title>
</head>
<body>
<h1>登录成功！</h1>
<h3>当前登录用户为：<s:property value="#session.user.username" /></h3>
</body>
</html>
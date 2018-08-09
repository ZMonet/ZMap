<%--
  Created by IntelliJ IDEA.
  User: 23351
  Date: 2018/7/26
  Time: 16:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>register page</title>
</head>
<body>
<h3>注册</h3>
<s:actionmessage/>
<span style="color:red"><s:actionerror/></span>
<form method="post" action="<%=path%>/registerAction.action">
    <span>用户名：</span><input type="text" name="username" value="${username}"/><br/>
    <span>密码&nbsp：</span><input type="text" name="password" value="${password}"/><br/>
    <input type="submit" style="height:25px;width:237px" value="注册" />
</form>
<a href="<%=path%>/WEB-INF/pages/login.jsp">登录页面</a>
</body>
</html>

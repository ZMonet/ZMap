package cn.zmonet.action;


import cn.zmonet.entity.GraphEntity;
import cn.zmonet.service.GraphService;
import cn.zmonet.service.impl.GraphServiceImpl;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.interceptor.ServletRequestAware;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public class GraphAction extends ActionSupport implements ServletRequestAware,ModelDriven<GraphEntity> {
    private static final long serialVersionUID = 1L;
    private HttpServletRequest request;
    private JSONObject resultObj;
    private GraphService graphService;

    public JSONObject getResultObj() {
        return resultObj;
    }

    public void setResultObj(JSONObject resultObj) {
        this.resultObj = resultObj;
    }

    private GraphEntity graph = new GraphEntity();

    @Override
    public void setServletRequest(HttpServletRequest httpServletRequest) {
        this.request = httpServletRequest;
    }


    public void setGraphService(GraphService graphService) {
        this.graphService = graphService;
    }

    @Override
    public GraphEntity getModel() {
        return this.graph;
    }


    //接收前端数据
    public String save() {
        try {
            String object = request.getParameter("gparam");
            JSONArray array = JSONArray.fromObject(object);
            for (int i = 0; i < array.size(); i++) {
                JSONObject obj = array.getJSONObject(i);
                graph.setGraphName(obj.getString("type"));
                String location = obj.getString("location");
                graph.setCoordinate("point(" + location.split(",")[0] + " " + location.split(",")[1] + ")");
                graphService.saveGraph(graph);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

}

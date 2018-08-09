package cn.zmonet.dao;

import cn.zmonet.entity.GraphEntity;

import java.util.List;

public interface GraphDao {
    /**
     * 添加空间图形
     */
    public void saveGraph(GraphEntity graph);

    /**
     * 修改空间图形
     */
    public void updateGraph(GraphEntity graph);

    /**
     * 删除空间图形
     */
    public void deleteGraph(GraphEntity graph);

    /**
     * 获取所有图形
     */
    public List<GraphEntity> findAll();
}

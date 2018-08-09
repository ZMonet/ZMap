package cn.zmonet.service;

import cn.zmonet.entity.GraphEntity;

import java.util.List;

public interface GraphService {
    public void saveGraph(GraphEntity graph);

    public void updateGraph(GraphEntity graph);

    public void deleteGraph(GraphEntity graph);

    public List<GraphEntity> findAll();
}

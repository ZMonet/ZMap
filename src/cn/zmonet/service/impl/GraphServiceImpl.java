package cn.zmonet.service.impl;

import cn.zmonet.dao.GraphDao;
import cn.zmonet.entity.GraphEntity;
import cn.zmonet.service.GraphService;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Transactional
public class GraphServiceImpl implements GraphService {
    private GraphDao graphDao;

    public void setGraphDao(GraphDao graphDao) {
        this.graphDao = graphDao;
    }

    @Override
    public void saveGraph(GraphEntity graph) {
        this.graphDao.saveGraph(graph);
    }

    @Override
    public void updateGraph(GraphEntity graph) {
        this.graphDao.updateGraph(graph);
    }

    @Override
    public void deleteGraph(GraphEntity graph) {
        this.graphDao.deleteGraph(graph);
    }

    @Override
    public List<GraphEntity> findAll() {
        return graphDao.findAll();
    }
}

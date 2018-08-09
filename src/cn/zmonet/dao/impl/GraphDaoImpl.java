package cn.zmonet.dao.impl;

import cn.zmonet.dao.GraphDao;
import cn.zmonet.entity.GraphEntity;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.List;

public class GraphDaoImpl extends HibernateDaoSupport implements GraphDao{

    @Override
    public void saveGraph(GraphEntity graph) {
        this.getHibernateTemplate().save(graph);
    }

    @Override
    public void updateGraph(GraphEntity graph) {
        this.getHibernateTemplate().update(graph);
    }

    @Override
    public void deleteGraph(GraphEntity graph) {
        this.getHibernateTemplate().delete(graph);
    }

    @Override
    public List<GraphEntity> findAll() {
       return (List<GraphEntity>) this.getHibernateTemplate().find("from GraphEntity ");
    }
}

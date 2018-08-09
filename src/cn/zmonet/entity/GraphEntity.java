package cn.zmonet.entity;

import javax.persistence.*;

@Entity
@Table(name = "graph", schema = "zmonet", catalog = "")
public class GraphEntity {
    private int graphId;
    private String graphName;
    private String coordinate;

    @Id
    @Column(name = "graphId", nullable = false)
    public int getGraphId() {
        return graphId;
    }

    public void setGraphId(int graphId) {
        this.graphId = graphId;
    }

    @Basic
    @Column(name = "graphName", nullable = false, length = 255)
    public String getGraphName() {
        return graphName;
    }

    public void setGraphName(String graphName) {
        this.graphName = graphName;
    }

    @Basic
    @Column(name = "coordinate", nullable = false, length = 1024)
    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GraphEntity that = (GraphEntity) o;

        if (graphId != that.graphId) return false;
        if (graphName != null ? !graphName.equals(that.graphName) : that.graphName != null) return false;
        if (coordinate != null ? !coordinate.equals(that.coordinate) : that.coordinate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = graphId;
        result = 31 * result + (graphName != null ? graphName.hashCode() : 0);
        result = 31 * result + (coordinate != null ? coordinate.hashCode() : 0);
        return result;
    }
}

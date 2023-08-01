import { useEffect, useState } from "react";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import { Link } from "react-router-dom";

import styles from "./Stats.module.css";

import { Loading } from "../components/Loading";

import { statsService } from "../services/stats";

interface GraphData {
  x: string;
  y: number;
}

export default function Stats() {
  const [accessCount, setAccessCount] = useState(0);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    statsService
      .getStats()
      .then((response) => {
        const access = response.reduce(
          (accumulator, currentValue) => accumulator + currentValue.access,
          0
        );

        setAccessCount(access);

        const graphData = response.map((postStats) => {
          return {
            x: postStats.title,
            y: postStats.access
          };
        });

        setGraphData(graphData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (graphData.length === 0) {
    return (
      <div className={styles.emptyStatsMessageContainer}>
        <h2>Ops! Parece que você náo tem nenhum post para podermos analisar</h2>

        <span>
          <Link to="/account/post">Clique aqui</Link> e crie seu primeiro post.
        </span>
      </div>
    );
  }

  return (
    <section className={`${styles.statsContainer} animationLeft`}>
      <div className={styles.access}>
        <p>Acessos: {accessCount}</p>
      </div>

      <div className={styles.graphContainer}>
        <VictoryPie
          data={graphData}
          innerRadius={50}
          padding={{
            top: 20,
            bottom: 20,
            left: 80,
            right: 80
          }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2
            },
            labels: {
              fontSize: 14,
              fill: "#333"
            }
          }}
        />
      </div>

      <div className={styles.graphContainer}>
        <VictoryChart
          padding={{
            top: 20,
            bottom: 30,
            left: 80,
            right: 80
          }}
        >
          <VictoryBar data={graphData} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
}

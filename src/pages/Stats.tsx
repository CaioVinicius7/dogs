import { useEffect, useState } from "react";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

import styles from "./Stats.module.css";

import { statsService } from "../services/stats";

interface GraphData {
  x: string;
  y: number;
}

export function Stats() {
  const [accessCount, setAccessCount] = useState(0);
  const [graphData, setGraphData] = useState<GraphData[]>([]);

  useEffect(() => {
    statsService.getStats().then((response) => {
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
    });
  }, []);

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

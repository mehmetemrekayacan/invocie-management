import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Payment", value: 500 },
  { name: "Tax", value: 200 },
  { name: "Invoice", value: 100 },
];
const COLORS = ["#B30000", "#5E1F1F", "#881717"];

export default class Piechart extends PureComponent {
  render() {
    return (
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={175}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({
            name,
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <g>
                <rect
                  x={x - 40}
                  y={y - 15}
                  width={80}
                  height={30}
                  fill="#272727"
                  rx={5} // köşeleri yuvarlamak için
                  ry={5} // köşeleri yuvarlamak için
                />
                <text
                  x={x}
                  y={y}
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {name}
                </text>
              </g>
            );
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

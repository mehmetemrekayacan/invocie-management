/* eslint-disable react-refresh/only-export-components */
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Payment", value: 400 },
  { name: "Tax", value: 200 },
  { name: "Invoice", value: 100 },
];
const COLORS = ["#B30000", "#5E1F1F", "#881717"];

export default class Piechart extends PureComponent {
  render() {
    return (
      <div className="pie--container">
        <div className="pie--header">
          <h2 className="pie--header--title">Expenses Structure</h2>
          <div className="pie--header--sort">
            <span>SORT BY</span>
            <img
              src="/src/assets/dropdown=dark.svg"
              className="dark-icon"
              alt="sort"
            />
            <img
              src="/src/assets/dropdown=light.svg"
              className="light-icon"
              alt="sort"
            />
          </div>
        </div>
        <div className="pie--chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={60}
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
                        rx={5}
                        ry={5}
                      />
                      <text
                        x={x}
                        y={y}
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="pie--footer">
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Payments:</h2>
              <h2 className="pie--footer--amount">$ 500</h2>
            </div>
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Taxes:</h2>
              <h2 className="pie--footer--amount">$ 200</h2>
            </div>
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Invoices:</h2>
              <h2 className="pie--footer--amount">$ 100</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

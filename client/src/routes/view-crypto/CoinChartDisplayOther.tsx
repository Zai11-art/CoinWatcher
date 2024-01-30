import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  BarElement,
} from "chart.js";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { RootState } from "../../state";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

Chart.defaults.elements.point.radius = 0;

interface CoinChartDisplayOther {
  dataPassed?:  [number, number][]
  label: string;
}

const CoinChartDisplayOther: React.FC<CoinChartDisplayOther>  = ({ dataPassed, label }) => {
  console.log("data passed here");
  console.log(dataPassed);


  const mode = useSelector((state : RootState) => state.mode);
  Chart.defaults.color = `${mode === "light" ? "#061b36" : "#c9c9c7"}`;

  const datesArray = dataPassed?.map(([dates] : [number, number]) => {
    const date = new Date(dates);
    const formattedDate = date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  });

  const priceArray = dataPassed?.map(([, price]: [number, number] ) => price);

  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: `${mode === "light" ? "#061b36" : "#c9c9c7"}`,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Coin price to USD (${label})`,
        font: {
          size: 20,
        },
      },
      labels: {
        fontColor: `${mode === "light" ? "#061b36" : "#c9c9c7"}`,
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          stepSize: 1,
          color: `${mode === "light" ? "#061b36" : "#c9c9c7"}`,
          font: {
            size: 1,
          },
        },
        grid: {
          color: `${mode === "light" ? "#162a382f" : "#9bd7ff18"}`,
        },
      },
      y: {
        ticks: {
          color: `${mode === "light" ? "#061b36" : "#c9c9c7"}`,
          font: {
            size: 12,
          },
        },
        grid: {
          color: `${mode === "light" ? "#162a382f" : "#9bd7ff18"}`,
        },
      },
    },
  };

  const labels = datesArray;

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        data: priceArray,
        borderColor:
          priceArray &&
          priceArray.length > 0 &&
          priceArray[priceArray.length - 1] > priceArray[0]
            ? "rgb(93, 212, 85)"
            : "rgb(255, 107, 107)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: "2",
      },
    ],
  };
  return (
   
    <Line
      className="ml-2"
      //@ts-ignore
      options={options}
      plugins={[
        {
          id: "tooltipLine",
          afterDraw: (chart) => {
            //@ts-ignore
            if (chart.tooltip?._active?.length) {
              //@ts-ignore
              let x = chart.tooltip._active[0].element.x;
              let yAxis = chart.scales.y;
              let ctx = chart.ctx;
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, yAxis.top);
              ctx.lineTo(x, yAxis.bottom);
              ctx.lineWidth = 1;
              (ctx.strokeStyle =
                priceArray &&
                priceArray.length > 0 &&
                priceArray[priceArray.length - 1] > priceArray[0]
                  ? "rgb(93, 212, 85)"
                  : "rgb(255, 107, 107)"),
                ctx.stroke();
              ctx.restore();
            }
          },
        },
      ]}
      //@ts-ignore
      data={data}
    />
  );
};

export default CoinChartDisplayOther;

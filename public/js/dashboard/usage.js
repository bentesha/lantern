//Chart color scale
const scale = chroma.scale(["#d6e9c9","#164ca1"]).mode('lch');
const barLineChartOptions = {
  tooltips: {
    intersect: false,
    mode: "index"
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          beginAtZero: true
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: 0
        }
      }
    ]
  }
};


window.onload = function() {
  axios
    .get("/reports/usage/daily")
    .then(({ data }) => {
      drawLineChart("daily-usage-chart", data.labels, data.data);
    })
    .catch(error => {
      alert("Could not render chart:" + error);
    });

  axios.get("/reports/requests-per-zone").then(({data}) => {
    drawBarChart("requests-per-zone", data.labels, data.data);
  }).catch(error => {
    this.console.log("could not render chart: requests-per-zone");
  });

  axios.get("/reports/requests-by-feature").then(({data}) => {
    drawPieChart("requests-by-feature", data.labels, data.data);
  }).catch(error => {
    console.error("Could not render pie chart: " + error);
  });
};

function clearChildElements(el){
  while(el.firstChildElement){
    el.removeChild(el.firstChildElement);
  }
}

function drawPieChart(id, labels, data) {
  const ctx = document.getElementById(id);
  const colors = scale.colors(data.length);
  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets:[{
        data,
        backgroundColor: colors,
        borderColor: "#fff",
        hoverBorderColor: colors
      }]
    }
  })
}

function drawBarChart(id, labels, data) {
  const ctx = document.getElementById(id);
  const chart = new Chart(ctx, {
    type: "horizontalBar",
    data: {
      labels,
      datasets: [
        {
          backgroundColor: scale.colors(data.length),
          data: data
        }
      ]
    },
    options: barLineChartOptions
  });
}

function drawLineChart(id, labels, data) {
  const ctx = document.getElementById(id);
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          backgroundColor: scale.colors(6)[1],
          borderColor: scale.colors(6)[2],
          data: data
        }
      ]
    },
    options: barLineChartOptions
  });
}

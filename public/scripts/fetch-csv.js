      // Data from: https://data.giss.nasa.gov/gistemp/
      // Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

      async function chartIt() {
        const data  = await getData();
        const ctx = document.getElementById('chart');
        
        // Gradient Fill
        // let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        // gradient.addColorStop(0, 'rgba(58, 123, 213, 1)');
        // gradient.addColorStop(1, 'rgba( 0, 210, 255, 0.3)');
        
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.xs,
            datasets: [
              {
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.ys,
                fill: true,
                borderWidth: 2,
                // backgroundColor: gradient
              }
            ]
          },
          options: {
            scales: {
              y: {
                ticks: {
                  callback: function(value, index, values) {
                    return value + '°';
                  }
                },
                beginAtZero: false
              }
            }
          }
        }
        );
      }

      chartIt();
      
      async function getData () {
        const xs = [];
        const ys = [];
        const response = await fetch('../data/ZonAnn.Ts+dSST.csv');
        const data = await response.text();

        const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const year = columns[0];
            xs.push(year);
            const temp = columns[1];
            ys.push(parseFloat(temp) + 14);
            console.log(year, temp);
        }); 
        return { xs, ys};
      }
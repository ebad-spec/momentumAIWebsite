import Chart from 'chart.js/auto';

const gridC = 'rgba(0,0,0,0.06)';
const tickC = '#aaa';

function base(xT?: string, yT?: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: {
        grid: { color: gridC },
        ticks: { color: tickC, font: { size: 11 } },
        title: {
          display: !!xT,
          text: xT,
          color: tickC,
          font: { size: 11 },
        },
      },
      y: {
        grid: { color: gridC },
        ticks: { color: tickC, font: { size: 11 } },
        min: 0,
        max: 100,
        title: {
          display: !!yT,
          text: yT,
          color: tickC,
          font: { size: 11 },
        },
      },
    },
  };
}

export function initMindtraceCharts(refs: {
  c1: HTMLCanvasElement | null;
  c2: HTMLCanvasElement | null;
  c3: HTMLCanvasElement | null;
  c4: HTMLCanvasElement | null;
  c5: HTMLCanvasElement | null;
}): Chart[] {
  const charts: Chart[] = [];

  if (refs.c1) {
    charts.push(
      new Chart(refs.c1, {
        type: 'line',
        data: {
          labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
          datasets: [
            {
              label: 'Implicit',
              data: [22, 41, 55, 65, 72, 78, 83, 87, 90, 91],
              borderColor: '#D4537E',
              backgroundColor: 'rgba(212,83,126,0.07)',
              borderWidth: 2.5,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Explicit',
              data: [18, 29, 37, 43, 48, 52, 55, 57, 60, 63],
              borderColor: '#F4C0D1',
              backgroundColor: 'rgba(244,192,209,0.07)',
              borderWidth: 2,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
              borderDash: [5, 4],
            },
          ],
        },
        options: base('sessions', 'profile accuracy %'),
      })
    );
  }

  if (refs.c2) {
    charts.push(
      new Chart(refs.c2, {
        type: 'line',
        data: {
          labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
          datasets: [
            {
              label: 'MindTrace',
              data: [45, 52, 59, 65, 71, 77, 83, 89],
              borderColor: '#D4537E',
              backgroundColor: 'rgba(212,83,126,0.08)',
              borderWidth: 2.5,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Generic',
              data: [44, 47, 50, 52, 54, 56, 59, 61],
              borderColor: '#F4C0D1',
              backgroundColor: 'rgba(244,192,209,0.08)',
              borderWidth: 2,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: base('weeks', 'student performance score %'),
      })
    );
  }

  if (refs.c3) {
    charts.push(
      new Chart(refs.c3, {
        type: 'bar',
        data: {
          labels: ['Recall speed', 'Knowledge gap detection', 'Session personalization'],
          datasets: [
            {
              label: 'Day 1',
              data: [28, 22, 18],
              backgroundColor: 'rgba(212,83,126,0.28)',
              borderRadius: 4,
            },
            {
              label: 'Day 14',
              data: [61, 58, 54],
              backgroundColor: 'rgba(212,83,126,0.6)',
              borderRadius: 4,
            },
            {
              label: 'Day 28',
              data: [87, 84, 91],
              backgroundColor: '#D4537E',
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: gridC },
              ticks: { color: tickC, font: { size: 11 } },
            },
            y: {
              grid: { color: gridC },
              ticks: { color: tickC, font: { size: 11 } },
              min: 0,
              max: 100,
              title: {
                display: true,
                text: 'score %',
                color: tickC,
                font: { size: 11 },
              },
            },
          },
        },
      })
    );
  }

  if (refs.c4) {
    charts.push(
      new Chart(refs.c4, {
        type: 'line',
        data: {
          labels: ['D1', 'D3', 'D5', 'D7', 'D9', 'D12', 'D16', 'D20', 'D24', 'D28'],
          datasets: [
            {
              label: 'MindTrace',
              data: [15, 38, 58, 74, 91, 93, 94, 95, 95, 95],
              borderColor: '#D4537E',
              backgroundColor: 'rgba(212,83,126,0.07)',
              borderWidth: 2.5,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Standard',
              data: [12, 18, 24, 31, 38, 47, 57, 68, 79, 90],
              borderColor: '#F4C0D1',
              backgroundColor: 'rgba(244,192,209,0.07)',
              borderWidth: 2,
              pointRadius: 3,
              fill: true,
              tension: 0.4,
              borderDash: [5, 4],
            },
          ],
        },
        options: base('days', 'profile maturity %'),
      })
    );
  }

  if (refs.c5) {
    charts.push(
      new Chart(refs.c5, {
        type: 'bar',
        data: {
          labels: ['MindTrace', 'Duolingo', 'Anki', 'Quizlet', 'Notion AI'],
          datasets: [
            {
              label: 'Implicit signal usage',
              data: [91, 42, 12, 18, 8],
              backgroundColor: '#D4537E',
              borderRadius: 4,
            },
            {
              label: 'Personalization depth',
              data: [89, 38, 22, 15, 10],
              backgroundColor: 'rgba(212,83,126,0.3)',
              borderRadius: 4,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: gridC },
              ticks: { color: tickC, font: { size: 11 } },
              min: 0,
              max: 100,
              title: {
                display: true,
                text: 'score',
                color: tickC,
                font: { size: 11 },
              },
            },
            y: {
              grid: { color: gridC },
              ticks: { color: tickC, font: { size: 12 } },
            },
          },
        },
      })
    );
  }

  return charts;
}

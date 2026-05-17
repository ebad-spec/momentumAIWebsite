import { useLayoutEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { initMindtraceCharts } from '../components/research/mindtraceCharts';

type CanvasRefs = {
  c1: React.RefObject<HTMLCanvasElement | null>;
  c2: React.RefObject<HTMLCanvasElement | null>;
  c3: React.RefObject<HTMLCanvasElement | null>;
  c4: React.RefObject<HTMLCanvasElement | null>;
  c5: React.RefObject<HTMLCanvasElement | null>;
};

function destroyCanvasChart(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();
}

function resizeCharts(charts: Chart[]) {
  charts.forEach((ch) => {
    try {
      ch.resize();
    } catch {
      /* ignore */
    }
  });
}

/** Mount Chart.js after layout; re-size after splash screen / window changes. */
export function useMindtraceCharts(refs: CanvasRefs) {
  const chartsRef = useRef<Chart[]>([]);

  useLayoutEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (cancelled) return;

      const canvases = [
        refs.c1.current,
        refs.c2.current,
        refs.c3.current,
        refs.c4.current,
        refs.c5.current,
      ];
      canvases.forEach(destroyCanvasChart);

      chartsRef.current.forEach((ch) => {
        try {
          ch.destroy();
        } catch {
          /* ignore */
        }
      });

      const charts = initMindtraceCharts({
        c1: refs.c1.current,
        c2: refs.c2.current,
        c3: refs.c3.current,
        c4: refs.c4.current,
        c5: refs.c5.current,
      });

      chartsRef.current = charts;
      resizeCharts(charts);
    };

    // Wait for paint + site intro overlay so chart-wrap has real dimensions
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(mount);
    });

    const afterIntro = window.setTimeout(mount, 900);
    const onResize = () => resizeCharts(chartsRef.current);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      window.clearTimeout(afterIntro);
      window.removeEventListener('resize', onResize);
      chartsRef.current.forEach((ch) => {
        try {
          ch.destroy();
        } catch {
          /* ignore */
        }
      });
      chartsRef.current = [];
    };
  }, [refs.c1, refs.c2, refs.c3, refs.c4, refs.c5]);
}

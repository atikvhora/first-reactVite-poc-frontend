import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

export function OTELMetricsFPS () {
// OTLP exporter (for Collector)
const exporter = new OTLPMetricExporter({
  url: "http://localhost:5000/telemetry/expoter",
});

// Metric Reader (exports metrics every 5 seconds)
const metricReader = new PeriodicExportingMetricReader({
  exporter,
  exportIntervalMillis: 5000,
});

// ✅ Correct: configure readers IN THE CONSTRUCTOR
const meterProvider = new MeterProvider({
  readers: [metricReader],
});

// Export meter for your NestJS modules/services
const meter = meterProvider.getMeter("vite-vpop-App");

if (typeof window !== "undefined") {
    let lastFrame = performance.now();
    let frameCount = 0;
    let fpsAvg = 0;

    // FPS calculation
    function tick(now: number) {
      frameCount++;
      const delta = now - lastFrame;

      if (delta >= 1000) {
        fpsAvg = (frameCount / delta) * 1000;
        frameCount = 0;
        lastFrame = now;
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

  // OTel observable gauge
    const fpsGauge = meter.createObservableGauge("fps_avg", {
      description: "Average frames per second",
    });

    // Register the callback:
    fpsGauge.addCallback((observableResult) => {
      observableResult.observe(fpsAvg);
    });
  }
}
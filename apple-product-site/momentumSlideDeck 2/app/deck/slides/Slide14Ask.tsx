import MetricsLayout from '../components/MetricsLayout'

export default function Slide14Ask() {
  return (
    <MetricsLayout
      title="The Ask: $150K (Pre-Seed Round)"
      description="This capital goes directly into: paying engineers to sustain velocity, improving AI reliability and depth, and scaling marketing + campus events. We already have demand; this round scales execution. Without this round, growth is linear. With it, Momentum becomes repeatable across campuses."
      valueClassName="text-6xl md:text-7xl"
      metrics={[
        {
          value: '$150K CAD',
          label: 'via SAFE',
          highlight: true,
        },
        {
          value: 'Engineering',
          label: 'Reliability + feature depth',
        },
        {
          value: 'Distribution',
          label: 'Campus ambassadors, marketing, and student events',
          highlight: true,
        },
      ]}
    />
  )
}

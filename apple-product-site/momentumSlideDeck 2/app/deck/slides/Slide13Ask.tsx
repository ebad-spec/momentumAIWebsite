import MetricsLayout from '../components/MetricsLayout'

export default function Slide13Ask() {
  return (
    <MetricsLayout
      title="The Ask: $150K (Pre-Seed Round)"
      description="Why investors care: Clear milestones, defined runway, specific path to next round"
      metrics={[
        {
          value: '$150K CAD',
          label: 'via SAFE',
          highlight: true,
        },
        {
          value: '5,000 MAU',
          label: 'Milestone: 6–12 months',
        },
        {
          value: '$5K MRR',
          label: 'Seed-ready metrics',
          highlight: true,
        },
      ]}
    />
  )
}



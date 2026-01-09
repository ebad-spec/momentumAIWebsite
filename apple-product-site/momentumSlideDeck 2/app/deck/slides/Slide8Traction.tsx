import MetricsLayout from '../components/MetricsLayout'

export default function Slide8Traction() {
  return (
    <MetricsLayout
      title="Traction: Revenue Before Full Product"
      description="MVP has been live for 2 weeks with active trial usage. Early revenue shows willingness to pay before full feature rollout. Paying users are actively using planning + flashcards weekly, demonstrating product-market fit signals, not just scale. Paying users return weekly without prompts to manage coursework."
      gridClassName="-mt-2 md:-mt-4"
      metrics={[
        {
          value: 'Active',
          label: '7-day trial usage since MVP launch',
          highlight: true,
        },
        {
          value: '5',
          label: 'Paying beta users',
          highlight: true,
        },
        {
          value: '$50+',
          label: 'MRR (Monthly Recurring Revenue)',
          highlight: true,
        },
        {
          value: '100+',
          label: 'Wishlist signups showing strong interest',
        },
        {
          value: '100,000+',
          label: 'Social media engagement',
        },
      ]}
    />
  )
}

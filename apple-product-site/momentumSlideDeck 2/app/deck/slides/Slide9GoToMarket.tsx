import FeatureGridLayout from '../components/FeatureGridLayout'

export default function Slide9GoToMarket() {
  return (
    <FeatureGridLayout
      title="What We Do: Growth Strategy"
      description="Strong product engineering, Gen Z–native brand, and community presence both online and on campus"
      features={[
        {
          icon: '🚀',
          title: 'Product Engineering',
          description: 'Strong focus on building the best product',
        },
        {
          icon: '🎯',
          title: 'Gen Z–Native Brand',
          description: 'Brand that resonates with the target audience',
        },
        {
          icon: '🌐',
          title: 'Online Presence',
          description: 'Community presence across social platforms',
        },
        {
          icon: '🏫',
          title: 'Campus Presence',
          description: 'Hosted and sponsored events to grow brand presence',
        },
      ]}
    />
  )
}


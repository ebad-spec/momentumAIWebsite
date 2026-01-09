import { ComponentType } from 'react'
import Slide1Title from './slides/Slide1Title'
import Slide2Problem from './slides/Slide2Problem'
import Slide3ExistingSolutions from './slides/Slide3ExistingSolutions'
import Slide4Solution from './slides/Slide4Solution'
import Slide4WhyUs from './slides/Slide4WhyUs'
import Slide5Product from './slides/Slide5Product'
import Slide6ProductVideo from './slides/Slide6ProductVideo'
import Slide6Market from './slides/Slide6Market'
import Slide7BusinessModel from './slides/Slide7BusinessModel'
import Slide8Traction from './slides/Slide8Traction'
import Slide10Future from './slides/Slide10Future'
import Slide11Departments from './slides/Slide11Departments'
import Slide11FoundingTeam from './slides/Slide11FoundingTeam'
import Slide12EngineeringTeam from './slides/Slide12EngineeringTeam'
import Slide13BoardMembers from './slides/Slide13BoardMembers'
import Slide14Ask from './slides/Slide14Ask'
import Slide15UseOfFunds from './slides/Slide15UseOfFunds'
import Slide16Final from './slides/Slide16Final'
import Slide17StudentDemand from './slides/Slide17StudentDemand'
import Slide18WhyMomentum from './slides/Slide18WhyMomentum'

export interface SlideConfig {
  id: number
  title: string
  component: ComponentType
}

export const slides: SlideConfig[] = [
  {
    id: 1,
    title: 'Title',
    component: Slide1Title,
  },
  {
    id: 2,
    title: 'Problem',
    component: Slide2Problem,
  },
  {
    id: 3,
    title: 'Specific Problems',
    component: Slide3ExistingSolutions,
  },
  {
    id: 4,
    title: 'Solution',
    component: Slide4Solution,
  },
  {
    id: 5,
    title: 'Student Demand',
    component: Slide17StudentDemand,
  },
  {
    id: 6,
    title: 'Product',
    component: Slide5Product,
  },
  {
    id: 7,
    title: 'Product Demo',
    component: Slide6ProductVideo,
  },
  {
    id: 8,
    title: 'Why Momentum',
    component: Slide18WhyMomentum,
  },
  {
    id: 9,
    title: 'Why We Are the Solution',
    component: Slide4WhyUs,
  },
  {
    id: 10,
    title: 'Market',
    component: Slide6Market,
  },
  {
    id: 11,
    title: 'Business Model',
    component: Slide7BusinessModel,
  },
  {
    id: 12,
    title: 'Traction',
    component: Slide8Traction,
  },
  {
    id: 13,
    title: 'How We Operate',
    component: Slide11Departments,
  },
  {
    id: 14,
    title: 'Founding Team',
    component: Slide11FoundingTeam,
  },
  {
    id: 15,
    title: 'Engineering Team',
    component: Slide12EngineeringTeam,
  },
  {
    id: 16,
    title: 'Ask',
    component: Slide14Ask,
  },
  {
    id: 17,
    title: 'Use of Funds',
    component: Slide15UseOfFunds,
  },
  {
    id: 18,
    title: 'Future & Milestones',
    component: Slide10Future,
  },
  {
    id: 19,
    title: 'Thank You',
    component: Slide16Final,
  },
]

export const totalSlides = slides.length

import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
]

export interface FacetOption {
  value: string
  label: string
  icon: any
}

export const statuses = [
  {
    value: 'pending',
    label: 'Pending',
    icon: StopwatchIcon
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon
  },
  {
    value: 'rejected',
    label: 'Rejected',
    icon: CrossCircledIcon
  }
]

// export const statuses = [
//   {
//     value: 'SUBMITTED',
//     label: 'Pending',
//     icon: StopwatchIcon
//   },
//   {
//     value: MortgageStatusEnum.APPROVED.toString(),
//     label: 'Completed',
//     icon: CheckCircledIcon
//   },
//   {
//     value: MortgageStatusEnum.CASE_DECLINED.toString(),
//     label: 'Rejected',
//     icon: CrossCircledIcon
//   }
// ]

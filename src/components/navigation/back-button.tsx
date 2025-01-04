import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface Props {
  route: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined
}

export const BackButton = ({ route, variant = 'outline' }: Props) => {
  const router = useRouter()
  return (
    <div className='space-y-2'>
      <Button type="button" variant={variant} onClick={() => router.push(route)} className="w-full">
        Go Back
      </Button>
    </div>
  )
}

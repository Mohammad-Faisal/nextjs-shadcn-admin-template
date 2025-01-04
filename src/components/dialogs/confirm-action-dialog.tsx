import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface Props {
  title?: string
  content: React.ReactNode
  anchor: React.ReactNode
  className?: string
}

const ConfirmActionDialog = ({ title, anchor, content, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{anchor}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmActionDialog

import { PlusCircle } from 'lucide-react'

import { Button } from './ui/button'

export function ActionBar() {
  return (
    <div className="w-full flex items-center justify-end">
      <Button variant="default">
        <PlusCircle className="size-4 mr-2" />
        Adicionar
      </Button>
    </div>
  )
}

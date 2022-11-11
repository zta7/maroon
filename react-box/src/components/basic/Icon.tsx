import { Icon as Iconify } from '@iconify/react';

interface Props {
  className?: string,
  name?: string
}
export const Icon = ({ className='', name='' } : Props) => {
  return (
    <div className={ className }>
      <Iconify icon={name}/>
    </div>
  )
}
import { Icon } from "src/components/basic/Icon"
import { Item } from "src/components/basic/List"

const btns = [
  { title: "Share", tooltip: "Share or publish to the web." },
  { icon: 'mdi-comment-outline', tooltip: "View all comments." },
  { icon: 'mdi-history', tooltip: "View all updates." },
  { icon: 'mdi-star-outline', tooltip: "Pin this page in your sidebar." },
  { icon: 'mdi-dots-horizontal', tooltip: "more..." },
]

export const Header = () => {

  return (
    <div className="Header z-10 flex h-10 flex-row items-center justify-between px-4">
      <Item rounded className="text-sm">Title</Item>
      <div className="flex flex-row items-center">
        {btns.map(({ title, icon }, i) => {
          return (
            <Item rounded key={i}>
              {
                title && <span className="text-sm">{ title }</span>
              }
              {
                icon && <Icon name={icon} className='text-xl'/>
              }
            </Item>
          )
        })}
      </div>
    </div>
  )
}

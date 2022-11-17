import { forwardRef, HTMLProps, useEffect, useRef, useState } from "react"
import { Icon } from "src/components/basic/Icon"
import { Item, List } from "src/components/basic/List"
import { SearchItem } from "src/components/leftDrawer/SearchItem"
import { SettingsItem } from "src/components/leftDrawer/SettingsItem"
import { UpdateItem } from "src/components/leftDrawer/UpdateItem"
import { useDispatch, useSelector } from "react-redux"
import { toggleLeft } from "src/store/layout"
import { LeftStatus } from "../store/layout"
import { Container } from "src/components/basic/Container"
import { SplitterLine } from "src/components/leftDrawer/SplitterLine"
import { useHoverDirty } from "react-use"

const Space = () => {
  return <div className="h-6 w-full"></div>
}

export const LeftDrawer = forwardRef<HTMLElement, HTMLProps<HTMLDivElement>>(
  function LeftDrawer(props, propRef) {
    const { left } = useSelector((state: any) => state.layout)
    const dispatch = useDispatch()
    const [width, setWidth] = useState(200)
    const minWidth = 200
    const maxWidth = 480

    const leftDrawerRef = useRef(null)
    const isHover = useHoverDirty(leftDrawerRef)

    const [beforeMouseFirstMove, setBeforeMouseFirstMove] = useState(false)
    useEffect(() => {
      if (isHover && left === LeftStatus.Invisible) {
        dispatch(toggleLeft(LeftStatus.VisibleMini))
      } else if (
        !isHover &&
        !beforeMouseFirstMove &&
        left === LeftStatus.VisibleMini
      ) {
        dispatch(toggleLeft(LeftStatus.Invisible))
      }
    }, [isHover])

    const onToggleLeftClick = () => {
      setBeforeMouseFirstMove(true)
      dispatch(toggleLeft(LeftStatus.VisibleMini))

      const detectMouseFirstMove = () => {
        dispatch(toggleLeft(LeftStatus.Invisible))
        setBeforeMouseFirstMove(false)
        window.removeEventListener("mousemove", detectMouseFirstMove, {
          capture: true,
        })
      }
      window.addEventListener("mousemove", detectMouseFirstMove, {
        capture: true,
      })
    }

    return (
      <Container
        className="left-side relative"
        style={{ width: left === LeftStatus.Visible ? width : 0 }}>
        <div
          ref={leftDrawerRef}
          className={`duration-200 ${
            left === LeftStatus.Visible
              ? "bg-neutral-100"
              : "rounded border-t border-b bg-neutral-50 shadow-lg"
          }`}
          style={{
            width,
            height: left === LeftStatus.Visible ? "100%" : "calc(100% - 80px)",
            opacity: left === LeftStatus.Invisible ? 0 : 1,
            transform:
              left === LeftStatus.Visible
                ? ""
                : left === LeftStatus.VisibleMini
                ? "translateY(40px)"
                : `translateX(-${width - 40}px) translateY(40px)`,
          }}>
          <div
            className={`h-full w-full z-10${
              left === LeftStatus.Visible ? "" : "pointer-events-none"
            }`}>
            <List className="group/LeftDrawer h-full w-full">
              <Item className="h-10 shrink-0">
                <Icon name="mdi-coffee" className="mr-2" />
                <div className="flex grow flex-row items-center">
                  <span className="mr-2">Bingo</span>
                  <Icon name="mdi-more" />
                </div>
                {left === LeftStatus.Visible && (
                  <Icon
                    onClick={() => onToggleLeftClick()}
                    name="mdi-chevron-double-left"
                    className="hidden rounded text-lg hover:bg-neutral-300 group-hover/LeftDrawer:flex"
                  />
                )}
              </Item>
              <SearchItem />
              <UpdateItem />
              <SettingsItem />
              <Space />
              <div className="relative grow overflow-y-auto">
                {Array.from({ length: 255 }).map((e, i) => {
                  return (
                    <div key={i} className="">
                      Tree
                    </div>
                  )
                })}
                <Item>
                  <Icon name="mdi-plus" className="mr-2"></Icon>
                  <span className="text-sm">Add a page</span>
                </Item>
                <Space />
                <Item rounded>
                  <Icon name="mdi-language-html5" className="mr-2"></Icon>
                  <span className="text-sm">Templates</span>
                </Item>
                <Item rounded>
                  <Icon name="mdi-download" className="mr-2"></Icon>
                  <span className="text-sm">Import</span>
                </Item>
                <Item rounded>
                  <Icon name="mdi-delete-empty" className="mr-2"></Icon>
                  <span className="text-sm">Trash</span>
                </Item>
                <Space />
              </div>
              <Item className="h-10 shrink-0 border-t">
                <Icon name="mdi-plus" className="mr-2 text-lg" />
                <span className="text-sm">New page</span>
              </Item>
            </List>
            <SplitterLine
              width={width}
              minWidth={minWidth}
              maxWidth={maxWidth}
              setWidth={setWidth}
            />
          </div>
        </div>
        {/* {left === LeftStatus.Invisible && (
          <div className="absolute -right-10 top-0 bottom-0 w-10 bg-red-800"></div>
        )} */}
      </Container>
    )
  }
)

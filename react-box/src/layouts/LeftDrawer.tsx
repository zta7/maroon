import { forwardRef, HTMLProps, useState } from "react"
import { Icon } from "src/components/basic/Icon"
import { Item, List } from "src/components/basic/List"
import { SearchItem } from "src/components/leftDrawer/SearchItem"
import { SettingsItem } from "src/components/leftDrawer/SettingsItem"
import { UpdateItem } from "src/components/leftDrawer/UpdateItem"
// import { Table } from "../components/basic/Table"
// import { QueryTest } from "../components/temp/QueryTest"
import { useSpring, animated } from "react-spring"
import { useDrag, useHover } from "@use-gesture/react"
import { usePrevious, useUpdateEffect, useWindowSize } from "react-use"
import { useDispatch, useSelector } from "react-redux"
import { toggleLeft } from "src/store/layout"
import { LeftStatus } from "../store/layout"
import { Container } from "src/components/basic/Container"

const Space = () => {
  return <div className="h-6 w-full"></div>
}

export const LeftDrawer = forwardRef<HTMLElement, HTMLProps<HTMLDivElement>>(
  function LeftDrawer(props, propRef) {
    const { left } = useSelector((state: any) => state.layout)
    const dispatch = useDispatch()
    const [leftSideWidth, setLeftSideWidth] = useState(200)
    const leftSideWidthMin = 200
    const leftSideWidthMax = 480
    const { height: winHeight } = useWindowSize()

    const leftSideDragBind = useDrag(
      (state) => {
        const mx = state.delta[0]
        let v = leftSideWidth + mx
        if (v < leftSideWidthMin) v = leftSideWidthMin
        if (v > leftSideWidthMax) v = leftSideWidthMax
        setLeftSideWidth(v)
      },
      { axis: "x" }
    )

    const leftSideHoverBind = useHover((state) => {
      console.log(state)
    })

    // const [springStyles, api] = useSpring(() => ({
    //   from: {
    //     height: "100%",
    //     top: 0,
    //     left: 0,
    //   },
    // }))

    // const prevLeft = usePrevious(left)
    // useUpdateEffect(() => {
    //   if (prevLeft === left) return
    //   if (left === LeftStatus.Visible) {
    //     api.start({
    //       to: [
    //         {
    //           top: 0,
    //           height: "100%",
    //           config: { duration: 250 },
    //         },
    //       ],
    //     })
    //   } else if (left === LeftStatus.VisibleMini) {
    //     api.start({
    //       to: [{ left: 0, config: { duration: 250 } }],
    //     })
    //   } else if (left === LeftStatus.Invisible) {
    //     api.start({
    //       to: [
    //         {
    //           height: `${winHeight - VerticalOffset * 2}px`,
    //           config: { duration: 0 },
    //         },
    //         { top: VerticalOffset, config: { duration: 250 } },
    //         { left: -leftSideWidth, config: { duration: 250 } },
    //       ],
    //     })
    //   }
    // }, [left])

    const onToggleLeftClick = () => {
      dispatch(toggleLeft(LeftStatus.Invisible))
    }

    return (
      <Container
        className="left-side"
        style={{ width: left === LeftStatus.Visible ? leftSideWidth : 0 }}>
        <div
          className={`relative duration-200`}
          style={{
            width: leftSideWidth,
            height: left === LeftStatus.Visible ? "100%" : "calc(100% - 120px)",
            background:
              left === LeftStatus.Visible ? "rgba(15,15,15,0.05)" : "white",
            transform:
              left === LeftStatus.Visible
                ? ""
                : left === LeftStatus.VisibleMini
                ? "translateY(60px)"
                : `translateX(-${leftSideWidth + 20}px) translateY(60px)`,

            // left === LeftStatus.Visible
            //   ? ...{ height: '100%', background: 'rgba(25, 23, 17, 0.6)' }
            //   : ...{ height: 'calc(100% - 160px)', translate }
            //   "h-[calc(100%-160px)] translate-y-16 -translate-x-20 rounded border-t border-b bg-white shadow-lg"
          }}
          {...leftSideHoverBind()}>
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

          <div
            className="absolute -right-2 top-0 bottom-0 w-2 cursor-col-resize touch-none"
            {...leftSideDragBind()}>
            <div className="h-full w-px border-l"></div>
          </div>
        </div>
      </Container>
    )
  }
)

import { useRef } from "react"
import { Dialog, DialogAnchor, useDialogState } from "../basic/Dialog"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"

export const SettingsItem = () => {
  const dialog = useDialogState({ placement: "top" })
  const ref = useRef(null)
  return (
    <>
      <DialogAnchor state={dialog} asChild>
        <Item rounded ref={ref}>
          <Icon className="mr-2" name="mdi-cog" />
          <span className="text-sm">Settings & Members</span>
        </Item>
      </DialogAnchor>
      <Dialog state={dialog}>
        <div className="bg-red-800">
          <div>123</div>
          <div>456</div>
        </div>
      </Dialog>
    </>
  )
}

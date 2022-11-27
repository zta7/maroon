import { useCombobox } from "downshift"
import { ChangeEvent, useState } from "react"
import { Card } from "src/components/basic/Card"
import { Chip } from "src/components/basic/Chip"
import { Item, List } from "src/components/basic/List"
import { Stack } from "src/components/basic/Stack"

interface Props {
  options: Array<any>
  value: string
  onChange?: (value: string | object) => void
}

export const Combobox = ({ options, value, onChange }: Props) => {
  const [items, setItems] = useState(options)
  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    selectedItem,
    selectItem,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    initialInputValue: "",
    initialSelectedItem: value,
    stateReducer(state, actionAndChanges) {
      const { type, changes } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: state.inputValue,
          }
        default:
          return changes
      }
    },
    onSelectedItemChange(changes) {
      const { selectedItem } = changes
      onChange && onChange(selectedItem)
    },
    onInputValueChange({ inputValue }) {
      setItems(
        options.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase())
        )
      )
    },
  })

  return (
    <Stack column gap className="relative max-h-[70vh]">
      <Stack column gap>
        <Stack>
          {selectedItem && (
            <Chip
              label={selectedItem}
              deletable
              className="mr-1"
              onDelete={() => selectItem(null)}
            />
          )}
          <input
            {...getInputProps()}
            autoFocus
            className="min-w-0 text-sm"
            placeholder={`${!selectedItem ? "Search for an option" : ""}`}
          />
        </Stack>
        <label {...getLabelProps()} className="text-caption mb-1">
          Choose an option
        </label>
      </Stack>
      <Stack
        column
        gap
        style={{ margin: 0 }}
        {...getMenuProps()}
        className="overflow-auto">
        {items.map((item, index) => {
          // console.log(getItemProps({ item, index }))
          return (
            <Item
              active={highlightedIndex === index}
              rounded
              key={index}
              {...getItemProps({ item, index })}>
              {item}
            </Item>
          )
        })}
      </Stack>
    </Stack>
  )
}

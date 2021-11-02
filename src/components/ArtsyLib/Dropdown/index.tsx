import React, { useState } from "react";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";

import { DropdownType } from "./type";
import {
  FilterContainer,
  FilterSelected,
  FilterList,
  FilterListItem,
  ConfigContainer,
  ConfigSelected,
  ConfigList,
  ConfigListItem,
} from "./styles";
import Link from "next/link";
import { useOnClickOutSide } from "../../../hooks/useOnClickOutside";
import { useAuth } from "../../../hooks/useAuth";

export const Dropdown: React.FC<DropdownType> = ({
  items,
  layer,
  CSS,
  id,
  ...props

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth()

  const handleDropdown = () => setIsOpen(!isOpen);

  useOnClickOutSide(() => {
    if (isOpen) {
      handleDropdown();
    }
  }, id);

  if (props.dropdownType === "filter") {
    const selectedItem = items.find(({ itemId }) => itemId === props.selected);

    return (
      <FilterContainer
        CSS={CSS}
        className="filter-dropdown-wrapper"
        dropdownType="filter"
        layer={layer}
        open={isOpen}
        id={id}
      >
        <FilterSelected
          open={isOpen}
          onClick={handleDropdown}
          className="filter-currently-selected"
        >
          <label className="filter-label">{selectedItem?.content}</label>
          <ArrowDown className="filter-arrow" />
        </FilterSelected>
        <FilterList open={isOpen} className="filter-dropdown-list">
          {items.map((item, idx) => (
            <FilterListItem
              key={idx}
              {...item}
              onClick={() => {
                props.setSelected && props.setSelected(item.itemId);
                handleDropdown();
              }}
              className="filter-dropdown-item"
            >
              <button type="button">{item.content}</button>
            </FilterListItem>
          ))}
        </FilterList>
      </FilterContainer>
    );
  } else {
    return (
      <ConfigContainer
        className="config-dropdown-wrapper"
        dropdownType="config"
        layer={layer}
        open={isOpen}
        id={id}
      >
        <ConfigSelected
          open={isOpen}
          onClick={handleDropdown}
          className="config-currently-selected"
        >
          <ArrowDown className="config-arrow" />
        </ConfigSelected>

        <ConfigList open={isOpen} className="config-dropdown-list">
          {items.map((item, idx) => {
            return (
              <Link key={idx} href={item.itemUrl || "/#"}>
                <ConfigListItem
                  {...item}
                  itemType={item.itemType}
                  onClick={() => {
                    handleDropdown();
                    item.itemType && signOut()
                  }}
                  className="config-dropdown-item"
                >
                  {item.content}
                </ConfigListItem>
              </Link>
            )
          })}
        </ConfigList>
      </ConfigContainer>
    );
  }
};

import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useStateContext } from "../../providers/state";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const RoomMenu = () => {
  const { rooms } = useStateContext();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={!rooms ? <Spinner size="xs" /> : <CgMenuGridO />}
        variant="outline"
      />
      <MenuList>
        <Link to={`/`}>
          <MenuItem>Dashboard</MenuItem>
        </Link>
        {!rooms ? (
          <Spinner />
        ) : (
          rooms.map((room) => (
            <Link to={`/${room}`}>
              <MenuItem key={room}>{capitalizeFirstLetter(room)}</MenuItem>
            </Link>
          ))
        )}
      </MenuList>
    </Menu>
  );
};

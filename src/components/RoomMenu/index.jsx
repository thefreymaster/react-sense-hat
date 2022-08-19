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
import { Link, useLocation } from "react-router-dom";
import { useFirebaseContext } from "../../providers";
import { ref, onValue } from "firebase/database";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const RoomMenu = () => {
  const location = useLocation();
  const { db } = useFirebaseContext();
  const [rooms, setRooms] = React.useState();

  React.useEffect(() => {
    const roomRef = ref(db, `/`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      console.log(Object.keys(data));
      setRooms(Object.keys(data));
    });
  }, []);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<CgMenuGridO />}
        variant="outline"
      />
      <MenuList>
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

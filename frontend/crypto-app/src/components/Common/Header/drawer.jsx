import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-div" style={{ padding: "1rem" }}>
          <Link to="/">
            <p className="link">🏠 Home</p>
          </Link>
          <Link to="/compare">
            <p className="link">🎯 Compare</p>
          </Link>
          <Link to="/watchlist">
            <p className="link">🔍 Watchlist</p>
          </Link>
          <Link to="/dashboard">
            <p className="link">📊 Dashboard</p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}

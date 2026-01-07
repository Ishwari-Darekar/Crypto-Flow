import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Grid from "../Grid";
import "./styles.css";
import List from "../List";

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00eba1ff",
      },
    },
  });

  const tabStyle = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={tabStyle} />
            <Tab label="List" value="list" sx={tabStyle} />
          </TabList>
        </Box>

        <TabPanel value="grid">
          <div className="grid-flex">
            {coins.map((coin, i) => (
              <Grid coin={coin} key={i} />
            ))}
          </div>
        </TabPanel>

        <TabPanel value="list">
          <table className="list-table">
            <tbody>
              {coins.map((coin, i) => (
                <List coin={coin} key={i} />
              ))}
            </tbody>
          </table>
        </TabPanel>

      </TabContext>
    </ThemeProvider>
  );
}

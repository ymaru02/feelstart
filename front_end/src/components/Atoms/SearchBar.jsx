import * as React from "react";
// import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ handleSearch }) {
  const [keyword, setKeyword] = React.useState("");
  const keydown = React.useRef();

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch(keyword);
      setKeyword("");
    }
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: "tooltip",
        display: "flex",
      }}
    >
      <Paper
        component="form"
        sx={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          ref={keydown}
          value={keyword}
          onKeyDown={handleSubmit}
          onChange={handleChange}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Kakao Maps"
          inputProps={{ "aria-label": "search kakao maps" }}
        />
        <IconButton
          onClick={handleSubmit}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

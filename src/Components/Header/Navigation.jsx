import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuListComposition from "./Menu";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const {
    data,
    temporalData,
    filterTemporalData,
    session,
    setSession
  } = props;

  const classes = useStyles();

  function filterResult(event, data) {
    filterTemporalData(data.filter((el) => {
      return el.personal_id.toString().startsWith(event.target.value)
          }))   
  }  

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <MenuListComposition session={session} setSession={setSession} />
          <Typography className={classes.title} variant="h6" noWrap>
            Kmbios-VE
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

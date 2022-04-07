import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AdminRec from "components/Atoms/AdminRec";
import Doughnut from "components/Atoms/Doughnut";
import Bar from "components/Atoms/Bar";
import Line from "components/Atoms/Line";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function Admin() {
  const [dataset, setDataSet] = useState([]);
  const token = loginStore().jwtToken;

  useEffect(() => {
    axios
      .get("/api/log/loginAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSet(res.data);
      })
      .catch((error) => console.log(error));

    return () => {
      setDataSet([]);
    };
  }, []);

  return (
    <Box
      sx={{
        marginX: "auto",
        right: 0,
        left: 0,

        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        sx={{ color: "white" }}
      >
        Hi, Welcome back
      </Typography>
      <Container fixed>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 12 }}
        >
          <Grid item xs={3}>
            <AdminRec
              backgroundColor={"rgb(200, 250, 205)"}
              backgroundImage={
                "linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)"
              }
              color={"rgb(0, 82, 73)"}
              svg={"android-os"}
              count={
                dataset.filter((data) => {
                  return data.accessOs.indexOf("android") !== -1;
                }).length
              }
              name={"andriod"}
            />
          </Grid>
          <Grid item xs={3}>
            <AdminRec
              backgroundColor={"rgb(208, 242, 255)"}
              backgroundImage={
                "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)"
              }
              color={"rgb(4, 41, 122)"}
              svg={"mac-os"}
              count={
                dataset.filter((data) => {
                  return data.accessOs.indexOf("mac") !== -1;
                }).length
              }
              name={"mac"}
            />
          </Grid>
          <Grid item xs={3}>
            <AdminRec
              backgroundColor={"rgb(255, 247, 205)"}
              backgroundImage={
                "linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)"
              }
              color={"rgb(122, 79, 1)"}
              svg={"windows-10"}
              count={
                dataset.filter((data) => {
                  return data.accessOs.indexOf("Windows") !== -1;
                }).length
              }
              name={"windows"}
            />
          </Grid>
          <Grid item xs={3}>
            <AdminRec
              backgroundColor={"rgb(255, 231, 217)"}
              backgroundImage={
                "linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)"
              }
              color={"rgb(122, 12, 46)"}
              svg={"mac-os"}
              count={
                dataset.filter((data) => {
                  return data.accessOs.indexOf("iPhone") !== -1;
                }).length
              }
              name={"iPhone"}
            />
          </Grid>

          <Grid item xs={3} sm={6} md={12}>
            <Line dataset={dataset} />
          </Grid>
          <Grid item xs={3} sm={6}>
            <Doughnut dataset={dataset} />
          </Grid>
          <Grid item xs={3} sm={6}>
            <Bar dataset={dataset} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

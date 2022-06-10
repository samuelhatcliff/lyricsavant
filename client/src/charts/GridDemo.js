import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function BasicGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item xs={4} container direction="column">
                    <Item>Artist Info</Item>
                    <Item>WordCloud</Item>
                    <Item>PieChart</Item>
                </Grid>
                <Grid item xs={4} container direction="column">
                    <Item>Compare</Item>
                    <Item>Vocab</Item>
                    <Item>Polarity</Item>
                </Grid>
                <Grid item xs={4} container direction="column">
                    <Item>ArtistInfo</Item>
                    <Item>WordCloud</Item>
                    <Item>PieChart</Item>
                </Grid>

            </Grid>
        </Box>
    );
}
